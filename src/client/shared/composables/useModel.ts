export function useModel<T extends (new (...args: any) => any)>(Module: T) {
	return useNuxtApp().$container.resolve(Module) as InstanceType<T>;
}
