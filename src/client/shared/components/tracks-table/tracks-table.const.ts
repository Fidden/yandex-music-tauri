import mitt from 'mitt';
import useBem from 'vue3-bem';

export type TracksTableEvents = {
	'play-shuffle': void;
}

export const cnTracksTable = useBem('tracks-table');
export const emTracksTable = () => mitt<TracksTableEvents>();
