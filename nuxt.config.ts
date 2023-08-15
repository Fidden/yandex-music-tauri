import {addPlugin, createResolver} from '@nuxt/kit';
import {headlessui} from './@configs/headlessui';
import {imports} from './@configs/imports';
import {runtimeConfig} from './@configs/runtimeConfig';
import {vue} from './@configs/vue';

export const resolver = createResolver(import.meta.url);

export default defineNuxtConfig({
	app: {
		head: {
			bodyAttrs: {
				'data-tauri-drag-region': ''
			},
			script: [
				{src: 'http://localhost:8098'}
			],
			link: [
				{
					href: '/fonts/Material-Symbols.woff2',
					as: 'font',
					rel: 'preload',
					crossorigin: 'anonymous',
					type: 'font/woff'
				},
				{
					href: 'https://pro.fontawesome.com/releases/v5.12.0/css/all.css',
					rel: 'stylesheet',
					crossorigin: 'anonymous'
				}
			]
		}
	},
	modules: [
		'nuxt-icon',
		'nuxt-swiper',
		'nuxt-headlessui',
		'@nuxtjs/eslint-module',
		'@nuxtjs/fontaine'
	],
	ssr: false,
	srcDir: 'src',
	devServer: {
		host: 'localhost',
		port: 1420
	},
	vite: {
		build: {
			minify: 'terser'
		}
	},
	vue,
	hooks: {
		'modules:done': () => {
			addPlugin(resolver.resolve('./src/plugins-manual/pinia.plugin'));
		},
		'nitro:build:before': (nitro) => {
			nitro.options.moduleSideEffects.push('reflect-metadata');
		}
	},
	imports,
	runtimeConfig,
	headlessui,
	fontMetrics: {
		fonts: ['Rubik']
	}
});
