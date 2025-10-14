#!/bin/bash

# Production Start Script for UnlockLingua
# This script starts the complete application (frontend + backend)

echo "🚀 Starting UnlockLingua Production Mode..."

# Check if dist folder exists
if [ ! -d "dist" ]; then
    echo "❌ dist folder not found. Please run 'npm run build' first."
    exit 1
fi

# Check if backend folder exists
if [ ! -d "backend" ]; then
    echo "❌ backend folder not found."
    exit 1
fi

# Navigate to backend directory
cd backend

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install -r requirements.txt

# Initialize database
echo "🗄️ Initializing database..."
python init_db.py

# Start the application
echo "🌐 Starting UnlockLingua server..."
echo "✅ Frontend: http://localhost:8000"
echo "✅ API: http://localhost:8000/api"
echo "✅ Admin: http://localhost:8000/admin"
echo ""
echo "Press Ctrl+C to stop the server"

# Start FastAPI with production settings
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --workers 1