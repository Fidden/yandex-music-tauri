import {LikeModel} from '~/client/shared/models/like.model';
import {UserModel} from '~/client/shared/models/user.model';
import {BaseModel} from '~/client/shared/types/abstract/base.model';
import {IPlaylist, IPlaylistShort, LikeActionEnum, ObjectTypeEnum} from '~/client/shared/types/api';

export class PlaylistModel extends BaseModel {
	private static _userId?: number = undefined;
	private static _liked: IPlaylistShort[] = [];

	public static async setup() {
		this._userId = UserModel.status?.account?.uid;
		this._liked = await this.liked();
	}

	/**
	 * @returns List of playlists of the current user
	 */
	public static list() {
		return super.request.get<IPlaylist[]>(`users/${this._userId}/playlists/list/`);
	}

	/**
	 * @returns List of liked playlists of the current user
	 */
	public static async liked() {
		return super.request.get<IPlaylistShort[]>(`/users/${this._userId}/likes/playlists`);
	}

	/**
	 * @param kind - Playlist kind
	 * @param uid - Playlists user id
	 * @returns Whether the playlist is liked by the current user
	 */
	public static isLiked(kind: number, uid: number) {
		return this._liked.findIndex(item => item.playlist.kind === kind && item.playlist.uid === uid) !== -1;
	}

	/**
	 * Handles like action for the playlist
	 * @param playlist - Playlist to like
	 */
	public static async like(playlist: IPlaylist) {
		await LikeModel.action(
			ObjectTypeEnum.PLAYLIST,
			LikeActionEnum.ADD_MULTIPLE,
			`${playlist.uid}:${playlist.kind}`
		);

		this._liked.push({playlist: playlist});
	}

	public static async dislike(playlist: IPlaylist) {
		await LikeModel.action(
			ObjectTypeEnum.PLAYLIST,
			LikeActionEnum.REMOVE,
			`${playlist.uid}:${playlist.kind}`
		);

		const playlistIndex = this._liked.findIndex(item => item.playlist.kind === playlist.kind);
		if (playlistIndex !== -1) {
			this._liked.splice(playlistIndex, 1);
		}
	}

	/**
	 * Retrieves a playlist based on its kind and optional user ID.
	 *
	 * @param kind - The kind of playlist to retrieve.
	 * @param [uid] - The optional user ID. If not provided, the current user's ID will be used.
	 * @returns Playlist for the given kind and optional uid.
	 * @note If uid is not provided, the current user's ID will be used.
	 */
	public static async one(kind: number, uid?: number) {
		const res = await super.request.get<IPlaylist>(`users/${uid || this._userId}/playlists/${kind}`);
		if (res.kind === 3) {
			res.title = 'Мне нравится';
			res.ogImage = 'music.yandex.ru/blocks/playlist-cover/playlist-cover_like.png';
		}
		return res;
	}

	/**
	 * Fetches user playlists by kinds.
	 *
	 * @param kinds - An array of kinds to filter the playlists.
	 * @return Array of playlists matching the given kinds.
	 */
	public static async byKinds(kinds: number[]) {
		return super.request.get<IPlaylist[]>(`users/${this._userId}/playlists/`, {
			query: {
				kinds: kinds.toString()
			}
		});
	}

	/**
	 * Fetches playlists by their IDs.
	 *
	 * @param playlistIds - An array of playlist IDs.
	 * @return Array of playlists.
	 */
	public static async byPlaylistIds(playlistIds: string[]) {
		const formData = new FormData();
		formData.append('playlistIds', playlistIds.toString());

		return super.request.post<IPlaylist[]>('/playlists/list/', {
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			formData
		});
	}
}
