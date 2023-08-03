import {UserModel} from '~/client/shared/models/user.model';
import {BaseVm} from '~/client/shared/types/abstract/base.vm';
import {AlbumTypeEnum, IAlbum} from '~/client/shared/types/api';
import {IInitializable} from '~/client/shared/types/initializable';
import {injectable} from 'tsyringe';
import {PendingService} from '#imports';

interface InitArgs {
	id: number;
}

type PendingKeys = 'init';

@injectable()
export class AlbumScreenVm extends BaseVm implements IInitializable {
	public album?: IAlbum;

	constructor(
		@injectDep(PendingService) public readonly pending: PendingService<PendingKeys>
	) {
		super();
		this.album = undefined;
	}

	@pending<PendingKeys>('init')
	public async init(args: InitArgs) {
		this.album = await UserModel.album.withTracks(args.id);
	}

	public get tracks() {
		return this.album?.volumes?.flat();
	}

	public get isSingle() {
		return this.album?.type === AlbumTypeEnum.SINGLE;
	}

	public get hasOneTrack() {
		return this.isSingle || this.tracks?.length === 1;
	}
}
