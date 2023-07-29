import {UserModel} from '~/client/shared/models/user.model';
import {BaseVm} from '~/client/shared/types/abstract/base.vm';
import {IAlbum} from '~/client/shared/types/api';
import {IInitializable} from '~/client/shared/types/initializable';

export class NewReleasesScreenVm extends BaseVm implements IInitializable {
	public newReleases: IAlbum[];

	constructor() {
		super();
		this.newReleases = [];
	}

	public async init() {
		const newReleasesIds = await UserModel.landing.newReleasesIds();
		this.newReleases = await UserModel.album.albums(newReleasesIds);
	}
}
