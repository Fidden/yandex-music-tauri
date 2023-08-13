import {RequestService} from '~/client/shared/services/request.service';

export abstract class BaseModel {
	private static token?: string | null = localStorage.getItem('token');

	protected static request = new RequestService().create({
		baseUrl: 'https://api.music.yandex.net',
		headers: {
			'Accept-Language': 'ru',
			'Content-Type': 'application/json;charset=utf-8',
			'X-Yandex-Music-Client': 'YandexMusicAndroid/23020251',
			Authorization: `OAuth ${this.token}`
		}
	});

	public static updateToken(token: string) {
		this.token = token;
		this.request = new RequestService().create({
			baseUrl: 'https://api.music.yandex.net',
			headers: {
				'Accept-Language': 'ru',
				'Content-Type': 'application/json;charset=utf-8',
				'X-Yandex-Music-Client': 'YandexMusicAndroid/23020251',
				Authorization: `OAuth ${this.token}`
			}
		});
	}
}
