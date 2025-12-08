import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);  

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  base: '/TomMark',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        work_1: resolve(__dirname, 'src/work_1.html'),
        work_2: resolve(__dirname, 'src/work_2.html'),
        work_3: resolve(__dirname, 'src/work_3.html'),
        work_4: resolve(__dirname, 'src/work_4.html'),
        about: resolve(__dirname, 'src/about.html'),
        contact: resolve(__dirname, 'src/contact.html'),
        weronika_surdacka: resolve(__dirname, 'src/weronika_surdacka.html'),
        royal_star: resolve(__dirname, 'src/royal_star.html'),
        frontline_club: resolve(__dirname, 'src/frontline_club.html'),
        pina_colada: resolve(__dirname, 'src/pina_colada.html'),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['import'],
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});