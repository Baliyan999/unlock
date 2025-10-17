// Blog functionality for UNLOCK Mini App

// Initialize blog
document.addEventListener('DOMContentLoaded', function() {
    console.log('Blog initialized');
    
    // Set up Telegram Web App
    if (window.UnlockApp) {
        window.UnlockApp.tg.MainButton.setText('Подписаться на рассылку');
        window.UnlockApp.tg.MainButton.hide();
        window.UnlockApp.tg.BackButton.show();
        
        window.UnlockApp.tg.MainButton.onClick(function() {
            subscribeNewsletter();
        });
    }
    
    // Track blog page view
    if (window.UnlockApp) {
        window.UnlockApp.trackEvent('blog_page_view');
    }
});

// Open article
function openArticle(articleId) {
    // Track article click
    if (window.UnlockApp) {
        window.UnlockApp.trackEvent('article_clicked', { articleId: articleId });
    }
    
    // Show article content (in real app, this would navigate to article page)
    showArticleContent(articleId);
    
    // Haptic feedback
    if (window.UnlockApp) {
        window.UnlockApp.hapticFeedback('light');
    }
}

// Show article content
function showArticleContent(articleId) {
    const articles = {
        'getting-started': {
            title: 'Как начать изучать китайский язык с нуля',
            content: `
                <h2>Введение</h2>
                <p>Изучение китайского языка может показаться сложной задачей, но с правильным подходом и мотивацией вы сможете достичь отличных результатов.</p>
                
                <h3>1. Постановка целей</h3>
                <p>Определите, зачем вам нужен китайский язык. Это поможет выбрать правильную стратегию обучения.</p>
                
                <h3>2. Выбор учебных материалов</h3>
                <p>Начните с базовых учебников и приложений для изучения пиньиня и основных иероглифов.</p>
                
                <h3>3. Изучение пиньиня</h3>
                <p>Пиньинь - это система транскрипции китайских звуков латинскими буквами. Это основа для правильного произношения.</p>
                
                <h3>4. Освоение тонов</h3>
                <p>В китайском языке 4 тона, которые кардинально меняют значение слова. Практикуйте их с самого начала.</p>
                
                <h3>5. Постоянная практика</h3>
                <p>Занимайтесь регулярно, даже по 15-20 минут в день. Постоянство важнее интенсивности.</p>
            `
        },
        'hsk-preparation': {
            title: 'Подготовка к HSK: полное руководство',
            content: `
                <h2>Что такое HSK?</h2>
                <p>HSK (Hanyu Shuiping Kaoshi) - это стандартизированный экзамен по китайскому языку для иностранцев.</p>
                
                <h3>Уровни HSK</h3>
                <ul>
                    <li>HSK 1-2: Базовый уровень (150-300 слов)</li>
                    <li>HSK 3-4: Средний уровень (600-1200 слов)</li>
                    <li>HSK 5-6: Продвинутый уровень (2500-5000 слов)</li>
                </ul>
                
                <h3>Структура экзамена</h3>
                <p>Каждый уровень включает аудирование, чтение и письмо (для уровней 3-6).</p>
                
                <h3>Советы по подготовке</h3>
                <p>Изучайте словарь по уровням, практикуйте аудирование и решайте пробные тесты.</p>
            `
        },
        'pronunciation-tips': {
            title: 'Тоны в китайском языке: как их освоить',
            content: `
                <h2>Четыре тона китайского языка</h2>
                <p>Тоны - это мелодические изменения высоты голоса, которые меняют значение слова.</p>
                
                <h3>1-й тон (ровный)</h3>
                <p>Высокий ровный тон, как при пении ноты.</p>
                
                <h3>2-й тон (восходящий)</h3>
                <p>Тон поднимается вверх, как при вопросе.</p>
                
                <h3>3-й тон (нисходяще-восходящий)</h3>
                <p>Тон сначала опускается, затем поднимается.</p>
                
                <h3>4-й тон (нисходящий)</h3>
                <p>Резко падающий тон, как при команде.</p>
                
                <h3>Практические советы</h3>
                <p>Слушайте носителей языка, записывайте себя и сравнивайте произношение.</p>
            `
        }
    };
    
    const article = articles[articleId];
    if (article) {
        if (window.UnlockApp) {
            window.UnlockApp.showAlert(article.title + '\n\n' + article.content.replace(/<[^>]*>/g, ''));
        }
    }
}

// Subscribe to newsletter
function subscribeNewsletter() {
    if (window.UnlockApp) {
        window.UnlockApp.tg.sendData(JSON.stringify({
            type: 'newsletter_subscription',
            timestamp: Date.now()
        }));
        
        window.UnlockApp.showAlert('Спасибо за подписку! Вы будете получать новые статьи в Telegram.');
        window.UnlockApp.hapticFeedback('success');
        
        // Track subscription
        window.UnlockApp.trackEvent('newsletter_subscribed');
    }
}

// Refresh blog
function refreshBlog() {
    // Simulate refresh
    if (window.UnlockApp) {
        window.UnlockApp.hapticFeedback('light');
        window.UnlockApp.showAlert('Блог обновлен!');
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

// Add CSS for blog-specific styles
const blogStyles = `
<style>
.blog-section {
    padding: 20px;
    min-height: 100vh;
}

.blog-content {
    max-width: 1000px;
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

.featured-article {
    background: var(--tg-theme-bg-color, #ffffff);
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 32px;
    border: 1px solid var(--tg-theme-hint-color, #e5e5e5);
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.featured-image {
    position: relative;
    height: 200px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 48px;
}

.featured-badge {
    position: absolute;
    top: 12px;
    left: 12px;
    background: var(--tg-theme-button-color, #2481cc);
    color: var(--tg-theme-button-text-color, #ffffff);
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
}

.featured-content h2 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 12px;
    color: var(--tg-theme-text-color, #000000);
    line-height: 1.4;
}

.featured-content p {
    color: var(--tg-theme-hint-color, #666666);
    line-height: 1.6;
    margin-bottom: 16px;
}

.article-meta {
    display: flex;
    gap: 16px;
    margin-bottom: 16px;
    font-size: 12px;
    color: var(--tg-theme-hint-color, #666666);
}

.read-time {
    background: var(--tg-theme-secondary-bg-color, #f8f9fa);
    padding: 4px 8px;
    border-radius: 8px;
}

.articles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 32px;
}

.article-card {
    background: var(--tg-theme-bg-color, #ffffff);
    border-radius: 16px;
    padding: 0;
    border: 1px solid var(--tg-theme-hint-color, #e5e5e5);
    cursor: pointer;
    transition: all 0.3s ease;
    overflow: hidden;
}

.article-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
}

.article-image {
    position: relative;
    height: 120px;
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 32px;
}

.article-category {
    position: absolute;
    top: 8px;
    left: 8px;
    background: rgba(255, 255, 255, 0.9);
    color: var(--tg-theme-text-color, #000000);
    padding: 4px 8px;
    border-radius: 8px;
    font-size: 10px;
    font-weight: 600;
}

.article-content {
    padding: 20px;
}

.article-content h3 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 8px;
    color: var(--tg-theme-text-color, #000000);
    line-height: 1.4;
}

.article-content p {
    color: var(--tg-theme-hint-color, #666666);
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 12px;
}

.newsletter-signup {
    background: var(--tg-theme-secondary-bg-color, #f8f9fa);
    border-radius: 16px;
    padding: 32px 24px;
    text-align: center;
    border: 1px solid var(--tg-theme-hint-color, #e5e5e5);
}

.newsletter-content h3 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 12px;
    color: var(--tg-theme-text-color, #000000);
}

.newsletter-content p {
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
    .featured-article {
        flex-direction: row;
        align-items: center;
    }
    
    .featured-image {
        width: 300px;
        height: 200px;
        flex-shrink: 0;
    }
    
    .featured-content {
        flex: 1;
    }
    
    .articles-grid {
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    }
}
</style>
`;

// Add styles to head
document.head.insertAdjacentHTML('beforeend', blogStyles);
