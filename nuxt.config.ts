import {createResolver} from '@nuxt/kit';
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
	vue,
	hooks,
	imports,
	runtimeConfig,
	headlessui,
	fontMetrics: {
		fonts: ['Roboto']
	}
});
