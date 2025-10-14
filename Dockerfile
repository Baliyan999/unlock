# Multi-stage build for UNLOCK Chinese Language School

# Stage 1: Build frontend
FROM node:18-alpine AS frontend-builder

WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev

COPY . .
RUN npm run build

# Stage 2: Backend and serve frontend
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy backend requirements and install Python dependencies
COPY backend/requirements.txt ./backend/
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy backend code
COPY backend/ ./backend/

# Copy built frontend from previous stage
COPY --from=frontend-builder /app/dist ./frontend/dist

# Create a simple HTTP server for frontend
RUN pip install --no-cache-dir serve

# Create data directory for database
RUN mkdir -p /app/backend/data

# Expose ports
EXPOSE 8000 3000

# Create startup script
RUN echo '#!/bin/bash\n\
set -e\n\
echo "🚀 Starting UnlockLingua..."\n\
cd /app/backend\n\
echo "📋 Initializing database..."\n\
python init_db.py\n\
echo "🌐 Starting backend server..."\n\
python -m uvicorn main:app --host 0.0.0.0 --port 8000 &\n\
echo "🎨 Starting frontend server..."\n\
cd /app && serve -s frontend/dist -l 3000 &\n\
echo "✅ All services started!"\n\
wait' > /app/start.sh && chmod +x /app/start.sh

CMD ["/app/start.sh"]
