import {BaseModel} from '~/client/shared/types/abstract/base.model';
import {IDashboard, IStationResult} from '~/client/shared/types/api';

export class StationModel extends BaseModel {
	public static dashboard() {
		return super.request.get<IDashboard>('/rotor/stations/dashboard');
	}

	public static list() {
		return super.request.get<IStationResult[]>('/rotor/stations/list');
	}
}
