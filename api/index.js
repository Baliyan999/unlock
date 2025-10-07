const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: '../.env' });

// Импортируем модули
const reviewsAPI = require('./reviews-api');
const bot = require('./telegram-bot-new');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Создаем директорию для БД если её нет
const dbDir = path.join(__dirname, 'db');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// API Routes
app.get('/api/reviews', reviewsAPI.getPublishedReviews);
app.post('/api/reviews', reviewsAPI.createNewReview);
app.get('/api/reviews/admin', (req, res) => {
  req.query.action = 'admin';
  reviewsAPI.getAdminReviews(req, res);
});
app.put('/api/reviews/:id', (req, res) => {
  req.body = { ...req.body, reviewId: req.params.id };
  req.query.action = 'update';
  reviewsAPI.updateReview(req, res);
});
app.get('/api/reviews/stats', (req, res) => {
  req.query.action = 'stats';
  reviewsAPI.getStats(req, res);
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    bot: 'running'
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('API Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('Shutting down gracefully...');
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`🚀 Reviews API server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🤖 Telegram bot is running...`);
});

module.exports = app;
