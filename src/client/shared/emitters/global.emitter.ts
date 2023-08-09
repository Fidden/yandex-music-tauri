import mitt from 'mitt';

export type GlobalEvents = {
	'tracks-table:play-shuffle': void,
	'toast:add': string,
	'auth:success': string
}

export const globalEmitter = mitt<GlobalEvents>();
