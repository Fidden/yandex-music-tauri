import {useModel} from '~/client/shared/composables/useModel';
import {UserModel} from '~/client/shared/models/user.model';
import {BaseVm} from '~/client/shared/types/abstract/base.vm';
import {IInitializable} from '~/client/shared/types/initializable';

export class AppScreenVm extends BaseVm implements IInitializable {
	constructor() {
		super();
	}

	public get userModel() {
		return useModel(UserModel);
	}

	public async init() {
		const [accountStatus] = await Promise.all([
			this.userModel.account.status()
		]);

		const userId = accountStatus.account.uid;

		this.userStore.setStatus(accountStatus);
		this.userModel.playlist.setup(userId);
	}
}
