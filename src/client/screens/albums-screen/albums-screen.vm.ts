import {UserModel} from '~/client/shared/models/user.model';
import {BaseVm} from '~/client/shared/types/abstract/base.vm';
import type {IAlbum} from '~/client/shared/types/api';
import {IInitializable} from '~/client/shared/types/initializable';
import {PendingService} from '#imports';
import {injectable} from 'tsyringe';

type PendingKeys = 'init';

@injectable()
export class AlbumsScreenVm extends BaseVm implements IInitializable {
	public albums: IAlbum[];

	constructor(
		@injectDep(PendingService) public readonly pending: PendingService<PendingKeys>
	) {
		super();
		this.albums = [];
	}

	@pending('init')
	public async init() {
		const userAlbums = await UserModel.album.liked();
		const userAlbumsIds = userAlbums.map(item => item.id);
		this.albums = await UserModel.album.albums(userAlbumsIds);
	}
}
