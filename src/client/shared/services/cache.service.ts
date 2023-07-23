import {singleton} from 'tsyringe';

interface CacheServiceOptions {
	key: string;
	expire?: number;
}

interface CacheRecord {
	callback: () => unknown | Promise<unknown>;
	expireAt: Date | null;
	data: unknown;
}

@singleton()
export class CacheService {
	private records: Map<string, CacheRecord>;

	constructor() {
		this.records = new Map<string, CacheRecord>();
	}

	public async make<T>({key, expire = -1}: CacheServiceOptions, callback: () => Promise<T>) {
		const cachedData = this.get(key) as T;
		if (cachedData !== undefined) {
			return cachedData;
		}

		const expireAt = new Date();
		expireAt.setSeconds(expireAt.getSeconds() + expire);

		const data = await callback();

		this.records.set(key, {
			callback,
			expireAt: expire === -1 ? null : expireAt,
			data
		});

		return data;
	}

	public get<T>(key: string): unknown | undefined {
		const record = this.records.get(key);
		if (!record) {
			return undefined;
		}

		this.invalidate(key);

		return record.data as T;
	}

	public getRecord(key: string) {
		return this.records.get(key);
	}

	public delete(key: string) {
		this.records.delete(key);
	}

	private refresh(key: string) {
		const record = this.records.get(key);
		if (!record) {
			return;
		}

		record.data = record?.callback();
	}

	private invalidate(key: string) {
		const record = this.records.get(key);
		if (!record || record.expireAt === null) {
			return;
		}

		if (record.expireAt.getTime() >= new Date().getTime()) {
			this.refresh(key);
		}
	}
}
