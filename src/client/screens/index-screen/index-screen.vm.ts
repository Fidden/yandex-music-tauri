import {CacheService} from '#imports';
import {injectable} from 'tsyringe';
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

@injectable()
export class IndexScreenVm extends BaseVm implements IInitializable {
	public userPlaylists: IPlaylist[];
	private landingBlocks?: ILandingResult;

	constructor(
		@injectDep(CacheService) private readonly cache: CacheService
	) {
		super();
		this.userPlaylists = [];
		this.landingBlocks = undefined;
	}

	public async init() {
		this.userPlaylists = await this.userModel.playlist.list();
		this.landingBlocks = await this.userModel.landing.blocks([
			LandingBlockEnum.NEW_PLAYLISTS,
			LandingBlockEnum.NEW_RELEASES,
			LandingBlockEnum.CHART,
			LandingBlockEnum.PLAY_CONTEXTS,
			LandingBlockEnum.PERSONAL_PLAYLISTS
		]);
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
