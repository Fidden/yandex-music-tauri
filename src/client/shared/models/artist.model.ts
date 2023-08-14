import {LikeModel} from '~/client/shared/models/like.model';
import {UserModel} from '~/client/shared/models/user.model';
import {BaseModel} from '~/client/shared/types/abstract/base.model';
import {
	ArtistId,
	IArtist,
	IArtistBrief,
	IArtistShort,
	ITrack,
	LikeActionEnum,
	ObjectTypeEnum
} from '~/client/shared/types/api';

export class ArtistModel extends BaseModel {
	private static userId?: number = undefined;
	private static _liked: IArtistShort[] = [];

	public static async setup() {
		this.userId = UserModel.status?.account?.uid;
		this._liked = await this.liked();
	}

	public static async liked() {
		return super.request.get<IArtistShort[]>(`/users/${this.userId}/likes/artists`);
	}

	public static isLiked(artistId: ArtistId) {
		return this._liked.findIndex(item => item.id == artistId) !== -1;
	}

	public static async like(artist: IArtistShort | IArtist) {
		await LikeModel.action(
			ObjectTypeEnum.ARTIST,
			LikeActionEnum.ADD_MULTIPLE,
			artist.id
		);

		this._liked.push(<IArtistShort>artist);
	}

	public static async dislike(artist: IArtistShort | IArtist) {
		await LikeModel.action(
			ObjectTypeEnum.ARTIST,
			LikeActionEnum.REMOVE,
			artist.id
		);

		const artistIndex = this._liked.findIndex(item => item.id === artist.id);
		if (artistIndex !== -1) {
			this._liked.splice(artistIndex, 1);
		}
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
