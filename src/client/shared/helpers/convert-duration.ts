export function convertDuration(milliseconds: number, lettersDelimiter = false) {
	const date = new Date(0, 0, 0, 0, 0, 0, milliseconds);
	if (lettersDelimiter) {
		if (date.getHours() > 0) {
			return `${date.getHours()} ч. ${date.getMinutes()} мин`;
		} else if (date.getMinutes() > 0) {
			return `${date.getMinutes()} м. ${date.getSeconds()} сек`;
		} else {
			return `${date.getSeconds()} сек`;
		}
	} else {
		if (date.getHours() > 0) {
			return `${date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}:${date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()}`;
		}

		return `${date.getMinutes()}:${date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()}`;
	}
}
