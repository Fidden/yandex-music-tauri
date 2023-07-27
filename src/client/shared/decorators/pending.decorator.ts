export function pending<TKey extends string>(key: TKey) {
	return function (target: any, propertyKey: string, descriptor: any) {
		const originalMethod = descriptor.value;

		descriptor.value = async function (...args: any[]) {
			if (!this.pending) {
				throw new Error('Inject "pending.service" first.');
			}

			if (!this.pending.keys[key]) {
				this.pending.keys[key] = 0;
			}

			try {
				this.pending.keys[key]++;
				return await originalMethod.apply(this, args);
			} catch (e: any) {
				console.error(e);
			} finally {
				this.pending.keys[key]--;
			}
		};

		return descriptor;
	};
}
