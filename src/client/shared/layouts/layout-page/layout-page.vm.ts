import {injectable} from 'tsyringe';
import {RouteLocationNormalizedLoaded} from 'vue-router';
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

	public onScroll(route: RouteLocationNormalizedLoaded) {
		const routeName = String(route.name);
		if (!this.layoutContentRef || this.excludeRoutes.includes(routeName)) {
			return;
		}

		this.scrollCache.set(String(route.name), this.layoutContentRef!.scrollTop);
	}

	public async onRouteChange(routeName: string) {
		if (!this.layoutContentRef) {
			return;
		}

		const routerName = String(routeName);
		const offset = this.scrollCache.get(routerName);
		if (!offset) {
			this.layoutContentRef!.scrollTo(0, 0);
			return;
		}

		await nextTick();

		this.layoutContentRef!.scrollTo({
			top: offset
		});
	}
}
