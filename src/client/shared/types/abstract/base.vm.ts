import {globalEmitter} from '~/client/shared/emitters/global-emitter';
import {useUserStore} from '~/client/shared/stores/user.store';

export abstract class BaseVm {

	/* Stores */
	protected get userStore() {
		return useUserStore();
	}

	protected get globalEmitter() {
		return globalEmitter;
	}
}
