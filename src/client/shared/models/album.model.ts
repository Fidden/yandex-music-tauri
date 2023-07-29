import {BaseModel} from '~/client/shared/types/abstract/base.model';
import {IAlbum, IAlbumShort} from '~/client/shared/types/api';

export class AlbumModel extends BaseModel {
	constructor() {
		super();
	}

	public static async liked() {
		return super.request.get<IAlbumShort[]>('/users/${userStore.userId}/likes/albums');
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
