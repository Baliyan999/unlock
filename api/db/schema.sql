-- Создание таблицы для отзывов
CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id BIGINT NOT NULL,
    username VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    language_code VARCHAR(10),
    is_bot BOOLEAN DEFAULT FALSE,
    is_premium BOOLEAN DEFAULT FALSE,
    phone_number VARCHAR(50),
    country_code VARCHAR(10),
    city VARCHAR(255),
    timezone VARCHAR(50),
    text TEXT NOT NULL,
    rating DECIMAL(2,1) NOT NULL CHECK (rating >= 1 AND rating <= 5),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    approved_at DATETIME,
    admin_id BIGINT,
    admin_username VARCHAR(255),
    user_agent TEXT,
    ip_address VARCHAR(45),
    referrer VARCHAR(500),
    is_student BOOLEAN DEFAULT FALSE
);

-- Индексы для оптимизации запросов
CREATE INDEX IF NOT EXISTS idx_reviews_status ON reviews(status);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);

-- Создание таблицы для настроек бота
CREATE TABLE IF NOT EXISTS bot_settings (
    key VARCHAR(50) PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы для промокодов
CREATE TABLE IF NOT EXISTS promo_codes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code VARCHAR(50) UNIQUE NOT NULL,
    discount_percent INTEGER NOT NULL CHECK (discount_percent > 0 AND discount_percent <= 100),
    max_uses INTEGER DEFAULT 1 CHECK (max_uses > 0),
    used_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT NOT NULL,
    created_by_username VARCHAR(255),
    expires_at DATETIME,
    description TEXT,
    deleted_at DATETIME
);

-- Создание таблицы для использования промокодов
CREATE TABLE IF NOT EXISTS promo_usage (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    promo_code_id INTEGER NOT NULL,
    user_id BIGINT NOT NULL,
    user_username VARCHAR(255),
    used_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    original_price INTEGER NOT NULL,
    discount_amount INTEGER NOT NULL,
    final_price INTEGER NOT NULL,
    FOREIGN KEY (promo_code_id) REFERENCES promo_codes(id) ON DELETE CASCADE
);

-- Индексы для промокодов
CREATE INDEX IF NOT EXISTS idx_promo_codes_code ON promo_codes(code);
CREATE INDEX IF NOT EXISTS idx_promo_codes_active ON promo_codes(is_active);
CREATE INDEX IF NOT EXISTS idx_promo_usage_user ON promo_usage(user_id);
CREATE INDEX IF NOT EXISTS idx_promo_usage_promo ON promo_usage(promo_code_id);

-- Вставка настроек по умолчанию
INSERT OR IGNORE INTO bot_settings (key, value) VALUES 
('admin_chat_id', ''),
('welcome_message', 'Добро пожаловать! Выберите действие:'),
('review_instructions', 'Пожалуйста, оставьте ваш отзыв о курсах китайского языка UNLOCK.'),
('review_thanks', 'Спасибо за отзыв! Он будет рассмотрен администрацией.');
