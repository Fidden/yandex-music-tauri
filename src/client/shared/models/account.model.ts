import {BaseModel} from '~/client/shared/types/abstract/base.model';
import {IStatus} from '~/client/shared/types/api';

export class AccountModel extends BaseModel {
	constructor() {
		super();
	}

	public static async status() {
		return super.request.get<IStatus>('/account/status');
	}
}
