import useBem from 'vue3-bem';
import {OrderKey} from '~/client/shared/components/tracks-table/tracks-table.vm';
import {IFilterOption} from '~/client/shared/types/filter';


export const cnTracksTable = useBem('tracks-table');

export const FILTER_OPTIONS: IFilterOption[] = [
	{key: OrderKey.DEFAULT, value: 'По стандарту'},
	{key: OrderKey.BY_NAME, value: 'Название', sort: 'asc'},
	{key: OrderKey.BY_ARTIST, value: 'Артист', sort: 'asc'},
	{key: OrderKey.BY_DURATION, value: 'Длительность', sort: 'asc'}
];
