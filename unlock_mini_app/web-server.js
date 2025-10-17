const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'web-app')));

// Serve web app files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'web-app', 'index.html'));
});

app.get('/calculator', (req, res) => {
    res.sendFile(path.join(__dirname, 'web-app', 'calculator.html'));
});

app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, 'web-app', 'form.html'));
});

app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, 'web-app', 'test.html'));
});

app.get('/blog', (req, res) => {
    res.sendFile(path.join(__dirname, 'web-app', 'blog.html'));
});

app.get('/reviews', (req, res) => {
    res.sendFile(path.join(__dirname, 'web-app', 'reviews.html'));
});

// API endpoints for form submissions
app.post('/api/submit-form', (req, res) => {
    console.log('Form submission received:', req.body);
    res.json({ success: true, message: 'Form submitted successfully' });
});

app.post('/api/submit-review', (req, res) => {
    console.log('Review submission received:', req.body);
    res.json({ success: true, message: 'Review submitted successfully' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🌐 Web server running on http://localhost:${PORT}`);
    console.log(`📱 Mini app available at: http://localhost:${PORT}`);
    console.log(`📊 Calculator: http://localhost:${PORT}/calculator`);
    console.log(`📝 Form: http://localhost:${PORT}/form`);
    console.log(`🧪 Test: http://localhost:${PORT}/test`);
    console.log(`📚 Blog: http://localhost:${PORT}/blog`);
    console.log(`⭐ Reviews: http://localhost:${PORT}/reviews`);
});
