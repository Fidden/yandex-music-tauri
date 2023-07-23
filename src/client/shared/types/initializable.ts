export interface IInitializable {
	init(args?: unknown): void | Promise<void>;
}
