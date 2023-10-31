import {PendingService} from '#imports';
import {UserModel} from '~/client/shared/models/user.model';
import {BaseVm} from '~/client/shared/types/abstract/base.vm';
import type {IArtistShort} from '~/client/shared/types/api';

type PendingKeys = 'init';

@ViewModel()
export class ArtistsScreenVm extends BaseVm {
	public artists: IArtistShort[];

	constructor(
		@injectDep(PendingService) public readonly pending: PendingService<PendingKeys>
	) {
		super();
		this.artists = [];
	}

	@pending<PendingKeys>('init')
	public async init() {
		this.artists = UserModel.artist._liked;
	}
}
