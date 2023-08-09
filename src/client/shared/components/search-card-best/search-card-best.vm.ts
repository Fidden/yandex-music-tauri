import {RouteLocationRaw} from 'vue-router';
import {globalEmitter} from '~/client/shared/emitters/global.emitter';
import {UserModel} from '~/client/shared/models/user.model';
import {BaseVm} from '~/client/shared/types/abstract/base.vm';
import {BestResult, IAlbum, IArtist, IPlaylist, ITrack, ObjectTypeEnum} from '~/client/shared/types/api';

interface UpdateData {
	result: BestResult;
	type: ObjectTypeEnum;
}

interface IAction {
	type: 'link';
	payload: RouteLocationRaw;
}

export class SearchCardBestVm extends BaseVm {
	private result?: BestResult;
	private type?: ObjectTypeEnum;

	constructor() {
		super();
		this.result = undefined;
		this.type = undefined;
	}

	public update(data: UpdateData) {
		this.result = data.result;
		this.type = data.type;
	}

	public get title() {
		if (!this.result) {
			return undefined;
		}

		if ('title' in this.result) {
			return this.result.title;
		} else if ('name' in this.result) {
			return this.result.name;
		}
	}

	public get src() {
		if (!this.result) {
			return undefined;
		}

		if ('cover' in this.result) {
			return this.result.cover?.uri;
		}

		if ('ogImage' in this.result) {
			return this.result.ogImage;
		}
	}

	public get typeHuman() {
		switch (this.type) {
			case ObjectTypeEnum.ARTIST:
				return 'Артист';
			case ObjectTypeEnum.PODCAST:
				return 'Подкаст';
			case ObjectTypeEnum.ALBUM:
				return 'Альбом';
			case ObjectTypeEnum.PLAYLIST:
				return 'Плейлист';
			case ObjectTypeEnum.TRACK:
				return 'Трек';
			default:
				return this.type;
		}
	}

	public get link(): IAction | undefined {
		switch (this.type) {
			case ObjectTypeEnum.ARTIST:
				return {
					type: 'link',
					payload: {name: 'artist-id', params: {id: (this.result as IArtist).id}}
				};
			case ObjectTypeEnum.PODCAST:
				return {
					type: 'link',
					payload: {name: 'album-id', params: {id: (this.result as IAlbum).id}}
				};
			case ObjectTypeEnum.ALBUM:
				return {
					type: 'link',
					payload: {name: 'album-id', params: {id: (this.result as IAlbum).id}}
				};
			case ObjectTypeEnum.PLAYLIST:
				return {
					type: 'link',
					payload: {name: 'playlist-uid-kind', params: {uid: (this.result as IPlaylist).uid, kind: (this.result as IPlaylist).kind}}
				};
			case ObjectTypeEnum.TRACK:
				return {
					type: 'link',
					payload: {
						name: 'album-id',
						params: {id: (this.result as ITrack).albums[0].id},
						query: {highlight: (this.result as ITrack).id}
					}
				};
		}
	}

	public onPlay(): void {
		switch (this.type) {
			case ObjectTypeEnum.ARTIST:
				return this.onPlayArtist();
			case ObjectTypeEnum.PODCAST:
				return this.onPlayAlbum();
			case ObjectTypeEnum.ALBUM:
				return this.onPlayAlbum();
			case ObjectTypeEnum.PLAYLIST:
				return this.onPlayPlaylist();
			case ObjectTypeEnum.TRACK:
				return this.onPlayTrack();
		}
	}

	private async onPlayArtist() {
		globalEmitter.emit('player:set-queue',
			await UserModel.artist.tracks((this.result as IArtist).id)
		);
	}

	private async onPlayAlbum() {
		const album = await UserModel.album.withTracks((this.result as IAlbum).id);
		const tracks = album.volumes?.flat() || [];
		globalEmitter.emit('player:set-queue', tracks);
	}

	private async onPlayPlaylist() {
		const playlist = await UserModel.playlist.one((this.result as IPlaylist).kind, (this.result as IPlaylist).uid);
		globalEmitter.emit('player:set-queue',
			playlist.tracks
		);
	}

	private async onPlayTrack() {
		globalEmitter.emit('player:set-queue', [this.result as ITrack]);
	}
}
