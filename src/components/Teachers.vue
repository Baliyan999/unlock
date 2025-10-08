<template>
  <section id="teachers" class="container py-12 sm:py-16" aria-labelledby="teachers-title">
    <div class="text-center mb-12">
      <h2 id="teachers-title" class="text-2xl sm:text-3xl font-semibold dark:text-white mb-4">{{ $t('teachers.title') }}</h2>
    </div>
    
    <div class="mt-6 grid md:grid-cols-3 gap-8">
      <div v-for="t in teachers" :key="t.name" class="glass-teacher-card group">
        <div class="glass-teacher-inner">
          <!-- Teacher Avatar -->
          <div class="glass-teacher-avatar">
            <div class="glass-avatar-container">
              <img 
                :src="getTeacherImage(t.name)" 
                :alt="t.name"
                :class="getImageClass(t.name)"
                @error="handleImageError"
              />
              <div class="glass-avatar-ring"></div>
            </div>
          </div>

          <!-- Teacher Info -->
          <div class="glass-teacher-info">
            <h3 class="glass-teacher-name">{{ t.name }}</h3>
            <p class="glass-teacher-specialty">{{ t.specialty }}</p>
            
            <!-- Teacher Tags -->
            <div class="glass-teacher-tags">
              <span v-for="tag in getTeacherTags(t.name)" :key="tag.text" :class="tag.class">{{ tag.text }}</span>
            </div>
          </div>

          <!-- Teacher Stats -->
          <div class="glass-teacher-stats">
            <div class="glass-stat">
              <div class="glass-stat-icon">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div class="glass-stat-content">
                <div class="glass-stat-value">{{ getTeacherExperience(t.name) }}</div>
                <div class="glass-stat-label">{{ $t('teachers.experience') }}</div>
              </div>
            </div>
            
            <div class="glass-stat">
              <div class="glass-stat-icon">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
              <div class="glass-stat-content">
                <div class="glass-stat-value">{{ getTeacherStudents(t.name) }}</div>
                <div class="glass-stat-label">{{ $t('teachers.students') }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

type Teacher = { name: string; specialty: string; photo: string };
const { tm } = useI18n();
const teachers = tm('teachers.list') as unknown as Teacher[];

function getTeacherImage(name: string): string {
  const imageMap: Record<string, string> = {
    // Давид - По (панда)
    'Давид': '/images/по.jpg',
    'David': '/images/по.jpg',
    
    // Рухсана - Угвей (черепаха)
    'Рухсана': '/images/oogway-turtle.jpg',
    'Rukhsana': '/images/oogway-turtle.jpg',
    
    // Феруза - Шифу (красная панда)
    'Феруза': '/images/shifu.jpg',
    'Feruza': '/images/shifu.jpg'
  };
  
  return imageMap[name] || '/images/default-teacher.jpg';
}

function getImageClass(name: string): string {
  const baseClass = "rounded-full";
  
  if (name === 'Давид' || name === 'David') {
    // По (панда) - поднимаем выше, чтобы голова была по центру
    return `${baseClass} w-full h-full object-cover object-top`;
  } else if (name === 'Рухсана' || name === 'Rukhsana') {
    // Угвей (черепаха) - увеличиваем и центрируем
    return `${baseClass} w-24 h-24 object-cover object-center`;
  } else {
    // Шифу и остальные - стандартное позиционирование
    return `${baseClass} w-full h-full object-cover`;
  }
}

function handleImageError(event: Event) {
  const img = event.target as HTMLImageElement;
  // Если изображение не загрузилось, показываем первую букву имени
  const parent = img.parentElement;
  if (parent) {
    parent.innerHTML = `<span class="text-2xl font-bold text-white">${img.alt.charAt(0)}</span>`;
  }
}

function getTeacherTags(name: string) {
  const { t } = useI18n();
  
  const tagsMap: Record<string, Array<{text: string, class: string}>> = {
    'Давид': [
      { text: 'HSK 1-3', class: 'glass-tag glass-tag-blue' },
      { text: t('teachers.tags.speaking'), class: 'glass-tag glass-tag-green' },
      { text: t('teachers.tags.individual'), class: 'glass-tag glass-tag-purple' }
    ],
    'David': [
      { text: 'HSK 1-3', class: 'glass-tag glass-tag-blue' },
      { text: t('teachers.tags.speaking'), class: 'glass-tag glass-tag-green' },
      { text: t('teachers.tags.individual'), class: 'glass-tag glass-tag-purple' }
    ],
    'Рухсана': [
      { text: 'HSK 1-6', class: 'glass-tag glass-tag-blue' },
      { text: t('teachers.tags.academic'), class: 'glass-tag glass-tag-green' },
      { text: t('teachers.tags.examPrep'), class: 'glass-tag glass-tag-purple' },
      { text: t('teachers.tags.groups'), class: 'glass-tag glass-tag-orange' },
      { text: t('teachers.tags.individual'), class: 'glass-tag glass-tag-pink' }
    ],
    'Rukhsana': [
      { text: 'HSK 1-6', class: 'glass-tag glass-tag-blue' },
      { text: t('teachers.tags.academic'), class: 'glass-tag glass-tag-green' },
      { text: t('teachers.tags.examPrep'), class: 'glass-tag glass-tag-purple' },
      { text: t('teachers.tags.groups'), class: 'glass-tag glass-tag-orange' },
      { text: t('teachers.tags.individual'), class: 'glass-tag glass-tag-pink' }
    ],
    'Феруза': [
      { text: 'HSK 1-4', class: 'glass-tag glass-tag-blue' },
      { text: t('teachers.tags.speaking'), class: 'glass-tag glass-tag-green' },
      { text: t('teachers.tags.miniGroups'), class: 'glass-tag glass-tag-purple' }
    ],
    'Feruza': [
      { text: 'HSK 1-4', class: 'glass-tag glass-tag-blue' },
      { text: t('teachers.tags.speaking'), class: 'glass-tag glass-tag-green' },
      { text: t('teachers.tags.miniGroups'), class: 'glass-tag glass-tag-purple' }
    ]
  };
  
  return tagsMap[name] || [];
}

function getTeacherExperience(name: string): string {
  const experienceMap: Record<string, string> = {
    'Давид': '1+',
    'David': '1+',
    'Рухсана': '6+',
    'Rukhsana': '6+',
    'Феруза': '2+',
    'Feruza': '2+'
  };
  
  return experienceMap[name] || 'Опыт';
}

function getTeacherStudents(name: string): string {
  const studentsMap: Record<string, string> = {
    'Давид': '20+',
    'David': '20+',
    'Рухсана': '100+',
    'Rukhsana': '100+',
    'Феруза': '30+',
    'Feruza': '30+'
  };
  
  return studentsMap[name] || 'Студентов';
}
</script>

<style scoped>
/* Liquid Glass Apple Style for Teachers */
.glass-teacher-card {
  @apply relative overflow-hidden rounded-3xl;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-teacher-card:hover {
  transform: translateY(-8px);
  box-shadow: 
    0 20px 48px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.3);
}

.glass-teacher-inner {
  @apply p-8 relative z-10 text-center;
}

.glass-teacher-avatar {
  @apply mb-6;
}

.glass-avatar-container {
  @apply relative w-24 h-24 mx-auto;
}

.glass-avatar-container img {
  @apply w-full h-full rounded-full object-cover;
  border: 3px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.glass-avatar-ring {
  @apply absolute inset-0 rounded-full;
  background: linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899);
  padding: 3px;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: subtract;
  animation: rotate 3s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.glass-teacher-info {
  @apply mb-6;
}

.glass-teacher-name {
  @apply text-2xl font-bold text-gray-900 dark:text-white mb-2;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.glass-teacher-specialty {
  @apply text-gray-600 dark:text-gray-300 text-sm;
}

.glass-teacher-tags {
  @apply flex flex-wrap gap-2 justify-center mb-6;
}

.glass-tag {
  @apply px-3 py-1 rounded-full text-xs font-medium;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.glass-tag-blue {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.1));
  @apply text-blue-700 dark:text-blue-300;
}

.glass-tag-green {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.1));
  @apply text-green-700 dark:text-green-300;
}

.glass-tag-purple {
  background: linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(147, 51, 234, 0.1));
  @apply text-purple-700 dark:text-purple-300;
}

.glass-tag-orange {
  background: linear-gradient(135deg, rgba(249, 115, 22, 0.2), rgba(249, 115, 22, 0.1));
  @apply text-orange-700 dark:text-orange-300;
}

.glass-tag-pink {
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(236, 72, 153, 0.1));
  @apply text-pink-700 dark:text-pink-300;
}

.glass-teacher-stats {
  @apply grid grid-cols-2 gap-4;
}

.glass-stat {
  @apply flex items-center space-x-3 p-3 rounded-2xl;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.glass-stat:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.glass-stat-icon {
  @apply w-10 h-10 rounded-xl flex items-center justify-center;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.15));
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.glass-stat-icon svg {
  @apply text-blue-600 dark:text-blue-400;
}

.glass-stat-content {
  @apply flex-1;
}

.glass-stat-value {
  @apply text-lg font-bold text-gray-900 dark:text-white;
}

.glass-stat-label {
  @apply text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider;
}

/* Dark theme adjustments */
.dark .glass-teacher-card {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.dark .glass-teacher-card:hover {
  box-shadow: 
    0 20px 48px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.2);
}

.dark .glass-stat {
  background: rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.dark .glass-stat:hover {
  background: rgba(0, 0, 0, 0.15);
  border-color: rgba(255, 255, 255, 0.1);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .glass-teacher-inner {
    @apply p-6;
  }
  
  .glass-avatar-container {
    @apply w-20 h-20;
  }
  
  .glass-teacher-stats {
    @apply grid-cols-1 gap-3;
  }
  
  .glass-stat {
    @apply justify-center text-center;
  }
}

/* Tablet-specific styles */
@media (min-width: 768px) and (max-width: 1024px) {
  .glass-teacher-inner {
    @apply p-7;
  }
  
  .glass-avatar-container {
    @apply w-24 h-24;
  }
  
  .glass-teacher-name {
    @apply text-lg;
  }
  
  .glass-teacher-specialty {
    @apply text-sm;
  }
  
  .glass-teacher-stats {
    @apply grid-cols-2 gap-4;
  }
  
  .glass-stat {
    @apply space-x-2;
  }
  
  .glass-stat-icon {
    @apply w-4 h-4;
  }
  
  .glass-stat-text {
    @apply text-sm;
  }
}

/* Large tablet styles */
@media (min-width: 1025px) and (max-width: 1200px) {
  .glass-teacher-inner {
    @apply p-8;
  }
  
  .glass-avatar-container {
    @apply w-28 h-28;
  }
  
  .glass-teacher-name {
    @apply text-xl;
  }
  
  .glass-teacher-specialty {
    @apply text-base;
  }
  
  .glass-teacher-stats {
    @apply grid-cols-3 gap-4;
  }
  
  .glass-stat {
    @apply space-x-3;
  }
  
  .glass-stat-icon {
    @apply w-5 h-5;
  }
  
  .glass-stat-text {
    @apply text-base;
  }
}
</style>


