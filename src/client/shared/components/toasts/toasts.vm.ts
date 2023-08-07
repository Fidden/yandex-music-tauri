import {BaseVm} from '~/client/shared/types/abstract/base.vm';

export interface IToast {
	id: number;
	text: string;
}

export class ToastsVm extends BaseVm {
	public toasts: IToast[];

	constructor() {
		super();
		this.toasts = [];
	}

	public add(text: string) {
		this.toasts.push({
			id: this.toasts.length,
			text
		});

		setTimeout(() => {
			this.toasts.pop();
		}, 3000);
	}
}
