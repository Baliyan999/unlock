import { getTashkentDateString } from '@/utils/dateUtils'

export interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  cover: string;
  slug: string;
  content: string;
  published?: boolean; // Добавляем поле для управления публикацией
  views?: number; // Количество просмотров
  likes?: number; // Количество лайков
  likedBy?: string[]; // ID пользователей, которые лайкнули
}

export const blogPosts: Record<string, BlogPost[]> = {
  ru: [
    {
      title: "Как начать изучение китайского языка: пошаговое руководство",
      date: "2024-01-15",
      excerpt: "Полное руководство для начинающих: с чего начать изучение китайского языка, какие материалы использовать и как не потерять мотивацию.",
      cover: "/images/blog/getting-started.jpg",
      slug: "getting-started",
      published: true,
      content: `# Как начать изучение китайского языка

Изучение китайского языка может показаться сложным, но с правильным подходом вы сможете достичь отличных результатов. В этой статье мы расскажем о первых шагах в изучении китайского языка.

## Основы произношения

Первое, с чем сталкиваются изучающие китайский язык — это тоны. В китайском языке 4 основных тона:

1. **Первый тон** — высокий и ровный
2. **Второй тон** — восходящий
3. **Третий тон** — нисходяще-восходящий
4. **Четвертый тон** — нисходящий

## Изучение иероглифов

Начните с изучения базовых иероглифов. Рекомендуем начать с 100-200 самых частотных иероглифов.

### Полезные ресурсы:
- Pleco — лучший словарь
- Anki — для заучивания карточек
- HelloChinese — интерактивное приложение

## Практика разговорной речи

Не бойтесь говорить с самого начала. Найдите языкового партнера или запишитесь на курсы.

## Заключение

Изучение китайского языка — это долгий, но увлекательный путь. Главное — регулярность и правильная мотивация.`
    },
    {
      title: "Подготовка к экзамену HSK: советы и стратегии",
      date: "2024-01-10",
      excerpt: "Все, что нужно знать для успешной сдачи экзамена HSK: структура экзамена, план подготовки и полезные советы.",
      cover: "/images/blog/hsk-preparation.jpg",
      slug: "hsk-preparation",
      published: true,
      content: `# Подготовка к экзамену HSK

Экзамен HSK (Hanyu Shuiping Kaoshi) — это стандартизированный тест на знание китайского языка.

## Структура экзамена

HSK состоит из 6 уровней, каждый из которых проверяет разные аспекты владения языком.

## План подготовки

1. Определите свой текущий уровень
2. Изучите структуру экзамена
3. Составьте план подготовки
4. Регулярно практикуйтесь

## Полезные советы

- Регулярно занимайтесь
- Используйте официальные материалы
- Практикуйтесь с таймером
- Изучайте типичные ошибки`
    }
  ],
  en: [
    {
      title: "How to Start Learning Chinese: A Step-by-Step Guide",
      date: "2024-01-15",
      excerpt: "Complete guide for beginners: where to start learning Chinese, what materials to use and how to stay motivated.",
      cover: "/images/blog/getting-started.jpg",
      slug: "getting-started",
      published: true,
      content: `# How to Start Learning Chinese

Learning Chinese may seem difficult, but with the right approach you can achieve excellent results.

## Pronunciation Basics

The first thing Chinese learners encounter is tones. Chinese has 4 main tones:

1. **First tone** — high and level
2. **Second tone** — rising
3. **Third tone** — falling-rising
4. **Fourth tone** — falling

## Learning Characters

Start with basic characters. We recommend starting with 100-200 most frequent characters.

### Useful Resources:
- Pleco — best dictionary
- Anki — for flashcards
- HelloChinese — interactive app

## Speaking Practice

Don't be afraid to speak from the beginning. Find a language partner or enroll in courses.

## Conclusion

Learning Chinese is a long but exciting journey. The main thing is regularity and proper motivation.`
    },
    {
      title: "HSK Exam Preparation: Tips and Strategies",
      date: "2024-01-10",
      excerpt: "Everything you need to know for successful HSK exam: exam structure, preparation plan and useful tips.",
      cover: "/images/blog/hsk-preparation.jpg",
      slug: "hsk-preparation",
      published: true,
      content: `# HSK Exam Preparation

HSK (Hanyu Shuiping Kaoshi) is a standardized test of Chinese language proficiency.

## Exam Structure

HSK consists of 6 levels, each testing different aspects of language proficiency.

## Preparation Plan

1. Determine your current level
2. Study the exam structure
3. Create a preparation plan
4. Practice regularly

## Useful Tips

- Study regularly
- Use official materials
- Practice with a timer
- Study common mistakes`
    }
  ],
  ko: [
    {
      title: "중국어 학습 시작하기: 단계별 가이드",
      date: "2024-01-15",
      excerpt: "초보자를 위한 완전한 가이드: 중국어 학습을 어디서 시작할지, 어떤 자료를 사용할지, 어떻게 동기를 유지할지.",
      cover: "/images/blog/getting-started.jpg",
      slug: "getting-started",
      published: true,
      content: `# 중국어 학습 시작하기

중국어 학습은 어려워 보일 수 있지만, 올바른 접근 방식으로 훌륭한 결과를 얻을 수 있습니다.

## 발음 기초

중국어 학습자가 처음 마주하는 것은 성조입니다. 중국어에는 4가지 주요 성조가 있습니다:

1. **1성** — 높고 평평한
2. **2성** — 상승하는
3. **3성** — 하강-상승하는
4. **4성** — 하강하는

## 한자 학습

기본 한자부터 시작하세요. 가장 빈번한 100-200개 한자부터 시작하는 것을 권장합니다.

### 유용한 자료:
- Pleco — 최고의 사전
- Anki — 플래시카드용
- HelloChinese — 인터랙티브 앱

## 말하기 연습

처음부터 말하는 것을 두려워하지 마세요. 언어 파트너를 찾거나 과정에 등록하세요.

## 결론

중국어 학습은 길지만 흥미로운 여정입니다. 중요한 것은 규칙성과 적절한 동기입니다.`
    },
    {
      title: "HSK 시험 준비: 팁과 전략",
      date: "2024-01-10",
      excerpt: "HSK 시험 성공을 위해 알아야 할 모든 것: 시험 구조, 준비 계획 및 유용한 팁.",
      cover: "/images/blog/hsk-preparation.jpg",
      slug: "hsk-preparation",
      published: true,
      content: `# HSK 시험 준비

HSK(Hanyu Shuiping Kaoshi)는 중국어 능력 표준화 시험입니다.

## 시험 구조

HSK는 6개 레벨로 구성되어 있으며, 각각 언어 능력의 다른 측면을 테스트합니다.

## 준비 계획

1. 현재 레벨 결정
2. 시험 구조 연구
3. 준비 계획 수립
4. 정기적 연습

## 유용한 팁

- 정기적으로 학습
- 공식 자료 사용
- 타이머로 연습
- 일반적인 실수 연구`
    }
  ],
  uz: [
    {
      title: "Xitoy tilini o'rganishni qanday boshlash kerak: bosqichma-bosqich qo'llanma",
      date: "2024-01-15",
      excerpt: "Boshlang'ichlar uchun to'liq qo'llanma: xitoy tilini o'rganishni qayerdan boshlash, qanday materiallardan foydalanish va motivatsiyani qanday saqlash kerak.",
      cover: "/images/blog/getting-started.jpg",
      slug: "getting-started",
      published: true,
      content: `# Xitoy tilini o'rganishni qanday boshlash kerak

Xitoy tilini o'rganish qiyin ko'rinishi mumkin, lekin to'g'ri yondashuv bilan ajoyib natijalarga erishishingiz mumkin.

## Talaffuz asoslari

Xitoy tilini o'rganuvchilar birinchi marta tonlar bilan duch kelishadi. Xitoy tilida 4 ta asosiy ton mavjud:

1. **Birinchi ton** — baland va tekis
2. **Ikkinchi ton** — ko'tariluvchi
3. **Uchinchi ton** — tushuvchi-ko'tariluvchi
4. **To'rtinchi ton** — tushuvchi

## Xitoy yozuvlarini o'rganish

Asosiy xitoy yozuvlaridan boshlang. Eng tez-tez ishlatiladigan 100-200 ta yozuvdan boshlashni tavsiya qilamiz.

### Foydali resurslar:
- Pleco — eng yaxshi lug'at
- Anki — kartochkalar uchun
- HelloChinese — interaktiv ilova

## Gapirish mashqlari

Boshidan gapirishdan qo'rqmang. Til sherigini toping yoki kurslarga yoziling.

## Xulosa

Xitoy tilini o'rganish uzoq, lekin qiziqarli yo'l. Asosiy narsa — muntazamlik va to'g'ri motivatsiya.`
    },
    {
      title: "HSK imtihoniga tayyorlanish: maslahatlar va strategiyalar",
      date: "2024-01-10",
      excerpt: "HSK imtihonida muvaffaqiyatli bo'lish uchun bilish kerak bo'lgan hamma narsa: imtihon tuzilishi, tayyorlanish rejasi va foydali maslahatlar.",
      cover: "/images/blog/hsk-preparation.jpg",
      slug: "hsk-preparation",
      published: true,
      content: `# HSK imtihoniga tayyorlanish

HSK (Hanyu Shuiping Kaoshi) - xitoy tili bilimini standartlashtirilgan testi.

## Imtihon tuzilishi

HSK 6 ta darajadan iborat bo'lib, har biri til bilimining turli jihatlarini tekshiradi.

## Tayyorlanish rejasi

1. Joriy darajangizni aniqlang
2. Imtihon tuzilishini o'rganing
3. Tayyorlanish rejasini tuzing
4. Muntazam mashq qiling

## Foydali maslahatlar

- Muntazam o'qing
- Rasmiy materiallardan foydalaning
- Taymer bilan mashq qiling
- Keng tarqalgan xatolarni o'rganing`
    }
  ],
  zh: [
    {
      title: "如何开始学习中文：分步指南",
      date: "2024-01-15",
      excerpt: "初学者完整指南：从哪里开始学习中文，使用什么材料以及如何保持动力。",
      cover: "/images/blog/getting-started.jpg",
      slug: "getting-started",
      published: true,
      content: `# 如何开始学习中文

学习中文可能看起来很困难，但通过正确的方法，您可以取得优异的成绩。

## 发音基础

中文学习者首先遇到的是声调。中文有4个主要声调：

1. **第一声** — 高而平
2. **第二声** — 上升
3. **第三声** — 下降-上升
4. **第四声** — 下降

## 学习汉字

从基本汉字开始。我们建议从100-200个最常用的汉字开始。

### 有用资源：
- Pleco — 最好的词典
- Anki — 用于抽认卡
- HelloChinese — 互动应用

## 口语练习

不要害怕从一开始就说话。找语言伙伴或报名课程。

## 结论

学习中文是一个漫长但令人兴奋的旅程。重要的是规律性和正确的动机。`
    },
    {
      title: "HSK考试准备：技巧和策略",
      date: "2024-01-10",
      excerpt: "HSK考试成功所需了解的一切：考试结构、准备计划和有用技巧。",
      cover: "/images/blog/hsk-preparation.jpg",
      slug: "hsk-preparation",
      published: true,
      content: `# HSK考试准备

HSK（汉语水平考试）是中文能力的标准化测试。

## 考试结构

HSK由6个级别组成，每个级别测试语言能力的不同方面。

## 准备计划

1. 确定您当前的级别
2. 研究考试结构
3. 制定准备计划
4. 定期练习

## 有用技巧

- 定期学习
- 使用官方材料
- 用计时器练习
- 研究常见错误`
    }
  ]
};

// Вспомогательная функция для получения полного URL изображения
function getFullImageUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path; // Уже полный URL
  }
  if (path.startsWith('/images/')) {
    return `/api${path}`; // Используем API путь для продакшена
  }
  return path;
}

export function getBlogPosts(langCode: string): BlogPost[] {
  const posts = blogPosts[langCode] || blogPosts.ru;
  
  // Загружаем состояние публикации из localStorage
  const blogPublicationState = typeof window !== 'undefined' 
    ? JSON.parse(localStorage.getItem('blogPublicationState') || '{}')
    : {};
  
  // Загружаем изменения контента из localStorage
  const blogContentState = typeof window !== 'undefined' 
    ? JSON.parse(localStorage.getItem('blogContentState') || '{}')
    : {};
  
  // Загружаем статистику из localStorage
  const blogStats = typeof window !== 'undefined' 
    ? JSON.parse(localStorage.getItem('blogStats') || '{}')
    : {};
  
  // Создаем массив всех статей (исходные + динамически созданные)
  const allPosts: BlogPost[] = [...posts];
  
  // Добавляем динамически созданные статьи из localStorage
  Object.keys(blogContentState).forEach(slug => {
    // Проверяем, что статья не существует в исходных данных
    const existsInOriginal = posts.some(post => post.slug === slug);
    if (!existsInOriginal) {
      const contentChanges = blogContentState[slug];
      const isPublished = blogPublicationState[slug] === true;
      
      if (isPublished && contentChanges.title && contentChanges.content) {
        // Создаем новую статью из данных localStorage
        const newPost: BlogPost = {
          title: contentChanges.title,
          excerpt: contentChanges.excerpt || '',
          content: contentChanges.content,
          date: contentChanges.date || getTashkentDateString(),
          cover: getFullImageUrl(contentChanges.cover || ''),
          slug: slug,
          published: true
        };
        allPosts.push(newPost);
        console.log(`📝 Динамически созданная статья "${newPost.title}" (${slug}): published = true`);
      }
    }
  });
  
  // Фильтруем статьи с учетом состояния из localStorage и применяем изменения контента
  const filteredPosts = allPosts.filter(post => {
    // Если есть состояние в localStorage, используем его
    if (blogPublicationState.hasOwnProperty(post.slug)) {
      const isPublished = blogPublicationState[post.slug];
      console.log(`📝 Статья "${post.title}" (${post.slug}): published = ${isPublished} (из localStorage)`);
      return isPublished;
    }
    // Иначе используем значение по умолчанию
    const isPublished = post.published !== false;
    console.log(`📝 Статья "${post.title}" (${post.slug}): published = ${isPublished} (по умолчанию)`);
    return isPublished;
  }).map(post => {
    // Применяем изменения контента, если они есть
    let updatedPost = { ...post };
    
    if (blogContentState.hasOwnProperty(post.slug)) {
      const contentChanges = blogContentState[post.slug];
      updatedPost = {
        ...updatedPost,
        title: contentChanges.title || post.title,
        excerpt: contentChanges.excerpt || post.excerpt,
        content: contentChanges.content || post.content,
        date: contentChanges.date || post.date,
        cover: getFullImageUrl(contentChanges.cover || post.cover)
      };
    } else {
      updatedPost.cover = getFullImageUrl(post.cover);
    }
    
    // Применяем статистику
    if (blogStats.hasOwnProperty(post.slug)) {
      const stats = blogStats[post.slug];
      updatedPost.views = stats.views || 0;
      updatedPost.likes = stats.likes || 0;
      updatedPost.likedBy = stats.likedBy || [];
    } else {
      updatedPost.views = 0;
      updatedPost.likes = 0;
      updatedPost.likedBy = [];
    }
    
    return updatedPost;
  });
  
  console.log(`📊 Всего статей: ${allPosts.length}, опубликовано: ${filteredPosts.length}`);
  console.log('🔍 Отфильтрованные статьи:', filteredPosts.map(p => ({ title: p.title, slug: p.slug, date: p.date })));
  return filteredPosts;
}

export function getBlogPost(langCode: string, slug: string): BlogPost | null {
  const posts = blogPosts[langCode] || blogPosts.ru;
  
  // Загружаем состояние публикации из localStorage
  const blogPublicationState = typeof window !== 'undefined' 
    ? JSON.parse(localStorage.getItem('blogPublicationState') || '{}')
    : {};
  
  // Загружаем изменения контента из localStorage
  const blogContentState = typeof window !== 'undefined' 
    ? JSON.parse(localStorage.getItem('blogContentState') || '{}')
    : {};
  
  // Сначала ищем в исходных данных
  let post = posts.find(p => p.slug === slug);
  
  // Если не найдена в исходных данных, ищем в динамически созданных
  if (!post && blogContentState.hasOwnProperty(slug)) {
    const contentChanges = blogContentState[slug];
    const isPublished = blogPublicationState[slug] === true;
    
    if (isPublished && contentChanges.title && contentChanges.content) {
      // Создаем статью из данных localStorage
      post = {
        title: contentChanges.title,
        excerpt: contentChanges.excerpt || '',
        content: contentChanges.content,
        date: contentChanges.date || new Date().toISOString().split('T')[0],
        cover: getFullImageUrl(contentChanges.cover || ''),
        slug: slug,
        published: true
      };
    }
  }
  
  if (!post) return null;
  
  // Проверяем, опубликована ли статья
  const isPublished = blogPublicationState.hasOwnProperty(post.slug) 
    ? blogPublicationState[post.slug] 
    : (post.published !== false);
  
  // Если статья не опубликована, возвращаем null
  if (!isPublished) return null;
  
  // Применяем изменения контента, если они есть
  if (blogContentState.hasOwnProperty(post.slug)) {
    const contentChanges = blogContentState[post.slug];
    return {
      ...post,
      title: contentChanges.title || post.title,
      excerpt: contentChanges.excerpt || post.excerpt,
      content: contentChanges.content || post.content,
      date: contentChanges.date || post.date,
      cover: getFullImageUrl(contentChanges.cover || post.cover)
    };
  }
  
  return {
    ...post,
    cover: getFullImageUrl(post.cover)
  };
}

// Функция для увеличения просмотров
export function incrementViews(slug: string) {
  if (typeof window === 'undefined') return;
  
  const blogStats = JSON.parse(localStorage.getItem('blogStats') || '{}');
  if (!blogStats[slug]) {
    blogStats[slug] = { views: 0, likes: 0, likedBy: [] };
  }
  blogStats[slug].views = (blogStats[slug].views || 0) + 1;
  localStorage.setItem('blogStats', JSON.stringify(blogStats));
  
  console.log(`📈 Просмотры статьи "${slug}" увеличены до ${blogStats[slug].views}`);
}

// Функция для лайка/анлайка статьи
export function toggleLike(slug: string, userId: string) {
  if (typeof window === 'undefined') return false;
  
  const blogStats = JSON.parse(localStorage.getItem('blogStats') || '{}');
  if (!blogStats[slug]) {
    blogStats[slug] = { views: 0, likes: 0, likedBy: [] };
  }
  
  const likedBy = blogStats[slug].likedBy || [];
  const isLiked = likedBy.includes(userId);
  
  if (isLiked) {
    // Убираем лайк
    blogStats[slug].likedBy = likedBy.filter(id => id !== userId);
    blogStats[slug].likes = Math.max(0, (blogStats[slug].likes || 0) - 1);
    console.log(`👎 Лайк убран с статьи "${slug}"`);
  } else {
    // Добавляем лайк
    blogStats[slug].likedBy = [...likedBy, userId];
    blogStats[slug].likes = (blogStats[slug].likes || 0) + 1;
    console.log(`👍 Лайк добавлен к статье "${slug}"`);
  }
  
  localStorage.setItem('blogStats', JSON.stringify(blogStats));
  return !isLiked; // Возвращаем новое состояние лайка
}

// Функция для проверки, лайкнул ли пользователь статью
export function isLikedByUser(slug: string, userId: string): boolean {
  if (typeof window === 'undefined') return false;
  
  const blogStats = JSON.parse(localStorage.getItem('blogStats') || '{}');
  const likedBy = blogStats[slug]?.likedBy || [];
  return likedBy.includes(userId);
}
