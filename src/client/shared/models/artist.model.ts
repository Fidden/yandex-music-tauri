import {UserModel} from '~/client/shared/models/user.model';
import {BaseModel} from '~/client/shared/types/abstract/base.model';
import {ArtistId, IArtist, IArtistBrief, ITrack} from '~/client/shared/types/api';

export class ArtistModel extends BaseModel {
	private static userId?: number = undefined;

	public static setup() {
		this.userId = UserModel.status?.account?.uid;
	}

	public static async liked() {
		return super.request.get<IArtist[]>(`/users/${this.userId}/likes/artists`);
	}

	public static async briefInfo(artistId: ArtistId) {
		return super.request.get<IArtistBrief>(`/artists/${artistId}/brief-info`);
	}

	public static async tracks(artistId: ArtistId) {
		return super.request.get<ITrack[]>(`/artists/${artistId}/tracks`, {
			unwrapper: 'result.tracks'
		});
	}
}
