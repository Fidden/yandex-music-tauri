import {UserModel} from '~/client/shared/models/user.model';
import {BaseModel} from '~/client/shared/types/abstract/base.model';
import {IArtist, IArtistBrief} from '~/client/shared/types/api';

export class ArtistModel extends BaseModel {
	private static userId?: number = undefined;

	public static setup() {
		this.userId = UserModel.status?.account?.uid;
	}

	public static async liked() {
		return super.request.get<IArtist[]>(`/users/${this.userId}/likes/artists`);
	}

	public static async briefInfo(id: number) {
		return super.request.get<IArtistBrief>(`/artists/${id}/brief-info`);
	}
}
