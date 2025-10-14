#!/bin/bash

# Build script for UNLOCK Chinese Language School

echo "🔨 Building UNLOCK Chinese Language School for production..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build frontend
echo "🔨 Building frontend..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Error: Frontend build failed"
    exit 1
fi

echo "✅ Frontend build completed successfully!"

# Check backend dependencies
echo "🐍 Checking backend dependencies..."
cd backend

if [ ! -d "venv" ]; then
    echo "❌ Error: Backend virtual environment not found"
    echo "Please create it first:"
    echo "   python3 -m venv venv"
    echo "   source venv/bin/activate"
    echo "   pip install -r requirements.txt"
    exit 1
fi

# Activate virtual environment and check dependencies
source venv/bin/activate
python -c "import fastapi, sqlalchemy, jose" 2>/dev/null
if [ $? -ne 0 ]; then
    echo "❌ Error: Backend dependencies not installed"
    echo "Please install them:"
    echo "   source venv/bin/activate"
    echo "   pip install -r requirements.txt"
    exit 1
fi

echo "✅ Backend dependencies are ready!"

cd ..

echo ""
echo "🎉 Build completed successfully!"
echo ""
echo "📁 Frontend build: ./dist/"
echo "🐍 Backend ready: ./backend/"
echo ""
echo "To start in production mode:"
echo "   ./start_production.sh"
echo ""
echo "Or with Docker:"
echo "   docker-compose up -d"

