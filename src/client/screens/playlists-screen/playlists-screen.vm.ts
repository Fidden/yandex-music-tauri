import {UserModel} from '~/client/shared/models/user.model';
import {BaseVm} from '~/client/shared/types/abstract/base.vm';
import type {ILikedPlaylist, IPlaylist} from '~/client/shared/types/api';

export class PlaylistsScreenVm extends BaseVm {
	public playlists?: IPlaylist[];
	public playlistsLiked?: ILikedPlaylist[];

	constructor() {
		super();
		this.playlists = undefined;
		this.playlistsLiked = undefined;
	}

	public async init() {
		this.playlists = await UserModel.playlist.list();
		this.playlistsLiked = await UserModel.playlist.liked();
	}
}
