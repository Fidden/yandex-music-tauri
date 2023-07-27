declare module 'vue3-bem' {
	export default function useBem(block: string): (
			e?: string | null | undefined,
			m?: string | Record<string, boolean | undefined> | string[] | undefined
	) => string[];
}
