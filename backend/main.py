from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import uvicorn

from models import User, Review, Lead, Promocode
from auth import auth_router
from reviews import reviews_router
from leads import leads_router
from admin import admin_router
from promocodes import promocodes_router
from upload import upload_router

app = FastAPI(title="UnlockLingua API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(reviews_router, prefix="/reviews", tags=["reviews"])
app.include_router(leads_router, prefix="/leads", tags=["leads"])
app.include_router(admin_router, prefix="/admin", tags=["admin"])
app.include_router(promocodes_router, prefix="/promocodes", tags=["promocodes"])
app.include_router(upload_router, prefix="/upload", tags=["upload"])

# Статические файлы
app.mount("/images", StaticFiles(directory="../public/images"), name="images")

@app.get("/")
async def root():
    return {"message": "UnlockLingua API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)