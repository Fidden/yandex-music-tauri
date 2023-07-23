import {singleton} from 'tsyringe';
import {PlaylistModel} from '~/client/shared/models/playlist.model';
import {BaseModel} from '~/client/shared/types/abstract/base.model';
import {ITrack} from '~/client/shared/types/api';

@singleton()
export class TrackModel extends BaseModel {
	constructor() {
		super();
	}

	public async byIds(ids: number[]) {
		const formData = new FormData();
		formData.append('trackIds', ids.toString());

		return this.request.post<ITrack[]>('/tracks', {
			formData,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		});
	}

	public async userList() {
		const playlistsKinds = (await this.playlistModel.list()).map(item => item.kind);
		// append user-favorite kind
		playlistsKinds.push(3);

		const playlistsWithTracks = await this.playlistModel.byKinds(playlistsKinds);
		const tracks = playlistsWithTracks.map(item => item.tracks).flat();
		const trackIds = tracks.map(item => item.id);

		return this.byIds(trackIds);
	}

	private get playlistModel() {
		return useModel(PlaylistModel);
	}
}
