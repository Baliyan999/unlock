// Test functionality for UNLOCK Mini App

// Test questions data
const testQuestions = {
    hsk1: [
        {
            question: "Как сказать 'привет' на китайском?",
            options: ["你好", "再见", "谢谢", "不客气"],
            correct: 0,
            explanation: "'你好' (nǐ hǎo) означает 'привет' на китайском языке."
        },
        {
            question: "Что означает '谢谢'?",
            options: ["Извините", "Спасибо", "Пожалуйста", "До свидания"],
            correct: 1,
            explanation: "'谢谢' (xiè xiè) означает 'спасибо'."
        },
        {
            question: "Как сказать 'да' на китайском?",
            options: ["不", "是", "好", "对"],
            correct: 1,
            explanation: "'是' (shì) означает 'да' или 'быть'."
        },
        {
            question: "Что означает '再见'?",
            options: ["Привет", "Спасибо", "До свидания", "Извините"],
            correct: 2,
            explanation: "'再见' (zài jiàn) означает 'до свидания'."
        },
        {
            question: "Как сказать 'нет' на китайском?",
            options: ["是", "不", "好", "对"],
            correct: 1,
            explanation: "'不' (bù) означает 'нет'."
        }
    ],
    hsk2: [
        {
            question: "Как сказать 'я студент'?",
            options: ["我是学生", "我是老师", "我是医生", "我是工人"],
            correct: 0,
            explanation: "'我是学生' (wǒ shì xué shēng) означает 'я студент'."
        },
        {
            question: "Что означает '今天'?",
            options: ["Вчера", "Сегодня", "Завтра", "Неделя"],
            correct: 1,
            explanation: "'今天' (jīn tiān) означает 'сегодня'."
        },
        {
            question: "Как сказать 'сколько времени'?",
            options: ["几点", "多少", "什么", "哪里"],
            correct: 0,
            explanation: "'几点' (jǐ diǎn) означает 'сколько времени'."
        },
        {
            question: "Что означает '吃饭'?",
            options: ["Спать", "Есть", "Пить", "Работать"],
            correct: 1,
            explanation: "'吃饭' (chī fàn) означает 'есть' или 'принимать пищу'."
        },
        {
            question: "Как сказать 'я люблю'?",
            options: ["我喜欢", "我讨厌", "我害怕", "我生气"],
            correct: 0,
            explanation: "'我喜欢' (wǒ xǐ huān) означает 'я люблю' или 'мне нравится'."
        }
    ],
    hsk3: [
        {
            question: "Как сказать 'я изучаю китайский язык'?",
            options: ["我学中文", "我说中文", "我教中文", "我写中文"],
            correct: 0,
            explanation: "'我学中文' (wǒ xué zhōng wén) означает 'я изучаю китайский язык'."
        },
        {
            question: "Что означает '因为'?",
            options: ["Поэтому", "Потому что", "Хотя", "Если"],
            correct: 1,
            explanation: "'因为' (yīn wèi) означает 'потому что'."
        },
        {
            question: "Как сказать 'я думаю'?",
            options: ["我知道", "我认为", "我明白", "我同意"],
            correct: 1,
            explanation: "'我认为' (wǒ rèn wéi) означает 'я думаю' или 'я считаю'."
        },
        {
            question: "Что означает '虽然'?",
            options: ["Поэтому", "Потому что", "Хотя", "Если"],
            correct: 2,
            explanation: "'虽然' (suī rán) означает 'хотя' или 'несмотря на то что'."
        },
        {
            question: "Как сказать 'я понимаю'?",
            options: ["我知道", "我认为", "我明白", "我同意"],
            correct: 2,
            explanation: "'我明白' (wǒ míng bái) означает 'я понимаю'."
        }
    ]
};

// Test state
let testState = {
    currentLevel: '',
    currentQuestion: 0,
    answers: [],
    startTime: null,
    endTime: null,
    timer: null
};

// Initialize test
document.addEventListener('DOMContentLoaded', function() {
    console.log('Test initialized');
    
    // Set up Telegram Web App
    if (window.UnlockApp) {
        window.UnlockApp.tg.MainButton.setText('Начать тест');
        window.UnlockApp.tg.MainButton.hide();
        window.UnlockApp.tg.BackButton.show();
    }
    
    // Track test page view
    if (window.UnlockApp) {
        window.UnlockApp.trackEvent('test_page_view');
    }
});

// Start test
function startTest(level) {
    testState = {
        currentLevel: level,
        currentQuestion: 0,
        answers: [],
        startTime: Date.now(),
        endTime: null,
        timer: null
    };
    
    // Hide level selection and show test interface
    document.getElementById('levelSelection').style.display = 'none';
    document.getElementById('testInterface').style.display = 'block';
    
    // Load first question
    loadQuestion();
    
    // Start timer
    startTimer();
    
    // Update Telegram Web App
    if (window.UnlockApp) {
        window.UnlockApp.tg.MainButton.setText('Следующий вопрос');
        window.UnlockApp.tg.MainButton.show();
        window.UnlockApp.tg.MainButton.onClick(function() {
            nextQuestion();
        });
    }
    
    // Haptic feedback
    if (window.UnlockApp) {
        window.UnlockApp.hapticFeedback('success');
    }
    
    // Track test start
    if (window.UnlockApp) {
        window.UnlockApp.trackEvent('test_started', { level: level });
    }
}

// Load question
function loadQuestion() {
    const questions = testQuestions[testState.currentLevel];
    const question = questions[testState.currentQuestion];
    
    // Update progress
    const progressFill = document.getElementById('progressFill');
    const progress = ((testState.currentQuestion + 1) / questions.length) * 100;
    progressFill.style.width = progress + '%';
    
    document.getElementById('currentQuestion').textContent = testState.currentQuestion + 1;
    document.getElementById('totalQuestions').textContent = questions.length;
    
    // Update question text
    document.getElementById('questionText').textContent = question.question;
    
    // Update options
    const optionsContainer = document.getElementById('questionOptions');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('button');
        optionElement.className = 'question-option';
        optionElement.textContent = option;
        optionElement.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(optionElement);
    });
    
    // Update navigation buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    prevBtn.disabled = testState.currentQuestion === 0;
    
    if (testState.currentQuestion === questions.length - 1) {
        nextBtn.textContent = 'Завершить тест';
    } else {
        nextBtn.textContent = 'Далее →';
    }
    
    // Check if answer already exists
    if (testState.answers[testState.currentQuestion] !== undefined) {
        const selectedIndex = testState.answers[testState.currentQuestion];
        const options = optionsContainer.querySelectorAll('.question-option');
        options[selectedIndex].classList.add('selected');
    }
}

// Select answer
function selectAnswer(index) {
    // Remove previous selection
    document.querySelectorAll('.question-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selection to clicked option
    document.querySelectorAll('.question-option')[index].classList.add('selected');
    
    // Store answer
    testState.answers[testState.currentQuestion] = index;
    
    // Haptic feedback
    if (window.UnlockApp) {
        window.UnlockApp.hapticFeedback('light');
    }
}

// Next question
function nextQuestion() {
    const questions = testQuestions[testState.currentLevel];
    
    if (testState.currentQuestion === questions.length - 1) {
        // Finish test
        finishTest();
    } else {
        // Go to next question
        testState.currentQuestion++;
        loadQuestion();
    }
}

// Previous question
function previousQuestion() {
    if (testState.currentQuestion > 0) {
        testState.currentQuestion--;
        loadQuestion();
    }
}

// Start timer
function startTimer() {
    const timerElement = document.getElementById('timer');
    let timeLeft = 600; // 10 minutes in seconds
    
    testState.timer = setInterval(() => {
        timeLeft--;
        
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft <= 0) {
            finishTest();
        }
    }, 1000);
}

// Finish test
function finishTest() {
    testState.endTime = Date.now();
    
    // Clear timer
    if (testState.timer) {
        clearInterval(testState.timer);
    }
    
    // Calculate results
    const results = calculateResults();
    
    // Show results
    showResults(results);
    
    // Hide test interface
    document.getElementById('testInterface').style.display = 'none';
    
    // Update Telegram Web App
    if (window.UnlockApp) {
        window.UnlockApp.tg.MainButton.setText('Записаться на курс');
        window.UnlockApp.tg.MainButton.onClick(function() {
            openFormWithResult();
        });
    }
    
    // Track test completion
    if (window.UnlockApp) {
        window.UnlockApp.trackEvent('test_completed', {
            level: testState.currentLevel,
            score: results.percentage,
            time: results.timeSpent
        });
    }
}

// Calculate results
function calculateResults() {
    const questions = testQuestions[testState.currentLevel];
    let correctAnswers = 0;
    
    testState.answers.forEach((answer, index) => {
        if (answer === questions[index].correct) {
            correctAnswers++;
        }
    });
    
    const percentage = Math.round((correctAnswers / questions.length) * 100);
    const timeSpent = Math.round((testState.endTime - testState.startTime) / 1000);
    
    return {
        correct: correctAnswers,
        total: questions.length,
        percentage: percentage,
        timeSpent: timeSpent,
        level: testState.currentLevel
    };
}

// Show results
function showResults(results) {
    document.getElementById('testResults').style.display = 'block';
    
    // Update score display
    document.getElementById('scorePercentage').textContent = results.percentage + '%';
    document.getElementById('correctAnswers').textContent = results.correct;
    document.getElementById('totalAnswers').textContent = results.total;
    
    // Format time
    const minutes = Math.floor(results.timeSpent / 60);
    const seconds = results.timeSpent % 60;
    document.getElementById('testTime').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    // Update score title and description
    const scoreTitle = document.getElementById('scoreTitle');
    const scoreDescription = document.getElementById('scoreDescription');
    
    if (results.percentage >= 80) {
        scoreTitle.textContent = 'Отлично!';
        scoreDescription.textContent = `Вы успешно прошли ${testState.currentLevel.toUpperCase()}! Рекомендуем перейти к следующему уровню.`;
    } else if (results.percentage >= 60) {
        scoreTitle.textContent = 'Хорошо!';
        scoreDescription.textContent = `Неплохой результат! Рекомендуем повторить ${testState.currentLevel.toUpperCase()} или записаться на курс.`;
    } else {
        scoreTitle.textContent = 'Попробуйте еще раз';
        scoreDescription.textContent = `Рекомендуем изучить основы ${testState.currentLevel.toUpperCase()} и повторить тест.`;
    }
    
    // Haptic feedback
    if (window.UnlockApp) {
        if (results.percentage >= 80) {
            window.UnlockApp.hapticFeedback('success');
        } else {
            window.UnlockApp.hapticFeedback('warning');
        }
    }
}

// Open form with test result
function openFormWithResult() {
    const results = calculateResults();
    
    // Store test result for form
    sessionStorage.setItem('testResult', JSON.stringify({
        level: testState.currentLevel,
        score: results.percentage,
        correctAnswers: results.correct,
        totalQuestions: results.total
    }));
    
    // Navigate to form
    window.location.href = 'form.html';
}

// Restart test
function restartTest() {
    // Reset state
    testState = {
        currentLevel: '',
        currentQuestion: 0,
        answers: [],
        startTime: null,
        endTime: null,
        timer: null
    };
    
    // Show level selection
    document.getElementById('levelSelection').style.display = 'block';
    document.getElementById('testInterface').style.display = 'none';
    document.getElementById('testResults').style.display = 'none';
    
    // Update Telegram Web App
    if (window.UnlockApp) {
        window.UnlockApp.tg.MainButton.setText('Начать тест');
        window.UnlockApp.tg.MainButton.hide();
    }
    
    // Haptic feedback
    if (window.UnlockApp) {
        window.UnlockApp.hapticFeedback('light');
    }
}

// Reset test
function resetTest() {
    restartTest();
}

// Go back
function goBack() {
    if (window.UnlockApp) {
        window.UnlockApp.tg.BackButton.onClick();
    } else {
        window.history.back();
    }
}

// Add CSS for test-specific styles
const testStyles = `
<style>
.test-section {
    padding: 20px;
    min-height: 100vh;
}

.test-content {
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

.test-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin-bottom: 32px;
}

.info-card {
    display: flex;
    align-items: center;
    gap: 12px;
    background: var(--tg-theme-secondary-bg-color, #f8f9fa);
    padding: 16px;
    border-radius: 12px;
    border: 1px solid var(--tg-theme-hint-color, #e5e5e5);
}

.info-icon {
    font-size: 24px;
    flex-shrink: 0;
}

.info-text h4 {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 4px;
    color: var(--tg-theme-text-color, #000000);
}

.info-text p {
    font-size: 12px;
    color: var(--tg-theme-hint-color, #666666);
}

.level-selection h3 {
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 8px;
    color: var(--tg-theme-text-color, #000000);
}

.level-selection p {
    text-align: center;
    color: var(--tg-theme-hint-color, #666666);
    margin-bottom: 24px;
}

.levels-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 16px;
}

.level-card {
    background: var(--tg-theme-bg-color, #ffffff);
    border: 2px solid var(--tg-theme-hint-color, #e5e5e5);
    border-radius: 16px;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
}

.level-card:hover {
    border-color: var(--tg-theme-button-color, #2481cc);
    transform: translateY(-2px);
}

.level-number {
    width: 40px;
    height: 40px;
    background: var(--tg-theme-button-color, #2481cc);
    color: var(--tg-theme-button-text-color, #ffffff);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 700;
    margin: 0 auto 12px;
}

.level-card h4 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 8px;
    color: var(--tg-theme-text-color, #000000);
}

.level-card p {
    font-size: 12px;
    color: var(--tg-theme-hint-color, #666666);
    margin-bottom: 12px;
}

.level-status {
    font-size: 10px;
    font-weight: 600;
    padding: 4px 8px;
    border-radius: 12px;
    text-transform: uppercase;
}

.level-status.available {
    background: #dcfce7;
    color: #166534;
}

.level-status.locked {
    background: #fef2f2;
    color: #dc2626;
}

.test-interface {
    background: var(--tg-theme-bg-color, #ffffff);
    border-radius: 16px;
    padding: 24px;
    border: 1px solid var(--tg-theme-hint-color, #e5e5e5);
}

.test-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    flex-wrap: wrap;
    gap: 16px;
}

.test-progress {
    flex: 1;
    min-width: 200px;
}

.progress-bar {
    width: 100%;
    height: 8px;
    background: var(--tg-theme-hint-color, #e5e5e5);
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 8px;
}

.progress-fill {
    height: 100%;
    background: var(--tg-theme-button-color, #2481cc);
    border-radius: 4px;
    transition: width 0.3s ease;
}

.progress-text {
    font-size: 12px;
    color: var(--tg-theme-hint-color, #666666);
    text-align: center;
}

.test-timer {
    background: var(--tg-theme-secondary-bg-color, #f8f9fa);
    padding: 8px 16px;
    border-radius: 20px;
    font-weight: 600;
    color: var(--tg-theme-text-color, #000000);
}

.question-container {
    margin-bottom: 24px;
}

.question-header {
    margin-bottom: 20px;
}

.question-header h3 {
    font-size: 18px;
    font-weight: 600;
    color: var(--tg-theme-text-color, #000000);
    line-height: 1.5;
}

.question-options {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.question-option {
    background: var(--tg-theme-secondary-bg-color, #f8f9fa);
    border: 2px solid var(--tg-theme-hint-color, #e5e5e5);
    border-radius: 12px;
    padding: 16px;
    text-align: left;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 16px;
    color: var(--tg-theme-text-color, #000000);
}

.question-option:hover {
    border-color: var(--tg-theme-button-color, #2481cc);
    background: var(--tg-theme-bg-color, #ffffff);
}

.question-option.selected {
    border-color: var(--tg-theme-button-color, #2481cc);
    background: rgba(36, 129, 204, 0.1);
}

.test-actions {
    display: flex;
    justify-content: space-between;
    gap: 16px;
}

.test-actions button {
    flex: 1;
}

.test-results {
    background: var(--tg-theme-bg-color, #ffffff);
    border-radius: 16px;
    padding: 32px 24px;
    border: 1px solid var(--tg-theme-hint-color, #e5e5e5);
    text-align: center;
}

.results-header {
    margin-bottom: 24px;
}

.results-icon {
    font-size: 64px;
    margin-bottom: 16px;
}

.results-header h2 {
    font-size: 24px;
    font-weight: 700;
    color: var(--tg-theme-text-color, #000000);
}

.results-content {
    margin-bottom: 32px;
}

.score-display {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
    margin-bottom: 24px;
    flex-wrap: wrap;
}

.score-circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: var(--tg-theme-button-color, #2481cc);
    color: var(--tg-theme-button-text-color, #ffffff);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: 700;
}

.score-info h3 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 8px;
    color: var(--tg-theme-text-color, #000000);
}

.score-info p {
    color: var(--tg-theme-hint-color, #666666);
    line-height: 1.5;
}

.results-details {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 400px;
    margin: 0 auto;
}

.detail-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid var(--tg-theme-hint-color, #e5e5e5);
}

.detail-item:last-child {
    border-bottom: none;
}

.detail-label {
    color: var(--tg-theme-hint-color, #666666);
    font-size: 14px;
}

.detail-value {
    font-weight: 600;
    color: var(--tg-theme-text-color, #000000);
}

.results-actions {
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
    .test-actions {
        justify-content: center;
    }
    
    .test-actions button {
        max-width: 200px;
    }
    
    .results-actions {
        flex-direction: row;
        justify-content: center;
    }
    
    .results-actions .btn-primary,
    .results-actions .btn-secondary {
        min-width: 200px;
    }
}
</style>
`;

// Add styles to head
document.head.insertAdjacentHTML('beforeend', testStyles);
