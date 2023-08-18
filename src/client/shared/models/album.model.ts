import {UserModel} from '~/client/shared/models/user.model';
import {BaseModel} from '~/client/shared/types/abstract/base.model';
import {IAlbum, IAlbumShort} from '~/client/shared/types/api';

export class AlbumModel extends BaseModel {
	public static userId?: number = undefined;
	public static _liked: IAlbumShort[] = [];

	public static async setup() {
		this.userId = UserModel.status?.account?.uid;
		this._liked = await this.liked();
	}

	public static async liked() {
		return super.request.get<IAlbumShort[]>(`/users/${this.userId}/likes/albums`);
	}

	public static async albums(ids: number[]) {
		const formData = new FormData();
		formData.append('albumIds', ids.toString());

		return super.request.post<IAlbum[]>('/albums', {
			formData,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		});
	}

	public static async withTracks(id: number) {
		return super.request.get<IAlbum>(`/albums/${id}/with-tracks`);
	}
}
