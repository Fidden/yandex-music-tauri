import {singleton} from 'tsyringe';
import {RouteLocationNormalizedLoaded} from 'vue-router';
import {BaseVm} from '~/client/shared/types/abstract/base.vm';

export interface IBarRoute {
	to: { name: string },
	icon: string
}

const ROUTE_ITEM_HEIGHT = 50;
const ROUTE_ITEM_HALF_HEIGHT = ROUTE_ITEM_HEIGHT / 2;

@singleton()
export class BarVm extends BaseVm {
	public routes: IBarRoute[];
	public cachedRouteIndex: number;
	private currentRoute?: RouteLocationNormalizedLoaded;

	constructor() {
		super();
		this.routes = [
			{
				to: {name: 'index'},
				icon: 'fas fa-home-alt'
			},
			{
				to: {name: 'stations'},
				icon: 'fal fa-broadcast-tower'
			},
			{
				to: {name: 'tracks'},
				icon: 'fal fa-music'
			},
			{
				to: {name: 'artists'},
				icon: 'fal fa-user-music'
			},
			{
				to: {name: 'albums'},
				icon: 'fal fa-album'
			},
			{
				to: {name: 'playlists'},
				icon: 'fal fa-list-music'
			}
		];
		this.cachedRouteIndex = 0;
		this.currentRoute = undefined;
	}

	public get routeIndex() {
		return this.routes.findIndex(item => item.to.name === String(this.currentRoute?.name));
	}

	public get linePosition() {
		if (this.routeIndex < 0) {
			return `${this.cachedRouteIndex * ROUTE_ITEM_HEIGHT + ROUTE_ITEM_HALF_HEIGHT}px`;
		}

		this.cachedRouteIndex = this.routeIndex;

		return `${this.cachedRouteIndex * ROUTE_ITEM_HEIGHT + ROUTE_ITEM_HALF_HEIGHT}px`;
	}

	public updateCurrenRoute(route: RouteLocationNormalizedLoaded) {
		this.currentRoute = route;
	}
}
