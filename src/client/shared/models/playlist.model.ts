import {singleton} from 'tsyringe';
import {BaseModel} from '~/client/shared/types/abstract/base.model';
import {ILikedPlaylist, IPlaylist} from '~/client/shared/types/api';

@singleton()
export class PlaylistModel extends BaseModel {
	private userId?: number;

	constructor() {
		super();
	}

	public setup(userId: number) {
		this.userId = userId;
	}

	public list() {
		return this.request.get<IPlaylist[]>(`users/${this.userId}/playlists/list/`);
	}

	async liked() {
		return this.request.get<ILikedPlaylist[]>(`/users/${this.userId}/likes/playlists`);
	}

	public async one(kind: number, uid: number) {
		const res = await this.request.get<IPlaylist>(`users/${uid}/playlists/${kind}`);
		if (res.kind === 3) {
			res.title = 'Мне нравится';
			res.ogImage = 'music.yandex.ru/blocks/playlist-cover/playlist-cover_like.png';
		}
		return res;
	}

	public async byKinds(kinds: number[]) {
		return this.request.get<IPlaylist[]>(`users/${this.userId}/playlists/`, {
			query: {
				kinds: kinds.toString()
			}
		});
	}

	public async byPlaylistIds(playlistIds: string[]) {
		const formData = new FormData();
		formData.append('playlistIds', playlistIds.toString());

		return this.request.post<IPlaylist[]>('/playlists/list/', {
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			formData
		});
	}
}
