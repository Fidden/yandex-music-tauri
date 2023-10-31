import {BaseVm} from '~/client/shared/types/abstract/base.vm';

@ViewModel()
export class HeaderVm extends BaseVm {
	public search: string;

	constructor() {
		super();
		this.search = '';
	}

	public init(text?: string) {
		this.search = text || '';
	}
}
