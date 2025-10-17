// Calculator functionality for UNLOCK Mini App

// Pricing data
const pricingData = {
    levels: {
        hsk1: { name: 'HSK 1', duration: 3, lessons: 24, basePrice: 500000 },
        hsk2: { name: 'HSK 2', duration: 4, lessons: 32, basePrice: 500000 },
        hsk3: { name: 'HSK 3', duration: 5, lessons: 40, basePrice: 500000 },
        hsk4: { name: 'HSK 4', duration: 6, lessons: 48, basePrice: 500000 },
        hsk5: { name: 'HSK 5', duration: 8, lessons: 64, basePrice: 500000 }
    },
    formats: {
        group: { name: 'Групповые', multiplier: 1.0, description: '8-12 уроков в месяц, 80 минут' },
        individual: { name: 'Индивидуальные', multiplier: 4.4, description: '12 уроков в месяц, 60 минут' },
        intensive: { name: 'Интенсив', multiplier: 1.0, description: 'Обсуждается с преподавателем' }
    }
};

// Promo codes
const promoCodes = {
    'WELCOME10': { discount: 10, name: 'Добро пожаловать' },
    'STUDENT15': { discount: 15, name: 'Студенческая скидка' },
    'VIP20': { discount: 20, name: 'VIP скидка' }
};

// Current state
let currentState = {
    level: '',
    format: '',
    lessons: 8,
    promoCode: '',
    appliedDiscount: 0
};

// Initialize calculator
document.addEventListener('DOMContentLoaded', function() {
    console.log('Calculator initialized');
    
    // Set up Telegram Web App
    if (window.UnlockApp) {
        window.UnlockApp.tg.MainButton.setText('Записаться на пробный урок');
        window.UnlockApp.tg.MainButton.hide();
        window.UnlockApp.tg.BackButton.show();
        
        window.UnlockApp.tg.MainButton.onClick(function() {
            openFormWithData();
        });
    }
    
    // Track calculator page view
    if (window.UnlockApp) {
        window.UnlockApp.trackEvent('calculator_page_view');
    }
});

// Format selection
function selectFormat(format) {
    // Remove active class from all options
    document.querySelectorAll('.format-option').forEach(option => {
        option.classList.remove('active');
    });
    
    // Add active class to selected option
    document.querySelector(`[data-format="${format}"]`).classList.add('active');
    
    currentState.format = format;
    
    // Show/hide lessons slider for group format
    const lessonsGroup = document.getElementById('lessonsGroup');
    if (format === 'group') {
        lessonsGroup.style.display = 'block';
    } else {
        lessonsGroup.style.display = 'none';
        currentState.lessons = 12; // Default for individual/intensive
    }
    
    updateCalculation();
    
    // Haptic feedback
    if (window.UnlockApp) {
        window.UnlockApp.hapticFeedback('light');
    }
}

// Update lessons count
function updateLessons(value) {
    document.getElementById('lessonsValue').textContent = value;
    currentState.lessons = parseInt(value);
    updateCalculation();
}

// Apply promo code
function applyPromoCode() {
    const promoInput = document.getElementById('promoCode');
    const promoMessage = document.getElementById('promoMessage');
    const code = promoInput.value.trim().toUpperCase();
    
    if (!code) {
        currentState.promoCode = '';
        currentState.appliedDiscount = 0;
        promoMessage.textContent = '';
        promoMessage.className = 'promo-message';
        updateCalculation();
        return;
    }
    
    if (promoCodes[code]) {
        currentState.promoCode = code;
        currentState.appliedDiscount = promoCodes[code].discount;
        promoMessage.textContent = `✅ Промокод "${promoCodes[code].name}" применен! Скидка ${promoCodes[code].discount}%`;
        promoMessage.className = 'promo-message success';
        
        // Haptic feedback
        if (window.UnlockApp) {
            window.UnlockApp.hapticFeedback('success');
        }
    } else {
        currentState.promoCode = '';
        currentState.appliedDiscount = 0;
        promoMessage.textContent = '❌ Промокод не найден';
        promoMessage.className = 'promo-message error';
        
        // Haptic feedback
        if (window.UnlockApp) {
            window.UnlockApp.hapticFeedback('error');
        }
    }
    
    updateCalculation();
}

// Update calculation
function updateCalculation() {
    const levelSelect = document.getElementById('levelSelect');
    currentState.level = levelSelect.value;
    
    if (!currentState.level || !currentState.format) {
        showNoSelection();
        return;
    }
    
    const levelData = pricingData.levels[currentState.level];
    const formatData = pricingData.formats[currentState.format];
    
    let monthlyPrice = 0;
    
    if (currentState.format === 'group') {
        // For group lessons, calculate based on number of lessons
        const lessonsMultiplier = currentState.lessons / 8; // Base rate for 8 lessons
        monthlyPrice = Math.round(levelData.basePrice * lessonsMultiplier);
    } else if (currentState.format === 'individual') {
        // Fixed price for individual lessons
        monthlyPrice = 2200000; // 2,200,000 UZS
    } else if (currentState.format === 'intensive') {
        // Base price for intensive (to be discussed with teacher)
        monthlyPrice = levelData.basePrice;
    }
    
    // Apply discount
    const finalPrice = currentState.appliedDiscount > 0 
        ? Math.round(monthlyPrice * (1 - currentState.appliedDiscount / 100))
        : monthlyPrice;
    
    showCalculationResults({
        level: levelData,
        format: formatData,
        monthlyPrice,
        finalPrice,
        discount: currentState.appliedDiscount,
        promoCode: currentState.promoCode,
        lessons: currentState.lessons
    });
}

// Show no selection state
function showNoSelection() {
    const resultsDiv = document.getElementById('calculationResults');
    const actionButtons = document.getElementById('actionButtons');
    
    resultsDiv.innerHTML = `
        <div class="no-selection">
            <div class="no-selection-icon">📊</div>
            <p>Выберите параметры для расчета стоимости</p>
        </div>
    `;
    
    actionButtons.style.display = 'none';
    
    if (window.UnlockApp) {
        window.UnlockApp.tg.MainButton.hide();
    }
}

// Show calculation results
function showCalculationResults(data) {
    const resultsDiv = document.getElementById('calculationResults');
    const actionButtons = document.getElementById('actionButtons');
    
    const savings = data.monthlyPrice - data.finalPrice;
    
    resultsDiv.innerHTML = `
        <div class="calculation-details">
            <div class="calculation-item">
                <span class="calculation-label">Уровень:</span>
                <span class="calculation-value">${data.level.name}</span>
            </div>
            <div class="calculation-item">
                <span class="calculation-label">Формат:</span>
                <span class="calculation-value">${data.format.name}</span>
            </div>
            ${data.format.name === 'Групповые' ? `
            <div class="calculation-item">
                <span class="calculation-label">Занятий в месяц:</span>
                <span class="calculation-value">${data.lessons}</span>
            </div>
            ` : ''}
            <div class="calculation-item">
                <span class="calculation-label">Базовая стоимость:</span>
                <span class="calculation-value">${formatPrice(data.monthlyPrice)}</span>
            </div>
            ${data.discount > 0 ? `
            <div class="calculation-item discount">
                <span class="calculation-label">Промокод "${data.promoCode}":</span>
                <span class="calculation-value">-${data.discount}%</span>
            </div>
            <div class="calculation-item savings">
                <span class="calculation-label">Экономия:</span>
                <span class="calculation-value">${formatPrice(savings)}</span>
            </div>
            ` : ''}
            <div class="calculation-total">
                <span class="total-label">Итого в месяц:</span>
                <span class="total-value">${formatPrice(data.finalPrice)}</span>
            </div>
        </div>
    `;
    
    actionButtons.style.display = 'block';
    
    if (window.UnlockApp) {
        window.UnlockApp.tg.MainButton.show();
    }
    
    // Track calculation
    if (window.UnlockApp) {
        window.UnlockApp.trackEvent('calculation_completed', {
            level: data.level.name,
            format: data.format.name,
            price: data.finalPrice,
            discount: data.discount
        });
    }
}

// Format price
function formatPrice(price) {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'UZS',
        minimumFractionDigits: 0
    }).format(price);
}

// Open form with calculated data
function openFormWithData() {
    if (!currentState.level || !currentState.format) {
        if (window.UnlockApp) {
            window.UnlockApp.showAlert('Сначала выберите параметры обучения');
        }
        return;
    }
    
    const levelData = pricingData.levels[currentState.level];
    const formatData = pricingData.formats[currentState.format];
    
    // Store calculation data for form
    sessionStorage.setItem('calculatorData', JSON.stringify({
        level: levelData.name,
        format: formatData.name,
        lessons: currentState.lessons,
        promoCode: currentState.promoCode,
        discount: currentState.appliedDiscount
    }));
    
    // Navigate to form
    window.location.href = 'form.html';
}

// Share results
function shareResults() {
    if (!currentState.level || !currentState.format) {
        if (window.UnlockApp) {
            window.UnlockApp.showAlert('Сначала рассчитайте стоимость');
        }
        return;
    }
    
    const levelData = pricingData.levels[currentState.level];
    const formatData = pricingData.formats[currentState.format];
    
    const shareText = `🧮 Рассчитал стоимость обучения в UNLOCK:

📚 Уровень: ${levelData.name}
📖 Формат: ${formatData.name}
${formatData.name === 'Групповые' ? `📅 Занятий в месяц: ${currentState.lessons}` : ''}
💰 Стоимость: ${formatPrice(calculateFinalPrice())}
${currentState.promoCode ? `🎫 Промокод: ${currentState.promoCode} (${currentState.appliedDiscount}% скидка)` : ''}

Изучайте китайский язык с UNLOCK! 🎌`;

    if (window.UnlockApp && window.UnlockApp.tg) {
        window.UnlockApp.tg.sendData(JSON.stringify({
            type: 'share',
            text: shareText
        }));
    }
    
    // Haptic feedback
    if (window.UnlockApp) {
        window.UnlockApp.hapticFeedback('success');
    }
}

// Calculate final price
function calculateFinalPrice() {
    if (!currentState.level || !currentState.format) return 0;
    
    const levelData = pricingData.levels[currentState.level];
    let monthlyPrice = 0;
    
    if (currentState.format === 'group') {
        const lessonsMultiplier = currentState.lessons / 8;
        monthlyPrice = Math.round(levelData.basePrice * lessonsMultiplier);
    } else if (currentState.format === 'individual') {
        monthlyPrice = 2200000;
    } else if (currentState.format === 'intensive') {
        monthlyPrice = levelData.basePrice;
    }
    
    return currentState.appliedDiscount > 0 
        ? Math.round(monthlyPrice * (1 - currentState.appliedDiscount / 100))
        : monthlyPrice;
}

// Reset calculator
function resetCalculator() {
    currentState = {
        level: '',
        format: '',
        lessons: 8,
        promoCode: '',
        appliedDiscount: 0
    };
    
    // Reset UI
    document.getElementById('levelSelect').value = '';
    document.querySelectorAll('.format-option').forEach(option => {
        option.classList.remove('active');
    });
    document.getElementById('lessonsGroup').style.display = 'none';
    document.getElementById('lessonsValue').textContent = '8';
    document.getElementById('lessonsSlider').value = '8';
    document.getElementById('promoCode').value = '';
    document.getElementById('promoMessage').textContent = '';
    document.getElementById('promoMessage').className = 'promo-message';
    
    showNoSelection();
    
    // Haptic feedback
    if (window.UnlockApp) {
        window.UnlockApp.hapticFeedback('light');
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

// Add CSS for calculator-specific styles
const calculatorStyles = `
<style>
.calculator {
    padding: 20px;
    min-height: 100vh;
}

.calculator-content {
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

.calculator-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
}

.settings-panel {
    background: var(--tg-theme-secondary-bg-color, #f8f9fa);
    border-radius: 16px;
    padding: 24px;
    border: 1px solid var(--tg-theme-hint-color, #e5e5e5);
}

.setting-group {
    margin-bottom: 24px;
}

.setting-group:last-child {
    margin-bottom: 0;
}

.setting-label {
    display: block;
    font-weight: 600;
    margin-bottom: 12px;
    color: var(--tg-theme-text-color, #000000);
}

.setting-select {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid var(--tg-theme-hint-color, #e5e5e5);
    border-radius: 12px;
    background: var(--tg-theme-bg-color, #ffffff);
    color: var(--tg-theme-text-color, #000000);
    font-size: 16px;
}

.format-options {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
}

.format-option {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    border: 2px solid var(--tg-theme-hint-color, #e5e5e5);
    border-radius: 12px;
    background: var(--tg-theme-bg-color, #ffffff);
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: left;
    width: 100%;
}

.format-option:hover {
    border-color: var(--tg-theme-button-color, #2481cc);
}

.format-option.active {
    border-color: var(--tg-theme-button-color, #2481cc);
    background: rgba(36, 129, 204, 0.1);
}

.format-icon {
    font-size: 24px;
    flex-shrink: 0;
}

.format-info h4 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 4px;
    color: var(--tg-theme-text-color, #000000);
}

.format-info p {
    font-size: 14px;
    color: var(--tg-theme-hint-color, #666666);
}

.lessons-slider {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.slider-value {
    text-align: center;
    font-weight: 600;
    color: var(--tg-theme-text-color, #000000);
}

.promo-input {
    display: flex;
    gap: 8px;
}

.promo-field {
    flex: 1;
    padding: 12px 16px;
    border: 1px solid var(--tg-theme-hint-color, #e5e5e5);
    border-radius: 12px;
    background: var(--tg-theme-bg-color, #ffffff);
    color: var(--tg-theme-text-color, #000000);
    font-size: 16px;
}

.promo-btn {
    padding: 12px 20px;
    background: var(--tg-theme-button-color, #2481cc);
    color: var(--tg-theme-button-text-color, #ffffff);
    border: none;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
}

.promo-message {
    margin-top: 8px;
    font-size: 14px;
    font-weight: 500;
}

.promo-message.success {
    color: #059669;
}

.promo-message.error {
    color: #dc2626;
}

.results-panel {
    background: var(--tg-theme-bg-color, #ffffff);
    border-radius: 16px;
    padding: 24px;
    border: 1px solid var(--tg-theme-hint-color, #e5e5e5);
    position: sticky;
    top: 100px;
}

.results-header h3 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
    color: var(--tg-theme-text-color, #000000);
}

.no-selection {
    text-align: center;
    padding: 40px 20px;
    color: var(--tg-theme-hint-color, #666666);
}

.no-selection-icon {
    font-size: 48px;
    margin-bottom: 16px;
}

.calculation-details {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.calculation-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid var(--tg-theme-hint-color, #e5e5e5);
}

.calculation-item:last-child {
    border-bottom: none;
}

.calculation-label {
    color: var(--tg-theme-hint-color, #666666);
    font-size: 14px;
}

.calculation-value {
    font-weight: 600;
    color: var(--tg-theme-text-color, #000000);
}

.calculation-item.discount .calculation-value {
    color: #059669;
}

.calculation-item.savings .calculation-value {
    color: #059669;
}

.calculation-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
    margin-top: 16px;
    border-top: 2px solid var(--tg-theme-button-color, #2481cc);
}

.total-label {
    font-size: 18px;
    font-weight: 600;
    color: var(--tg-theme-text-color, #000000);
}

.total-value {
    font-size: 20px;
    font-weight: 700;
    color: var(--tg-theme-button-color, #2481cc);
}

.action-buttons {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 24px;
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
    .calculator-grid {
        grid-template-columns: 1fr 1fr;
    }
    
    .format-options {
        grid-template-columns: 1fr;
    }
}
</style>
`;

// Add styles to head
document.head.insertAdjacentHTML('beforeend', calculatorStyles);
