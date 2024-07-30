import { resolve } from 'path';
import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import copy from 'rollup-plugin-copy';

export default defineConfig({
  plugins: [
    ViteMinifyPlugin({}),
    ViteImageOptimizer({
      include: ['**/*.png', '**/*.jpg', '**/*.jpeg'],
    }),
    copy({
      targets: [{ src: 'src/assets/images/*.svg', dest: 'docs/assets' }],
      hook: 'writeBundle', // Aseguramos que los archivos se copien después de que el bundle se haya generado
    }),
  ],
  base: '',
  root: 'src',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        game1: resolve(__dirname, 'src/html/game1.html'),
        game2: resolve(__dirname, 'src/html/game2.html'),
        game3: resolve(__dirname, 'src/html/game3.html'),
        // Añade aquí el resto de páginas que quieras.(nombre único: resolve(__dirname, 'src/html/archivo.html'))
      },
    },
    outDir: '../docs',
  },
});
