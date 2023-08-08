import {injectable} from 'tsyringe';
import {UserModel} from '~/client/shared/models/user.model';
import {PendingService} from '~/client/shared/services/pending.service';
import {BaseVm} from '~/client/shared/types/abstract/base.vm';
import {IDashboard, IStation, IStationResult} from '~/client/shared/types/api';
import {IInitializable} from '~/client/shared/types/initializable';

type PendingKeys = 'init';

@injectable()
export class StationsScreenVm extends BaseVm implements IInitializable {
	public stationList?: IStationResult[];
	public stationListSplitted: Record<string, IStation[]>;
	public stationDashboard?: IDashboard;
	public stationListSplittedKeys: string[];
	public selectedKey: string;

	constructor(
		@injectDep(PendingService) public readonly pending: PendingService<PendingKeys>
	) {
		super();
		this.stationDashboard = undefined;
		this.stationList = undefined;
		this.stationListSplitted = {};
		this.stationListSplittedKeys = [];
		this.selectedKey = '';
	}

	@pending<PendingKeys>('init')
	public async init() {
		const [stationList, stationDashboard] = await Promise.all([
			UserModel.rotor.station.list(),
			UserModel.rotor.station.dashboard()
		]);

		this.stationList = stationList;
		this.stationDashboard = stationDashboard;

		this.splitStationListByCategories();
	}

	public splitStationListByCategories() {
		if (!this.stationList) {
			return;
		}

		for (const item of this.stationList) {
			const station = item.station;
			if (!station) {
				continue;
			}

			if (this.stationListSplitted[station.id.type]) {
				this.stationListSplitted[station.id.type].push(station);
			} else {
				this.stationListSplitted[station.id.type] = [station];
				this.stationListSplittedKeys.push(station.id.type);
			}
		}

		if (this.stationListSplittedKeys.length)
			this.selectedKey = this.stationListSplittedKeys[0];
	}

	public keyToHuman(key: string) {
		switch (key) {
			case 'genre':
				return 'Жанры';
			case 'mood':
				return 'Настроение';
			case 'activity':
				return 'Активность';
			case 'epoch':
				return 'Эпоха';
			case 'author':
				return 'Автор';
			case 'local':
				return 'Место';
			case 'editorial':
				return 'Редакция';
			case 'personal':
				return 'Персональное';
			default:
				return key;
		}
	}

	public get stationListByKey() {
		return this.stationListSplitted[this.selectedKey];
	}
}
