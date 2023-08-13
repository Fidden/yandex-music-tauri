import {BaseModel} from '~/client/shared/types/abstract/base.model';
import {IAccountFullInfo, IStatus} from '~/client/shared/types/api';

export class AccountModel extends BaseModel {
	constructor() {
		super();
	}

	public static async status() {
		return super.request.get<IStatus>('/account/status');
	}

	public static async fullInfo() {
		return await super.request.get<IAccountFullInfo>('https://login.yandex.ru/info', {
			query: {
				oauth_token: localStorage.getItem('token')
			},
			unwrapper: null
		});
	}
}
