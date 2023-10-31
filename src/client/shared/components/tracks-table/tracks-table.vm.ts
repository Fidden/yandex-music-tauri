import {PlayerVm} from '~/client/shared/components/player/player.vm';
import {BaseVm} from '~/client/shared/types/abstract/base.vm';
import {IArtist, IPopularTrack, ITrack} from '~/client/shared/types/api';
import {IInitializable} from '~/client/shared/types/initializable';

export type TrackType = ITrack | IPopularTrack;

export enum OrderKey {
	DEFAULT,
	BY_NAME,
	BY_ARTIST,
	BY_DURATION
}

interface InitArgs {
	tracks: TrackType[];
}

interface IFilter {
	name: string;
	orderBy: IFilterOption;
}

interface IFilterOption {
	key: OrderKey;
	value: string;
	sort?: 'asc' | 'desc';
}

export class TracksTableVm extends BaseVm implements IInitializable {
	public tracks: TrackType[];
	public filter: IFilter;
	public filterOptions: IFilterOption[];


	constructor() {
		super();
		this.tracks = [];
		this.filterOptions = [
			{key: OrderKey.DEFAULT, value: 'По стандарту'},
			{key: OrderKey.BY_NAME, value: 'Название', sort: 'asc'},
			{key: OrderKey.BY_ARTIST, value: 'Артист', sort: 'asc'},
			{key: OrderKey.BY_DURATION, value: 'Длительность', sort: 'asc'}
		];

		this.filter = {
			name: '',
			orderBy: this.filterOptions[0]
		};
	}

	public init(args: InitArgs) {
		this.tracks = args.tracks;
	}

	public addToQueue(index: number, trackId?: string | number) {
		if (trackId === this.playerVm.track?.id && trackId !== undefined && this.playerVm.track?.id !== undefined) {
			this.playerVm.toggle();
			return;
		}

		const startSlice = this.filteredTracks.slice(index, this.filteredTracks.length);
		const endSlice = this.filteredTracks.slice(0, index);

		const tracksList = [
			...startSlice,
			...endSlice
		];

		this.playerVm.clearQueue();
		this.playerVm.setQueue(tracksList);
	}

	public get filteredTracks() {
		let output = [...this.tracks];

		switch (this.filter.orderBy.key) {
			case OrderKey.BY_ARTIST:
				output.sort(this.compareArtists);
				break;
			case OrderKey.BY_DURATION:
				output.sort(this.compareDuration);
				break;
			case OrderKey.BY_NAME:
				output.sort(this.compareName);
				break;
		}

		const filteredByName = output.filter(item => {
			return item.title.toLowerCase().includes(this.filter.name.toLowerCase()) ||
				item.artists.findIndex(item => item.name.toLowerCase().includes(this.filter.name.toLowerCase())) !== -1;
		});

		output = filteredByName.concat(output.filter(item => {
			return filteredByName.indexOf(item) === -1;
		}));

		const needReverse = this.filter.orderBy.sort === 'asc' && this.filter.orderBy.key !== OrderKey.DEFAULT;

		return needReverse ? output.reverse() : output;
	}

	private compareName(a: TrackType, b: TrackType) {
		if (a.title > b.title) {
			return -1;
		}

		if (a.title < b.title) {
			return 1;
		}

		return 0;
	}

	private compareArtists(a: TrackType, b: TrackType) {
		const getArtistMappingName = (artists: Array<IArtist>) => {
			return artists.map(item => item.name[0]).toString();
		};

		if (getArtistMappingName(a.artists) > getArtistMappingName(b.artists)) {
			return -1;
		}

		if (getArtistMappingName(a.artists) < getArtistMappingName(b.artists)) {
			return 1;
		}

		return 0;
	}

	private compareDuration(a: TrackType, b: TrackType) {
		if (a.durationMs > b.durationMs) {
			return 1;
		}

		if (a.durationMs < b.durationMs) {
			return -1;
		}

		return 0;
	}

	private get playerVm() {
		return useChildVm(PlayerVm);
	}

	public get filterOrderValue() {
		return this.filterOptions.find(item => item.key === this.filter.orderBy.key)?.value;
	}

	public onFilterChange(option: IFilterOption) {
		if (option?.sort === undefined) {
			this.filter.orderBy = option;
			return;
		}

		// if option.key equals to current option.key, then we need to change sort
		if (option.key === this.filter.orderBy.key) {
			option.sort = option.sort === 'asc' ? 'desc' : 'asc';
		}
		// otherwise we need to change option and set sort of previous option to 'asc'
		else {
			const prevOption = this.filterOptions.find(item => item.key === this.filter.orderBy.key);
			if (prevOption?.sort) {
				prevOption!.sort = 'asc';
			}

			this.filter.orderBy = option;
		}
	}
}
