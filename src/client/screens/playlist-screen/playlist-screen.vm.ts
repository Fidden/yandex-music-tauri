import {PendingService} from '#imports';
import {injectable} from 'tsyringe';
import {UserModel} from '~/client/shared/models/user.model';
import {BaseVm} from '~/client/shared/types/abstract/base.vm';
import type {IPlaylist, ITrack} from '~/client/shared/types/api';
import {IInitializable} from '~/client/shared/types/initializable';

interface InitArgs {
	kind: number;
	uid: number;
}

type PendingKeys = 'init';

@injectable()
export class PlaylistScreenVm extends BaseVm implements IInitializable {
	private playlist?: IPlaylist;

	constructor(
		@injectDep(PendingService) public readonly pending: PendingService<PendingKeys>
	) {
		super();
		this.playlist = undefined;
	}

	@pending<PendingKeys>('init')
	public async init(args: InitArgs) {
		this.playlist = await UserModel.playlist.one(args.kind, args.uid);
	}

	public get tracks() {
		return this.playlist?.tracks.map(item => item.track) as ITrack[];
	}

	public shuffle() {
		this.globalEmitter.emit('tracks-table:play-shuffle');
	}
}
