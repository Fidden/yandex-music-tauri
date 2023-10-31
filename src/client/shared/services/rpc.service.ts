import {invoke} from '@tauri-apps/api/tauri';
import {cropImage} from '~/client/shared/helpers/crop-image';
import {IPopularTrack, ITrack} from '~/client/shared/types/api';

export class RpcService {
	private interval?: NodeJS.Timer;

	constructor() {
		this.interval = undefined;
	}

	public set(track: ITrack | IPopularTrack) {
		this.interval = setInterval(() => {
			invoke('set_discord_rpc', {
				state: track.artists.map(item => item?.name).toString(),
				details: track.title.toString(),
				largeImage: cropImage(track.ogImage || track.coverUri, 200, 200),
				smallImage: 'yandex-rpc'
			});
		}, 14e3);
	}

	public reset() {
		clearInterval(this.interval);
	}
}
