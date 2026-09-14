/// <reference types="vitest/config" />
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import vueDevTools from 'vite-plugin-vue-devtools';

export default defineConfig({
    plugins: [vue(), tailwindcss(), vueDevTools()],
    resolve: {
        alias: {
            '@src': fileURLToPath(new URL('./src', import.meta.url)),
            '@tests': fileURLToPath(new URL('./test', import.meta.url)),
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./tests/setup.ts'],
        include: ['src/**/*.spec.ts', 'tests/**/*.spec.ts'],
        exclude: ['e2e/**', 'node_modules/**'],
        restoreMocks: true,
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html', 'lcov'],
            include: ['src/**/*.{ts,vue}'],
            exclude: ['src/main.ts', 'src/types/**', 'src/lib/supabase.ts'],
            thresholds: {
                lines: 60,
                statements: 60,
                functions: 60,
                branches: 50,
            },
        },
    },
});
