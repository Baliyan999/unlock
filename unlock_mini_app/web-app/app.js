// UNLOCK Telegram Mini App JavaScript

// Initialize Telegram Web App
const tg = window.Telegram.WebApp;

// Configure the app
tg.ready();
tg.expand();

// Set main button
tg.MainButton.setText('Записаться на пробный урок');
tg.MainButton.color = '#2481cc';
tg.MainButton.textColor = '#ffffff';

// Set header color
tg.HeaderColor = '#2481cc';

// Set background color
tg.BackgroundColor = '#ffffff';

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    console.log('UNLOCK Mini App initialized');
    
    // Show main button
    tg.MainButton.show();
    
    // Add click handler to main button
    tg.MainButton.onClick(function() {
        openForm();
    });
    
    // Handle back button
    tg.BackButton.onClick(function() {
        tg.close();
    });
    
    // Send viewport data
    tg.sendData(JSON.stringify({
        type: 'viewport',
        height: window.innerHeight,
        width: window.innerWidth
    }));
});

// Navigation functions
function openCalculator() {
    tg.sendData(JSON.stringify({
        type: 'navigate',
        page: 'calculator'
    }));
    
    // Open calculator page
    window.location.href = 'calculator.html';
}

function openTest() {
    tg.sendData(JSON.stringify({
        type: 'navigate',
        page: 'test'
    }));
    
    // Open test page
    window.location.href = 'test.html';
}

function openBlog() {
    tg.sendData(JSON.stringify({
        type: 'navigate',
        page: 'blog'
    }));
    
    // Open blog page
    window.location.href = 'blog.html';
}

function openReviews() {
    tg.sendData(JSON.stringify({
        type: 'navigate',
        page: 'reviews'
    }));
    
    // Open reviews page
    window.location.href = 'reviews.html';
}

function openForm(format = '') {
    tg.sendData(JSON.stringify({
        type: 'navigate',
        page: 'form',
        format: format
    }));
    
    // Open form page
    window.location.href = `form.html${format ? '?format=' + format : ''}`;
}

// Utility functions
function showAlert(message) {
    tg.showAlert(message);
}

function showConfirm(message, callback) {
    tg.showConfirm(message, callback);
}

function showPopup(params) {
    tg.showPopup(params, callback);
}

function hapticFeedback(type = 'medium') {
    switch(type) {
        case 'light':
            tg.HapticFeedback.impactOccurred('light');
            break;
        case 'medium':
            tg.HapticFeedback.impactOccurred('medium');
            break;
        case 'heavy':
            tg.HapticFeedback.impactOccurred('heavy');
            break;
        case 'success':
            tg.HapticFeedback.notificationOccurred('success');
            break;
        case 'error':
            tg.HapticFeedback.notificationOccurred('error');
            break;
        case 'warning':
            tg.HapticFeedback.notificationOccurred('warning');
            break;
    }
}

// Add haptic feedback to buttons
document.addEventListener('click', function(e) {
    if (e.target.matches('button, .action-card')) {
        hapticFeedback('light');
    }
});

// Handle form submissions
function submitForm(formData) {
    tg.sendData(JSON.stringify({
        type: 'lead_form',
        ...formData
    }));
    
    hapticFeedback('success');
    showAlert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
}

// Handle URL parameters
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Initialize based on URL parameters
const format = getUrlParameter('format');
if (format) {
    // Pre-fill form with format
    console.log('Pre-filling form with format:', format);
}

// Analytics
function trackEvent(eventName, data = {}) {
    tg.sendData(JSON.stringify({
        type: 'analytics',
        event: eventName,
        data: data,
        timestamp: Date.now()
    }));
}

// Track page views
trackEvent('page_view', {
    page: 'home',
    user_id: tg.initDataUnsafe?.user?.id
});

// Handle errors
window.addEventListener('error', function(e) {
    console.error('App error:', e.error);
    trackEvent('error', {
        message: e.error?.message,
        stack: e.error?.stack
    });
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    trackEvent('unhandled_rejection', {
        reason: e.reason?.toString()
    });
});

// Open main site
function openMainSite() {
    // Track site button click
    trackEvent('main_site_clicked');
    
    // Haptic feedback
    hapticFeedback('light');
    
    // Open main site in new tab
    if (window.UnlockApp && window.UnlockApp.tg) {
        // In Telegram Web App, try to open external link
        window.UnlockApp.tg.openLink('https://unlocklingua.com', { try_instant_view: false });
    } else {
        // Fallback for regular browser - открываем основной сайт
        window.open('https://unlocklingua.com', '_blank');
    }
}

// Export functions for use in other pages
window.UnlockApp = {
    tg,
    openCalculator,
    openTest,
    openBlog,
    openReviews,
    openForm,
    openMainSite,
    showAlert,
    showConfirm,
    hapticFeedback,
    submitForm,
    trackEvent,
    getUrlParameter
};
