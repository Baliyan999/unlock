from datetime import datetime, timezone, timedelta
import hmac, hashlib, urllib.parse

# Часовой пояс Ташкента (UTC+5)
TASHKENT_TZ = timezone(timedelta(hours=5))

def get_tashkent_now():
    """Возвращает текущее время в часовом поясе Ташкента"""
    return datetime.now(TASHKENT_TZ)

def utc_to_tashkent(utc_datetime):
    """Конвертирует UTC время в время Ташкента"""
    if utc_datetime.tzinfo is None:
        # Если время без часового пояса, считаем его UTC
        utc_datetime = utc_datetime.replace(tzinfo=timezone.utc)
    return utc_datetime.astimezone(TASHKENT_TZ)

def tashkent_to_utc(tashkent_datetime):
    """Конвертирует время Ташкента в UTC"""
    if tashkent_datetime.tzinfo is None:
        # Если время без часового пояса, считаем его временем Ташкента
        tashkent_datetime = tashkent_datetime.replace(tzinfo=TASHKENT_TZ)
    return tashkent_datetime.astimezone(timezone.utc)

def validate_telegram_init_data(init_data: str, bot_token: str) -> dict | None:
    if not init_data or not bot_token:
        return None
    parsed = urllib.parse.parse_qs(init_data, keep_blank_values=True)
    data = {k: v[0] for k, v in parsed.items()}
    recv = data.pop('hash', None)
    if not recv:
        return None
    check_string = "\n".join(f"{k}={data[k]}" for k in sorted(data)).encode('utf-8')
    secret = hashlib.sha256(bot_token.encode('utf-8')).digest()
    calc = hmac.new(secret, check_string, hashlib.sha256).hexdigest()
    if not hmac.compare_digest(calc, recv):
        return None
    return data
