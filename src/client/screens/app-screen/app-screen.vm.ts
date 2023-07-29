import {UserModel} from '~/client/shared/models/user.model';
import {BaseVm} from '~/client/shared/types/abstract/base.vm';
import {IInitializable} from '~/client/shared/types/initializable';

export class AppScreenVm extends BaseVm implements IInitializable {
	constructor() {
		super();
	}

	public async init() {
		const [accountStatus] = await Promise.all([
			UserModel.account.status()
		]);

		const userId = accountStatus.account.uid;

		this.userStore.setStatus(accountStatus);
		UserModel.playlist.setup(userId);
	}
}
