import mitt from 'mitt';

export type GlobalEvents = {
	'tracks-table:play-shuffle': void
}
export const globalEmitter = mitt<GlobalEvents>();
