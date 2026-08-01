import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync } from 'node:fs';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/GitHubSearcher/',
    plugins: [
        react(),
        {
            name: 'spa-github-pages-fallback',
            closeBundle() {
                // GH Pages serves 404.html for unknown paths — enables client-side routes like /card
                copyFileSync('dist/index.html', 'dist/404.html');
            },
        },
    ],
});
