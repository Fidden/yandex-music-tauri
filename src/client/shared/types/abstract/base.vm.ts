import {useModel} from '~/client/shared/composables/useModel';
import {UserModel} from '~/client/shared/models/user.model';
import {useUserStore} from '~/client/shared/stores/user.store';

export abstract class BaseVm {
	protected constructor() {

	}

	/* Stores */
	protected get userStore() {
		return useUserStore();
	}

	/* Models */
	protected get userModel() {
		return useModel(UserModel);
	}
}
