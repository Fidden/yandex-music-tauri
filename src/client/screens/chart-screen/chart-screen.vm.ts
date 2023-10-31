import {PendingService} from '#imports';
import {UserModel} from '~/client/shared/models/user.model';
import {BaseVm} from '~/client/shared/types/abstract/base.vm';
import {IFullChartResult} from '~/client/shared/types/api';
import {IInitializable} from '~/client/shared/types/initializable';

type PendingKeys = 'init';

@ViewModel()
export class ChartScreenVm extends BaseVm implements IInitializable {
	public chart: IFullChartResult;

	constructor(
		@injectDep(PendingService) private readonly pending: PendingService<PendingKeys>
	) {
		super();
	}

	@pending<PendingKeys>('init')
	public async init() {
		this.chart = await UserModel.landing.chartFull();
	}

	public get tracks() {
		return this.chart.chart.tracks.map(item => item.track);
	}
}
