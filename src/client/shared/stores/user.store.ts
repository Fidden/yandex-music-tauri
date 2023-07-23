import {defineStore} from 'pinia';
import {IStatus} from '~/client/shared/types/api';

interface State {
	status?: IStatus;
}

export const useUserStore = defineStore('user', {
	state: (): State => ({
		status: undefined
	}),
	actions: {
		setStatus(status: IStatus) {
			this.status = status;
		}
	}
});
