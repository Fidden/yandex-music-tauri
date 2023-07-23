import {BaseVm} from '~/client/shared/types/abstract/base.vm';
import type {IArtist} from '~/client/shared/types/api';

export class ArtistsScreenVm extends BaseVm {
	public artists: IArtist[];

	constructor() {
		super();
		this.artists = [];
	}

	public async init() {
		this.artists = await this.userModel.artist.liked();
	}
}
