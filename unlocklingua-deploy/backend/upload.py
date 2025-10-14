from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, status
from fastapi.responses import JSONResponse
import os
import uuid
from utils import get_tashkent_now
from PIL import Image
import io

from auth import get_current_admin_user, User

upload_router = APIRouter()

# Создаем папку для загрузок, если её нет
UPLOAD_DIR = "../public/images/blog"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@upload_router.post("/blog-image")
async def upload_blog_image(
    file: UploadFile = File(...),
    current_admin: User = Depends(get_current_admin_user)
):
    """
    Загрузка и обработка изображения для статьи блога.
    Автоматически изменяет размер до 800x400px и оптимизирует.
    """
    
    # Проверяем тип файла
    if not file.content_type.startswith('image/'):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Файл должен быть изображением"
        )
    
    try:
        # Читаем содержимое файла
        contents = await file.read()
        
        # Открываем изображение с помощью PIL
        image = Image.open(io.BytesIO(contents))
        
        # Конвертируем в RGB если нужно (для JPEG)
        if image.mode in ('RGBA', 'LA', 'P'):
            image = image.convert('RGB')
        
        # Изменяем размер и обрезаем до 800x400
        target_width, target_height = 800, 400
        image = resize_and_crop_image(image, target_width, target_height)
        
        # Генерируем уникальное имя файла
        timestamp = get_tashkent_now().strftime("%Y%m%d_%H%M%S")
        unique_id = str(uuid.uuid4())[:8]
        filename = f"blog_{timestamp}_{unique_id}.jpg"
        filepath = os.path.join(UPLOAD_DIR, filename)
        
        # Сохраняем оптимизированное изображение
        image.save(filepath, "JPEG", quality=85, optimize=True)
        
        # Возвращаем URL изображения
        image_url = f"/images/blog/{filename}"
        
        return JSONResponse(content={
            "success": True,
            "url": image_url,
            "filename": filename,
            "size": f"{target_width}x{target_height}"
        })
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Ошибка при обработке изображения: {str(e)}"
        )

def resize_and_crop_image(image: Image.Image, target_width: int, target_height: int) -> Image.Image:
    """
    Изменяет размер и обрезает изображение до нужных пропорций.
    """
    # Вычисляем соотношение сторон
    target_ratio = target_width / target_height
    image_ratio = image.width / image.height
    
    if image_ratio > target_ratio:
        # Изображение шире, обрезаем по бокам
        new_height = image.height
        new_width = int(image.height * target_ratio)
        left = (image.width - new_width) // 2
        top = 0
        right = left + new_width
        bottom = new_height
    else:
        # Изображение выше, обрезаем сверху и снизу
        new_width = image.width
        new_height = int(image.width / target_ratio)
        left = 0
        top = (image.height - new_height) // 2
        right = new_width
        bottom = top + new_height
    
    # Обрезаем изображение
    cropped_image = image.crop((left, top, right, bottom))
    
    # Изменяем размер до целевого
    resized_image = cropped_image.resize((target_width, target_height), Image.Resampling.LANCZOS)
    
    return resized_image

@upload_router.delete("/blog-image/{filename}")
async def delete_blog_image(
    filename: str,
    current_admin: User = Depends(get_current_admin_user)
):
    """
    Удаление изображения статьи блога.
    """
    try:
        filepath = os.path.join(UPLOAD_DIR, filename)
        
        if os.path.exists(filepath):
            os.remove(filepath)
            return JSONResponse(content={
                "success": True,
                "message": f"Изображение {filename} удалено"
            })
        else:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Файл не найден"
            )
            
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Ошибка при удалении файла: {str(e)}"
        )
