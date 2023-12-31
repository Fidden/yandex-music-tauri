import {BaseModel} from '~/client/shared/types/abstract/base.model';
import {IFullChartResult, ILandingResult, INewPlaylistItem, LandingBlockEnum} from '~/client/shared/types/api';

export class LandingModel extends BaseModel {

	public static async blocks(blocks: LandingBlockEnum[]) {
		return super.request.get<ILandingResult>(`landing3?blocks=${blocks.toString()}`);
	}

	public static async newReleasesIds() {
		return super.request.get<number[]>('/landing3/new-releases', {
			unwrapper: 'result.newReleases'
		});
	}

	public static async newPlaylistsIds() {
		return super.request.get<INewPlaylistItem[]>('/landing3/new-playlists', {
			unwrapper: 'result.newPlaylists'
		});
	}

	public static async chartFull() {
		return super.request.get<IFullChartResult>('/landing3/chart');
	}
}
