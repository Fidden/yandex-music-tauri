function setImageSize(url: string, width: number | string, height: number | string) {
	return url?.replace('%%', `${width}x${height}`);
}

export function cropImage(url: string, width: number | string, height: number | string) {
	if (url.startsWith('https://') || url.startsWith('http://')) {
		return setImageSize(url, width, height);
	}

	return `https://${setImageSize(url, width, height)}`;
}
