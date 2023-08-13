import {globalEmitter} from '~/client/shared/emitters/global.emitter';
import {UserModel} from '~/client/shared/models/user.model';
import {BaseVm} from '~/client/shared/types/abstract/base.vm';

export class ProfileScreenVm extends BaseVm {
	constructor() {
		super();
	}

	public get hasPlus() {
		return Boolean(UserModel.status?.plus?.hasPlus);
	}

	public get permissionsDate() {
		if (!UserModel.status?.permissions?.until)
			return;

		return new Date(UserModel.status?.permissions?.until).toLocaleString('ru-RU', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	public exit() {
		globalEmitter.emit('auth:logout');
	}
}
