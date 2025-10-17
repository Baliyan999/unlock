// Form functionality for UNLOCK Mini App

// Initialize form
document.addEventListener('DOMContentLoaded', function() {
    console.log('Form initialized');
    
    // Set up Telegram Web App
    if (window.UnlockApp) {
        window.UnlockApp.tg.MainButton.setText('Отправить заявку');
        window.UnlockApp.tg.MainButton.hide();
        window.UnlockApp.tg.BackButton.show();
        
        window.UnlockApp.tg.MainButton.onClick(function() {
            document.getElementById('leadForm').dispatchEvent(new Event('submit'));
        });
    }
    
    // Load calculator data if available
    loadCalculatorData();
    
    // Set up form validation
    setupFormValidation();
    
    // Set up character counter
    setupCharacterCounter();
    
    // Track form page view
    if (window.UnlockApp) {
        window.UnlockApp.trackEvent('form_page_view');
    }
});

// Load calculator data
function loadCalculatorData() {
    const calculatorData = sessionStorage.getItem('calculatorData');
    if (calculatorData) {
        try {
            const data = JSON.parse(calculatorData);
            showCalculatorData(data);
            prefillForm(data);
            
            // Clear calculator data after use
            sessionStorage.removeItem('calculatorData');
        } catch (error) {
            console.error('Error parsing calculator data:', error);
        }
    }
}

// Show calculator data
function showCalculatorData(data) {
    const calculatorDataDiv = document.getElementById('calculatorData');
    const calcLevel = document.getElementById('calcLevel');
    const calcFormat = document.getElementById('calcFormat');
    const calcLessons = document.getElementById('calcLessons');
    const calcPromo = document.getElementById('calcPromo');
    const calcPromoRow = document.getElementById('calcPromoRow');
    
    calcLevel.textContent = data.level || '-';
    calcFormat.textContent = data.format || '-';
    calcLessons.textContent = data.lessons || '-';
    
    if (data.promoCode) {
        calcPromo.textContent = `${data.promoCode} (${data.discount}% скидка)`;
        calcPromoRow.style.display = 'flex';
    }
    
    calculatorDataDiv.style.display = 'block';
}

// Prefill form with calculator data
function prefillForm(data) {
    if (data.level) {
        const levelSelect = document.getElementById('level');
        const levelOption = Array.from(levelSelect.options).find(option => 
            option.textContent.includes(data.level)
        );
        if (levelOption) {
            levelSelect.value = levelOption.value;
        }
    }
    
    if (data.format) {
        const formatSelect = document.getElementById('format');
        const formatOption = Array.from(formatSelect.options).find(option => 
            option.textContent.includes(data.format)
        );
        if (formatOption) {
            formatSelect.value = formatOption.value;
        }
    }
    
    if (data.promoCode) {
        document.getElementById('promoCode').value = data.promoCode;
    }
}

// Setup form validation
function setupFormValidation() {
    const form = document.getElementById('leadForm');
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

// Setup character counter
function setupCharacterCounter() {
    const commentTextarea = document.getElementById('comment');
    const counter = document.getElementById('commentCounter');
    
    commentTextarea.addEventListener('input', function() {
        const length = this.value.length;
        counter.textContent = length;
        
        if (length > 450) {
            counter.style.color = '#dc2626';
        } else if (length > 400) {
            counter.style.color = '#f59e0b';
        } else {
            counter.style.color = 'var(--tg-theme-hint-color, #666666)';
        }
    });
}

// Validate field
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    const errorElement = document.getElementById(fieldName + 'Error');
    
    let isValid = true;
    let errorMessage = '';
    
    switch (fieldName) {
        case 'name':
            if (!value) {
                errorMessage = 'Введите ваше имя';
                isValid = false;
            } else if (value.length < 2) {
                errorMessage = 'Имя должно содержать минимум 2 символа';
                isValid = false;
            } else if (value.length > 50) {
                errorMessage = 'Имя не может содержать более 50 символов';
                isValid = false;
            } else if (!/^[а-яё\s\-']+$/i.test(value)) {
                errorMessage = 'Имя может содержать только буквы, пробелы, дефисы и апострофы';
                isValid = false;
            }
            break;
            
        case 'phone':
            if (!value) {
                errorMessage = 'Введите номер телефона';
                isValid = false;
            } else if (!/^\+998\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/.test(value.replace(/\s/g, ''))) {
                errorMessage = 'Введите корректный номер телефона (+998 xx xxx xx xx)';
                isValid = false;
            }
            break;
            
        case 'email':
            if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                errorMessage = 'Введите корректный email адрес';
                isValid = false;
            }
            break;
    }
    
    if (errorElement) {
        errorElement.textContent = errorMessage;
        errorElement.style.display = errorMessage ? 'block' : 'none';
    }
    
    field.classList.toggle('error', !isValid);
    
    return isValid;
}

// Clear field error
function clearFieldError(field) {
    const errorElement = document.getElementById(field.name + 'Error');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
    field.classList.remove('error');
}

// Validate entire form
function validateForm() {
    const form = document.getElementById('leadForm');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Submit form
function submitForm(event) {
    event.preventDefault();
    
    if (!validateForm()) {
        if (window.UnlockApp) {
            window.UnlockApp.showAlert('Пожалуйста, исправьте ошибки в форме');
        }
        return;
    }
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    
    // Add timestamp
    data.timestamp = new Date().toISOString();
    
    // Add user info if available
    if (window.UnlockApp && window.UnlockApp.tg.initDataUnsafe?.user) {
        data.userId = window.UnlockApp.tg.initDataUnsafe.user.id;
        data.userName = window.UnlockApp.tg.initDataUnsafe.user.first_name;
    }
    
    // Show loading state
    showLoadingState();
    
    // Submit data
    if (window.UnlockApp) {
        window.UnlockApp.submitForm(data);
    }
    
    // Simulate API call (replace with actual implementation)
    setTimeout(() => {
        hideLoadingState();
        showSuccessMessage();
        
        // Track form submission
        if (window.UnlockApp) {
            window.UnlockApp.trackEvent('form_submitted', {
                level: data.level,
                format: data.format,
                hasPromoCode: !!data.promoCode
            });
        }
    }, 2000);
}

// Show loading state
function showLoadingState() {
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    
    if (window.UnlockApp) {
        window.UnlockApp.tg.MainButton.hide();
    }
}

// Hide loading state
function hideLoadingState() {
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    submitBtn.disabled = false;
    btnText.style.display = 'inline';
    btnLoading.style.display = 'none';
}

// Show success message
function showSuccessMessage() {
    const form = document.getElementById('leadForm');
    const successMessage = document.getElementById('successMessage');
    
    form.style.display = 'none';
    successMessage.style.display = 'block';
    
    // Haptic feedback
    if (window.UnlockApp) {
        window.UnlockApp.hapticFeedback('success');
    }
}

// Reset form
function resetForm() {
    const form = document.getElementById('leadForm');
    const successMessage = document.getElementById('successMessage');
    const calculatorData = document.getElementById('calculatorData');
    
    form.reset();
    form.style.display = 'block';
    successMessage.style.display = 'none';
    calculatorData.style.display = 'none';
    
    // Clear all errors
    const errorElements = form.querySelectorAll('.form-error');
    errorElements.forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
    });
    
    // Remove error classes
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.classList.remove('error');
    });
    
    // Reset character counter
    document.getElementById('commentCounter').textContent = '0';
    document.getElementById('commentCounter').style.color = 'var(--tg-theme-hint-color, #666666)';
    
    if (window.UnlockApp) {
        window.UnlockApp.tg.MainButton.show();
    }
    
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

// Go home
function goHome() {
    window.location.href = 'index.html';
}

// Add CSS for form-specific styles
const formStyles = `
<style>
.form-section {
    padding: 20px;
    min-height: 100vh;
}

.form-content {
    max-width: 600px;
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

.calculator-data {
    background: var(--tg-theme-secondary-bg-color, #f8f9fa);
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 24px;
    border: 1px solid var(--tg-theme-hint-color, #e5e5e5);
}

.data-header h3 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 16px;
    color: var(--tg-theme-text-color, #000000);
}

.data-content {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.data-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.data-label {
    color: var(--tg-theme-hint-color, #666666);
    font-size: 14px;
}

.data-value {
    font-weight: 600;
    color: var(--tg-theme-text-color, #000000);
    font-size: 14px;
}

.lead-form {
    background: var(--tg-theme-bg-color, #ffffff);
    border-radius: 16px;
    padding: 24px;
    border: 1px solid var(--tg-theme-hint-color, #e5e5e5);
}

.form-group {
    margin-bottom: 20px;
}

.form-group:last-child {
    margin-bottom: 0;
}

.form-label {
    display: block;
    font-weight: 600;
    margin-bottom: 8px;
    color: var(--tg-theme-text-color, #000000);
}

.form-input,
.form-select,
.form-textarea {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid var(--tg-theme-hint-color, #e5e5e5);
    border-radius: 12px;
    background: var(--tg-theme-bg-color, #ffffff);
    color: var(--tg-theme-text-color, #000000);
    font-size: 16px;
    transition: border-color 0.3s ease;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
    outline: none;
    border-color: var(--tg-theme-button-color, #2481cc);
}

.form-input.error,
.form-select.error,
.form-textarea.error {
    border-color: #dc2626;
}

.form-textarea {
    resize: vertical;
    min-height: 100px;
}

.form-counter {
    text-align: right;
    font-size: 12px;
    color: var(--tg-theme-hint-color, #666666);
    margin-top: 4px;
}

.form-error {
    color: #dc2626;
    font-size: 12px;
    margin-top: 4px;
    display: none;
}

.form-actions {
    margin-top: 32px;
}

.submit-btn {
    width: 100%;
    position: relative;
}

.btn-loading {
    display: none;
}

.success-message {
    text-align: center;
    padding: 40px 20px;
    background: var(--tg-theme-bg-color, #ffffff);
    border-radius: 16px;
    border: 1px solid var(--tg-theme-hint-color, #e5e5e5);
}

.success-icon {
    font-size: 64px;
    margin-bottom: 20px;
}

.success-message h3 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 12px;
    color: var(--tg-theme-text-color, #000000);
}

.success-message p {
    color: var(--tg-theme-hint-color, #666666);
    margin-bottom: 24px;
    line-height: 1.6;
}

.success-actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
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
    .success-actions {
        flex-direction: row;
        justify-content: center;
    }
    
    .success-actions .btn-primary,
    .success-actions .btn-secondary {
        min-width: 200px;
    }
}
</style>
`;

// Add styles to head
document.head.insertAdjacentHTML('beforeend', formStyles);
