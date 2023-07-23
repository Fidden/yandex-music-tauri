import {injectable} from 'tsyringe';
import {CacheService} from '~/client/shared/services/cache.service';
import {BaseVm} from '~/client/shared/types/abstract/base.vm';
import {ITrack} from '~/client/shared/types/api';
import {IInitializable} from '~/client/shared/types/initializable';

@injectable()
export class TracksScreenVm extends BaseVm implements IInitializable {
	public tracksLists: ITrack[];

	constructor() {
		super();
		this.tracksLists = [];
	}

	public async init() {
		this.tracksLists = await this.userModel.track.userList();
	}
}
