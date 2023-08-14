import {PlayerVm} from '~/client/shared/components/player/player.vm';
import {globalEmitter} from '~/client/shared/emitters/global.emitter';
import {UserModel} from '~/client/shared/models/user.model';
import {BaseVm} from '~/client/shared/types/abstract/base.vm';
import {IArtistBrief} from '~/client/shared/types/api';
import {IInitializable} from '~/client/shared/types/initializable';

interface InitArgs {
	id: number;
}

export class ArtistScreenVm extends BaseVm implements IInitializable {
	public briefInfo?: IArtistBrief;
	public isLiked: boolean;

	constructor() {
		super();
		this.briefInfo = undefined;
		this.isLiked = false;
	}

	public async init(args: InitArgs) {
		this.briefInfo = await UserModel.artist.briefInfo(args.id);
		this.isLiked = UserModel.artist.isLiked(args.id);
	}

	public onLike() {
		if (!this.briefInfo?.artist) {
			return;
		}

		this.isLiked
			? UserModel.artist.dislike(this.briefInfo.artist)
			: UserModel.artist.like(this.briefInfo.artist);

		this.isLiked = !this.isLiked;
	}

	public onShare() {
		if (!this.briefInfo) {
			return;
		}

		globalEmitter.emit('toast:add', 'Ссылка скопирована');
		navigator.clipboard.writeText(`https://music.yandex.ru/artist/${this.briefInfo.artist.id}`);
	}

	public onShuffle() {
		globalEmitter.emit('tracks-table:play-shuffle');
	}

	public onWaveStart() {
		this.playerVm.playStation({
			id: {
				tag: this.briefInfo?.artist.id,
				type: 'artist'
			},
			idForFrom: ''
		});
	}

	public get likesCount() {
		return this.briefInfo?.artist?.likesCount?.toLocaleString('ru');
	}

	public get lastMonthListeners() {
		return this.briefInfo?.stats?.lastMonthListeners?.toLocaleString('ru');
	}

	private get playerVm() {
		return useVm(PlayerVm, true);
	}
}
