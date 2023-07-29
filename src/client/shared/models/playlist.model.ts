import {BaseModel} from '~/client/shared/types/abstract/base.model';
import {ILikedPlaylist, IPlaylist} from '~/client/shared/types/api';

export class PlaylistModel extends BaseModel {
	private static userId: number = -1;

	public static setup(userId: number) {
		this.userId = userId;
	}

	public static list() {
		return super.request.get<IPlaylist[]>(`users/${this.userId}/playlists/list/`);
	}

	public static async liked() {
		return super.request.get<ILikedPlaylist[]>(`/users/${this.userId}/likes/playlists`);
	}

	public static async one(kind: number, uid: number) {
		const res = await super.request.get<IPlaylist>(`users/${uid}/playlists/${kind}`);
		if (res.kind === 3) {
			res.title = 'Мне нравится';
			res.ogImage = 'music.yandex.ru/blocks/playlist-cover/playlist-cover_like.png';
		}
		return res;
	}

	public static async byKinds(kinds: number[]) {
		return super.request.get<IPlaylist[]>(`users/${this.userId}/playlists/`, {
			query: {
				kinds: kinds.toString()
			}
		});
	}

	public static async byPlaylistIds(playlistIds: string[]) {
		const formData = new FormData();
		formData.append('playlistIds', playlistIds.toString());

		return super.request.post<IPlaylist[]>('/playlists/list/', {
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			formData
		});
	}
}
