import {injectable} from 'tsyringe';
import {SearchModel} from '~/client/shared/models/search.model';
import {PendingService} from '~/client/shared/services/pending.service';
import {BaseVm} from '~/client/shared/types/abstract/base.vm';
import {ISearch} from '~/client/shared/types/api';

type PendingKeys = 'init';

@injectable()
export class SearchScreenVm extends BaseVm {
	public search?: ISearch;
	public text: string;

	constructor(
		@injectDep(PendingService) public readonly pending: PendingService<PendingKeys>
	) {
		super();
		this.search = undefined;
		this.text = '';
	}

	@pending<PendingKeys>('init')
	public async init() {
		this.search = await SearchModel.search(this.text);
	}

	@debounce(300)
	public fetch() {
		this.init();
	}
}
