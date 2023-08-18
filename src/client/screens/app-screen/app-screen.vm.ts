import {singleton} from 'tsyringe';
import {UserModel} from '~/client/shared/models/user.model';
import {BaseVm} from '~/client/shared/types/abstract/base.vm';
import {IInitializable} from '~/client/shared/types/initializable';

@singleton()
export class AppScreenVm extends BaseVm implements IInitializable {
	constructor() {
		super();
	}

	public async init() {
		return UserModel.init();
	}
}
