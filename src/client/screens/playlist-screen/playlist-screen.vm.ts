import {BaseVm} from '~/client/shared/types/abstract/base.vm';
import type {IPlaylist, ITrack} from '~/client/shared/types/api';
import {IInitializable} from '~/client/shared/types/initializable';

interface InitArgs {
	kind: number;
	uid: number;
}

export class PlaylistScreenVm extends BaseVm implements IInitializable {
	private playlist?: IPlaylist;

	constructor() {
		super();
		this.playlist = undefined;
	}

	public async init(args: InitArgs) {
		this.playlist = await this.userModel.playlist.one(args.kind, args.uid);
	}

	public get tracks() {
		return this.playlist?.tracks.map(item => item.track) as ITrack[];
	}
}
