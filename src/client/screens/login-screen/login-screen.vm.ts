import {globalEmitter} from '~/client/shared/emitters/global.emitter';
import {AuthModel} from '~/client/shared/models/auth.model';
import {BaseVm} from '~/client/shared/types/abstract/base.vm';
import {IInitializable} from '~/client/shared/types/initializable';

export class LoginScreenVm extends BaseVm implements IInitializable {
	public qrLink?: string;
	public intervalId?: NodeJS.Timer;
	public qrRef?: HTMLImageElement;

	constructor() {
		super();
		this.qrRef = undefined;
		this.qrLink = undefined;
		this.intervalId = undefined;
	}

	public async init() {
		const auth = await AuthModel.setup();
		this.qrLink = await auth.getQrLink();

		this.intervalId = setInterval(async () => {
			if (await auth.checkAuthorization()) {
				const token = await auth.getToken();
				if (token) {
					globalEmitter.emit('auth:success', token);
					clearInterval(this.intervalId);
				}
			}
		}, 4000);
	}
}
