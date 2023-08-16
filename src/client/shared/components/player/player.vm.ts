import {singleton} from 'tsyringe';
import {globalEmitter} from '~/client/shared/emitters/global.emitter';
import {cropImage} from '~/client/shared/helpers/crop-image';
import {UserModel} from '~/client/shared/models/user.model';
import {PendingService} from '~/client/shared/services/pending.service';
import {BaseVm} from '~/client/shared/types/abstract/base.vm';
import {
	IPopularTrack,
	IRotorSettings2,
	IRotorSettings2DiversityEnum,
	IRotorSettings2LanguageEnum,
	IRotorSettings2MoodEnergyEnum,
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

const FADE_INTERVAL_DURATION_MS = 200;
const FADE_DURATION_SEC = 10;
const FADE_DURATION_MS = FADE_DURATION_SEC * 1000 - FADE_INTERVAL_DURATION_MS * 3;

type PendingKeys = 'track';

/**
 * The view model for the player component.
 * Contains the player state and methods for controlling the player.
 */
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
	public isSettingsOpen: boolean;
	public isTrackLiked: boolean;
	public highQuality: boolean;
	public showLyrics: boolean;
	public lyricsTuple?: [number, string][];
	public lyricsItemsRef: HTMLLIElement[];
	public repeat: RepeatEnum;
	public shuffle: boolean;
	public shuffleShallow: boolean;

	private volumeBackup?: number;
	private cachedTrackId?: number | string;
	private fadeDelta: number;
	private fadeInPoint: number;
	private fadeOutPoint: number;
	private needFadeIn: boolean;
	private needFadeOut: boolean;
	private lyricsPreventScroll: boolean;
	private lyricsAnimationScroll: boolean;

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
		this.isTrackLiked = false;
		this.highQuality = true;
		this.fadeDelta = 0;
		this.fadeOutPoint = 0;
		this.fadeInPoint = FADE_DURATION_SEC;
		this.needFadeIn = false;
		this.needFadeOut = false;
		this.lyricsTuple = undefined;
		this.showLyrics = false;
		this.lyricsPreventScroll = false;
		this.lyricsAnimationScroll = false;
		this.lyricsItemsRef = [];
		this.shuffle = false;
		this.shuffleShallow = false;
	}

	/**
	 * Sets up the audio volume.
	 * Reads the volume value from the localStorage and sets it as the initial volume.
	 * Updates the audio element's volume property based on the initial volume.
	 */
	public setupAudioVolume() {
		this.volume = Number(localStorage.getItem('player.volume')) || 20;
		this.audioRef!.volume = this.volume * 0.01;
	}

	/**
	 * Handles the event when the track changes.
	 *
	 * @param trackId - The ID of the track being changed to.
	 * @returns A promise that resolves when the method finishes executing.
	 */
	@pending<PendingKeys>('track')
	public async onTrackChange(trackId?: number) {
		if (!this.track?.available) {
			return this.queue.shift();
		}

		if (!this.audioRef || !trackId || trackId === this.cachedTrackId) {
			return;
		}

		this.shuffle = this.shuffleShallow;
		this.loaded = false;
		this.showLyrics = false;
		this.isTrackLiked = UserModel.track.isLiked(trackId);

		if (this.track.lyricsInfo.hasAvailableSyncLyrics) {
			UserModel.track.lyricsText(trackId)
				.then(lyrics => this.lyricsTuple = lyrics);
		}

		const trackLink = await this.getTrackLink(trackId);
		if (!trackLink) {
			return;
		}

		this.needFadeIn = this.playedQueue.length > 0;
		this.needFadeOut = true;
		this.audioRef.currentTime = 0;
		this.pause();
		this.audioRef.src = trackLink;
		this.cachedTrackId = trackId;
		await this.play();

		this.setMetaData();
	}

	/**
	 * Updates the volume of the audio player and saves it to local storage.
	 *
	 * @param {number} volume - The new volume level (0-100).
	 * @throws Will throw an error if the volume is not a number or outside ranged 0 to 100.
	 */
	public onVolumeChange(volume: number) {
		if (volume < 0 || volume > 100) {
			throw new Error('Volume must be a number between 0 and 100');
		}

		if (!this.audioRef) {
			return;
		}

		const volumeScaleFactor = 0.01;
		const scaledVolume = volume * volumeScaleFactor;

		localStorage.setItem('player.volume', volume.toString());
		this.audioRef.volume = scaledVolume;
		this.volumeBackup = scaledVolume;
		this.fadeDelta = Math.abs(scaledVolume / (FADE_DURATION_MS / FADE_INTERVAL_DURATION_MS));
	}

	/**
	 * Sets the current time of the audio to the specified time.
	 * Calls when {@link PlayerVm#timeShallow} changes.
	 * @param {number} time - The new current time in seconds.
	 */
	public onTimeShallowChange(time: number) {
		if (!this.audioRef) {
			return;
		}

		this.audioRef!.currentTime = time;
		this.needFadeIn = false;
		this.needFadeOut = false;

		setTimeout(() => {
			if (this.cachedTrackId === this.track?.id) {
				this.needFadeOut = true;
			}
		}, 4000);
	}

	/**
	 * Updates the current playback time and informs the navigator.mediaSession about the playback progress.
	 */
	public onTimeUpdate() {
		if (!this.audioRef) {
			return;
		}

		this.time = this.audioRef!.currentTime;
		this.fadeOut();
		this.fadeIn();

		navigator.mediaSession.setPositionState({
			duration: this.duration,
			position: this.time,
			playbackRate: this.audioRef.playbackRate
		});
	}

	/**
	 * Fades out the audio by decreasing its volume gradually.
	 *
	 * @remarks
	 * This method will only fade out the audio if the time, fadeOutPoint, and duration are greater than 0.
	 * If the audio has already faded out or if the current time is before the fade out point, the method returns immediately without taking any action.
	 */
	private fadeOut() {
		if (this.time <= 0 || this.fadeOutPoint <= 0 || this.duration <= 0) {
			return;
		}

		if (!this.needFadeOut || this.time < this.fadeOutPoint) {
			return;
		}

		const fadeInOutInterval = setInterval(() => {
			// if audiRef.volume third digit is zero then clear interval
			if (this.audioRef!.volume.toString().charAt(2) === '0') {
				clearInterval(fadeInOutInterval);
				return;
			}

			this.audioRef!.volume -= this.fadeDelta;
		}, FADE_INTERVAL_DURATION_MS);

		this.needFadeOut = false;
	}


	/**
	 * Fades in the audio playback gradually.
	 */
	private fadeIn() {
		if (!this.needFadeIn || this.time > this.fadeInPoint || this.audioRef!.volume === this.volumeBackup) {
			return;
		}

		const fadeInInterval = setInterval(() => {
			if (this.audioRef!.volume >= this.volumeBackup!) {
				this.audioRef!.volume = this.volumeBackup!;
				clearInterval(fadeInInterval);
				return;
			}

			this.audioRef!.volume += this.fadeDelta;
		}, FADE_INTERVAL_DURATION_MS);

		this.needFadeIn = false;
	}


	/**
	 * Checks if the audio file is loaded and updates the necessary properties.
	 * Throws an error if the sound file failed to load.
	 * Callback for {@link PlayerVm#audioRef}'s `onloadeddata` event.
	 */
	public onDataLoad() {
		if (!this.audioRef || this.audioRef!.readyState < 2) {
			throw new Error('Failed to load sound file.');
		}

		this.loaded = true;
		this.duration = this.audioRef!.duration;
		this.fadeOutPoint = this.duration - FADE_DURATION_SEC;
	}

	/**
	 * Performs an action when the track ends.
	 * If the current time is greater than or equal to the duration of the track, it moves to the next track.
	 */
	public onTrackEnd() {
		if (this.time >= this.duration) {
			this.next();
		}

		this.lyricsScroll();
	}

	/**
	 * Set metadata for media session
	 */
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

	/**
	 * Pauses the audio playback.
	 *
	 * This method pauses the current audio playback if it is playing.
	 * If no audio reference is set, the method does nothing.
	 */
	public pause() {
		if (!this.audioRef) {
			return;
		}

		this.audioRef.pause();
		this.playing = false;
	}

	/**
	 * Plays the audio.
	 * @returns
	 * The Promise object represents the completion of the play operation.
	 * Resolves when the audio starts playing.
	 * Rejects with an error if the play operation fails.
	 */
	public async play() {
		if (!this.audioRef) {
			return;
		}

		await this.audioRef.play();
		this.playing = true;
	}

	/**
	 * Toggles the current state of the player.
	 * If the player is playing, it will be paused.
	 * If the player is paused, it will be played.
	 *
	 * @returns A promise that resolves when the toggle operation is completed.
	 */
	public async toggle() {
		this.playing ? this.pause() : await this.play();
	}

	/**
	 * Retrieves the track link for a given track ID.
	 *
	 * @param trackId - The ID of the track.
	 * @returns A promise that resolves to the track link.
	 */
	public async getTrackLink(trackId: number) {
		return await UserModel.track.link(trackId, this.highQuality);
	}

	/**
	 * Sets the queue with the given array of tracks.
	 *
	 * @param tracks - An array of tracks to set as the queue.
	 */
	public setQueue(tracks: Array<ITrack | IPopularTrack>) {
		this.queue = tracks;
	}

	/**
	 * Clears the queue.
	 */
	public clearQueue() {
		this.queue = [];
	}

	/**
	 * Clears the played queue.
	 */
	public clearPlayedQueue() {
		this.playedQueue = [];
	}

	/**
	 * Appends one or multiple tracks to the queue.
	 *
	 * @param track - The track(s) to append to the queue.
	 */
	public appendQueue(track: ITrack | ITrack[]) {
		if (Array.isArray(track)) {
			this.setQueue([...this.queue, ...track]);
		} else {
			this.queue.push(track);
		}
	}

	/**
	 * Handle logic for next button click and internal logic for switching track
	 * @param skip - indicates that user skipped track
	 */
	public async next(skip?: boolean) {
		if (this.repeat !== RepeatEnum.NONE) {
			this.handleRepeat();
			return;
		}

		if (!this.canNext) {
			return;
		}

		this.isStation ?
			await this.stationLoadNextChunk(skip) :
			this.moveToPlayed();
	}

	/**
	 * Handle internal repeat logic that calls before the next track
	 */
	private handleRepeat() {
		this.audioRef!.currentTime = 0;
		this.play();

		if (this.repeat === RepeatEnum.ONCE) {
			this.repeat = RepeatEnum.NONE;
		}
	}

	/**
	 * Handle action for previus button click
	 */
	public prev() {
		if (!this.canPrev) {
			return;
		}

		const playedTrack = this.playedQueue.pop() as ITrack | IPopularTrack;
		this.queue.unshift(playedTrack);
	}

	/**
	 * Move track from queue to played queue
	 * @returns track
	 */
	public moveToPlayed() {
		const playedTrack = this.queue.shift();
		if (!playedTrack) {
			return undefined;
		}

		this.playedQueue.push(playedTrack);
		return playedTrack;
	}

	/**
	 * Load next chunk of tracks for station
	 * @param skip - is user skipped track
	 * @param settingsChanged - is user changed station settings
	 */
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

	/**
	 * Syntax sugar for getting current track
	 */
	public get track() {
		return this.queue?.at(this.shuffle
			? Math.floor(Math.random() * this.queue.length - 1)
			: 0
		);
	}

	/**
	 * Handle condition when we can't play prev track
	 * @returns True if there is at least one track in the played queue.
	 */
	public get canPrev() {
		return this.playedQueue.length;
	}

	/**
	 * Handle condition when we can't play next track
	 * @returns True if there is at least one track in the queue.
	 */
	public get canNext() {
		return this.queue.length - 1;
	}

	/**
	 * Plays the given station on the PlayStation.
	 *
	 * @param station - The station to play.
	 * @returns A promise that resolves once the station starts playing.
	 */
	public async playStation(station: Pick<IStation, 'id' | 'idForFrom'>) {
		if (this.currentStation?.tag === station.id.tag && this.currentStation?.type === station.id.type) {
			return;
		}

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

	/**
	 * Handle repeat button logic and changing repeat state.
	 */
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

	/**
	 * Updates the setting value for a given key in the current station settings.
	 *
	 * @param key - The key of the setting to update.
	 * @param value - The new value for the setting.
	 */
	public onSettingChange<Key extends keyof IRotorSettings2>(key: Key, value: IRotorSettings2[Key]) {
		if (!this.currentStationResult?.settings2) {
			return;
		}

		const defaultValues = {
			diversity: IRotorSettings2DiversityEnum.DEFAULT,
			moodEnergy: IRotorSettings2MoodEnergyEnum.ALL,
			language: IRotorSettings2LanguageEnum.ANY
		};

		if (this.currentStationResult.settings2[key] === value) {
			if (defaultValues[key]) {
				this.currentStationResult.settings2[key] = defaultValues[key];
				return;
			}
		}

		this.currentStationResult.settings2[key] = value;
	}

	/**
	 * Change station settings to default one.
	 */
	public onClearSettings() {
		if (!this.currentStationResult?.settings2) {
			return;
		}

		this.currentStationResult.settings2.diversity = IRotorSettings2DiversityEnum.DEFAULT;
		this.currentStationResult.settings2.moodEnergy = IRotorSettings2MoodEnergyEnum.ALL;
		this.currentStationResult.settings2.language = IRotorSettings2LanguageEnum.ANY;
	}

	/**
	 * Toggles the state of the settings.
	 */
	public onSettings() {
		this.isSettingsOpen = !this.isSettingsOpen;
	}


	public onShuffleShallow() {
		this.shuffleShallow = !this.shuffleShallow;
	}

	/**
	 * Toggles the like status of a track.
	 */
	public toggleLike() {
		const trackId = this.track?.id;
		if (!trackId) {
			return;
		}

		this.isTrackLiked ? UserModel.track.dislike(trackId) : UserModel.track.like(trackId);
		this.isTrackLiked = !this.isTrackLiked;
	}

	/**
	 * Toggles the value of the high quality property.
	 */
	public onHighQuality() {
		this.highQuality = !this.highQuality;
	}

	/**
	 * Toggles the visibility of lyrics and emits an event signaling the change.
	 */
	public toggleLyrics() {
		this.showLyrics = !this.showLyrics;
		globalEmitter.emit('player:lyrics-toggle', this.showLyrics);
	}

	/**
	 * Prevents scrolling of lyrics.
	 *
	 * @remarks If user scroll lyrics manually then this method will
	 * prevent auto scrolling for 7 seconds.
	 */
	public onLyricsScroll() {
		if (this.lyricsAnimationScroll) {
			return;
		}

		this.lyricsPreventScroll = true;

		setTimeout(() => {
			this.lyricsPreventScroll = false;
		}, 7000);
	}

	/**
	 * Scrolls the lyrics into view.
	 *
	 * If the `lyricsPreventScroll` property is set to `true`, the method will return without scrolling.
	 *
	 * For each item in the `lyricsItemsRef` array, if the `data-active` attribute is set to 'true',
	 * it will scroll that item into view using smooth scrolling and center alignment. Otherwise, it
	 * will do nothing.
	 *
	 * After scrolling, the `lyricsAnimationScroll` property is set to `true` to indicate that
	 * a scroll animation is in progress. This property will be set to `false` after 1000ms
	 * using a timeout callback.
	 */
	public lyricsScroll() {
		if (this.lyricsPreventScroll || !this.lyricsItemsRef?.length) {
			return;
		}

		this.lyricsItemsRef?.forEach(item => {
			if (!item || item.getAttribute('data-active') !== 'true') {
				return;
			}

			item.scrollIntoView({behavior: 'smooth', block: 'center'});
		});

		this.lyricsAnimationScroll = true;

		setTimeout(() => {
			this.lyricsAnimationScroll = false;
		}, 1000);
	}
}
