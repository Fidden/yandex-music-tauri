import {RequestService} from '~/client/shared/services/request.service';

export abstract class BaseModel {
	protected static request = new RequestService().create({
		baseUrl: 'https://api.music.yandex.net',
		headers: {
			'Accept-Language': 'ru',
			'Content-Type': 'application/json;charset=utf-8',
			'X-Yandex-Music-Client': 'YandexMusicAndroid/23020251',
			Authorization: 'OAuth AQAAAABevSUfAAG8Xrt2CZAbxEvSnyBU4FXXcSY'
		}
	});
}
