export function debounce(delay: number): MethodDecorator {
	// @ts-ignore
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		let timeout: NodeJS.Timeout | null;

		const originalMethod = descriptor.value;

		descriptor.value = function (...args: any[]) {
			clearTimeout(timeout!);
			timeout = setTimeout(() => {
				originalMethod.apply(this, args);
			}, delay);
		};

		return descriptor;
	};
}
