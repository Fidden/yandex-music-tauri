import {UserModel} from '~/client/shared/models/user.model';
import {BaseVm} from '~/client/shared/types/abstract/base.vm';
import type {IAlbum} from '~/client/shared/types/api';
import {IInitializable} from '~/client/shared/types/initializable';

export class AlbumsScreenVm extends BaseVm implements IInitializable {
	public albums: IAlbum[];

	constructor() {
		super();
		this.albums = [];
	}

	public async init() {
		const userAlbums = await UserModel.album.liked();
		const userAlbumsIds = userAlbums.map(item => item.id);
		this.albums = await UserModel.album.albums(userAlbumsIds);
	}
}
