import {Body, Client, getClient, ResponseType} from '@tauri-apps/api/http';

export class AuthModel {
	private static client: Client;
	private static csrfToken: string = '';
	private static trackId: string = '';
	private static authorizationSetCookie: string[] = [];

	public static async setup() {
		this.client = await getClient();
		const csrfToken = await this.getCsrfToken();
		if (!csrfToken) {
			throw new Error('Csrf token is undefined.');
		}

		this.csrfToken = csrfToken;

		return this;
	}

	private static async getCsrfToken() {
		const res = await this.client.get<string>('https://passport.yandex.ru/am?app_platform=android', {
			responseType: ResponseType.Text
		});

		console.log(res.data);
		console.log(res.data.match(/"csrf_token" value="([^"]+)"/));

		return res.data.match(/"csrf_token" value="([^"]+)"/)?.at(1);
	}

	public static async getQrLink() {
		const formData = new FormData();
		formData.append('csrf_token', String(this.csrfToken));
		formData.append('retpath', 'https://passport.yandex.ru/profile');
		formData.append('with_code', '1');

		const res = await this.client.post<any>('https://passport.yandex.ru/registration-validations/auth/password/submit',
			Body.form(formData), {
				responseType: ResponseType.JSON
			}
		);

		this.csrfToken = res.data.csrf_token;
		this.trackId = res.data.track_id;

		return `https://passport.yandex.ru/auth/magic/code/?track_id=${this.trackId}`;
	}

	public static async checkAuthorization() {
		const formData = new FormData();
		formData.append('csrf_token', String(this.csrfToken));
		formData.append('track_id', String(this.trackId));

		const res = await this.client.post<any>('https://passport.yandex.ru/auth/new/magic/status/',
			Body.form(formData),
			{
				responseType: ResponseType.JSON
			});

		this.authorizationSetCookie = res.rawHeaders['set-cookie'];

		console.log('checkAuthorization', res.data);

		return res.data.status === 'ok';
	}

	public static buildCookies() {
		const rawCookies = this.authorizationSetCookie.map(cookieString => {
			const [nameValuePair, ...attrsPairs] = cookieString.split('; ');
			const [name, value] = nameValuePair.split('=');
			let domain = '';
			attrsPairs.forEach(attrPair => {
				const [attrName, attrValue] = attrPair.split('=');
				if (attrName.toLowerCase() === 'domain') {
					domain = attrValue;
				}
			});
			return {name, value, domain};
		});

		return rawCookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
	}

	private static async getXToken() {
		const formData = new FormData();
		formData.append('client_id', 'c0ebe342af7d48fbbbfcf2d2eedb8f9e');
		formData.append('client_secret', 'ad0a908f0aa341a182a37ecd75bc319e');

		const res = await this.client.post<any>('https://mobileproxy.passport.yandex.net/1/bundle/oauth/token_by_sessionid',
			Body.form(formData), {
				headers: {
					'Ya-Client-Host': 'passport.yandex.ru',
					'Ya-Client-Cookie': this.buildCookies()
				}
			}
		);

		return res.data.access_token;
	}

	public static async getToken() {
		const formData = new FormData();
		formData.append('client_secret', '53bc75238f0c4d08a118e51fe9203300');
		formData.append('client_id', '23cabbbdc6cd418abb4b39c32c41195d');
		formData.append('grant_type', 'x-token');
		formData.append('access_token', await this.getXToken());

		const res = await this.client.post<any>('https://oauth.mobile.yandex.net/1/token', Body.form(formData));

		return res.data.access_token;
	}
}
