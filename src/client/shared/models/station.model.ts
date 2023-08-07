import {ICurrentStation} from '~/client/shared/components/player/player.vm';
import {BaseModel} from '~/client/shared/types/abstract/base.model';
import {
	IDashboard,
	ISendStationFeedbackRequest,
	IStationResult,
	IStationTracksResult,
	SendStationFeedbackRequestTypeEnum
} from '~/client/shared/types/api';

interface IStationTracksData {
	currentStation: ICurrentStation,
	trackIdBefore?: number | string
}

interface IStationFeedbackData {
	type: SendStationFeedbackRequestTypeEnum;
	currentStation: ICurrentStation;
	totalPlayedSeconds?: number;
	trackId?: number | string;
	albumId?: number;
}

export class StationModel extends BaseModel {

	public static dashboard() {
		return super.request.get<IDashboard>('/rotor/stations/dashboard');
	}

	public static list() {
		return super.request.get<IStationResult[]>('/rotor/stations/list');
	}

	public static async info(data: ICurrentStation) {
		const res = await super.request.get<IStationResult[]>(`rotor/station/${data.type}:${data.tag}/info`);
		return res[0];
	}

	public static tracks(data: IStationTracksData) {
		return this.request.get<IStationTracksResult>(`rotor/station/${data.currentStation.type}:${data.currentStation.tag}/tracks`, {
			query: {
				queue: data.trackIdBefore
			}
		});
	}

	public static async feedback(data: IStationFeedbackData) {
		const {type, tag, batchId} = data.currentStation;
		let url = `rotor/station/${type}:${tag}/feedback?`;
		// Todo: rewrite if it's more than 1 usage case
		if (data.currentStation.batchId) {
			url += batchId;
		}

		const body: ISendStationFeedbackRequest = {
			type: data.type,
			timestamp: new Date().toISOString(),
			from: data.currentStation.idForFrom
		};


		if (data.trackId && data.albumId) {
			body.trackId = `${data.trackId}:${data.albumId}`;
		}

		if (data.totalPlayedSeconds) {
			body.totalPlayedSeconds = data.totalPlayedSeconds.toFixed(2);
		}

		const res = await super.request.post<string>(url, {
			body
		});

		return res === 'ok';
	}

	public static async settings2(currentStation: ICurrentStation, diversity: string, language: string, moodEnergy: string) {
		const res = await super.request.post<string>(`/rotor/station/${currentStation.type}:${currentStation.tag}/settings2`, {
			body: {
				diversity,
				language,
				moodEnergy
			}
		});
		return res === 'ok';
	}
}
