import {Store} from 'pinia';

export interface ModuleExt {
	_storeOptions?: {
		initialState: NonNullable<any>,
		getters: NonNullable<unknown>,
		actions: NonNullable<unknown>
	};
}

// magic, see https://github.com/Microsoft/TypeScript/issues/27024
export type Magic<X> = (<T>() => T extends X ? 1 : 2)

export type Actions<T extends Record<string, any>> = {
	[P in keyof T as T[P] extends (...args: any[]) => any ? P : never]: T[P];
};
export type Getters<T extends Record<string, any>> = {
	[P in keyof T as Magic<Pick<T, P>> extends Magic<Readonly<Pick<T, P>>> ? P : never]: T[P];
};
export type States<T extends Record<string, any>> = Omit<{
	[P in keyof T as Magic<Pick<T, P>> extends Magic<Readonly<Pick<T, P>>> ? never : P]: T[P];
}, keyof Actions<T>>;

export type PiniaStore<G extends Record<string, any>> = Store<string, States<G>, Getters<G>, Actions<G>>
