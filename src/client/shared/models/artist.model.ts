import {BaseModel} from '~/client/shared/types/abstract/base.model';
import IArtistBrief from '~/client/shared/types/api';
import IArtistBriefInterface, {IArtist} from '~/client/shared/types/api';

export class ArtistModel extends BaseModel {
	private userId: number;

	constructor() {
		super();
		this.userId = -1;
	}

	public setup(userId: number) {
		this.userId = userId;
	}

	public async liked() {
		return this.request.get<IArtist[]>(`/users/${this.userId}/likes/artists`);
	}

	public async briefInfo(id: number) {
		return this.request.get<IArtistBrief>(`/artists/${id}/brief-info`);
	}
}
