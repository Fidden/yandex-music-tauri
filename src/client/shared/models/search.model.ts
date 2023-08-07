import {BaseModel} from '~/client/shared/types/abstract/base.model';
import {ISearch} from '~/client/shared/types/api';

export class SearchModel extends BaseModel {
	constructor() {
		super();
	}

	public static search(text: string) {
		return super.request.get<ISearch>('/search', {
			query: {
				text,
				nocorrect: 'false',
				type: 'all',
				page: '0',
				'playlist-in-best': 'false'
			}
		});
	}
}
