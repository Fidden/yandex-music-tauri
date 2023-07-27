import {NuxtConfig} from '@nuxt/schema';

export const googleFonts: NuxtConfig['googleFonts'] = {
	download: true,
	display: 'swap',
	families: {
		Rubik: {
			wght: [500, 400, 300]
		},
		'Azeret Mono': {
			wght: [400]
		}
	}
};
