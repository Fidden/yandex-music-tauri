import {singleton} from 'tsyringe';
import {BaseModel} from '~/client/shared/types/abstract/base.model';
import {IStatus} from '~/client/shared/types/api';

@singleton()
export class AccountModel extends BaseModel {
	constructor() {
		super();
	}

	public async status() {
		return this.request.get<IStatus>('/account/status');
	}
}
