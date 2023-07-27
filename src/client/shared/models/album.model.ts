import {BaseModel} from '~/client/shared/types/abstract/base.model';
import {IAlbum, IAlbumShort} from '~/client/shared/types/api';

export class AlbumModel extends BaseModel {
	constructor() {
		super();
	}

	public async liked() {
		return this.request.get<IAlbumShort[]>('/users/${userStore.userId}/likes/albums');
	}

	public async albums(ids: number[]) {
		const formData = new FormData();
		formData.append('albumIds', ids.toString());

		return this.request.post<IAlbum[]>('/albums', {
			formData,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		});
	}

	public async withTracks(id: number) {
		return this.request.get<IAlbum>(`/albums/${id}/with-tracks`);
	}
}
