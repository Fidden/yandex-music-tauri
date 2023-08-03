import {UserModel} from '~/client/shared/models/user.model';
import {BaseVm} from '~/client/shared/types/abstract/base.vm';
import type {IArtist} from '~/client/shared/types/api';
import {injectable} from 'tsyringe';
import {PendingService} from '#imports';

type PendingKeys = 'init';

@injectable()
export class ArtistsScreenVm extends BaseVm {
	public artists: IArtist[];

	constructor(
		@injectDep(PendingService) public readonly pending: PendingService<PendingKeys>
	) {
		super();
		this.artists = [];
	}

	@pending<PendingKeys>('init')
	public async init() {
		this.artists = await UserModel.artist.liked();
	}
}
