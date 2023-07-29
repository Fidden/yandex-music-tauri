import {injectable} from 'tsyringe';
import {UserModel} from '~/client/shared/models/user.model';
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
		this.tracksLists = await UserModel.track.userList();
	}
}
