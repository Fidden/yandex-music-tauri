import {injectable} from 'tsyringe';
import {BaseVm} from '~/client/shared/types/abstract/base.vm';

@injectable()
export class LayoutPageVm extends BaseVm {
	public layoutContentRef: HTMLDivElement | null;
	public scrollCache: Map<string, number>;
	public excludeRoutes: string[];

	constructor() {
		super();
		this.layoutContentRef = null;
		this.scrollCache = new Map<string, number>();
		this.excludeRoutes = ['playlist-uid-kind', 'album-id', 'artist-id'];
	}
}
