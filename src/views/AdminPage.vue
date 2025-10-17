<template>
  <div v-if="!isAuthorized" class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <div class="text-center">
      <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
        <svg class="w-8 h-8 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
        </svg>
      </div>
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Проверка доступа...</h2>
      <p class="text-gray-600 dark:text-gray-400">Пожалуйста, подождите</p>
    </div>
  </div>

  <div v-else class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <!-- Header -->
    <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg border-b border-gray-200/50 dark:border-gray-700/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 sm:py-6 space-y-4 sm:space-y-0">
          <div class="flex items-center space-x-3 animate-slide-left">
            <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Админ-панель</h1>
          </div>
          <div class="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 animate-slide-right">
            <span class="text-sm text-gray-600 dark:text-gray-400">
              Добро пожаловать, <span class="font-medium text-gray-900 dark:text-white">{{ authStore.user?.display_name }}</span>
            </span>
            <button
              @click="handleLogout"
              class="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <span class="flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                </svg>
                Выйти
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav class="flex flex-wrap gap-2 sm:gap-0 sm:space-x-8 py-2 sm:py-0">
          <button
            v-for="(tab, index) in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'py-3 px-4 sm:px-1 border-b-2 font-medium text-sm rounded-lg sm:rounded-none transition-all duration-200 transform hover:scale-105 sm:hover:scale-100',
              activeTab === tab.id
                ? 'border-indigo-500 text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 sm:bg-transparent dark:sm:bg-transparent'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 sm:hover:bg-transparent dark:sm:hover:bg-transparent'
            ]"
            :style="{ animationDelay: `${index * 0.1}s` }"
            class="animate-slide-up"
          >
            <span class="flex items-center">
              <component :is="tab.icon" class="w-4 h-4 mr-2" />
              {{ tab.name }}
            </span>
          </button>
        </nav>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
      <!-- Reviews Tab -->
      <div v-if="activeTab === 'reviews'" class="animate-fade-in">
        <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
          <div class="px-4 py-5 sm:p-6">
            <!-- Заголовок -->
            <div class="flex items-center space-x-3 mb-6">
              <div class="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                Управление отзывами
              </h3>
            </div>
            
            <!-- Статистика отзывов -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div class="text-center bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2 sm:p-3">
                <div class="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{{ reviewStats.total }}</div>
                <div class="text-gray-500 text-xs">Всего</div>
              </div>
              <div class="text-center bg-green-50 dark:bg-green-900/20 rounded-lg p-2 sm:p-3">
                <div class="font-semibold text-green-600 text-sm sm:text-base">{{ reviewStats.published }}</div>
                <div class="text-gray-500 text-xs">Опубликовано</div>
              </div>
              <div class="text-center bg-red-50 dark:bg-red-900/20 rounded-lg p-2 sm:p-3">
                <div class="font-semibold text-red-600 text-sm sm:text-base">{{ reviewStats.rejected }}</div>
                <div class="text-gray-500 text-xs">Отклонено</div>
              </div>
            </div>
            
            <!-- Фильтры - адаптивные кнопки -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap gap-2 mb-6">
              <button
                v-for="filter in reviewFilters"
                :key="filter.value"
                @click="activeReviewFilter = filter.value"
                :class="[
                  'w-full sm:w-auto px-4 py-3 sm:py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center',
                  activeReviewFilter === filter.value
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                ]"
              >
                {{ filter.label }}
                <span v-if="filter.count !== undefined" class="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                  {{ filter.count }}
                </span>
              </button>
            </div>
            
            <div v-if="reviewsLoading" class="text-center py-8">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p class="mt-2 text-gray-600 dark:text-gray-400">Загрузка отзывов...</p>
            </div>
            
            <div v-else-if="filteredReviews.length === 0" class="text-center py-8">
              <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                </svg>
              </div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {{ getEmptyStateTitle() }}
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                {{ getEmptyStateMessage() }}
              </p>
            </div>
            
            <div v-else class="grid gap-4 sm:gap-6">
              <div
                v-for="review in filteredReviews"
                :key="review.id"
                class="bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-600/50 p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                <div class="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                  <div class="flex-1 min-w-0">
                    <!-- Автор и статус -->
                    <div class="flex items-center space-x-3 mb-3">
                      <div class="flex items-center space-x-2">
                        <span class="font-semibold text-gray-900 dark:text-white">{{ review.author }}</span>
                        <span v-if="review.is_student" class="text-yellow-500 text-lg">👑</span>
                      </div>
                      <span
                        :class="[
                          'px-3 py-1 rounded-full text-xs font-medium',
                          getStatusBadgeClass(review.status)
                        ]"
                      >
                        {{ getStatusText(review.status) }}
                      </span>
                    </div>
                    
                    <!-- Рейтинг -->
                    <div class="flex items-center space-x-2 mb-3">
                      <div class="flex">
                        <svg
                          v-for="i in 5"
                          :key="i"
                          class="w-4 h-4"
                          :class="i <= review.rating ? 'text-yellow-400' : 'text-gray-300'"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      </div>
                      <span class="text-sm text-gray-500">{{ review.rating }}/5</span>
                    </div>
                    
                    <!-- Изображение если есть -->
                    <div v-if="review.image_url" class="mb-4">
                      <img
                        :src="review.image_url"
                        :alt="`Изображение от ${review.author}`"
                        class="w-full max-w-xs h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm"
                      />
                    </div>
                    
                    <!-- Текст отзыва -->
                    <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                      "{{ review.text }}"
                    </p>
                    
                    <!-- Заметка админа -->
                    <div v-if="review.admin_note" class="mb-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl border-l-4 border-blue-500 shadow-sm">
                      <div class="flex items-center space-x-2 mb-2">
                        <svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                        <div class="text-sm font-semibold text-blue-800 dark:text-blue-300">
                          Заметка администратора:
                        </div>
                      </div>
                      <div class="text-sm text-blue-700 dark:text-blue-200 leading-relaxed">
                        {{ review.admin_note }}
                      </div>
                    </div>
                    
                    <!-- Дата -->
                    <div class="text-sm text-gray-500">
                      {{ formatDate(review.created_at) }}
                    </div>
                  </div>
                
                  <!-- Действия -->
                  <div class="flex flex-col gap-2 lg:ml-6 w-full sm:w-auto">
                    <!-- Обработать / Снять с публикации -->
                    <button
                      @click="review.status === 'published' ? rejectReview(review.id) : approveReview(review.id)"
                      :class="[
                        'w-full sm:w-auto text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1 sm:space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105',
                        review.status === 'published' 
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
                          : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                      ]"
                    >
                      <svg v-if="review.status === 'published'" class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"/>
                      </svg>
                      <svg v-else class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                      </svg>
                      <span class="hidden sm:inline">{{ review.status === 'published' ? 'Снять с публикации' : 'Обработать' }}</span>
                      <span class="sm:hidden">{{ review.status === 'published' ? '👁️' : '✓' }}</span>
                    </button>
                    
                    <!-- Заметка -->
                    <button
                      @click="addToNotes(review.id)"
                      class="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1 sm:space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                      <span class="hidden sm:inline">Заметка</span>
                      <span class="sm:hidden">📝</span>
                    </button>
                    
                    <!-- Удалить / Удалить навсегда -->
                    <button
                      @click="review.status === 'deleted' ? permanentDeleteReview(review.id) : deleteReview(review.id)"
                      :class="[
                        'w-full sm:w-auto text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1 sm:space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105',
                        review.status === 'deleted' 
                          ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'
                          : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
                      ]"
                    >
                      <svg v-if="review.status === 'deleted'" class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z"/>
                      </svg>
                      <svg v-else class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                      <span class="hidden sm:inline">{{ review.status === 'deleted' ? 'Удалить навсегда' : 'Удалить' }}</span>
                      <span class="sm:hidden">{{ review.status === 'deleted' ? '⚠️' : '🗑' }}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Leads Tab -->
      <div v-if="activeTab === 'leads'" class="animate-fade-in">
        <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
          <div class="px-4 py-5 sm:p-6">
            <!-- Заголовок -->
            <div class="flex items-center space-x-3 mb-6">
              <div class="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                Управление заявками
              </h3>
            </div>

            <!-- Статистика заявок -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div class="text-center bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2 sm:p-3">
                <div class="font-semibold text-blue-600 text-sm sm:text-base">{{ leadStats.total }}</div>
                <div class="text-gray-500 text-xs">Всего</div>
              </div>
              <div class="text-center bg-green-50 dark:bg-green-900/20 rounded-lg p-2 sm:p-3">
                <div class="font-semibold text-green-600 text-sm sm:text-base">{{ leadStats.processed }}</div>
                <div class="text-gray-500 text-xs">Обработано</div>
              </div>
              <div class="text-center bg-red-50 dark:bg-red-900/20 rounded-lg p-2 sm:p-3">
                <div class="font-semibold text-red-600 text-sm sm:text-base">{{ leadStats.deleted }}</div>
                <div class="text-gray-500 text-xs">Удалено</div>
              </div>
            </div>

            <!-- Фильтры заявок - адаптивные кнопки -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap gap-2 mb-6">
              <button
                v-for="filter in leadFilters"
                :key="filter.id"
                @click="activeLeadFilter = filter.id"
                :class="[
                  'w-full sm:w-auto px-4 py-3 sm:py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center',
                  activeLeadFilter === filter.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                ]"
              >
                {{ filter.label }}
                <span v-if="filter.count !== undefined" class="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                  {{ filter.count }}
                </span>
              </button>
            </div>

            <div v-if="leadsLoading" class="text-center py-8">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p class="mt-2 text-gray-600 dark:text-gray-400">Загрузка заявок...</p>
            </div>

            <div v-else-if="filteredLeads.length === 0" class="text-center py-8">
              <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
                </svg>
              </div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {{ getEmptyLeadsStateTitle() }}
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                {{ getEmptyLeadsStateMessage() }}
              </p>
            </div>

            <div v-else class="grid gap-4 sm:gap-6">
              <div
                v-for="lead in filteredLeads"
                :key="lead.id"
                class="bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-600/50 p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                <div class="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                  <div class="flex-1 min-w-0">
                    <!-- Имя и статус -->
                    <div class="flex items-center space-x-3 mb-3">
                      <div class="flex items-center space-x-2">
                        <span class="font-semibold text-gray-900 dark:text-white">{{ lead.name }}</span>
                        <span v-if="lead.user" class="text-blue-500 text-sm">👤</span>
                      </div>
                      <span
                        :class="[
                          'px-3 py-1 rounded-full text-xs font-medium',
                          getLeadStatusBadgeClass(lead.status)
                        ]"
                      >
                        {{ getLeadStatusText(lead.status) }}
                      </span>
                      <span
                        :class="[
                          'px-2 py-1 rounded-full text-xs font-medium',
                          lead.source === 'calculator' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300' : 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300'
                        ]"
                      >
                        {{ lead.source === 'calculator' ? 'Калькулятор' : 'Форма' }}
                      </span>
                    </div>

                    <!-- Контактная информация -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                      <div class="flex items-center space-x-2">
                        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                        <span class="text-sm text-gray-600 dark:text-gray-400">{{ lead.email }}</span>
                      </div>
                      <div class="flex items-center space-x-2">
                        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                        </svg>
                        <span class="text-sm text-gray-600 dark:text-gray-400">{{ lead.phone || 'Не указан' }}</span>
                      </div>
                    </div>

                    <!-- Детали заявки -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                      <div v-if="lead.format" class="flex items-center space-x-2">
                        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                        </svg>
                        <span class="text-sm text-gray-600 dark:text-gray-400">Формат: {{ lead.format }}</span>
                      </div>
                      <div v-if="lead.language_level" class="flex items-center space-x-2">
                        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                        </svg>
                        <span class="text-sm text-gray-600 dark:text-gray-400">Уровень: {{ formatLanguageLevel(lead.language_level) }}</span>
                      </div>
                    </div>

                    <!-- Промокод и цена -->
                    <div v-if="lead.promocode || lead.final_price" class="flex flex-wrap gap-3 mb-4">
                      <div v-if="lead.promocode" class="flex items-center space-x-2">
                        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                        </svg>
                        <span class="text-sm text-gray-600 dark:text-gray-400">
                          Промокод: {{ lead.promocode }}
                          <span v-if="lead.promocode_discount_info" class="text-purple-600 font-medium">
                            ({{ lead.promocode_discount_info }})
                          </span>
                        </span>
                      </div>
                      <div v-if="lead.final_price" class="flex items-center space-x-2">
                        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                        </svg>
                        <span class="text-sm text-gray-600 dark:text-gray-400">Цена: {{ lead.final_price }} сум</span>
                      </div>
                    </div>

                    <!-- Комментарий -->
                    <div v-if="lead.message" class="mb-4">
                      <div class="bg-gray-50 dark:bg-gray-600/50 rounded-lg p-3">
                        <div class="text-sm text-gray-600 dark:text-gray-400">
                          <strong>Комментарий:</strong> {{ lead.message }}
                        </div>
                      </div>
                    </div>

                    <!-- Заметка администратора -->
                    <div v-if="lead.admin_note" class="mb-4">
                      <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                        <div class="text-sm text-blue-600 dark:text-blue-400">
                          <strong>Заметка админа:</strong> {{ lead.admin_note }}
                        </div>
                      </div>
                    </div>

                    <!-- Дата -->
                    <div class="text-sm text-gray-500">
                      {{ formatDate(lead.created_at) }}
                    </div>
                  </div>

                  <!-- Действия -->
                  <div class="flex flex-col gap-2 lg:ml-6 w-full sm:w-auto">
                    <button
                      v-if="lead.status === 'pending'"
                      @click="processLead(lead.id)"
                      class="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1 sm:space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                      </svg>
                      <span class="hidden sm:inline">Обработать</span>
                      <span class="sm:hidden">✓</span>
                    </button>

                    <button
                      v-if="lead.status === 'processed'"
                      @click="unprocessLead(lead.id)"
                      class="w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1 sm:space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                      </svg>
                      <span class="hidden sm:inline">Вернуть</span>
                      <span class="sm:hidden">↻</span>
                    </button>

                    <button
                      @click="addNoteToLead(lead.id)"
                      class="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1 sm:space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                      <span class="hidden sm:inline">Заметка</span>
                      <span class="sm:hidden">📝</span>
                    </button>

                    <button
                      v-if="lead.status !== 'deleted'"
                      @click="deleteLead(lead.id)"
                      class="w-full sm:w-auto bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1 sm:space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                      <span class="hidden sm:inline">Удалить</span>
                      <span class="sm:hidden">🗑</span>
                    </button>

                    <button
                      v-if="lead.status === 'deleted'"
                      @click="hardDeleteLead(lead.id)"
                      class="w-full sm:w-auto bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1 sm:space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z"/>
                      </svg>
                      <span class="hidden sm:inline">Удалить навсегда</span>
                      <span class="sm:hidden">⚠️</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Users Tab -->
      <div v-if="activeTab === 'users'" class="animate-fade-in">
        <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
          <div class="px-4 py-5 sm:p-6">
            <!-- Заголовок -->
            <div class="flex items-center space-x-3 mb-6">
              <div class="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                Управление пользователями
              </h3>
            </div>

            <!-- Статистика пользователей -->
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              <div class="text-center bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2 sm:p-3">
                <div class="font-semibold text-blue-600 text-sm sm:text-base">{{ users.length }}</div>
                <div class="text-gray-500 text-xs">Всего</div>
              </div>
              <div class="text-center bg-purple-50 dark:bg-purple-900/20 rounded-lg p-2 sm:p-3">
                <div class="font-semibold text-purple-600 text-sm sm:text-base">{{ users.filter(u => u.role === 'admin').length }}</div>
                <div class="text-gray-500 text-xs">Админы</div>
              </div>
              <div class="text-center bg-green-50 dark:bg-green-900/20 rounded-lg p-2 sm:p-3">
                <div class="font-semibold text-green-600 text-sm sm:text-base">{{ users.filter(u => u.role === 'user').length }}</div>
                <div class="text-gray-500 text-xs">Пользователи</div>
              </div>
            </div>
            
            <div v-if="usersLoading" class="text-center py-8">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
              <p class="mt-2 text-gray-600 dark:text-gray-400">Загрузка пользователей...</p>
            </div>
            
            <div v-else-if="users.length === 0" class="text-center py-8">
              <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                </svg>
              </div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Нет пользователей
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                Пользователи появятся после регистрации
              </p>
            </div>
            
            <div v-else class="grid gap-4">
              <div
                v-for="user in users"
                :key="user.id"
                class="bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-600/50 p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                <!-- Основная информация -->
                <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
                  <div class="flex-1 min-w-0">
                    <!-- Имя и роль -->
                    <div class="flex items-center space-x-3 mb-3">
                      <div class="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center">
                        <span class="text-white font-semibold text-sm">
                          {{ user.display_name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || 'U' }}
                        </span>
                      </div>
                      <div>
                        <div class="font-semibold text-gray-900 dark:text-white">{{ user.display_name || 'Без имени' }}</div>
                        <div class="text-sm text-gray-500 dark:text-gray-400">{{ user.email }}</div>
                      </div>
                    </div>

                    <!-- Дата регистрации -->
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      Зарегистрирован: {{ formatDate(user.created_at) }}
                    </div>
                  </div>

                  <!-- Роль и действия -->
                  <div class="flex items-center space-x-3">
                    <span
                      :class="[
                        'px-3 py-1 rounded-full text-xs font-medium',
                        user.role === 'admin' 
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300' 
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
                      ]"
                    >
                      {{ user.role === 'admin' ? 'Администратор' : 'Пользователь' }}
                    </span>
                    
                    <!-- Кнопка удаления -->
                    <button
                      v-if="user.id !== authStore.user?.id"
                      @click="deleteUser(user.id)"
                      class="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 dark:bg-red-900/20 dark:hover:bg-red-900/40 transition-all duration-200 flex items-center justify-center text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:scale-110"
                      title="Удалить пользователя"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Аналитические данные -->
                <div class="border-t border-gray-200 dark:border-gray-600 pt-4">
                  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <!-- IP и геолокация -->
                    <div v-if="user.ip_address" class="flex items-center space-x-2">
                      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                      <span class="text-gray-600 dark:text-gray-400">
                        <span class="font-medium">{{ user.ip_address }}</span>
                        <span v-if="user.country || user.city" class="text-gray-500">
                          ({{ [user.country, user.city].filter(Boolean).join(', ') }})
                        </span>
                      </span>
                    </div>

                    <!-- Устройство и ОС -->
                    <div v-if="user.device_type || user.operating_system" class="flex items-center space-x-2">
                      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                      <span class="text-gray-600 dark:text-gray-400">
                        <span v-if="user.device_type" class="font-medium capitalize">{{ user.device_type }}</span>
                        <span v-if="user.operating_system" class="text-gray-500"> • {{ user.operating_system }}</span>
                      </span>
                    </div>

                    <!-- Браузер -->
                    <div v-if="user.browser_name" class="flex items-center space-x-2">
                      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"/>
                      </svg>
                      <span class="text-gray-600 dark:text-gray-400">
                        <span class="font-medium">{{ user.browser_name }}</span>
                        <span v-if="user.browser_version" class="text-gray-500"> {{ user.browser_version }}</span>
                      </span>
                    </div>

                    <!-- Язык браузера -->
                    <div v-if="user.browser_language" class="flex items-center space-x-2">
                      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
                      </svg>
                      <span class="text-gray-600 dark:text-gray-400 font-medium">{{ user.browser_language }}</span>
                    </div>

                    <!-- Разрешение экрана -->
                    <div v-if="user.screen_resolution" class="flex items-center space-x-2">
                      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                      <span class="text-gray-600 dark:text-gray-400 font-medium">{{ user.screen_resolution }}</span>
                    </div>

                    <!-- Последний вход -->
                    <div v-if="user.last_login_at" class="flex items-center space-x-2">
                      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <span class="text-gray-600 dark:text-gray-400">
                        Последний вход: {{ formatDate(user.last_login_at) }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Promocodes Tab -->
      <div v-if="activeTab === 'promocodes'" class="animate-fade-in">
        <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
          <div class="px-4 py-5 sm:p-6">
            <!-- Заголовок -->
            <div class="mb-6">
              <div class="flex items-center space-x-3 mb-4">
                <div class="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                  Управление промокодами
                </h3>
              </div>
              <div class="flex justify-start">
                <button @click="showCreatePromocodeModal = true" class="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                  <span>Создать промокод</span>
                </button>
              </div>
            </div>

            <!-- Статистика промокодов -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div class="text-center bg-purple-50 dark:bg-purple-900/20 rounded-lg p-2 sm:p-3">
                <div class="font-semibold text-purple-600 text-sm sm:text-base">{{ promocodeStats.total }}</div>
                <div class="text-gray-500 text-xs">Всего</div>
              </div>
              <div class="text-center bg-green-50 dark:bg-green-900/20 rounded-lg p-2 sm:p-3">
                <div class="font-semibold text-green-600 text-sm sm:text-base">{{ promocodeStats.active }}</div>
                <div class="text-gray-500 text-xs">Активные</div>
              </div>
              <div class="text-center bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-2 sm:p-3">
                <div class="font-semibold text-yellow-600 text-sm sm:text-base">{{ promocodeStats.inactive }}</div>
                <div class="text-gray-500 text-xs">Неактивные</div>
              </div>
              <div class="text-center bg-red-50 dark:bg-red-900/20 rounded-lg p-2 sm:p-3">
                <div class="font-semibold text-red-600 text-sm sm:text-base">{{ promocodeStats.deleted }}</div>
                <div class="text-gray-500 text-xs">Удаленные</div>
              </div>
            </div>

            <!-- Фильтры промокодов - адаптивные кнопки -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap gap-2 mb-6">
              <button
                v-for="filter in promocodeFilters"
                :key="filter.id"
                @click="activePromocodeFilter = filter.id"
                :class="[
                  'w-full sm:w-auto px-4 py-3 sm:py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center',
                  activePromocodeFilter === filter.id
                    ? 'bg-purple-500 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                ]"
              >
                {{ filter.label }}
                <span class="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                  {{ filter.count }}
                </span>
              </button>
            </div>

            <div v-if="promocodesLoading" class="text-center py-8">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
              <p class="mt-2 text-gray-600 dark:text-gray-400">Загрузка промокодов...</p>
            </div>

            <div v-else-if="promocodes.length === 0" class="text-center py-8">
              <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                </svg>
              </div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Нет промокодов
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                Создайте первый промокод для привлечения клиентов
              </p>
            </div>

            <div v-else-if="filteredPromocodes.length === 0" class="text-center py-8">
              <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                </svg>
              </div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {{ getEmptyPromocodesStateTitle() }}
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                {{ getEmptyPromocodesStateMessage() }}
              </p>
            </div>

            <div v-else class="grid gap-4">
              <div
                v-for="promocode in filteredPromocodes"
                :key="promocode.id"
                class="bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-600/50 p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div class="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                  <div class="flex-1 min-w-0">
                    <!-- Код и статус -->
                    <div class="flex items-center space-x-3 mb-3">
                      <div class="font-mono font-bold text-lg text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-600 px-3 py-1 rounded-lg">
                        {{ promocode.code }}
                      </div>
                      <span
                        :class="[
                          'px-3 py-1 rounded-full text-xs font-medium',
                          getPromocodeStatusBadgeClass(promocode.status)
                        ]"
                      >
                        {{ getPromocodeStatusText(promocode.status) }}
                      </span>
                    </div>

                    <!-- Скидка -->
                    <div class="flex items-center space-x-4 mb-3">
                      <div class="text-2xl font-bold text-purple-600">
                        {{ promocode.discount_percent ? `${promocode.discount_percent}%` : `${promocode.discount_amount} сум` }}
                      </div>
                      <div class="text-sm text-gray-500">
                        {{ promocode.discount_percent ? 'скидка' : 'сумма' }}
                      </div>
                    </div>

                    <!-- Использование -->
                    <div v-if="promocode.usage_limit" class="flex items-center space-x-4 mb-3">
                      <div class="text-sm text-gray-600 dark:text-gray-400">
                        Использовано: <span class="font-semibold">{{ promocode.usage_count }}</span> из <span class="font-semibold">{{ promocode.usage_limit }}</span>
                      </div>
                      <div class="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div 
                          class="bg-purple-600 h-2 rounded-full transition-all duration-300"
                          :style="{ width: `${(promocode.usage_count / promocode.usage_limit) * 100}%` }"
                        ></div>
                      </div>
                    </div>

                    <!-- Дата истечения -->
                    <div v-if="promocode.expires_at" class="text-sm text-gray-500 mb-2">
                      Действует до: {{ formatDate(promocode.expires_at) }}
                    </div>

                    <!-- Дата создания -->
                    <div class="text-sm text-gray-500">
                      Создан: {{ formatDate(promocode.created_at) }}
                    </div>
                  </div>

                  <!-- Действия -->
                  <div class="flex flex-col gap-2 lg:ml-6 w-full sm:w-auto">
                    <!-- Активация/Деактивация -->
                    <button
                      v-if="promocode.status !== 'deleted'"
                      @click="promocode.is_active ? deactivatePromocode(promocode.id) : activatePromocode(promocode.id)"
                      :class="[
                        'w-full sm:w-auto px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1 sm:space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105',
                        promocode.is_active 
                          ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white'
                          : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
                      ]"
                    >
                      <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path v-if="promocode.is_active" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"/>
                        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <span class="hidden sm:inline">{{ promocode.is_active ? 'Деактивировать' : 'Активировать' }}</span>
                      <span class="sm:hidden">{{ promocode.is_active ? '✗' : '✓' }}</span>
                    </button>

                    <!-- Редактирование -->
                    <button
                      v-if="promocode.status !== 'deleted'"
                      @click="editPromocode(promocode.id)"
                      class="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1 sm:space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                      <span class="hidden sm:inline">Редактировать</span>
                      <span class="sm:hidden">✏️</span>
                    </button>

                    <!-- Удаление -->
                    <button
                      v-if="promocode.status !== 'deleted'"
                      @click="deletePromocode(promocode.id)"
                      class="w-full sm:w-auto bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1 sm:space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                      <span class="hidden sm:inline">Удалить</span>
                      <span class="sm:hidden">🗑</span>
                    </button>

                    <!-- Безвозвратное удаление -->
                    <button
                      v-if="promocode.status === 'deleted'"
                      @click="hardDeletePromocode(promocode.id)"
                      class="w-full sm:w-auto bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1 sm:space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z"/>
                      </svg>
                      <span class="hidden sm:inline">Удалить навсегда</span>
                      <span class="sm:hidden">⚠️</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Create Promocode Modal -->
      <div v-if="showCreatePromocodeModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div class="p-6">
            <!-- Header -->
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white">Создать промокод</h3>
              <button @click="showCreatePromocodeModal = false" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <!-- Form -->
            <form @submit.prevent="handleCreatePromocode" class="space-y-4">
              <!-- Code -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Код промокода *
                </label>
                <input
                  v-model="newPromocode.code"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="WELCOME10"
                />
              </div>

              <!-- Discount Type -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Тип скидки *
                </label>
                <select
                  v-model="newPromocode.discountType"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="percent">Процент (%)</option>
                  <option value="amount">Фиксированная сумма</option>
                </select>
              </div>

              <!-- Discount Value -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ newPromocode.discountType === 'percent' ? 'Процент скидки' : 'Сумма скидки' }} *
                </label>
                <input
                  v-model="newPromocode.discountValue"
                  type="number"
                  required
                  :min="newPromocode.discountType === 'percent' ? 1 : 1"
                  :max="newPromocode.discountType === 'percent' ? 100 : undefined"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  :placeholder="newPromocode.discountType === 'percent' ? '15' : '1000'"
                />
              </div>

              <!-- Usage Limit -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Лимит использований
                </label>
                <input
                  v-model="newPromocode.usageLimit"
                  type="number"
                  min="1"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="100"
                />
              </div>

              <!-- Expiration Date -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Дата окончания
                </label>
                <input
                  v-model="newPromocode.expiresAt"
                  type="datetime-local"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <!-- Status -->
              <div>
                <label class="flex items-center space-x-2">
                  <input
                    v-model="newPromocode.isActive"
                    type="checkbox"
                    class="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Активен</span>
                </label>
              </div>

              <!-- Buttons -->
              <div class="flex space-x-3 pt-4">
                <button
                  type="button"
                  @click="showCreatePromocodeModal = false"
                  class="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  :disabled="creatingPromocode"
                  class="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ creatingPromocode ? 'Создание...' : 'Создать' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Edit Promocode Modal -->
      <div v-if="showEditPromocodeModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div class="p-6">
            <!-- Header -->
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white">Редактировать промокод</h3>
              <button @click="showEditPromocodeModal = false" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <!-- Form -->
            <form @submit.prevent="handleUpdatePromocode" class="space-y-4">
              <!-- Code -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Код промокода *
                </label>
                <input
                  v-model="editPromocodeForm.code"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="WELCOME10"
                />
              </div>

              <!-- Discount Type -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Тип скидки *
                </label>
                <select
                  v-model="editPromocodeForm.discountType"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="percent">Процент (%)</option>
                  <option value="amount">Фиксированная сумма</option>
                </select>
              </div>

              <!-- Discount Value -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ editPromocodeForm.discountType === 'percent' ? 'Процент скидки' : 'Сумма скидки' }} *
                </label>
                <input
                  v-model="editPromocodeForm.discountValue"
                  type="number"
                  required
                  :min="editPromocodeForm.discountType === 'percent' ? 1 : 1"
                  :max="editPromocodeForm.discountType === 'percent' ? 100 : undefined"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  :placeholder="editPromocodeForm.discountType === 'percent' ? '15' : '1000'"
                />
              </div>

              <!-- Usage Limit -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Лимит использований
                </label>
                <input
                  v-model="editPromocodeForm.usageLimit"
                  type="number"
                  min="1"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="100"
                />
              </div>

              <!-- Expiration Date -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Дата окончания
                </label>
                <input
                  v-model="editPromocodeForm.expiresAt"
                  type="date"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <!-- Status -->
              <div>
                <label class="flex items-center space-x-2">
                  <input
                    v-model="editPromocodeForm.isActive"
                    type="checkbox"
                    class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Активен</span>
                </label>
              </div>

              <!-- Buttons -->
              <div class="flex space-x-3 pt-4">
                <button
                  type="button"
                  @click="showEditPromocodeModal = false"
                  class="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  :disabled="editingPromocode"
                  class="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ editingPromocode ? 'Сохранение...' : 'Сохранить' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Blog Tab -->
      <div v-if="activeTab === 'blog'" class="animate-fade-in">
        <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
          <div class="px-4 py-5 sm:p-6">
            <!-- Заголовок -->
            <div class="mb-6">
              <div class="flex items-center space-x-3 mb-4">
                <div class="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                  Управление блогом
                </h3>
              </div>
              <div class="flex justify-start">
                <button
                  @click="createNewPost"
                  class="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                  <span>Новая статья</span>
                </button>
              </div>
            </div>

            <!-- Статистика блога -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div class="text-center bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2 sm:p-3">
                <div class="font-semibold text-blue-600 text-sm sm:text-base">{{ blogPosts.length }}</div>
                <div class="text-gray-500 text-xs">Всего статей</div>
              </div>
              <div class="text-center bg-green-50 dark:bg-green-900/20 rounded-lg p-2 sm:p-3">
                <div class="font-semibold text-green-600 text-sm sm:text-base">{{ blogPosts.filter(p => p.status === 'published').length }}</div>
                <div class="text-gray-500 text-xs">Опубликовано</div>
              </div>
              <div class="text-center bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-2 sm:p-3">
                <div class="font-semibold text-yellow-600 text-sm sm:text-base">{{ blogPosts.filter(p => p.status === 'draft').length }}</div>
                <div class="text-gray-500 text-xs">Черновики</div>
              </div>
              <div class="text-center bg-purple-50 dark:bg-purple-900/20 rounded-lg p-2 sm:p-3">
                <div class="font-semibold text-purple-600 text-sm sm:text-base">{{ blogPosts.reduce((sum, p) => sum + p.views, 0) }}</div>
                <div class="text-gray-500 text-xs">Просмотры</div>
              </div>
            </div>

            <div v-if="blogLoading" class="text-center py-8">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p class="mt-2 text-gray-600 dark:text-gray-400">Загрузка статей...</p>
            </div>

            <div v-else-if="blogPosts.length === 0" class="text-center py-8">
              <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
                </svg>
              </div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Нет статей
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                Создайте первую статью для вашего блога
              </p>
            </div>

            <div v-else class="grid gap-4">
              <div
                v-for="post in blogPosts"
                :key="post.id"
                class="bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-600/50 p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div class="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                  <div class="flex-1 min-w-0">
                    <!-- Заголовок и статус -->
                    <div class="flex items-start justify-between mb-3">
                      <h4 class="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
                        {{ post.title }}
                      </h4>
                      <span
                        :class="[
                          'px-3 py-1 rounded-full text-xs font-medium ml-3 flex-shrink-0',
                          post.status === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                        ]"
                      >
                        {{ post.status === 'published' ? 'Опубликовано' : 'Черновик' }}
                      </span>
                    </div>

                    <!-- Описание -->
                    <div class="mb-4">
                      <div class="flex-1">
                        <p class="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-2">
                          {{ post.excerpt }}
                        </p>
                        <div class="flex items-center space-x-4 text-xs text-gray-500">
                          <span class="flex items-center space-x-1">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                            </svg>
                            <span class="font-medium">{{ post.views || 0 }}</span>
                          </span>
                          <span class="flex items-center space-x-1">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                            </svg>
                            <span class="font-medium">{{ post.likes || 0 }}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <!-- Автор и дата -->
                    <div class="flex items-center justify-between text-sm text-gray-500">
                      <span>Автор: {{ post.author }}</span>
                      <span>{{ formatDate(post.updated_at) }}</span>
                    </div>
                  </div>

                  <!-- Действия -->
                  <div class="flex flex-col gap-2 lg:ml-6 w-full sm:w-auto">
                    <button
                      v-if="post.status === 'draft'"
                      @click="publishPost(post.id)"
                      class="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1 sm:space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                      </svg>
                      <span class="hidden sm:inline">Опубликовать</span>
                      <span class="sm:hidden">📤</span>
                    </button>

                    <button
                      v-if="post.status === 'published'"
                      @click="unpublishPost(post.id)"
                      class="w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1 sm:space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"/>
                      </svg>
                      <span class="hidden sm:inline">Снять с публикации</span>
                      <span class="sm:hidden">👁</span>
                    </button>

                    <button
                      @click="editPost(post.id)"
                      class="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1 sm:space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                      <span class="hidden sm:inline">Редактировать</span>
                      <span class="sm:hidden">✏️</span>
                    </button>

                    <button
                      @click="deletePost(post.id)"
                      class="w-full sm:w-auto bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1 sm:space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                      <span class="hidden sm:inline">Удалить</span>
                      <span class="sm:hidden">🗑</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Confirmation Dialog -->
    <AdminConfirmationDialog
      :visible="showConfirmDialog"
      :title="confirmDialogConfig.title"
      :message="confirmDialogConfig.message"
      :details="confirmDialogConfig.details"
      :type="confirmDialogConfig.type"
      :confirm-text="confirmDialogConfig.confirmText"
      :cancel-text="confirmDialogConfig.cancelText"
      @confirm="handleConfirmAction"
      @cancel="handleCancelAction"
      @close="handleCancelAction"
    />

    <!-- Note Modal -->
    <div v-if="showNoteModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" @keydown.escape="closeNoteModal" @click.self="closeNoteModal">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg transform transition-all" @click.stop>
        <!-- Header -->
        <div class="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 rounded-t-2xl">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-white">
              Добавить заметку к отзыву "{{ currentReviewName }}"
            </h3>
            <button
              @click="closeNoteModal"
              class="text-white/80 hover:text-white transition-colors duration-200 p-1 rounded-lg hover:bg-white/10"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Content -->
        <div class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Заметка администратора
            </label>
            <textarea
              v-model="noteText"
              rows="4"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="Введите заметку для этого отзыва..."
            ></textarea>
            <div class="mt-2 text-xs text-gray-500 dark:text-gray-400">
              💡 Заметки помогают отслеживать статус отзывов и важную информацию
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 rounded-b-2xl flex justify-end space-x-3">
          <button
            @click="closeNoteModal"
            class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors duration-200"
          >
            Отмена
          </button>
          <button
            @click="saveNote"
            class="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            💾 Сохранить заметку
          </button>
        </div>
      </div>
    </div>

    <!-- Lead Note Modal -->
    <div v-if="showLeadNoteModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" @keydown.escape="closeLeadNoteModal" @click.self="closeLeadNoteModal">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg transform transition-all" @click.stop>
        <!-- Header -->
        <div class="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 rounded-t-2xl">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-white">
              Добавить заметку к заявке "{{ currentLeadName }}"
            </h3>
            <button
              @click="closeLeadNoteModal"
              class="text-white/80 hover:text-white transition-colors duration-200 p-1 rounded-lg hover:bg-white/10"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Content -->
        <div class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Текст заметки
            </label>
            <textarea
              v-model="leadNoteText"
              rows="4"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="Введите заметку для этой заявки..."
            ></textarea>
          </div>
        </div>

        <!-- Footer -->
        <div class="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 rounded-b-2xl flex justify-end space-x-3">
          <button
            @click="closeLeadNoteModal"
            class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors duration-200"
          >
            Отмена
          </button>
          <button
            @click="saveLeadNote"
            class="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Сохранить заметку
          </button>
        </div>
      </div>
    </div>

    <!-- Blog Edit Modal -->
    <div v-if="showEditBlogModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" @keydown.escape="closeBlogModal" @click.self="closeBlogModal" tabindex="0">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden" @click.stop>
        <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">
            {{ editingPost && editingPost.slug ? 'Редактировать статью' : 'Создать новую статью' }}
          </h3>
          <button 
            @click="closeBlogModal"
            class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <div class="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          <form @submit.prevent="saveBlogPost" class="space-y-6">
            <!-- Заголовок -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Заголовок статьи *
              </label>
              <input
                v-model="editBlogForm.title"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                placeholder="Введите заголовок статьи"
              />
            </div>

            <!-- Краткое описание -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Краткое описание *
              </label>
              <textarea
                v-model="editBlogForm.excerpt"
                required
                rows="3"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 resize-none"
                placeholder="Введите краткое описание статьи"
              ></textarea>
            </div>

            <!-- Содержание -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Содержание статьи *
              </label>
              <textarea
                v-model="editBlogForm.content"
                required
                rows="10"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 resize-none font-mono text-sm"
                placeholder="Введите содержание статьи в формате Markdown"
              ></textarea>
            </div>

            <!-- Дата -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Дата публикации *
              </label>
              <input
                v-model="editBlogForm.date"
                type="date"
                required
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
              />
            </div>

            <!-- Обложка убрана -->

            <!-- Slug (только для чтения) -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                URL статьи (нельзя изменить)
              </label>
              <input
                :value="displaySlug"
                type="text"
                readonly
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              />
            </div>
          </form>
        </div>
        
        <div class="flex items-center justify-end space-x-4 p-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 sticky bottom-0">
          <button
            @click="closeBlogModal"
            class="px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors font-medium"
          >
            Отмена
          </button>
          <button
            @click="saveBlogPost"
            :disabled="editingBlog"
            class="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2"
          >
            <svg v-if="editingBlog" class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            <span>{{ editingBlog ? 'Сохранение...' : 'Сохранить статью' }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch, computed, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import api from '@/lib/api'
import type { Review, Lead, User, Promocode, PromocodeCreate, PromocodeUpdate } from '@/types/auth'
import AdminConfirmationDialog from '@/components/AdminConfirmationDialog.vue'
import ImageUpload from '@/components/ImageUpload.vue'
import { blogPosts as blogData } from '@/data/blog-posts'
import { formatDateTimeTashkent, getTashkentDateString, getTashkentISOString } from '@/utils/dateUtils'
import { useNotifications } from '@/composables/useNotifications'

const router = useRouter()
const authStore = useAuthStore()
const { success, error, warning, info } = useNotifications()

const isAuthorized = ref(false)
const activeTab = ref('leads')
// Icon components
const StarIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
  </svg>`
}

const ClipboardIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
  </svg>`
}

const UsersIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
  </svg>`
}

const PromocodeIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
  </svg>`
}

const BlogIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
  </svg>`
}

const tabs = [
  { id: 'leads', name: 'Заявки', icon: ClipboardIcon },
  { id: 'reviews', name: 'Отзывы', icon: StarIcon },
  { id: 'promocodes', name: 'Промокоды', icon: PromocodeIcon },
  { id: 'blog', name: 'Блог', icon: BlogIcon },
  { id: 'users', name: 'Пользователи', icon: UsersIcon }
]

const reviews = ref<Review[]>([])
const leads = ref<Lead[]>([])
const users = ref<User[]>([])
const promocodes = ref<Promocode[]>([])
const blogPosts = ref<any[]>([])
const reviewsLoading = ref(false)
const leadsLoading = ref(false)
const usersLoading = ref(false)
const promocodesLoading = ref(false)
const blogLoading = ref(false)

// Promocode modal
const showCreatePromocodeModal = ref(false)
const creatingPromocode = ref(false)
const newPromocode = reactive({
  code: '',
  discountType: 'percent',
  discountValue: '',
  usageLimit: '',
  expiresAt: '',
  isActive: true
})

// Edit promocode modal
const showEditPromocodeModal = ref(false)
const editingPromocode = ref(false)
const editingPromocodeId = ref<number | null>(null)
const editPromocodeForm = reactive({
  code: '',
  discountType: 'percent',
  discountValue: '',
  usageLimit: '',
  expiresAt: '',
  isActive: true
})

// Blog edit modal
const showEditBlogModal = ref(false)
const editingBlog = ref(false)
const editingPost = ref<any>(null)
const editBlogForm = reactive({
  title: '',
  excerpt: '',
  content: '',
  slug: '',
  date: '',
  cover: ''
})

// Lead management
const activeLeadFilter = ref('all')
const leadStats = ref({
  total: 0,
  pending: 0,
  processed: 0,
  deleted: 0
})

const leadFilters = computed(() => [
  { id: 'all', label: 'Все заявки', count: leadStats.value.total },
  { id: 'processed', label: 'Обработанные', count: leadStats.value.processed },
  { id: 'deleted', label: 'Удаленные', count: leadStats.value.deleted }
])

const filteredLeads = computed(() => {
  if (activeLeadFilter.value === 'all') {
    return leads.value
  }
  return leads.value.filter(lead => lead.status === activeLeadFilter.value)
})

// Promocode management
const activePromocodeFilter = ref('all')
const promocodeStats = ref({
  total: 0,
  active: 0,
  inactive: 0,
  deleted: 0
})

const promocodeFilters = computed(() => [
  { id: 'all', label: 'Все промокоды', count: promocodeStats.value.total },
  { id: 'active', label: 'Активные', count: promocodeStats.value.active },
  { id: 'inactive', label: 'Неактивные', count: promocodeStats.value.inactive },
  { id: 'deleted', label: 'Удаленные', count: promocodeStats.value.deleted }
])

const filteredPromocodes = computed(() => {
  if (activePromocodeFilter.value === 'all') {
    return promocodes.value
  }
  return promocodes.value.filter(promocode => {
    if (activePromocodeFilter.value === 'active') {
      return promocode.status === 'active' && promocode.is_active
    } else if (activePromocodeFilter.value === 'inactive') {
      return promocode.status === 'inactive' && !promocode.is_active
    } else if (activePromocodeFilter.value === 'deleted') {
      return promocode.status === 'deleted'
    }
    return true
  })
})

// Modal dialog state
const showConfirmDialog = ref(false)
const confirmDialogConfig = ref({
  title: '',
  message: '',
  details: '',
  type: 'warning' as 'delete' | 'approve' | 'reject' | 'restore' | 'warning',
  confirmText: 'Подтвердить',
  cancelText: 'Отмена'
})
const pendingAction = ref<(() => void) | null>(null)

// Состояние для модального окна заметки отзывов
const showNoteModal = ref(false)
const noteText = ref('')
const currentReviewId = ref<number | null>(null)
const currentReviewName = ref('')

// Состояние для модального окна заметки заявок
const showLeadNoteModal = ref(false)
const leadNoteText = ref('')
const currentLeadId = ref<number | null>(null)
const currentLeadName = ref('')

// Фильтры отзывов
const activeReviewFilter = ref('all')
const reviewStats = ref({
  total: 0,
  pending: 0,
  published: 0,
  rejected: 0,
  deleted: 0
})

const reviewFilters = computed(() => [
  { value: 'all', label: 'Все отзывы', count: reviewStats.value.total },
  { value: 'published', label: 'Одобренные', count: reviewStats.value.published },
  { value: 'rejected', label: 'Отказанные', count: reviewStats.value.rejected },
  { value: 'deleted', label: 'Удалённые', count: reviewStats.value.deleted }
])

const filteredReviews = computed(() => {
  if (activeReviewFilter.value === 'all') {
    return reviews.value
  }
  return reviews.value.filter(review => review.status === activeReviewFilter.value)
})

// Computed свойство для отображения slug в режиме создания новой статьи
const displaySlug = computed(() => {
  if (!editingPost.value || editingPost.value.slug) {
    return editBlogForm.slug || ''
  }
  
  // Генерируем slug из заголовка для предварительного просмотра
  if (editBlogForm.title) {
    let slug = editBlogForm.title
      .toLowerCase()
      .replace(/[^a-z0-9а-я\s]/g, '')
      .replace(/\s+/g, '-')
      .trim()
    
    // Проверяем уникальность и добавляем суффикс если нужно
    const allExistingSlugs = new Set()
    Object.keys(blogData).forEach(lang => {
      blogData[lang].forEach(post => {
        if (post.slug) {
          allExistingSlugs.add(post.slug)
        }
      })
    })
    
    let counter = 1
    let originalSlug = slug
    while (allExistingSlugs.has(slug)) {
      slug = `${originalSlug}-${counter}`
      counter++
    }
    
    return slug
  }
  
  return ''
})

const fetchReviews = async () => {
  reviewsLoading.value = true
  try {
    const [reviewsResponse, statsResponse] = await Promise.all([
      api.get('/reviews/admin'),
      api.get('/reviews/admin-stats')
    ])
    reviews.value = reviewsResponse.data
    reviewStats.value = statsResponse.data
    
    // Отладочная информация
    console.log('📋 Загружены отзывы:', reviews.value)
    console.log('📊 Статистика отзывов:', reviewStats.value)
    reviews.value.forEach((review, index) => {
      console.log(`Отзыв ${index + 1}:`, {
        id: review.id,
        status: review.status,
        author: review.author
      })
    })
      } catch (error: any) {
        console.error('Error fetching reviews:', error)
  } finally {
    reviewsLoading.value = false
  }
}

const fetchLeads = async () => {
  leadsLoading.value = true
  try {
    const response = await api.get('/leads/admin')
    leads.value = response.data
    
    // Обновляем статистику
    leadStats.value = {
      total: leads.value.length,
      pending: leads.value.filter(l => l.status === 'pending').length,
      processed: leads.value.filter(l => l.status === 'processed').length,
      deleted: leads.value.filter(l => l.status === 'deleted').length
    }
      } catch (error: any) {
        console.error('Error fetching leads:', error)
  } finally {
    leadsLoading.value = false
  }
}

const fetchUsers = async () => {
  usersLoading.value = true
  try {
    const response = await api.get('/admin/users')
    users.value = response.data
  } catch (error) {
    console.error('Error fetching users:', error)
  } finally {
    usersLoading.value = false
  }
}

const deleteUser = async (userId: number) => {
  const user = users.value.find(u => u.id === userId)
  const userName = user ? `"${user.display_name}"` : 'этого пользователя'
  
  showConfirmationDialog(
    'Удаление пользователя',
    `Вы уверены, что хотите удалить пользователя ${userName}?`,
    'delete',
    async () => {
      try {
        await api.delete(`/admin/users/${userId}`)
        await fetchUsers()
        success('Пользователь удален', `Пользователь ${userName} успешно удален!`)
      } catch (error: any) {
        console.error('Error deleting user:', error)
        const errorMessage = error.response?.data?.detail || 'Ошибка при удалении пользователя'
        error('Ошибка удаления', errorMessage)
      }
    },
    'Пользователь будет полностью удален из системы. Это действие нельзя отменить.',
    'Удалить',
    'Отмена'
  )
}

const fetchPromocodes = async () => {
  await loadPromocodes()
}

const fetchBlogPosts = async () => {
  blogLoading.value = true
  try {
    // Загружаем состояние публикации из localStorage
    const blogPublicationState = JSON.parse(localStorage.getItem('blogPublicationState') || '{}')
    
    // Загружаем изменения контента из localStorage
    const blogContentState = JSON.parse(localStorage.getItem('blogContentState') || '{}')
    
    // Загружаем статистику из localStorage
    const blogStats = JSON.parse(localStorage.getItem('blogStats') || '{}')
    
    // Загружаем реальные данные из blog-posts.ts
    const realPosts = blogData.ru.map((post, index) => {
      // Проверяем состояние публикации в localStorage, если нет - используем значение по умолчанию
      const isPublished = blogPublicationState.hasOwnProperty(post.slug) 
        ? blogPublicationState[post.slug] 
        : (post.published !== false)
      
      return {
        id: index + 1,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        status: isPublished ? 'published' : 'draft',
        author: 'Альберт Балиян',
        featured_image: post.cover,
        published_at: isPublished ? post.date + 'T10:00:00Z' : null,
        created_at: post.date + 'T00:00:00Z',
        updated_at: post.date + 'T10:00:00Z',
        views: blogStats[post.slug]?.views || 0,
        likes: blogStats[post.slug]?.likes || 0
      }
    })
    
    // Добавляем динамически созданные статьи из localStorage
    const dynamicPosts: any[] = []
    Object.keys(blogContentState).forEach(slug => {
      // Проверяем, что статья не существует в исходных данных
      const existsInOriginal = blogData.ru.some(post => post.slug === slug)
      if (!existsInOriginal) {
        const contentChanges = blogContentState[slug]
        const isPublished = blogPublicationState[slug] === true
        
        if (contentChanges.title && contentChanges.content) {
          // Создаем новую статью из данных localStorage
          const newPost = {
            id: realPosts.length + dynamicPosts.length + 1,
            title: contentChanges.title,
            slug: slug,
            excerpt: contentChanges.excerpt || '',
            content: contentChanges.content,
            status: isPublished ? 'published' : 'draft',
            author: 'Альберт Балиян',
            featured_image: contentChanges.cover || '',
            published_at: isPublished ? (contentChanges.date || getTashkentDateString()) + 'T10:00:00+05:00' : null,
            created_at: (contentChanges.date || getTashkentDateString()) + 'T00:00:00+05:00',
            updated_at: (contentChanges.date || getTashkentDateString()) + 'T10:00:00+05:00',
            views: blogStats[slug]?.views || 0,
            likes: blogStats[slug]?.likes || 0
          }
          dynamicPosts.push(newPost)
          console.log(`📝 Динамически созданная статья в админке "${newPost.title}" (${slug}): published = ${isPublished}`)
        }
      }
    })
    
    // Объединяем все статьи
    const allPosts = [...realPosts, ...dynamicPosts]
    blogPosts.value = allPosts
    console.log('✅ Все данные блога загружены:', allPosts.length, '(исходные:', realPosts.length, ', динамические:', dynamicPosts.length, ')')
  } catch (error) {
    console.error('Error fetching blog posts:', error)
  } finally {
    blogLoading.value = false
  }
}

const approveReview = async (reviewId: number) => {
  const review = reviews.value.find(r => r.id === reviewId)
  const reviewName = review ? `"${review.author}"` : 'этот отзыв'
  
  showConfirmationDialog(
    'Обработка отзыва',
    `Вы уверены, что хотите обработать отзыв ${reviewName}?`,
    'approve',
    async () => {
      try {
        await api.patch(`/reviews/admin/${reviewId}/approve`)
        await fetchReviews()
      } catch (error: any) {
        console.error('Error approving review:', error)
      }
    },
    'Отзыв будет опубликован на сайте и станет видимым для всех посетителей.',
    'Обработать',
    'Отмена'
  )
}

const rejectReview = async (reviewId: number) => {
  const review = reviews.value.find(r => r.id === reviewId)
  const reviewName = review ? `"${review.author}"` : 'этот отзыв'
  const isPublished = review?.status === 'published'
  
  showConfirmationDialog(
    isPublished ? 'Снятие с публикации' : 'Скрытие отзыва',
    `Вы уверены, что хотите ${isPublished ? 'снять с публикации' : 'скрыть'} отзыв ${reviewName}?`,
    'reject',
    async () => {
      try {
        await api.patch(`/reviews/admin/${reviewId}/reject`)
        await fetchReviews()
      } catch (error: any) {
        console.error('Error rejecting review:', error)
      }
    },
    isPublished 
      ? 'Отзыв будет снят с публикации и перемещен в раздел "Отклоненные".'
      : 'Отзыв будет скрыт с сайта и перемещен в раздел "Отклоненные".',
    isPublished ? 'Снять с публикации' : 'Скрыть',
    'Отмена'
  )
}

const showConfirmationDialog = (
  title: string,
  message: string,
  type: 'delete' | 'approve' | 'reject' | 'restore' | 'warning',
  action: () => void,
  details?: string,
  confirmText?: string,
  cancelText?: string
) => {
  confirmDialogConfig.value = {
    title,
    message,
    details: details || '',
    type,
    confirmText: confirmText || 'Подтвердить',
    cancelText: cancelText || 'Отмена'
  }
  pendingAction.value = action
  showConfirmDialog.value = true
}

const handleConfirmAction = () => {
  if (pendingAction.value) {
    pendingAction.value()
    pendingAction.value = null
  }
  showConfirmDialog.value = false
}

const handleCancelAction = () => {
  pendingAction.value = null
  showConfirmDialog.value = false
}

const addToNotes = async (reviewId: number) => {
  const review = reviews.value.find(r => r.id === reviewId)
  const reviewName = review ? review.author : 'этот отзыв'
  
  // Открываем модальное окно для ввода заметки
  currentReviewId.value = reviewId
  currentReviewName.value = reviewName
  noteText.value = review?.admin_note || ''
  showNoteModal.value = true
}

const saveNote = async () => {
  if (!currentReviewId.value) return
  
  try {
    await api.patch(`/reviews/admin/${currentReviewId.value}`, {
      admin_note: noteText.value
    })
    await fetchReviews()
    closeNoteModal()
  } catch (error: any) {
    console.error('Error adding note:', error)
  }
}

const closeNoteModal = () => {
  showNoteModal.value = false
  noteText.value = ''
  currentReviewId.value = null
  currentReviewName.value = ''
}

const deleteReview = async (reviewId: number) => {
  const review = reviews.value.find(r => r.id === reviewId)
  const reviewName = review ? `"${review.author}"` : 'этот отзыв'
  
  showConfirmationDialog(
    'Удаление отзыва',
    `Вы уверены, что хотите удалить отзыв ${reviewName}?`,
    'delete',
    async () => {
      try {
        await api.delete(`/reviews/admin/${reviewId}`)
        await fetchReviews()
      } catch (error: any) {
        console.error('Error deleting review:', error)
      }
    },
    'Отзыв будет перемещен в раздел "Удаленные" и не будет отображаться на сайте.',
    'Удалить',
    'Отмена'
  )
}

const permanentDeleteReview = async (reviewId: number) => {
  const review = reviews.value.find(r => r.id === reviewId)
  const reviewName = review ? `"${review.author}"` : 'этот отзыв'
  
  showConfirmationDialog(
    'Полное удаление отзыва',
    `Вы уверены, что хотите НАВСЕГДА удалить отзыв ${reviewName}?`,
    'delete',
    async () => {
      try {
        await api.delete(`/reviews/admin/${reviewId}/permanent`)
        await fetchReviews()
      } catch (error) {
        console.error('Error permanently deleting review:', error)
      }
    },
    '⚠️ ВНИМАНИЕ: Это действие необратимо! Отзыв будет полностью удален из базы данных и восстановить его будет невозможно.',
    'Удалить навсегда',
    'Отмена'
  )
}

const updateLeadStatus = async (leadId: number, status: string) => {
  try {
    await api.put(`/admin/leads/${leadId}`, { status })
    await fetchLeads()
  } catch (error) {
    console.error('Error updating lead status:', error)
  }
}

const handleLogout = async () => {
  await authStore.logout()
  router.push('/')
}

// Функции для работы с промокодами

// Функции для работы с блогом
const publishPost = async (postId: number) => {
  try {
    const post = blogPosts.value.find(p => p.id === postId)
    if (post) {
      // Обновляем статус в локальном массиве
      post.status = 'published'
      post.published_at = getTashkentISOString()
      
      // Обновляем published в реальных данных блога
      await updateBlogPostPublished(post.slug, true)
      
      console.log(`Статья "${post.title}" опубликована`)
      success('Статья опубликована', `Статья "${post.title}" успешно опубликована!`)
    }
  } catch (err) {
    console.error('Error publishing post:', err)
    error('Ошибка публикации', 'Ошибка при публикации статьи')
  }
}

const unpublishPost = async (postId: number) => {
  try {
    const post = blogPosts.value.find(p => p.id === postId)
    if (post) {
      // Обновляем статус в локальном массиве
      post.status = 'draft'
      post.published_at = null
      
      // Обновляем published в реальных данных блога
      await updateBlogPostPublished(post.slug, false)
      
      console.log(`Статья "${post.title}" снята с публикации`)
      warning('Статья снята с публикации', `Статья "${post.title}" снята с публикации!`)
    }
  } catch (err) {
    console.error('Error unpublishing post:', err)
    error('Ошибка снятия с публикации', 'Ошибка при снятии статьи с публикации')
  }
}

// Функция для обновления статуса публикации статьи в реальных данных
const updateBlogPostPublished = async (slug: string, published: boolean) => {
  // Сохраняем состояние публикации в localStorage
  const blogPublicationState = JSON.parse(localStorage.getItem('blogPublicationState') || '{}')
  blogPublicationState[slug] = published
  localStorage.setItem('blogPublicationState', JSON.stringify(blogPublicationState))
  
  console.log(`Статус публикации статьи "${slug}" изменен на: ${published}`)
  
  // Обновляем статус в админ-панели
  const adminPost = blogPosts.value.find(p => p.slug === slug)
  if (adminPost) {
    adminPost.status = published ? 'published' : 'draft'
    adminPost.published_at = published ? getTashkentISOString() : null
  }
  
  // Принудительно обновляем страницу блога
  window.dispatchEvent(new CustomEvent('blog-updated', { 
    detail: { slug, published } 
  }))
  
  console.log(`Статус публикации статьи "${slug}" изменен на: ${published}`)
  console.log('Текущее состояние blogData.ru:', blogData.ru.map(p => ({ slug: p.slug, published: p.published })))
}


// Функция для принудительной публикации конкретной статьи
const forcePublishPost = (slug: string) => {
  const blogPublicationState = JSON.parse(localStorage.getItem('blogPublicationState') || '{}')
  blogPublicationState[slug] = true
  localStorage.setItem('blogPublicationState', JSON.stringify(blogPublicationState))
  
  // Обновляем статус в админ-панели
  const adminPost = blogPosts.value.find(p => p.slug === slug)
  if (adminPost) {
    adminPost.status = 'published'
    adminPost.published_at = getTashkentISOString()
  }
  
  // Отправляем событие обновления блога
  window.dispatchEvent(new CustomEvent('blog-updated', { 
    detail: { slug, updated: true } 
  }))
  
  console.log(`✅ Статья "${slug}" принудительно опубликована!`)
  success('Статья опубликована', `Статья "${slug}" принудительно опубликована! Обновите страницу блога.`)
}

const createNewPost = () => {
  console.log('Создание новой статьи')
  
  // Создаем новую статью с пустыми полями
  const newPost = {
    id: Date.now(), // Временный ID
    title: '',
    excerpt: '',
    content: '',
    date: getTashkentDateString(), // Текущая дата
    cover: '',
    slug: '', // Будет сгенерирован из заголовка
    status: 'draft'
  }
  
  // Заполняем форму пустыми данными
  editBlogForm.title = ''
  editBlogForm.excerpt = ''
  editBlogForm.content = ''
  editBlogForm.date = getTashkentDateString()
  editBlogForm.cover = ''
  
  // Устанавливаем режим создания новой статьи
  editingPost.value = newPost
  showEditBlogModal.value = true
}

const closeBlogModal = () => {
  console.log('🚪 Закрытие модального окна блога')
  try {
    // Принудительно закрываем модальное окно
    showEditBlogModal.value = false
    editingPost.value = null
    editingBlog.value = false
    
    // Очищаем форму
    editBlogForm.title = ''
    editBlogForm.excerpt = ''
    editBlogForm.content = ''
    editBlogForm.date = getTashkentDateString()
    editBlogForm.cover = ''
    
    // Принудительное обновление DOM через nextTick
    nextTick(() => {
      // Дополнительная проверка через setTimeout
      setTimeout(() => {
        if (showEditBlogModal.value) {
          console.log('⚠️ Принудительное закрытие модального окна')
          showEditBlogModal.value = false
          
          // Еще одна попытка через nextTick
          nextTick(() => {
            if (showEditBlogModal.value) {
              console.log('🔧 Финальное принудительное закрытие')
              showEditBlogModal.value = false
            }
          })
        }
      }, 50)
    })
    
    console.log('✅ Модальное окно блога закрыто')
  } catch (error) {
    console.error('❌ Ошибка при закрытии модального окна:', error)
    // Принудительное закрытие в случае ошибки
    showEditBlogModal.value = false
  }
}

// Глобальная функция для отладки (можно вызвать из консоли браузера)
;(window as any).forceCloseBlogModal = () => {
  console.log('🔧 Принудительное закрытие модального окна из консоли')
  showEditBlogModal.value = false
  editingPost.value = null
  editingBlog.value = false
}

const editPost = (postId: number) => {
  const post = blogPosts.value.find(p => p.id === postId)
  if (post) {
    console.log('Редактирование статьи:', post.title)
    
    // Заполняем форму данными статьи
    editingPost.value = post
    editBlogForm.title = post.title
    editBlogForm.excerpt = post.excerpt
    editBlogForm.content = post.content
    editBlogForm.slug = post.slug
    // Исправляем дату - если created_at пустое или неправильное, используем текущую дату
    if (post.created_at && post.created_at !== 'Invalid Date' && post.created_at !== '') {
      try {
        const date = new Date(post.created_at)
        if (!isNaN(date.getTime())) {
          editBlogForm.date = date.toISOString().split('T')[0]
        } else {
          editBlogForm.date = getTashkentDateString()
        }
      } catch (error) {
        editBlogForm.date = getTashkentDateString()
      }
    } else {
      editBlogForm.date = getTashkentDateString()
    }
    editBlogForm.cover = post.featured_image
    
    // Открываем модальное окно
    showEditBlogModal.value = true
  }
}

const handleImageUpload = async (file: File) => {
  try {
    console.log('Изображение загружено:', file.name)
    console.log('editBlogForm.cover после загрузки:', editBlogForm.cover)
    // URL уже обновлен в компоненте ImageUpload через v-model
  } catch (err) {
    console.error('Ошибка при загрузке изображения:', err)
    error('Ошибка загрузки', 'Ошибка при загрузке изображения. Попробуйте еще раз.')
  }
}

const saveBlogPost = async () => {
  console.log('🚀 Начало сохранения статьи')
  if (!editingPost.value) {
    console.log('❌ Нет редактируемой статьи')
    return
  }
  
  // Проверяем обязательные поля
  if (!editBlogForm.title.trim()) {
    warning('Заполните поля', 'Пожалуйста, введите заголовок статьи')
    return
  }
  
  if (!editBlogForm.content.trim()) {
    warning('Заполните поля', 'Пожалуйста, введите содержание статьи')
    return
  }
  
  console.log('✅ Валидация пройдена, начинаем сохранение')
  console.log('📝 Данные статьи:', {
    title: editBlogForm.title,
    cover: editBlogForm.cover,
    content: editBlogForm.content.substring(0, 100) + '...'
  })
  
  editingBlog.value = true
  try {
    const isNewPost = !editingPost.value.slug || editingPost.value.slug === ''
    
    // Генерируем slug из заголовка
    let slug = editBlogForm.title
      .toLowerCase()
      .replace(/[^a-z0-9а-я\s]/g, '')
      .replace(/\s+/g, '-')
      .trim()
    
    // Проверяем уникальность slug и добавляем суффикс если нужно
    if (isNewPost) {
      let counter = 1
      let originalSlug = slug
      
      // Проверяем все существующие статьи
      const allExistingSlugs = new Set()
      Object.keys(blogData).forEach(lang => {
        blogData[lang].forEach(post => {
          if (post.slug) {
            allExistingSlugs.add(post.slug)
          }
        })
      })
      
      // Если slug уже существует, добавляем число
      while (allExistingSlugs.has(slug)) {
        slug = `${originalSlug}-${counter}`
        counter++
      }
    }
    
    if (isNewPost) {
      // Создаем новую статью
      const newPost = {
        title: editBlogForm.title,
        excerpt: editBlogForm.excerpt,
        content: editBlogForm.content,
        date: editBlogForm.date,
        cover: editBlogForm.cover,
        slug: slug,
        published: true // По умолчанию опубликована
      }
      
      // Добавляем новую статью в blogData для всех языков
      Object.keys(blogData).forEach(lang => {
        blogData[lang].push(newPost)
      })
      
      // Добавляем в админ-панель
      const newAdminPost = {
        id: Date.now(),
        title: editBlogForm.title,
        excerpt: editBlogForm.excerpt,
        content: editBlogForm.content,
        created_at: editBlogForm.date + 'T00:00:00Z',
        featured_image: editBlogForm.cover,
        status: 'published',
        slug: slug
      }
      blogPosts.value.push(newAdminPost)
      
      console.log('Новая статья создана:', editBlogForm.title)
    } else {
      // Обновляем существующую статью
      Object.keys(blogData).forEach(lang => {
        const post = blogData[lang].find(p => p.slug === editingPost.value.slug)
        if (post) {
          post.title = editBlogForm.title
          post.excerpt = editBlogForm.excerpt
          post.content = editBlogForm.content
          post.date = editBlogForm.date
          post.cover = editBlogForm.cover
          // slug не изменяем, так как это может сломать ссылки
        }
      })
      
      // Обновляем данные в админ-панели
      const adminPost = blogPosts.value.find(p => p.id === editingPost.value.id)
      if (adminPost) {
        adminPost.title = editBlogForm.title
        adminPost.excerpt = editBlogForm.excerpt
        adminPost.content = editBlogForm.content
        adminPost.created_at = editBlogForm.date + 'T00:00:00Z'
        adminPost.featured_image = editBlogForm.cover
      }
      
      console.log('Статья обновлена:', editBlogForm.title)
    }
    
    // Сохраняем изменения в localStorage для синхронизации с сайтом
    const blogContentState = JSON.parse(localStorage.getItem('blogContentState') || '{}')
    const finalSlug = isNewPost ? slug : editingPost.value.slug
    blogContentState[finalSlug] = {
      title: editBlogForm.title,
      excerpt: editBlogForm.excerpt,
      content: editBlogForm.content,
      date: editBlogForm.date,
      cover: editBlogForm.cover
    }
    localStorage.setItem('blogContentState', JSON.stringify(blogContentState))
    
    // Если это новая статья, также сохраняем состояние публикации
    if (isNewPost) {
      const blogPublicationState = JSON.parse(localStorage.getItem('blogPublicationState') || '{}')
      blogPublicationState[finalSlug] = true // Новая статья опубликована
      localStorage.setItem('blogPublicationState', JSON.stringify(blogPublicationState))
      
      console.log('✅ Состояние публикации сохранено в localStorage:', {
        slug: finalSlug,
        published: true,
        blogPublicationState: blogPublicationState
      })
    }
    
    // Отправляем событие обновления блога
    window.dispatchEvent(new CustomEvent('blog-updated', { 
      detail: { slug: finalSlug, updated: true, isNew: isNewPost } 
    }))
    
    console.log('✅ Статья успешно сохранена, показываем уведомление')
    
    // Сначала закрываем модальное окно
    closeBlogModal()
    
    // Затем показываем уведомление
    setTimeout(() => {
      success(
        isNewPost ? 'Статья создана' : 'Статья обновлена', 
        isNewPost ? 'Статья успешно создана и опубликована!' : 'Статья успешно обновлена!'
      )
    }, 100)
    
  } catch (err) {
    console.error('❌ Ошибка при сохранении статьи:', err)
    error('Ошибка сохранения', 'Ошибка при сохранении статьи. Попробуйте еще раз.')
  } finally {
    console.log('🏁 Завершение сохранения статьи')
    editingBlog.value = false
  }
}

const deletePost = (postId: number) => {
  const post = blogPosts.value.find(p => p.id === postId)
  const postName = post ? post.title : 'эту статью'
  const postSlug = post ? post.slug : ''
  
  showConfirmationDialog(
    'Удаление статьи',
    `Вы уверены, что хотите удалить статью "${postName}"?`,
    'delete',
    async () => {
      try {
        // Удаляем из админ-панели
        blogPosts.value = blogPosts.value.filter(p => p.id !== postId)
        
        // Удаляем из localStorage для синхронизации с сайтом
        if (postSlug) {
          // Удаляем из blogContentState
          const blogContentState = JSON.parse(localStorage.getItem('blogContentState') || '{}')
          delete blogContentState[postSlug]
          localStorage.setItem('blogContentState', JSON.stringify(blogContentState))
          
          // Удаляем из blogPublicationState
          const blogPublicationState = JSON.parse(localStorage.getItem('blogPublicationState') || '{}')
          delete blogPublicationState[postSlug]
          localStorage.setItem('blogPublicationState', JSON.stringify(blogPublicationState))
          
          console.log(`✅ Статья "${postName}" (${postSlug}) удалена из localStorage`)
        }
        
        // Отправляем событие обновления блога
        window.dispatchEvent(new CustomEvent('blog-updated', { 
          detail: { slug: postSlug, updated: true, deleted: true } 
        }))
        
        console.log(`Статья "${postName}" удалена`)
        success('Статья удалена', `Статья "${postName}" успешно удалена!`)
      } catch (err) {
        console.error('Error deleting post:', err)
        error('Ошибка удаления', 'Ошибка при удалении статьи. Попробуйте еще раз.')
      }
    },
    'Это действие нельзя отменить. Статья будет полностью удалена из системы.',
    'Удалить',
    'Отмена'
  )
}

// Функции для работы с заявками
const processLead = async (leadId: number) => {
  try {
    await api.patch(`/leads/admin/${leadId}`, { status: 'processed' })
    const lead = leads.value.find(l => l.id === leadId)
    if (lead) {
      lead.status = 'processed'
    }
    // Обновляем статистику
    leadStats.value.processed++
    leadStats.value.pending--
    console.log(`Заявка ${leadId} обработана`)
  } catch (error) {
    console.error('Error processing lead:', error)
  }
}

const unprocessLead = async (leadId: number) => {
  try {
    await api.patch(`/leads/admin/${leadId}`, { status: 'pending' })
    const lead = leads.value.find(l => l.id === leadId)
    if (lead) {
      lead.status = 'pending'
    }
    // Обновляем статистику
    leadStats.value.pending++
    leadStats.value.processed--
    console.log(`Заявка ${leadId} возвращена в модерацию`)
  } catch (error) {
    console.error('Error unprocessing lead:', error)
  }
}

const addNoteToLead = (leadId: number) => {
  const lead = leads.value.find(l => l.id === leadId)
  const leadName = lead ? lead.name : 'эту заявку'
  
  // Открываем модальное окно для ввода заметки
  currentLeadId.value = leadId
  currentLeadName.value = leadName
  leadNoteText.value = lead?.admin_note || ''
  showLeadNoteModal.value = true
}

const saveLeadNote = async () => {
  if (!currentLeadId.value) return
  
  try {
    await updateLeadNote(currentLeadId.value, leadNoteText.value)
    await fetchLeads()
    closeLeadNoteModal()
  } catch (error: any) {
    console.error('Error adding lead note:', error)
  }
}

const closeLeadNoteModal = () => {
  showLeadNoteModal.value = false
  leadNoteText.value = ''
  currentLeadId.value = null
  currentLeadName.value = ''
}

const updateLeadNote = async (leadId: number, note: string) => {
  try {
    await api.patch(`/leads/admin/${leadId}`, { admin_note: note })
    const lead = leads.value.find(l => l.id === leadId)
    if (lead) {
      lead.admin_note = note
    }
    console.log(`Заметка для заявки ${leadId} обновлена`)
  } catch (error) {
    console.error('Error updating lead note:', error)
  }
}

const deleteLead = (leadId: number) => {
  const lead = leads.value.find(l => l.id === leadId)
  const leadName = lead ? lead.name : 'эту заявку'
  
  showConfirmationDialog(
    'Удаление заявки',
    `Вы уверены, что хотите удалить заявку "${leadName}"?`,
    'delete',
    async () => {
      try {
        await api.delete(`/leads/admin/${leadId}`)
        const lead = leads.value.find(l => l.id === leadId)
        if (lead) {
          lead.status = 'deleted'
        }
        // Обновляем статистику
        leadStats.value.deleted++
        if (lead?.status === 'pending') {
          leadStats.value.pending--
        } else if (lead?.status === 'processed') {
          leadStats.value.processed--
        }
        console.log(`Заявка "${leadName}" удалена`)
      } catch (error) {
        console.error('Error deleting lead:', error)
      }
    },
    'Это действие нельзя отменить. Заявка будет помечена как удаленная.',
    'Удалить',
    'Отмена'
  )
}

const hardDeleteLead = (leadId: number) => {
  const lead = leads.value.find(l => l.id === leadId)
  const leadName = lead ? lead.name : 'эту заявку'
  
  showConfirmationDialog(
    'Безвозвратное удаление заявки',
    `Вы уверены, что хотите БЕЗВОЗВРАТНО удалить заявку "${leadName}"?`,
    'delete',
    async () => {
      try {
        await api.delete(`/leads/admin/${leadId}/hard`)
        // Удаляем заявку из массива
        const index = leads.value.findIndex(l => l.id === leadId)
        if (index !== -1) {
          leads.value.splice(index, 1)
        }
        // Обновляем статистику
        leadStats.value.deleted--
        leadStats.value.total--
        console.log(`Заявка "${leadName}" безвозвратно удалена`)
      } catch (error) {
        console.error('Error hard deleting lead:', error)
      }
    },
    'ВНИМАНИЕ! Это действие нельзя отменить. Заявка будет полностью удалена из базы данных.',
    'Удалить навсегда',
    'Отмена'
  )
}

// Вспомогательные функции для заявок
const getLeadStatusText = (status: string) => {
  switch (status) {
    case 'pending': return 'Ожидает'
    case 'processed': return 'Обработано'
    case 'deleted': return 'Удалено'
    default: return status
  }
}

const getLeadStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
    case 'processed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
    case 'deleted': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
  }
}

const getEmptyLeadsStateTitle = () => {
  switch (activeLeadFilter.value) {
    case 'pending': return 'Нет заявок на модерации'
    case 'processed': return 'Нет обработанных заявок'
    case 'deleted': return 'Нет удаленных заявок'
    default: return 'Нет заявок'
  }
}

const getEmptyLeadsStateMessage = () => {
  switch (activeLeadFilter.value) {
    case 'pending': return 'Все заявки обработаны'
    case 'processed': return 'Обработанные заявки появятся здесь'
    case 'deleted': return 'Удаленные заявки появятся здесь'
    default: return 'Заявки появятся здесь после отправки пользователями'
  }
}

// Функции для работы с промокодами
const loadPromocodes = async () => {
  promocodesLoading.value = true
  try {
    // Загружаем ВСЕ промокоды (включая удаленные) для отображения в заявках
    const response = await api.get('/promocodes/?status_filter=all')
    promocodes.value = response.data
    await loadPromocodeStats()
  } catch (error) {
    console.error('Error loading promocodes:', error)
  } finally {
    promocodesLoading.value = false
  }
}

const loadPromocodeStats = async () => {
  try {
    const response = await api.get('/promocodes/admin-stats')
    promocodeStats.value = response.data
  } catch (error) {
    console.error('Error loading promocode stats:', error)
  }
}

const createPromocode = async (promocodeData: PromocodeCreate) => {
  try {
    const response = await api.post('/promocodes/', promocodeData)
    promocodes.value.unshift(response.data)
    await loadPromocodeStats()
    console.log('Промокод создан:', response.data.code)
  } catch (error) {
    console.error('Error creating promocode:', error)
    throw error
  }
}

const handleCreatePromocode = async () => {
  creatingPromocode.value = true
  try {
    const promocodeData: PromocodeCreate = {
      code: newPromocode.code.toUpperCase(),
      discount_percent: newPromocode.discountType === 'percent' ? parseInt(newPromocode.discountValue) : undefined,
      discount_amount: newPromocode.discountType === 'amount' ? parseInt(newPromocode.discountValue) : undefined,
      usage_limit: newPromocode.usageLimit ? parseInt(newPromocode.usageLimit) : undefined,
      expires_at: newPromocode.expiresAt || undefined,
      is_active: newPromocode.isActive
    }

    await createPromocode(promocodeData)
    
    // Reset form
    Object.assign(newPromocode, {
      code: '',
      discountType: 'percent',
      discountValue: '',
      usageLimit: '',
      expiresAt: '',
      isActive: true
    })
    
    showCreatePromocodeModal.value = false
    console.log('Промокод успешно создан!')
  } catch (error: any) {
    console.error('Ошибка создания промокода:', error)
    error('Ошибка создания', error.response?.data?.detail || 'Ошибка создания промокода')
  } finally {
    creatingPromocode.value = false
  }
}

const updatePromocode = async (promocodeId: number, updateData: PromocodeUpdate) => {
  try {
    const response = await api.patch(`/promocodes/${promocodeId}`, updateData)
    const index = promocodes.value.findIndex(p => p.id === promocodeId)
    if (index !== -1) {
      promocodes.value[index] = response.data
    }
    await loadPromocodeStats()
    console.log('Промокод обновлен:', response.data.code)
  } catch (error) {
    console.error('Error updating promocode:', error)
    throw error
  }
}

const activatePromocode = async (promocodeId: number) => {
  try {
    const response = await api.patch(`/promocodes/${promocodeId}/activate`)
    const index = promocodes.value.findIndex(p => p.id === promocodeId)
    if (index !== -1) {
      promocodes.value[index] = response.data
    }
    await loadPromocodeStats()
    console.log('Промокод активирован')
  } catch (error) {
    console.error('Error activating promocode:', error)
  }
}

const deactivatePromocode = async (promocodeId: number) => {
  try {
    const response = await api.patch(`/promocodes/${promocodeId}/deactivate`)
    const index = promocodes.value.findIndex(p => p.id === promocodeId)
    if (index !== -1) {
      promocodes.value[index] = response.data
    }
    await loadPromocodeStats()
    console.log('Промокод деактивирован')
  } catch (error) {
    console.error('Error deactivating promocode:', error)
  }
}

const deletePromocode = (promocodeId: number) => {
  const promocode = promocodes.value.find(p => p.id === promocodeId)
  const promocodeCode = promocode ? promocode.code : 'этот промокод'
  
  showConfirmationDialog(
    'Удаление промокода',
    `Вы уверены, что хотите удалить промокод "${promocodeCode}"?`,
    'delete',
    async () => {
      try {
        await api.delete(`/promocodes/${promocodeId}`)
        const index = promocodes.value.findIndex(p => p.id === promocodeId)
        if (index !== -1) {
          promocodes.value[index].status = 'deleted'
          promocodes.value[index].is_active = false
        }
        await loadPromocodeStats()
        console.log(`Промокод "${promocodeCode}" удален`)
      } catch (error) {
        console.error('Error deleting promocode:', error)
      }
    },
    'Это действие нельзя отменить. Промокод будет помечен как удаленный.',
    'Удалить',
    'Отмена'
  )
}

const hardDeletePromocode = (promocodeId: number) => {
  const promocode = promocodes.value.find(p => p.id === promocodeId)
  const promocodeCode = promocode ? promocode.code : 'этот промокод'
  
  showConfirmationDialog(
    'Безвозвратное удаление промокода',
    `Вы уверены, что хотите БЕВОЗВРАТНО удалить промокод "${promocodeCode}"?`,
    'delete',
    async () => {
      try {
        await api.delete(`/promocodes/${promocodeId}/hard`)
        const index = promocodes.value.findIndex(p => p.id === promocodeId)
        if (index !== -1) {
          promocodes.value.splice(index, 1)
        }
        await loadPromocodeStats()
        console.log(`Промокод "${promocodeCode}" безвозвратно удален`)
      } catch (error) {
        console.error('Error hard deleting promocode:', error)
      }
    },
    'ВНИМАНИЕ! Это действие нельзя отменить. Промокод будет полностью удален из базы данных.',
    'Удалить навсегда',
    'Отмена'
  )
}

const editPromocode = (promocodeId: number) => {
  const promocode = promocodes.value.find(p => p.id === promocodeId)
  if (!promocode) return
  
  // Заполняем форму данными промокода
  editingPromocodeId.value = promocodeId
  editPromocodeForm.code = promocode.code
  editPromocodeForm.discountType = promocode.discount_percent ? 'percent' : 'amount'
  editPromocodeForm.discountValue = promocode.discount_percent?.toString() || promocode.discount_amount?.toString() || ''
  editPromocodeForm.usageLimit = promocode.usage_limit?.toString() || ''
  editPromocodeForm.expiresAt = promocode.expires_at ? new Date(promocode.expires_at).toISOString().split('T')[0] : ''
  editPromocodeForm.isActive = promocode.is_active
  
  showEditPromocodeModal.value = true
}

const handleUpdatePromocode = async () => {
  if (!editingPromocodeId.value) return
  
  editingPromocode.value = true
  try {
    const updateData: PromocodeUpdate = {
      code: editPromocodeForm.code.toUpperCase(),
      discount_percent: editPromocodeForm.discountType === 'percent' ? parseInt(editPromocodeForm.discountValue) : undefined,
      discount_amount: editPromocodeForm.discountType === 'amount' ? parseInt(editPromocodeForm.discountValue) : undefined,
      usage_limit: editPromocodeForm.usageLimit ? parseInt(editPromocodeForm.usageLimit) : undefined,
      expires_at: editPromocodeForm.expiresAt || undefined,
      is_active: editPromocodeForm.isActive
    }

    await updatePromocode(editingPromocodeId.value, updateData)
    
    // Reset form
    Object.assign(editPromocodeForm, {
      code: '',
      discountType: 'percent',
      discountValue: '',
      usageLimit: '',
      expiresAt: '',
      isActive: true
    })
    
    showEditPromocodeModal.value = false
    editingPromocodeId.value = null
    console.log('Промокод успешно обновлен!')
  } catch (error: any) {
    console.error('Ошибка обновления промокода:', error)
    error('Ошибка обновления', error.response?.data?.detail || 'Ошибка обновления промокода')
  } finally {
    editingPromocode.value = false
  }
}

// Вспомогательные функции для промокодов
const getPromocodeStatusText = (status: string) => {
  switch (status) {
    case 'active': return 'Активен'
    case 'inactive': return 'Неактивен'
    case 'deleted': return 'Удален'
    default: return status
  }
}

const getPromocodeStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
    case 'inactive': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
    case 'deleted': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
  }
}

const getEmptyPromocodesStateTitle = () => {
  switch (activePromocodeFilter.value) {
    case 'active': return 'Нет активных промокодов'
    case 'inactive': return 'Нет неактивных промокодов'
    case 'deleted': return 'Нет удаленных промокодов'
    default: return 'Нет промокодов'
  }
}

const getEmptyPromocodesStateMessage = () => {
  switch (activePromocodeFilter.value) {
    case 'active': return 'Активные промокоды появятся здесь'
    case 'inactive': return 'Неактивные промокоды появятся здесь'
    case 'deleted': return 'Удаленные промокоды появятся здесь'
    default: return 'Промокоды появятся здесь после создания'
  }
}

const formatDate = (dateString: string) => {
  return formatDateTimeTashkent(dateString, 'ru-RU');
}

const getPromocodeInfo = (promocodeCode: string) => {
  const promocode = promocodes.value.find(p => p.code === promocodeCode)
  if (!promocode) return promocodeCode
  
  if (promocode.discount_percent) {
    return `${promocodeCode} (${promocode.discount_percent}% скидка)`
  } else if (promocode.discount_amount) {
    return `${promocodeCode} (${promocode.discount_amount} сум скидка)`
  }
  
  return promocodeCode
}

const formatLanguageLevel = (level: string) => {
  if (level === 'unknown') {
    return 'не знаю свой уровень'
  }
  return level
}

const getStatusColor = (status: string) => {
  const colors = {
    new: 'bg-blue-100 text-blue-800',
    contacted: 'bg-yellow-100 text-yellow-800',
    converted: 'bg-green-100 text-green-800',
    closed: 'bg-gray-100 text-gray-800'
  }
  return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
}

const getStatusText = (status: string) => {
  const texts = {
    new: 'Новая',
    contacted: 'Связались',
    converted: 'Конвертирована',
    closed: 'Закрыта',
    pending: 'Ожидает',
    published: 'Опубликован',
    rejected: 'Отклонен',
    deleted: 'Удален'
  }
  return texts[status as keyof typeof texts] || status
}

const getStatusBadgeClass = (status: string) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
    published: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
    rejected: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
    deleted: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
  }
  return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800'
}

const getEmptyStateTitle = () => {
  switch (activeReviewFilter.value) {
    case 'pending': return 'Нет отзывов на модерации'
    case 'published': return 'Нет опубликованных отзывов'
    case 'rejected': return 'Нет отклоненных отзывов'
    case 'deleted': return 'Нет удаленных отзывов'
    default: return 'Нет отзывов'
  }
}

const getEmptyStateMessage = () => {
  switch (activeReviewFilter.value) {
    case 'pending': return 'Все отзывы обработаны!'
    case 'published': return 'Пока нет опубликованных отзывов'
    case 'rejected': return 'Нет отклоненных отзывов'
    case 'deleted': return 'Нет удаленных отзывов'
    default: return 'Отзывы появятся здесь после отправки пользователями'
  }
}

const loadTabData = () => {
  // Всегда загружаем промокоды для отображения информации в заявках
  loadPromocodes()
  
  switch (activeTab.value) {
    case 'leads':
      fetchLeads()
      break
    case 'reviews':
      fetchReviews()
      break
    case 'promocodes':
      // Промокоды уже загружены выше
      break
    case 'blog':
      fetchBlogPosts()
      break
    case 'users':
      fetchUsers()
      break
  }
}

onMounted(async () => {
  // ПРОВЕРКА АВТОРИЗАЦИИ ЧЕРЕЗ /auth/me
  try {
    // 1. Проверяем токен в localStorage
    const token = localStorage.getItem('access_token')
    if (!token) {
      console.log('❌ Нет токена - редирект на вход')
      router.push('/login')
      return
    }

    // 2. Проверяем токен и получаем данные пользователя через /auth/me
    await authStore.fetchUser()
    console.log('🔍 Данные пользователя:', authStore.user)

    // 3. Проверяем, что пользователь админ
    if (!authStore.isAdmin) {
      console.log('❌ Пользователь не является администратором')
      router.push('/403')
      return
    }

    // 4. Если все проверки пройдены - разрешаем доступ
    console.log('✅ Доступ к админке разрешен')
    isAuthorized.value = true
    loadTabData()
    
  } catch (error: any) {
    console.log('❌ Ошибка проверки доступа:', error.message)
    console.log('⚠️ Неизвестная ошибка - редирект на вход')
    router.push('/login')
  }
})

// Перезагружаем данные при смене таба
watch(() => activeTab.value, loadTabData)
</script>

<style scoped>
/* Responsive adjustments for very small screens */
@media (max-width: 320px) {
  .min-h-screen {
    padding: 0;
  }
  
  .max-w-7xl {
    max-width: 100%;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  
  .px-4 {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
  
  .py-4 {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }
  
  .text-2xl {
    font-size: 1.5rem;
  }
  
  .text-xl {
    font-size: 1.25rem;
  }
  
  .w-10.h-10 {
    width: 2rem;
    height: 2rem;
  }
  
  .w-8.h-8 {
    width: 1.5rem;
    height: 1.5rem;
  }
  
  .w-6.h-6 {
    width: 1rem;
    height: 1rem;
  }
  
  .w-5.h-5 {
    width: 0.875rem;
    height: 0.875rem;
  }
  
  .w-4.h-4 {
    width: 0.75rem;
    height: 0.75rem;
  }
  
  .space-x-3 > * + * {
    margin-left: 0.5rem;
  }
  
  .space-x-4 > * + * {
    margin-left: 0.75rem;
  }
  
  .space-y-4 > * + * {
    margin-top: 0.75rem;
  }
  
  .space-y-2 > * + * {
    margin-top: 0.25rem;
  }
  
  .gap-2 {
    gap: 0.25rem;
  }
  
  .rounded-2xl {
    border-radius: 1rem;
  }
  
  .rounded-xl {
    border-radius: 0.75rem;
  }
  
  .rounded-lg {
    border-radius: 0.5rem;
  }
}

/* Enhanced focus states for accessibility */
button:focus {
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.3);
}

/* Smooth transitions for all interactive elements */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Custom scrollbar for better UX */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(156, 163, 175, 0.7);
}

/* Dark mode scrollbar */
@media (prefers-color-scheme: dark) {
  ::-webkit-scrollbar-thumb {
    background: rgba(75, 85, 99, 0.5);
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(75, 85, 99, 0.7);
  }
}
</style>
