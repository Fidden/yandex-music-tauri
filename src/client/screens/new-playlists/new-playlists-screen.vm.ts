import {BaseVm} from '~/client/shared/types/abstract/base.vm';
import {IPlaylist} from '~/client/shared/types/api';
import {IInitializable} from '~/client/shared/types/initializable';

export class NewPlaylistsScreenVm extends BaseVm implements IInitializable {
	public newPlaylists: IPlaylist[];

	constructor() {
		super();
		this.newPlaylists = [];
	}

	public async init() {
		const newPlaylistIds = await this.userModel.landing.newPlaylistsIds();
		this.newPlaylists = await this.userModel.playlist.byPlaylistIds(
			newPlaylistIds.map(item => `${item.uid}:${item.kind}`)
		);
	}
}
