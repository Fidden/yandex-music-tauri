import mitt from 'mitt';
import {ITrack} from '~/client/shared/types/api';

export type GlobalEvents = {
	'tracks-table:play-shuffle': void,
	'toast:add': string,
	'auth:success': string;
	'auth:logout': void,
	'player:set-queue': ITrack[],
	'search:text-change': string,
}

export const globalEmitter = mitt<GlobalEvents>();
