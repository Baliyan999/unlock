from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from auth import auth_router
from fastapi.staticfiles import StaticFiles
import uvicorn
import os

from models import User, Review, Lead, Promocode
from reviews import reviews_router
from leads import leads_router
from admin import admin_router
from promocodes import promocodes_router
from upload import upload_router
from blog import blog_router
from utils import get_tashkent_now
from database import create_tables

app = FastAPI(title="UnlockLingua API", version="1.0.0")

# Создаем таблицы при запуске приложения
@app.on_event("startup")
async def startup_event():
    create_tables()

origins = os.getenv("ALLOWED_ORIGINS", "*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers - ВАЖНО: регистрируем ДО статических файлов
app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(reviews_router, prefix="/reviews", tags=["reviews"])
app.include_router(leads_router, prefix="/leads", tags=["leads"])
app.include_router(admin_router, prefix="/admin", tags=["admin"])
app.include_router(promocodes_router, prefix="/promocodes", tags=["promocodes"])
app.include_router(upload_router, prefix="/upload", tags=["upload"])
app.include_router(blog_router, prefix="/blog", tags=["blog"])

# Определяем путь к изображениям
images_dir = None
if os.path.exists("../dist/images"):
    # В продакшене используем dist/images
    images_dir = "../dist/images"
elif os.path.exists("../public/images"):
    # В разработке используем public/images
    images_dir = "../public/images"

# Корневой роутер для development режима
if not os.path.exists("../dist"):
    @app.get("/")
    async def root():
        return {"message": "UnlockLingua API is running"}

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": get_tashkent_now().isoformat(),
        "timezone": "Asia/Tashkent (UTC+5)"
    }

# Монтируем изображения
if images_dir:
    app.mount("/images", StaticFiles(directory=images_dir), name="images")

# Production: Serve frontend static files (только для не-API путей)
if os.path.exists("../dist"):
    from fastapi import Request
    from fastapi.responses import FileResponse
    
    # Переопределяем корневой путь для SPA
    @app.get("/")
    async def serve_index():
        return FileResponse("../dist/index.html")
    

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)