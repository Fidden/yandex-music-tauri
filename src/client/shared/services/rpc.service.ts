import RPC, {Client} from 'discord-rpc';
import {IPopularTrack, ITrack} from '~/client/shared/types/api';

export enum RpcActivityType {
	NONE,
	TRACK
}

interface RpcActivity {
	type: RpcActivityType,
	track?: ITrack | IPopularTrack;
}

// TODO: rewrite lib, send "beacon" instead "fetch" cuz we dont care about rpc answer
export class RpcService {
	private client: Client;

	constructor() {
		RPC.register(this.runtimeConfig.public.discordRpcClientId as string);
		this.client = new RPC.Client({transport: 'ipc'});
	}

	public setActivity(activity: RpcActivity) {
		if (activity.type === RpcActivityType.NONE) {
			this.client.setActivity({
				details: 'Ничего не слушает',
				largeImageKey: 'yandex-rpc'
			});
		}


		this.client.setActivity({
			details: `Слушает: ${activity.track.title}`,
			state: activity.track.artists,
			largeImageKey: activity.track?.ogImage,
			smallImageKey: 'yandex-rpc'
		});
	}

	private get runtimeConfig() {
		return useRuntimeConfig();
	}
}
