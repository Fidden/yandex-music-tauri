import {defineStore} from 'pinia';

export interface IToast {
	id: number;
	text: string;
}

interface State {
	toasts: IToast[];
}

export const useToastStore = defineStore('toasts', {
	state: (): State => ({
		toasts: []
	}),
	actions: {
		add(text: string) {
			this.toasts.push({
				id: this.toasts.length,
				text: text
			});

			setTimeout(() => {
				this.toasts.pop();
			}, 3000);
		}
	},
	getters: {
		current(state) {
			return state.toasts.at(this.toasts.length - 1);
		}
	}
});
