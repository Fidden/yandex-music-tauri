import {addPlugin} from '@nuxt/kit';
import {NuxtConfig} from '@nuxt/schema';
import {resolver} from '~~/nuxt.config';

export const hooks: NuxtConfig['hooks'] = {
	'modules:done': () => {
		addPlugin(resolver.resolve('./src/plugins-manual/pinia.plugin'));
	},
	'nitro:build:before': (nitro) => {
		nitro.options.moduleSideEffects.push('reflect-metadata');
	}
};
