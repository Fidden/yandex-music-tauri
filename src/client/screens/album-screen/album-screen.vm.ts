import {BaseVm} from '~/client/shared/types/abstract/base.vm';
import {AlbumTypeEnum, IAlbum} from '~/client/shared/types/api';
import {IInitializable} from '~/client/shared/types/initializable';

interface InitArgs {
	id: number;
}

export class AlbumScreenVm extends BaseVm implements IInitializable {
	public album?: IAlbum;

	constructor() {
		super();
		this.album = undefined;
	}

	public async init(args: InitArgs) {
		this.album = await this.userModel.album.withTracks(args.id);
	}

	public get tracks() {
		return this.album?.volumes?.at(0);
	}

	public get isSingle() {
		return this.album?.type === AlbumTypeEnum.SINGLE;
	}

	public get hasOneTrack() {
		return this.isSingle || this.tracks?.length === 1;
	}
}
