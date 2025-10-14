# Production Dockerfile for UNLOCK Chinese Language School
# Uses pre-built frontend from dist/ folder

FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    curl \
    nginx \
    && rm -rf /var/lib/apt/lists/*

# Copy backend requirements and install Python dependencies
COPY backend/requirements.txt ./backend/
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy backend code
COPY backend/ ./backend/

# Copy pre-built frontend
COPY dist/ ./frontend/dist/

# Create nginx config for frontend
RUN echo 'server {\n\
    listen 3000;\n\
    server_name localhost;\n\
    root /app/frontend/dist;\n\
    index index.html;\n\
    \n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
    \n\
    location /api {\n\
        proxy_pass http://localhost:8000;\n\
        proxy_set_header Host $host;\n\
        proxy_set_header X-Real-IP $remote_addr;\n\
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n\
        proxy_set_header X-Forwarded-Proto $scheme;\n\
    }\n\
}' > /etc/nginx/sites-available/default

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
echo "🎨 Starting nginx for frontend..."\n\
nginx -g "daemon off;" &\n\
echo "✅ All services started!"\n\
wait' > /app/start.sh && chmod +x /app/start.sh

CMD ["/app/start.sh"]
