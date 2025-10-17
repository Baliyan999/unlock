// Reviews functionality for UNLOCK Mini App

// Initialize reviews
document.addEventListener('DOMContentLoaded', function() {
    console.log('Reviews initialized');
    
    // Set up Telegram Web App
    if (window.UnlockApp) {
        window.UnlockApp.tg.MainButton.setText('Оставить отзыв');
        window.UnlockApp.tg.MainButton.hide();
        window.UnlockApp.tg.BackButton.show();
        
        window.UnlockApp.tg.MainButton.onClick(function() {
            leaveReview();
        });
    }
    
    // Track reviews page view
    if (window.UnlockApp) {
        window.UnlockApp.trackEvent('reviews_page_view');
    }
});

// Leave review
function leaveReview() {
    if (window.UnlockApp) {
        // Show review form
        showReviewForm();
        
        // Haptic feedback
        window.UnlockApp.hapticFeedback('light');
        
        // Track review button click
        window.UnlockApp.trackEvent('leave_review_clicked');
    }
}

// Show review form
function showReviewForm() {
    if (window.UnlockApp) {
        window.UnlockApp.tg.showPopup({
            title: 'Оставить отзыв',
            message: 'Поделитесь своим опытом обучения в UNLOCK',
            buttons: [
                {
                    id: 'rate_5',
                    type: 'default',
                    text: '⭐⭐⭐⭐⭐ Отлично'
                },
                {
                    id: 'rate_4',
                    type: 'default',
                    text: '⭐⭐⭐⭐ Хорошо'
                },
                {
                    id: 'rate_3',
                    type: 'default',
                    text: '⭐⭐⭐ Удовлетворительно'
                },
                {
                    id: 'cancel',
                    type: 'cancel',
                    text: 'Отмена'
                }
            ]
        }, function(buttonId) {
            if (buttonId && buttonId !== 'cancel') {
                handleRatingSelection(buttonId);
            }
        });
    }
}

// Handle rating selection
function handleRatingSelection(buttonId) {
    const rating = buttonId.replace('rate_', '');
    
    if (window.UnlockApp) {
        // Show text input for review
        window.UnlockApp.tg.showPopup({
            title: 'Напишите отзыв',
            message: 'Расскажите подробнее о своем опыте обучения',
            buttons: [
                {
                    id: 'submit',
                    type: 'default',
                    text: 'Отправить отзыв'
                },
                {
                    id: 'cancel',
                    type: 'cancel',
                    text: 'Отмена'
                }
            ]
        }, function(buttonId) {
            if (buttonId === 'submit') {
                submitReview(rating);
            }
        });
    }
}

// Submit review
function submitReview(rating) {
    if (window.UnlockApp) {
        // Send review data
        window.UnlockApp.tg.sendData(JSON.stringify({
            type: 'review_submission',
            rating: parseInt(rating),
            timestamp: Date.now(),
            userId: window.UnlockApp.tg.initDataUnsafe?.user?.id
        }));
        
        // Show success message
        window.UnlockApp.showAlert('Спасибо за ваш отзыв! Он будет опубликован после модерации.');
        window.UnlockApp.hapticFeedback('success');
        
        // Track review submission
        window.UnlockApp.trackEvent('review_submitted', { rating: rating });
    }
}

// Refresh reviews
function refreshReviews() {
    // Simulate refresh
    if (window.UnlockApp) {
        window.UnlockApp.hapticFeedback('light');
        window.UnlockApp.showAlert('Отзывы обновлены!');
        
        // Track refresh
        window.UnlockApp.trackEvent('reviews_refreshed');
    }
}

// Go back
function goBack() {
    if (window.UnlockApp) {
        window.UnlockApp.tg.BackButton.onClick();
    } else {
        window.history.back();
    }
}

// Add CSS for reviews-specific styles
const reviewsStyles = `
<style>
.reviews-section {
    padding: 20px;
    min-height: 100vh;
}

.reviews-content {
    max-width: 800px;
    margin: 0 auto;
}

.page-title {
    font-size: 24px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 8px;
    color: var(--tg-theme-text-color, #000000);
}

.page-subtitle {
    text-align: center;
    color: var(--tg-theme-hint-color, #666666);
    margin-bottom: 32px;
}

.rating-summary {
    background: var(--tg-theme-bg-color, #ffffff);
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 32px;
    border: 1px solid var(--tg-theme-hint-color, #e5e5e5);
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.rating-score {
    text-align: center;
}

.score-number {
    font-size: 48px;
    font-weight: 700;
    color: var(--tg-theme-button-color, #2481cc);
    margin-bottom: 8px;
}

.score-stars {
    font-size: 24px;
    margin-bottom: 8px;
}

.score-text {
    color: var(--tg-theme-hint-color, #666666);
    font-size: 14px;
}

.rating-stats {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.stat-item {
    display: flex;
    align-items: center;
    gap: 12px;
}

.stat-bar {
    flex: 1;
    height: 8px;
    background: var(--tg-theme-hint-color, #e5e5e5);
    border-radius: 4px;
    overflow: hidden;
}

.stat-fill {
    height: 100%;
    background: var(--tg-theme-button-color, #2481cc);
    border-radius: 4px;
    transition: width 0.3s ease;
}

.stat-label {
    font-size: 12px;
    color: var(--tg-theme-hint-color, #666666);
    min-width: 60px;
}

.stat-count {
    font-size: 12px;
    font-weight: 600;
    color: var(--tg-theme-text-color, #000000);
    min-width: 30px;
    text-align: right;
}

.reviews-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 32px;
}

.review-card {
    background: var(--tg-theme-bg-color, #ffffff);
    border-radius: 16px;
    padding: 20px;
    border: 1px solid var(--tg-theme-hint-color, #e5e5e5);
    transition: all 0.3s ease;
}

.review-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.review-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;
}

.reviewer-info {
    display: flex;
    align-items: center;
    gap: 12px;
}

.reviewer-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--tg-theme-button-color, #2481cc);
    color: var(--tg-theme-button-text-color, #ffffff);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 16px;
}

.reviewer-details h4 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 4px;
    color: var(--tg-theme-text-color, #000000);
}

.reviewer-badge {
    background: #fef3c7;
    color: #92400e;
    padding: 2px 8px;
    border-radius: 8px;
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
}

.review-rating {
    font-size: 16px;
}

.review-content {
    margin-bottom: 16px;
}

.review-content p {
    color: var(--tg-theme-text-color, #000000);
    line-height: 1.6;
    font-size: 14px;
}

.review-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    color: var(--tg-theme-hint-color, #666666);
}

.review-level {
    background: var(--tg-theme-secondary-bg-color, #f8f9fa);
    padding: 4px 8px;
    border-radius: 8px;
    font-weight: 500;
}

.leave-review-section {
    background: var(--tg-theme-secondary-bg-color, #f8f9fa);
    border-radius: 16px;
    padding: 32px 24px;
    text-align: center;
    border: 1px solid var(--tg-theme-hint-color, #e5e5e5);
}

.leave-review-content h3 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 12px;
    color: var(--tg-theme-text-color, #000000);
}

.leave-review-content p {
    color: var(--tg-theme-hint-color, #666666);
    margin-bottom: 24px;
    line-height: 1.6;
}

.back-btn {
    background: none;
    border: none;
    color: var(--tg-theme-button-color, #2481cc);
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    padding: 8px 0;
}

@media (min-width: 768px) {
    .rating-summary {
        flex-direction: row;
        align-items: center;
    }
    
    .rating-score {
        text-align: left;
        min-width: 200px;
    }
    
    .rating-stats {
        flex: 1;
    }
}
</style>
`;

// Add styles to head
document.head.insertAdjacentHTML('beforeend', reviewsStyles);
