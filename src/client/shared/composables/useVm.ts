/**
 @author Fidden
 inspired by WayZer/pinia-class-store
 */
import {defineStore, getActivePinia, Store} from 'pinia';
import {onDeactivated, onUnmounted} from 'vue';
import {ModuleExt, PiniaStore} from '~/client/shared/types/store';


export function useVm<T extends (new (...args: any) => any), G extends InstanceType<T> = InstanceType<T>>(Module0: T, child = false, id?: string)
	: G & Omit<PiniaStore<G>, keyof G> {
	const pinia = getActivePinia();
	const {$container, payload} = useNuxtApp();
	const Module = Module0 as T & ModuleExt;
	const instance = $container.resolve(Module);
	id = id || Module.name;

	/*
	* Build store on server side
	*/
	if (!child || (child && !Module._storeOptions)) {
		const option = {
			/**
			 * Set initialState from nuxt.payload
			 */
			initialState: payload.pinia?.hasOwnProperty(Module.name) ? (payload.pinia as Record<string, any>)[Module.name] : {},
			getters: {} as any,
			actions: {} as any
		};

		for (const key of Object.keys(instance)) {
			if (instance.hasOwnProperty(key)) {
				/**
				 * Set new data only if it is not included from payload
				 */
				if (!option.initialState[key]) {
					option.initialState[key] = instance[key];
				}
			}
		}

		for (const key of Object.getOwnPropertyNames(Module.prototype)) {
			const descriptor = Object.getOwnPropertyDescriptor(Module.prototype, key)!;
			if (descriptor.get) {
				option.getters[key] = (state: G) => descriptor.get!.call(state);
			}
			if (descriptor.value) {
				option.actions[key] = Module.prototype[key];
			}
		}

		Module._storeOptions = option;
	}

	if (!Module._storeOptions) {
		throw new Error('Module can not be found. It seems like you forgot to call general modal with "child: false"');
	}

	const {
		initialState,
		getters,
		actions
	} = Module._storeOptions;

	const store = defineStore(id, {
		state: () => initialState,
		getters,
		actions
	})() as Store;

	/**
	 * Automatic model dispose on view onMount
	 */
	onUnmounted(() => {
		if (!pinia || !id || child) {
			return;
		}

		delete pinia.state.value[id];
		store.$dispose();
	});

	onDeactivated(() => {
		if (!pinia || !id || child) {
			return;
		}

		store.$dispose();
	});

	Object.setPrototypeOf(store, Module.prototype);
	return store as G;
}
