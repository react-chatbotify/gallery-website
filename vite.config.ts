import react from '@vitejs/plugin-react';
import path from 'path';
import { loadEnv } from 'vite';
import eslint from 'vite-plugin-eslint';
import mkcert from 'vite-plugin-mkcert';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

	return defineConfig({
		assetsInclude: ['**/*.svg', '**/*.png', '**/*.wav'],
		build: {
			outDir: path.resolve(__dirname, 'dist'),
			rollupOptions: {
				input: path.resolve(__dirname, 'index.html'),
			},
		},
		plugins: [
			svgr({
				svgrOptions: {
					ref: true,
				},
			}),
			eslint({
				failOnError: false,
				failOnWarning: false,
			}),
			react({
				include: '**/*.{jsx,tsx}',
			}),
			tsconfigPaths(),
			mkcert(), // if testing against a http localhost backend, remove
		],
		server: {
			hmr: {
				overlay: false,
			},
			host: true,
			port: 3000,
		},
		test: {
			globals: true,
			environment: 'jsdom',
			setupFiles: './src/setupTests.js',
			deps: {
				inline: ['react-chatbotify'],
			},
      pool: "vmThreads",
		},
	});
};
