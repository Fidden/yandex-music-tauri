import {Body, fetch, Response, ResponseType} from '@tauri-apps/api/http';

type RequestMethods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS' | 'CONNECT' | 'TRACE';

interface CreateOptions {
	baseUrl: string,
	headers: Record<string, string>,
}

interface RequestOptions {
	headers?: Record<string, any>;
	query?: Record<string, any>;
	body?: Record<string, any>;
	formData?: FormData;
	timeout?: number;
	responseType?: ResponseType;
	method: RequestMethods;
}

class RequestError<T = any> extends Error {
	private info: Response<T>;

	constructor(info: Response<T>) {
		super('Request error');
		this.info = info;
	}
}

interface RequestCache {
	query?: RequestOptions['query'];
	body?: RequestOptions['body'];
	response: Response<unknown>;
}

export class RequestService {
	private baseUrl?: string;
	private headers?: Record<string, string>;
	private cache: Record<string, RequestCache>;

	constructor() {
		this.baseUrl = '';
		this.headers = {};
		this.cache = {};
	}

	public create(options: CreateOptions) {
		this.baseUrl = options.baseUrl;
		this.headers = options.headers;
		return this;
	}

	public get<T>(url: string, options?: Omit<RequestOptions, 'method'>) {
		return this.requestFactory<T>(url, {
			method: 'GET',
			...options
		});
	}

	public post<T>(url: string, options?: Omit<RequestOptions, 'method'>) {
		return this.requestFactory<T>(url, {
			method: 'POST',
			...options
		});
	}

	private async requestFactory<T>(url: string, options: RequestOptions) {

		// @ts-ignore
		const res = await fetch<T>(this.buildUrl(url), this.buildOptions(options));
		// @ts-ignore
		if (!res.ok || !res.data?.result) {
			console.error('[ERROR]:', res, options);
			throw new RequestError(res);
		}

		console.log('[RESPONSE]:', res);

		// @ts-ignore
		return res.data.result as Promise<T>;
	}

	private sanitizeUrl(url: string) {
		let sanitizedUrl = url;
		if (sanitizedUrl.startsWith('/')) {
			sanitizedUrl = sanitizedUrl.substring(1);
		}

		if (sanitizedUrl.endsWith('/')) {
			sanitizedUrl = sanitizedUrl.substring(0, sanitizedUrl.length - 1);
		}

		return sanitizedUrl;
	}

	private buildUrl(url: string) {
		return `${this.baseUrl}/${this.sanitizeUrl(url)}`;
	}

	private buildOptions(options: RequestOptions) {
		const newOptions: RequestOptions = {
			...options,
			headers: {
				...this.headers,
				...options.headers
			},
			method: options?.method || 'GET'
		};

		if (options.body) {
			newOptions.body = Body.form(options.body);
		}

		if (options.formData) {
			newOptions.body = Body.form(options.formData);
		}

		return newOptions;
	}
}
