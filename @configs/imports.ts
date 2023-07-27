import {NuxtConfig} from '@nuxt/schema';

export const imports: NuxtConfig['imports'] = {
	dirs: [
		'client/shared/composables',
		'client/shared/stores',
		'client/shared/services',
		'client/shared/decorators',
		'client/shared/helpers'
	]
};
