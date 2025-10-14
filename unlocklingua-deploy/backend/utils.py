from datetime import datetime, timezone, timedelta

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

