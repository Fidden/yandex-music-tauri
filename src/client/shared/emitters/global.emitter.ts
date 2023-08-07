import mitt from 'mitt';

export type GlobalEvents = {
	'tracks-table:play-shuffle': void,
	'toast:add': string
}

export const globalEmitter = mitt<GlobalEvents>();
