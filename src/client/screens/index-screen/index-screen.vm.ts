import {injectable} from 'tsyringe';
import {pending} from '~/client/shared/decorators/pending.decorator';
import {UserModel} from '~/client/shared/models/user.model';
import {PendingService} from '~/client/shared/services/pending.service';
import {BaseVm} from '~/client/shared/types/abstract/base.vm';
import {
	IAlbum,
	IContext,
	IGeneratedPlaylistLandingBlock,
	ILandingBlock,
	ILandingBlockItem,
	ILandingResult,
	IPlaylist,
	LandingBlockEnum
} from '~/client/shared/types/api';
import {IInitializable} from '~/client/shared/types/initializable';

type PendingKeys = 'index-screen';

@injectable()
export class IndexScreenVm extends BaseVm implements IInitializable {
	public userPlaylists: IPlaylist[];
	public userPlaylistsChunks: IPlaylist[][];
	private landingBlocks?: ILandingResult;

	constructor(
		@injectDep(PendingService) public readonly pending: PendingService<PendingKeys>
	) {
		super();
		this.userPlaylists = [];
		this.landingBlocks = undefined;
		this.userPlaylistsChunks = [];
	}

	@pending<PendingKeys>('index-screen')
	public async init() {
		const favoritePlaylist = await UserModel.playlist.one(3, this.userStore.status!.account!.uid);
		this.userPlaylists = await UserModel.playlist.list();
		this.landingBlocks = await UserModel.landing.blocks([
			LandingBlockEnum.NEW_PLAYLISTS,
			LandingBlockEnum.NEW_RELEASES,
			LandingBlockEnum.CHART,
			LandingBlockEnum.PLAY_CONTEXTS,
			LandingBlockEnum.PERSONAL_PLAYLISTS
		]);

		this.userPlaylists.unshift(favoritePlaylist);

		for (let i = 0; i < this.userPlaylists.length; i += 6) {
			const chunk = this.userPlaylists.slice(i, i + 6);
			this.userPlaylistsChunks.push(chunk);
		}
	}

	public get personalPlaylists(): ILandingBlock<ILandingBlockItem<IGeneratedPlaylistLandingBlock>> | undefined {
		return this.landingBlocks?.blocks?.find(item => item.type === LandingBlockEnum.PERSONAL_PLAYLISTS);
	}

	public get newReleases(): ILandingBlock<ILandingBlockItem<IAlbum>> | undefined {
		return this.landingBlocks?.blocks?.find(item => item.type === LandingBlockEnum.NEW_RELEASES);
	}

	public get newPlaylists(): ILandingBlock<ILandingBlockItem<IPlaylist>> | undefined {
		return this.landingBlocks?.blocks?.find(item => item.type === LandingBlockEnum.NEW_PLAYLISTS);
	}

	public get playContexts(): ILandingBlock<ILandingBlockItem<IContext>> | undefined {
		return this.landingBlocks?.blocks?.find(item => item.type === LandingBlockEnum.PLAY_CONTEXTS);
	}
}
