import {useUserStore} from '~/client/shared/stores/user.store';

export abstract class BaseVm {
	/* Stores */
	protected get userStore() {
		return useUserStore();
	}
}
