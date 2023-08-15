import {ResponseType} from '@tauri-apps/api/http';
import base64 from 'crypto-js/enc-base64';
import hmac from 'crypto-js/hmac-sha256';
import md5 from 'crypto-js/md5';
import {LikeModel} from '~/client/shared/models/like.model';
import {PlaylistModel} from '~/client/shared/models/playlist.model';
import {UserModel} from '~/client/shared/models/user.model';
import {BaseModel} from '~/client/shared/types/abstract/base.model';
import {
	ILyricsTimestamp,
	IStorageLocation,
	ITrack,
	ITrackDownloadInfo,
	ITrackShort,
	LikeActionEnum,
	ObjectTypeEnum
} from '~/client/shared/types/api';

export class TrackModel extends BaseModel {
	private static liked: ITrackShort[] = [];
	private static userId?: number = undefined;

	public static async setup() {
		this.userId = UserModel.status?.account?.uid;
		this.liked = await this.likes();
	}

	public static async like(trackId: string | number) {
		await LikeModel.action(
			ObjectTypeEnum.TRACK,
			LikeActionEnum.ADD_MULTIPLE,
			trackId
		);

		this.liked.push({id: trackId, albumId: '', timestamp: ''});
	}

	public static async dislike(trackId: string | number) {
		await LikeModel.action(
			ObjectTypeEnum.TRACK,
			LikeActionEnum.REMOVE,
			trackId
		);

		const trackIndex = this.liked.findIndex(item => item.id === trackId);
		if (trackIndex !== -1) {
			this.liked.splice(trackIndex, 1);
		}
	}

	public static likes() {
		return super.request.get<ITrackShort[]>(`/users/${this.userId}/likes/tracks`, {
			unwrapper: 'result.library.tracks'
		});
	}

	public static isLiked(trackId: string | number) {
		return this.liked.findIndex(item => item.id === trackId) !== -1;
	}

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

	public static async link(trackId: number, highQuality?: boolean) {
		const downloadInfo = await this.downloadInfo(trackId);

		const heightQuality = downloadInfo.sort((a, b) => {
			if (a.bitrateInKbps < b.bitrateInKbps) {
				return 1;
			}
			if (a.bitrateInKbps > b.bitrateInKbps) {
				return -1;
			}
			return 0;
		})?.at(highQuality ? 0 : -1);

		if (!heightQuality) {
			throw new Error('Track download info is not available.');
		}

		const storageLocations = await this.storageLocations(heightQuality?.downloadInfoUrl);

		const sign = md5(`XGRlBW9FXlekgbPrRHuSiA${storageLocations.path.slice(1)}${storageLocations.s}`);

		return `https://${storageLocations.host}/get-mp3/${sign}/${storageLocations.ts}${storageLocations.path}`;
	}

	public static lyrics(trackId: string | number) {
		const timeStamp = Date.now().toString().slice(0, -3);
		const sign = base64.stringify(
			hmac(`${trackId}${timeStamp}`, 'p93jhgh689SBReK6ghtw62')
		);

		return super.request.get<ILyricsTimestamp>(`/tracks/${trackId}/lyrics`, {
			query: {
				format: 'LRC',
				timeStamp,
				sign
			}
		});
	}


	public static async lyricsText(trackId: string | number): Promise<[number, string][]> {
		const res = await this.lyrics(trackId);
		const downloadUlr = res.downloadUrl;
		const file = await super.request.get<string>(downloadUlr, {
			unwrapper: null,
			responseType: ResponseType.Text
		});

		const stringTimeToSeconds = (time: string) => {
			const [minutes, seconds, ms] = time
				.replace('.', ':')
				.split(':');

			return Number(minutes) * 60 + Number(seconds) + Number(ms) / 1000;
		};

		return file
			.split('\n')
			.map(item => item
				.replace('[', '')
				.split('] ')
				.map((item, index) => index === 0 ? stringTimeToSeconds(item) : item)
			) as [number, string][]; // [time, text]
	}
}
