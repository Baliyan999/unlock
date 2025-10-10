import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'node:path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    define: {
      'process.env': {},
      'import.meta.env.VITE_GA_ID': JSON.stringify(env.VITE_GA_ID || ''),
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          secure: false,
        },
      },
    },
    build: {
      // Оптимизации для продакшн
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'vue-router', 'vue-i18n'],
            ui: ['@vueuse/head', 'pinia']
          }
        }
      },
      // Увеличиваем лимит размера чанков
      chunkSizeWarningLimit: 1000
    }
  };
});


