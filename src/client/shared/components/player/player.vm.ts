import {singleton} from 'tsyringe';
import {cropImage} from '~/client/shared/helpers/crop-image';
import {UserModel} from '~/client/shared/models/user.model';
import {PendingService} from '~/client/shared/services/pending.service';
import {BaseVm} from '~/client/shared/types/abstract/base.vm';
import {IPopularTrack, ITrack} from '~/client/shared/types/api';

type PendingKeys = 'track';

@singleton()
export class PlayerVm extends BaseVm {
	public loaded: boolean;
	public volume: number;
	public duration: number;
	public time: number;
	public timeShallow: number;
	public audioRef: HTMLAudioElement | null;
	public queue: Array<ITrack | IPopularTrack>;
	public playedQueue: Array<ITrack | IPopularTrack>;
	public playing: boolean;

	constructor(
		@injectDep(PendingService) public readonly pending: PendingService<PendingKeys>
	) {
		super();
		this.loaded = false;
		this.volume = 0;
		this.duration = 0;
		this.time = 0;
		this.timeShallow = 0;
		this.audioRef = null;
		this.queue = [];
		this.playedQueue = [];
		this.playing = true;
	}

	public setupAudioVolume() {
		this.volume = Number(localStorage.getItem('player.volume')) || 20;
		this.audioRef!.volume = this.volume * 0.01;
	}

	@pending<PendingKeys>('track')
	public async onTrackChange(trackId?: number) {
		if (!this.audioRef || !trackId) {
			return;
		}

		this.loaded = false;
		const trackLink = await this.getTrackLink(trackId);
		if (!trackLink) {
			return;
		}

		this.audioRef.currentTime = 0;
		this.audioRef.pause();
		this.audioRef.src = trackLink;

		this.setMetaData();
	}

	public onVolumeChange(volume: number) {
		if (!this.audioRef) {
			return;
		}

		localStorage.setItem('player.volume', volume.toString());
		this.audioRef!.volume = volume * 0.01;
	}

	public onTimeShallowChange(time: number) {
		if (!this.audioRef) {
			return;
		}

		this.audioRef!.currentTime = time;
	}

	public onTimeUpdate() {
		if (!this.audioRef) {
			return;
		}

		this.time = this.audioRef!.currentTime;
		navigator.mediaSession.setPositionState({
			duration: this.duration,
			position: this.time,
			playbackRate: this.audioRef.playbackRate
		});
	}


	public onDataLoad() {
		if (!this.audioRef || this.audioRef!.readyState < 2) {
			throw new Error('Failed to load sound file.');
		}

		this.loaded = true;
		this.duration = this.audioRef!.duration;
	}

	public onTrackEnd() {
		if (this.time >= this.duration) {
			this.next();
		}
	}

	public setMetaData() {
		const track = this.track;
		if (!track) {
			return;
		}

		navigator.mediaSession.metadata = new MediaMetadata({
			title: track?.title,
			artist: track?.artists?.map(item => item?.name).toString(),
			album: track?.albums?.map(item => item?.title).toString(),
			artwork: [
				{
					src: cropImage(track?.ogImage || track?.coverUri, 200, 200),
					sizes: '200x200'
				}
			]
		});

		// this.rpc.setActivity({
		// 	type: RpcActivityType.TRACK,
		// 	track
		// });
	}

	public pause() {
		if (!this.audioRef) {
			return;
		}

		this.audioRef.pause();
		this.playing = false;
	}

	public async play() {
		if (!this.audioRef) {
			return;
		}

		await this.audioRef.play();
		this.playing = true;
	}

	public async toggle() {
		this.playing ? this.pause() : await this.play();
	}

	public async getTrackLink(trackId: number) {
		return await UserModel.track.link(trackId);
	}

	public setQueue(tracks: Array<ITrack | IPopularTrack>) {
		this.queue = tracks;
	}

	public clearQueue() {
		this.queue = [];
	}

	public appendQueue(track: ITrack) {
		this.queue.push(track);
	}

	public next() {
		if (!this.canNext) {
			return;
		}

		const playedTrack = this.queue.shift() as ITrack | IPopularTrack;
		this.playedQueue.push(playedTrack);
	}

	public prev() {
		if (!this.canPrev) {
			return;
		}

		const playedTrack = this.playedQueue.shift() as ITrack | IPopularTrack;
		this.queue.unshift(playedTrack);
	}

	public get track() {
		return this.queue?.at(0);
	}

	public get canPrev() {
		return this.playedQueue.length;
	}

	public get canNext() {
		return this.queue.length - 1;
	}
}
