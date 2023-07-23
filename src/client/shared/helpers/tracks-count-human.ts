export function tracksCountHuman(count: number) {
	switch (count % 10) {
		case 1:
			return `${count} трек`;
		case 2:
		case 3:
		case 4:
			return `${count} трека`;
		default:
			return `${count} треков`;
	}
}
