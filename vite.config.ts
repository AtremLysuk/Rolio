import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig({
	plugins: [
		react(),
		svgr({
			svgrOptions: {
				icon: true,
			},
		}),
	],

	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@scss': path.resolve(__dirname, 'src/scss'),
		},
	},

	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@use "@scss/helpers" as *;`,
			},
		},
	},

	server: {
		port: 5173,
		open: true,
	},

	build: {
		outDir: 'dist',
		sourcemap: false,
		chunkSizeWarningLimit: 1000,
	},
});
