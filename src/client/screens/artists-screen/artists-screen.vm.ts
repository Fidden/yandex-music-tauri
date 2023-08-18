import {injectable} from 'tsyringe';
import {UserModel} from '~/client/shared/models/user.model';
import {BaseVm} from '~/client/shared/types/abstract/base.vm';
import type {IArtistShort} from '~/client/shared/types/api';


@injectable()
export class ArtistsScreenVm extends BaseVm {
	public artists: IArtistShort[];

	constructor() {
		super();
		this.artists = [];
	}

	public async init() {
		this.artists = UserModel.artist._liked;
	}
}
