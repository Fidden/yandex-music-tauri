import {singleton} from 'tsyringe';
import {cropImage} from '~/client/shared/helpers/crop-image';
import {UserModel} from '~/client/shared/models/user.model';
import {PendingService} from '~/client/shared/services/pending.service';
import {BaseVm} from '~/client/shared/types/abstract/base.vm';
import {
	IPopularTrack,
	IRotorSettings2,
	IStation,
	IStationResult,
	ITrack,
	SendStationFeedbackRequestTypeEnum
} from '~/client/shared/types/api';

export interface ICurrentStation {
	tag: string;
	type: string;
	idForFrom: string;
	batchId?: string;
}

export enum RepeatEnum {
	NONE,
	ONCE,
	ALWAYS
}

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
	public isStation: boolean;
	public currentStation?: ICurrentStation;
	public currentStationResult?: IStationResult;
	private cachedTrackId?: number | string;
	private repeat: RepeatEnum;
	public isSettingsOpen: boolean;

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
		this.isStation = false;
		this.currentStation = undefined;
		this.currentStationResult = undefined;
		this.cachedTrackId = undefined;
		this.repeat = RepeatEnum.NONE;
		this.isSettingsOpen = false;
	}

	public setupAudioVolume() {
		this.volume = Number(localStorage.getItem('player.volume')) || 20;
		this.audioRef!.volume = this.volume * 0.01;
	}

	@pending<PendingKeys>('track')
	public async onTrackChange(trackId?: number) {
		if (!this.audioRef || !trackId || trackId === this.cachedTrackId) {
			return;
		}

		this.loaded = false;
		const trackLink = await this.getTrackLink(trackId);
		if (!trackLink) {
			return;
		}

		this.audioRef.currentTime = 0;
		this.pause();
		this.audioRef.src = trackLink;
		this.cachedTrackId = trackId;
		this.play();

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

	@pending<PendingKeys>('track')
	public async onTrackEnd() {
		if (this.time >= this.duration) {
			await this.next();
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

	public clearPlayedQueue() {
		this.playedQueue = [];
	}

	public appendQueue(track: ITrack | ITrack[]) {
		if (Array.isArray(track)) {
			this.queue = [...this.queue, ...track];
		} else {
			this.queue.push(track);
		}
	}

	public async next(skip?: boolean) {
		if (this.repeat !== RepeatEnum.NONE) {
			this.audioRef!.currentTime = 0;
			this.play();

			if (this.repeat === RepeatEnum.ONCE) {
				this.repeat = RepeatEnum.NONE;
			}

			return;
		}

		if (!this.canNext) {
			return;
		}

		this.isStation ?
			await this.stationLoadNextChunk(skip) :
			this.moveToPlayed();
	}

	public prev() {
		if (!this.canPrev) {
			return;
		}

		const playedTrack = this.playedQueue.pop() as ITrack | IPopularTrack;
		this.queue.unshift(playedTrack);
	}

	public moveToPlayed() {
		const playedTrack = this.queue.shift();
		if (!playedTrack) {
			return undefined;
		}

		this.playedQueue.push(playedTrack);
		return playedTrack;
	}

	public async stationLoadNextChunk(skip: boolean = false, settingsChanged: boolean = false) {
		if (!this.currentStation) {
			return;
		}

		if (this.queue.length > 2 && !settingsChanged) {
			this.moveToPlayed();
			return;
		}

		if (!settingsChanged) {
			await UserModel.rotor.station.feedback({
				type: skip ? SendStationFeedbackRequestTypeEnum.SKIP : SendStationFeedbackRequestTypeEnum.TRACK_FINISHED,
				currentStation: this.currentStation,
				totalPlayedSeconds: this.time,
				trackId: this.track?.id,
				albumId: this.track?.albums?.at(0)?.id
			});

			this.moveToPlayed();
		}

		// get last six items from played queue to move tracks pointer
		const lastPlayedQueue = this.playedQueue.slice(0, 6).map(item => item.id).toString();

		/**
		 * if we change stations.settings2 we need to append current track to played queue otherwise we use just last six items
		 * Note: this made for prevent playing track from queue with old settings
		 */
		const trackIdBefore = settingsChanged ?
			`${this.track?.id}` + lastPlayedQueue
			: lastPlayedQueue;

		const newTracks = await UserModel.rotor.station.tracks({
			trackIdBefore,
			currentStation: this.currentStation
		});

		if (settingsChanged) {
			this.clearQueue();
		}

		this.appendQueue(newTracks.sequence.map(item => item.track));

		UserModel.rotor.station.feedback({
			type: SendStationFeedbackRequestTypeEnum.RADIO_STARTED,
			currentStation: this.currentStation
		});
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

	public async playStation(station: IStation) {
		this.clearPlayedQueue();
		this.clearQueue();

		this.isStation = true;
		this.currentStation = {
			tag: station.id.tag,
			type: station.id.type,
			idForFrom: station.idForFrom
		};

		this.currentStationResult = await UserModel.rotor.station.info(this.currentStation);

		const tracks = await UserModel.rotor.station.tracks({
			trackIdBefore: this.playedQueue.at(this.playedQueue.length - 1)?.id,
			currentStation: this.currentStation
		});

		this.currentStation.batchId = tracks.batchId;

		this.setQueue(tracks.sequence.map(item => item.track));

		UserModel.rotor.station.feedback({
			type: SendStationFeedbackRequestTypeEnum.RADIO_STARTED,
			currentStation: this.currentStation
		});
	}

	public onRepeat() {
		switch (this.repeat) {
			case RepeatEnum.NONE: {
				this.repeat = RepeatEnum.ALWAYS;
				break;
			}
			case RepeatEnum.ALWAYS: {
				this.repeat = RepeatEnum.ONCE;
				break;
			}
			case RepeatEnum.ONCE: {
				this.repeat = RepeatEnum.NONE;
			}
		}
	}

	public onSettingChange(key: keyof IRotorSettings2, value: string) {
		if (!this.currentStationResult?.settings2) {
			return;
		}

		if (this.currentStationResult.settings2[key] === value) {
			switch (key) {
				case 'diversity': {
					this.currentStationResult.settings2[key] = 'default';
					break;
				}
				case 'moodEnergy': {
					this.currentStationResult.settings2[key] = 'all';
					break;
				}
				case 'language': {
					this.currentStationResult.settings2[key] = 'any';
					break;
				}
			}
			return;
		}

		this.currentStationResult.settings2[key] = value;
	}

	public settingsToggle() {
		this.isSettingsOpen = !this.isSettingsOpen;
	}
}
