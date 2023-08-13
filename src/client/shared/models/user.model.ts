import {AccountModel} from '~/client/shared/models/account.model';
import {AlbumModel} from '~/client/shared/models/album.model';
import {ArtistModel} from '~/client/shared/models/artist.model';
import {LandingModel} from '~/client/shared/models/landing.model';
import {LikeModel} from '~/client/shared/models/like.model';
import {PlaylistModel} from '~/client/shared/models/playlist.model';
import {RotorModel} from '~/client/shared/models/rotor.model';
import {TrackModel} from '~/client/shared/models/track.model';
import {BaseModel} from '~/client/shared/types/abstract/base.model';
import {IAccountFullInfo, IStatus} from '~/client/shared/types/api';

export class UserModel extends BaseModel {
	public static status?: IStatus = undefined;
	public static fullInfo?: IAccountFullInfo = undefined;

	public static async init() {
		const [status, fullInfo] = await Promise.all([
			this.account.status(),
			this.account.fullInfo()
		]);

		this.status = status;
		this.fullInfo = fullInfo;

		this.album.setup();
		this.artist.setup();

		await Promise.all([
			this.playlist.setup(),
			this.track.setup()
		]);

		return this;
	}

	public static get avatarUrl() {
		return `https://avatars.yandex.net/get-yapic/${this.fullInfo?.default_avatar_id}/%%`;
	}

	public static get account() {
		return AccountModel;
	}

	public static get playlist() {
		return PlaylistModel;
	}

	public static get landing() {
		return LandingModel;
	}

	public static get track() {
		return TrackModel;
	}

	public static get artist() {
		return ArtistModel;
	}

	public static get album() {
		return AlbumModel;
	}

	public static get rotor() {
		return RotorModel;
	}

	public static get like() {
		return LikeModel;
	}
}
