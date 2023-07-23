import {BaseVm} from '~/client/shared/types/abstract/base.vm';
import {IArtistBrief} from '~/client/shared/types/api';
import {IInitializable} from '~/client/shared/types/initializable';

interface InitArgs {
	id: number;
}

export class ArtistScreenVm extends BaseVm implements IInitializable {
	public briefInfo?: IArtistBrief;

	constructor() {
		super();
		this.briefInfo = undefined;
	}

	public async init(args: InitArgs) {
		this.briefInfo = await this.userModel.artist.briefInfo(args.id);
	}
}
