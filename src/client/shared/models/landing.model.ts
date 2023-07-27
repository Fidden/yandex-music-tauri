import {singleton} from 'tsyringe';
import {BaseModel} from '~/client/shared/types/abstract/base.model';
import {ILandingResult, LandingBlockEnum} from '~/client/shared/types/api';

@singleton()
export class LandingModel extends BaseModel {
	constructor() {
		super();
	}

	public async blocks(blocks: LandingBlockEnum[]) {
		return this.request.get<ILandingResult>(`landing3?blocks=${blocks.toString()}`);
	}

	public async newReleasesIds() {
		return this.request.get<number[]>('/landing3/new-releases', {
			unwrapper: 'result.newReleases'
		});
	}

	public async newPlaylistsIds() {
		return this.request.get<{ uid: string; kind: string }[]>('/landing3/new-playlists', {
			unwrapper: 'result.newPlaylists'
		});
	}
}
