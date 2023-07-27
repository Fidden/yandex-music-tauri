import {NuxtConfig} from '@nuxt/schema';

export const runtimeConfig: NuxtConfig['runtimeConfig'] = {
	public: {
		discordRpcClientId: process.env.NUXT_PUBLIC_DISCORD_RPC_CLIENT_ID
	}
};
