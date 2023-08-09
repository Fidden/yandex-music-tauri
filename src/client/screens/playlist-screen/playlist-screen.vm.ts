import {PendingService} from '#imports';
import {injectable} from 'tsyringe';
import {PlayerVm} from '~/client/shared/components/player/player.vm';
import {globalEmitter} from '~/client/shared/emitters/global.emitter';
import {UserModel} from '~/client/shared/models/user.model';
import {BaseVm} from '~/client/shared/types/abstract/base.vm';
import type {IPlaylist, ITrack} from '~/client/shared/types/api';
import {IInitializable} from '~/client/shared/types/initializable';

interface InitArgs {
	kind: number;
	uid: number;
}

type PendingKeys = 'init';

@injectable()
export class PlaylistScreenVm extends BaseVm implements IInitializable {
	public playlist?: IPlaylist;
	public playlistIsLiked: boolean;

	constructor(
		@injectDep(PendingService) public readonly pending: PendingService<PendingKeys>
	) {
		super();
		this.playlist = undefined;
		this.playlistIsLiked = false;
	}

	@pending<PendingKeys>('init')
	public async init(args: InitArgs) {
		this.playlist = await UserModel.playlist.one(args.kind, args.uid);
		this.playlistIsLiked = UserModel.playlist.isLiked(this.playlist?.kind, this.playlist.uid);
	}

	public get tracks() {
		return this.playlist?.tracks.map(item => item.track) as ITrack[];
	}

	public onShare() {
		if (!this.playlist) {
			return;
		}

		globalEmitter.emit('toast:add', 'Ссылка скопирована');
		navigator.clipboard.writeText(`https://music.yandex.ru/users/${this.playlist.owner.name}/playlists/${this.playlist.kind}`);
	}

	public onShuffle() {
		globalEmitter.emit('tracks-table:play-shuffle');
	}

	public onLike() {
		if (!this.playlist) {
			return;
		}

		this.playlistIsLiked
			? UserModel.playlist.dislike(this.playlist)
			: UserModel.playlist.like(this.playlist);

		this.playlistIsLiked = !this.playlistIsLiked;
	}

	private get playerVm() {
		return useVm(PlayerVm, true);
	}
}
