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
		if (this.playlists && this.playlistsLiked) {
			return;
		}

		this.playlists = await this.userModel.playlist.list();
		this.playlistsLiked = await this.userModel.playlist.liked();
	}
}
