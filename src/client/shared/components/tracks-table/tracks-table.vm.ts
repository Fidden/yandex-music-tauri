import {PlayerVm} from '~/client/shared/components/player/player.vm';
import {BaseVm} from '~/client/shared/types/abstract/base.vm';
import {IArtist, IPopularTrack, ITrack} from '~/client/shared/types/api';
import {IInitializable} from '~/client/shared/types/initializable';

export type TrackType = ITrack | IPopularTrack;

export enum OrderValues {
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
	order: OrderValues;
}

export class TracksTableVm extends BaseVm implements IInitializable {
	public tracks: TrackType[];
	public filter: IFilter;

	constructor() {
		super();
		this.tracks = [];
		this.filter = {
			name: '',
			order: OrderValues.DEFAULT
		};
	}

	public init(args: InitArgs) {
		this.tracks = args.tracks;
	}

	public addToQueue(index: number) {
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

		switch (this.filter.order) {
			case OrderValues.BY_ARTIST:
				output.sort(this.compareArtists);
				break;
			case OrderValues.BY_DURATION:
				output.sort(this.compareDuration);
				break;
			case OrderValues.BY_NAME:
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

		return output;
	}

	private compareName(a: TrackType, b: TrackType) {
		if (a.title > b.title) {
			return 1;
		}

		if (a.title < b.title) {
			return -1;
		}

		return 0;
	}

	private compareArtists(a: TrackType, b: TrackType) {
		const getArtistMappingName = (artists: Array<IArtist>) => {
			return artists.map(item => item.name[0]).toString();
		};

		if (getArtistMappingName(a.artists) > getArtistMappingName(b.artists)) {
			return 1;
		}

		if (getArtistMappingName(a.artists) < getArtistMappingName(b.artists)) {
			return -1;
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
		return useVm(PlayerVm, true);
	}
}
