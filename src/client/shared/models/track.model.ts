import md5 from 'crypto-js/md5';
import {PlaylistModel} from '~/client/shared/models/playlist.model';
import {BaseModel} from '~/client/shared/types/abstract/base.model';
import {IStorageLocation, ITrack, ITrackDownloadInfo} from '~/client/shared/types/api';

export class TrackModel extends BaseModel {

	public static async byIds(ids: number[]) {
		const formData = new FormData();
		formData.append('trackIds', ids.toString());

		return super.request.post<ITrack[]>('/tracks', {
			formData,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		});
	}

	public static async userList() {
		const playlistsKinds = (await PlaylistModel.list()).map(item => item.kind);
		// append user-favorite kind
		playlistsKinds.push(3);

		const playlistsWithTracks = await PlaylistModel.byKinds(playlistsKinds);
		const tracks = playlistsWithTracks.map(item => item.tracks).flat();
		const trackIds = tracks.map(item => item.id);

		return this.byIds(trackIds);
	}

	public static async downloadInfo(trackId: number) {
		return super.request.get<ITrackDownloadInfo[]>(`tracks/${trackId}/download-info`);
	}

	public static async storageLocations(downloadInfoUrl: string) {
		return super.request.get<IStorageLocation>(`${downloadInfoUrl}&format=json`, {
			unwrapper: null
		});
	}

	public static async link(trackId: number) {
		const downloadInfo = await this.downloadInfo(trackId);

		const heightQuality = downloadInfo.sort((a, b) => {
			if (a.bitrateInKbps < b.bitrateInKbps) {
				return 1;
			}
			if (a.bitrateInKbps > b.bitrateInKbps) {
				return -1;
			}
			return 0;
		})[0];

		const storageLocations = await this.storageLocations(heightQuality?.downloadInfoUrl);

		const sign = md5('XGRlBW9FXlekgbPrRHuSiA${storageLocations.path.slice(1)}${storageLocations.s}');

		return `https://${storageLocations.host}/get-mp3/${sign}/${storageLocations.ts}${storageLocations.path}`;
	}
}
