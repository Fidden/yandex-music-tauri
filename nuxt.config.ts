import {headlessui} from './@configs/headlessui';
import {imports} from './@configs/imports';
import {runtimeConfig} from './@configs/runtimeConfig';
import {vue} from './@configs/vue';
import {fontMetrics} from './@configs/fontMetrics';

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
		'@nuxtjs/eslint-module',
		'@nuxtjs/fontaine',
		'nuxt-icon',
		'nuxt-mvvm',
		'nuxt-swiper',
		'nuxt-headlessui'
	],
	ssr: false,
	srcDir: 'src',
	devServer: {
		host: 'localhost',
		port: 1420
	},
	vue,
	imports,
	headlessui,
	fontMetrics,
	runtimeConfig
});
