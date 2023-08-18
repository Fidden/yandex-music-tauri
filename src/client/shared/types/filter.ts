export interface IFilterOption {
	key: OrderKey;
	value: string;
	sort?: 'asc' | 'desc';
}

export interface IFilter {
	name: string;
	orderBy: IFilterOption;
}

export enum OrderKey {
	DEFAULT,
	BY_NAME,
	BY_ARTIST,
	BY_DURATION
}
