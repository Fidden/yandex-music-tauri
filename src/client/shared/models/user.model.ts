import {singleton} from 'tsyringe';
import {useModel} from '~/client/shared/composables/useModel';
import {AccountModel} from '~/client/shared/models/account.model';
import {AlbumModel} from '~/client/shared/models/album.model';
import {ArtistModel} from '~/client/shared/models/artist.model';
import {LandingModel} from '~/client/shared/models/landing.model';
import {PlaylistModel} from '~/client/shared/models/playlist.model';
import {TrackModel} from '~/client/shared/models/track.model';
import {BaseModel} from '~/client/shared/types/abstract/base.model';

@singleton()
export class UserModel extends BaseModel {
	constructor() {
		super();
	}

	public get account() {
		return useModel(AccountModel);
	}

	public get playlist() {
		return useModel(PlaylistModel);
	}

	public get landing() {
		return useModel(LandingModel);
	}

	public get track() {
		return useModel(TrackModel);
	}

	public get artist() {
		return useModel(ArtistModel);
	}

	public get album() {
		return useModel(AlbumModel);
	}
}
