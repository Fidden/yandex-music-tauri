import {UserModel} from '~/client/shared/models/user.model';
import {BaseVm} from '~/client/shared/types/abstract/base.vm';
import {ITrack} from '~/client/shared/types/api';
import {IInitializable} from '~/client/shared/types/initializable';
import {PendingService} from '#imports';

type PendingKeys = 'init';

@ViewModel()
export class TracksScreenVm extends BaseVm implements IInitializable {
	public tracksLists: ITrack[];

	constructor(
		@injectDep(PendingService) public readonly pending: PendingService<PendingKeys>
	) {
		super();
		this.tracksLists = [];
	}

	@pending<PendingKeys>('init')
	public async init() {
		this.tracksLists = await UserModel.track.userList();
	}
}
