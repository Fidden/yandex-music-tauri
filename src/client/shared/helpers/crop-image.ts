export function cropImage(url: string, width: number | string, height: number | string) {
	return `https://${url?.replace('%%', `${width}x${height}`)}`;
}
