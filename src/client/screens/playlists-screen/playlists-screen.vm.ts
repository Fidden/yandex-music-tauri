import {UserModel} from '~/client/shared/models/user.model';
import {BaseVm} from '~/client/shared/types/abstract/base.vm';
import type {IPlaylistShort, IPlaylist} from '~/client/shared/types/api';
import {injectable} from 'tsyringe';
import {PendingService} from '#imports';

type PendingKeys = 'init';

@injectable()
export class PlaylistsScreenVm extends BaseVm {
	public playlists?: IPlaylist[];
	public playlistsLiked?: IPlaylistShort[];

	constructor(
		@injectDep(PendingService) public readonly pending: PendingService<PendingKeys>
	) {
		super();
		this.playlists = undefined;
		this.playlistsLiked = undefined;
	}

	@pending<PendingKeys>('init')
	public async init() {
		this.playlists = await UserModel.playlist.list();
		this.playlistsLiked = await UserModel.playlist.liked();
	}
}
