import {BaseVm} from '~/client/shared/types/abstract/base.vm';
import {IContext, ILandingBlock, ILandingBlockItem} from '~/client/shared/types/api';
import {IInitializable} from '~/client/shared/types/initializable';

export class PlayContextScreenVm extends BaseVm implements IInitializable {
	public playContexts?: ILandingBlock<ILandingBlockItem<IContext>>;

	constructor() {
		super();
		this.playContexts = undefined;
	}

	public init(playContexts: ILandingBlock<ILandingBlockItem<IContext>>) {
		this.playContexts = playContexts;
	}
}
