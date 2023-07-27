export function convertTime(value: number) {
	const time = new Date(value * 1000).toISOString().substr(11, 8);
	return time.indexOf('00:') === 0 ? time.substr(3) : time;
}
