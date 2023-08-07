import {UserModel} from '~/client/shared/models/user.model';
import {BaseModel} from '~/client/shared/types/abstract/base.model';
import {IPlaylistShort, IPlaylist} from '~/client/shared/types/api';

export class PlaylistModel extends BaseModel {
	private static userId?: number = undefined;
	private static liked: IPlaylistShort[] = [];

	public static async setup() {
		this.userId = UserModel.status?.account?.uid;
		this.liked = await this.likes();
	}

	public static list() {
		return super.request.get<IPlaylist[]>(`users/${this.userId}/playlists/list/`);
	}

	public static async likes() {
		return super.request.get<IPlaylistShort[]>(`/users/${this.userId}/likes/playlists`);
	}

	public static async one(kind: number, uid?: number) {
		const res = await super.request.get<IPlaylist>(`users/${uid || this.userId}/playlists/${kind}`);
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
