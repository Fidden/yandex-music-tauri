import {addPlugin, createResolver} from '@nuxt/kit';

const resolver = createResolver(import.meta.url);

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
		'@nuxt/image',
		'nuxt-icon',
		'@nuxtjs/eslint-module',
		'nuxt-swiper'
	],
	vue: {
		defineModel: false,
		propsDestructure: false
	},
	hooks: {
		'modules:done': () => {
			addPlugin(resolver.resolve('./src/plugins-manual/pinia.plugin'));
		},
		'nitro:build:before': (nitro) => {
			nitro.options.moduleSideEffects.push('reflect-metadata');
		}
	},
	imports: {
		dirs: [
			'client/shared/composables',
			'client/shared/stores',
			'client/shared/services',
			'client/shared/decorators',
			'client/shared/helpers'
		]
	},
	ssr: false,
	srcDir: 'src',
	devServer: {
		host: 'localhost',
		port: 1420
	},
	image: {
		domains: [
			'avatars.yandex.net'
		]
	}
});
