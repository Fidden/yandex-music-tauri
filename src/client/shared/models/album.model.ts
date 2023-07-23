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
		return this.request.get<IAlbum[]>('/albums', {
			query: {
				albumIds: ids.toString()
			}
		});
	}

	public async withTracks(id: number) {
		return this.request.get<IAlbum>(`/albums/${id}/with-tracks`);
	}
}
