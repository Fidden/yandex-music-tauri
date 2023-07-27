import {createResolver} from '@nuxt/kit';
import {googleFonts} from './@configs/googleFonts';
import {headlessui} from './@configs/headlessui';
import {hooks} from './@configs/hooks';
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
					href: 'https://pro.fontawesome.com/releases/v5.12.0/css/all.css',
					rel: 'stylesheet',
					crossorigin: 'anonymous'
				}
			]
		}
	},
	modules: [
		'nuxt-icon',
		'@nuxtjs/eslint-module',
		'nuxt-swiper',
		'@nuxtjs/google-fonts',
		'nuxt-headlessui'
	],
	ssr: false,
	srcDir: 'src',
	devServer: {
		host: 'localhost',
		port: 1420
	},
	vue,
	hooks,
	imports,
	runtimeConfig,
	googleFonts,
	headlessui
});
