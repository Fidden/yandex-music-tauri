export function debounce(delay: number, immediate?: boolean): MethodDecorator {
	// @ts-ignore
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		let timeout: NodeJS.Timeout = null;
		let callNow: boolean = immediate || false;

		const originalMethod = descriptor.value;

		descriptor.value = function (...args: any[]) {
			const context = this;

			const later = function() {
				timeout = null;
				if (!callNow) originalMethod.apply(context, args);
			};

			clearTimeout(timeout);
			if(callNow) {
				callNow = false;
				originalMethod.apply(context, args);
			}
			timeout = setTimeout(later, delay);
		};

		return descriptor;
	};
}
