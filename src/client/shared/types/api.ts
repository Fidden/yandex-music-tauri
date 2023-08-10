export interface IAccount {

	'now': string;

	'uid': number;

	'login': string;

	'region': number;

	'fullName': string;

	'secondName': string;

	'firstName'?: string;

	'displayName': string;

	'serviceAvailable': boolean;

	'hostedUser': boolean;

	'passport-phones': Array<IAccountPassportPhonesInner>;
}

export interface IAccountPassportPhonesInner {

	'phone'?: string;
}

export interface IAdParams {

	'partnerId': string;

	'categoryId': string;

	'pageRef': string;

	'targetRef': string;

	'otherParams': string;

	'adVolume'?: number;

	'genreId'?: number;

	'genreName'?: string;
}

export interface IAlbum {

	'id': number;

	'error'?: string | null;

	'title': string;

	'type': AlbumTypeEnum;

	'metaType': AlbumMetaTypeEnum;

	'year': number;

	'releaseDate': string;

	'coverUri': string;

	'ogImage': string;

	'genre': string;

	'buy': Array<object>;

	'trackCount': number;

	'recent': boolean;

	'veryImportant': boolean;

	'artists': Array<IArtist>;

	'labels': Array<IAlbumLabelsInner>;

	'available': boolean;

	'availableForPremiumUsers': boolean;

	'availableForMobile': boolean;

	'availablePartially': boolean;

	'bests': Array<number>;

	'prerolls': Array<object>;

	description?: string;

	'volumes': Array<Array<ITrack>> | null;
}

export enum AlbumTypeEnum {
	SINGLE = 'single',
	PODCAST = 'podcast',
}

export enum AlbumMetaTypeEnum {
	SINGLE = 'single',
	PODCAST = 'podcast',
	MUSIC = 'music'
}

export interface IAlbumLabelsInner {

	'id'?: number;

	'name'?: string;
}

export interface IContext {
	client: ClientTypeEnum;
	context: ObjectTypeEnum;
	contextItem: string;
	payload: ContextItemData;
}

export type ContextItemData = IArtist | IPlaylist;

export enum ClientTypeEnum {
	ANDROID = 'android',
}

export interface IAlert {

	'alertId'?: string;

	'text'?: string;

	'bgColor'?: string;

	'textColor'?: string;

	'alertType'?: string;

	'button'?: IAlertButton;

	'closeButton'?: boolean;
}

export interface IAlertButton {

	'text'?: string;

	'bgColor'?: string;

	'textColor'?: string;

	'uri'?: string;
}

export interface IArtist {

	'composer': boolean;

	'cover'?: ICover;

	'decomposed'?: Array<object> | null;

	'genres': Array<object>;

	'id': ArtistId;

	'name': string;

	'various': boolean;

	'popularTracks'?: Array<ITrack> | null;

	'ticketsAvailable'?: boolean | null;

	'regions'?: Array<string> | null;

	likesCount?: number;

	counts?: {
		alsoAlbums?: number;
		alsoTracks?: number;
		directAlbums?: number;
		tracks?: number;
	};

	ratings?: {
		day?: number;
		week?: number;
		month?: number;
	};

	links?: ILink[];
}

export interface IArtistBrief {
	artist: IArtist;
	albums: IAlbum[];
	alsoAlbums: IAlbum[];
	lastReleaseIds: number[];
	popularTracks: IPopularTrack[];
	similarArtists: IArtist[];
	allCovers: ICover[];
	concerts: any[];
	videos: any[];
	vinyls: any[];
	hasPromotions: boolean;
	lastReleases: ILastRelease[];
	playlistIds: IPlaylistId[];
	playlists: IPlaylist[];
	stats?: IArtistStats;
}

export interface ILink {
	title: string;
	href: string;
	type: string;
	socialNetwork: string;
}

export interface IArtistStats {
	lastMonthListeners?: number;
}

export interface IConcert {
	artist: IArtist;
	id: string;
	concertTitle: string;
	afishaUrl: string;
	city: string;
	place: string;
	address: string;
	datetime: string;
	coordinates: number[];
	map: string;
	mapUrl: string;
	hash: string;
	images: string[];
	contentRating: string;
	'data-session-id': string;
	'metro-stations'?: IMetroStation[];
}

export interface IMetroStation {
	title: string;
	'line-color': string;
}

export interface ICounts {
	tracks: number;
	directAlbums: number;
	alsoAlbums: number;
	alsoTracks: number;
}

export interface IPopularTrack {
	id: string;
	realId: string;
	title: string;
	major: IMajor;
	available: boolean;
	availableForPremiumUsers: boolean;
	availableFullWithoutPermission: boolean;
	storageDir: string;
	durationMs: number;
	fileSize: number;
	r128: IR128;
	previewDurationMs: number;
	artists: IArtist[];
	albums: IAlbum[];
	coverUri: string;
	ogImage: string;
	lyricsAvailable: boolean;
	type: string;
	rememberPosition: boolean;
	trackSharingFlag: string;
	lyricsInfo: ILyricsInfo;
	trackSource: string;
	contentWarning: string;
}

export interface IMajor {
	id: number;
	name: string;
}

export interface ILyricsInfo {
	hasAvailableSyncLyrics: boolean;
	hasAvailableTextLyrics: boolean;
}

export interface IR128 {
	i: number;
	tp: number;
}

export interface ILastRelease {
	id: number;
	title: string;
	type: string;
	metaType: string;
	year: number;
	releaseDate: Date;
	coverUri: string;
	ogImage: string;
	genre: string;
	buy: any[];
	trackCount: number;
	likesCount: number;
	recent: boolean;
	veryImportant: boolean;
	artists: IArtist[];
	labels: ILabel[];
	available: boolean;
	availableForPremiumUsers: boolean;
	availableForMobile: boolean;
	availablePartially: boolean;
	bests: any[];
	contentWarning: string;
}

export interface ILabel {
	id: number;
	name: string;
}

export type ArtistId = number | string;

export interface IBest {

	'type'?: ObjectTypeEnum;

	'text'?: string;

	'result'?: BestResult;
}

export type BestResult = IAlbum | IArtist | IPlaylist | ITrack | IVideo;

export interface IBooksAndPodcastsResult {

	'title': string;

	'blocks': Array<IBooksAndPodcastsResultBlocksInner>;
}

export interface IBooksAndPodcastsResultBlocksInner {

	'id': string;

	'title'?: string;

	'type': string;

	'typeForFrom': string;

	'entities'?: Array<IBooksAndPodcastsResultBlocksInnerEntitiesInner>;
}

export interface IBooksAndPodcastsResultBlocksInnerEntitiesInner {

	'id'?: string;

	'type'?: string;

	'data'?: object;
}

export interface IChart {

	'bgColor': string;

	'position': number;

	'progress': ChartProgressEnum;

	'listeners': number;

	'shift': number;
}

export enum ChartProgressEnum {
	SAME = 'same',
	UP = 'up',
	DOWN = 'down'
}

export interface IChartItem {

	'id': number;

	'playCount': number;

	'recent': boolean;

	'timestamp': string;

	'track': ITrack;

	'chart': IChart;
}

export interface IChartItemAllOf {

	'chart'?: IChart;
}

export interface ICover {

	'custom': boolean;

	'dir'?: string;

	'type': CoverTypeEnum;

	'itemsUri'?: Array<string>;

	'uri'?: string;

	'version'?: string;

	'error'?: string;
}

export enum CoverTypeEnum {
	PIC = 'pic',
	MOSAIC = 'mosaic'
}

export interface IDashboard {

	'dashboardId': string;

	'stations': Array<IStationResult>;

	'pumpkin': boolean;
}

export interface IDiscreteScale {

	'type'?: string;

	'name'?: string;

	'min'?: IMinMax;

	'max'?: IMinMax;
}

export interface IFullChartResult {

	'id': string;

	'type': FullChartResultTypeEnum;

	'typeForFrom': string;

	'title': string;

	'chartDescription': string;

	'menu': IFullChartResultMenu;

	'chart': IPlaylist;
}

export enum FullChartResultTypeEnum {
	CHART = 'chart'
}

export interface IFullChartResultMenu {

	'menu': IMenuItem;
}

export interface IGeneratedPlaylist {

	'playlistUuid': string;

	'description': string;

	'descriptionFormatted': string;

	'available': boolean;

	'collective': boolean;

	'cover'?: ICover;

	'created': string;

	'modified': string;

	'backgroundColor': string;

	'textColor': string;

	'durationMs': number;

	'isBanner': boolean;

	'isPremiere': boolean;

	'kind': number;

	'ogImage'?: string;

	'owner': IOwner;

	'prerolls'?: Array<object>;

	'revision': number;

	'snapshot': number;

	'tags': Array<IPlaylistTagsInner>;

	'title': string;

	'trackCount': number;

	'uid': number;

	'visibility': GeneratedPlaylistVisibilityEnum;

	'likesCount': number;

	'tracks': Array<ITrackItem>;

	'animatedCoverUri'?: string;

	'coverWithoutText'?: ICover;

	'everPlayed'?: boolean;

	'generatedPlaylistType'?: string;

	'idForFrom'?: string;

	'madeFor'?: object;

	'playCounter'?: IGeneratedPlaylistAllOfPlayCounter;
}

export enum GeneratedPlaylistVisibilityEnum {
	PUBLIC = 'public',
	PRIVATE = 'private'
}

export interface IGeneratedPlaylistAllOf {

	'animatedCoverUri'?: string;

	'coverWithoutText'?: ICover;

	'everPlayed'?: boolean;

	'generatedPlaylistType'?: string;

	'idForFrom'?: string;

	'madeFor'?: object;

	'playCounter'?: IGeneratedPlaylistAllOfPlayCounter;
}

export interface IGeneratedPlaylistAllOfPlayCounter {

	'description': string;

	'descriptionNext': string;

	'updated': boolean;

	'value': number;
}

export interface IGeneratedPlaylistLandingBlock {

	'notify': boolean;

	'ready': boolean;

	'type': GeneratedPlaylistLandingBlockEnumEnum;

	'data': IGeneratedPlaylist;
}

export enum GeneratedPlaylistLandingBlockEnumEnum {
	PLAYLIST_OF_THE_DAY = 'playlistOfTheDay'
}

export interface IGenre {

	'id': string;

	'weight': number;

	'composerTop': boolean;

	'title': string;

	'titles': { [key: string]: IGenreTitlesValue; };

	'images': { [key: string]: string; };

	'showInMenu': boolean;

	'showInRegions'?: Array<number>;

	'fullTitle'?: string;

	'urlPart'?: string;

	'color'?: string;

	'radioIcon'?: IIcon;

	'subGenres'?: IGenre;

	'hideInRegions'?: Array<number>;
}

export interface IGenreTitlesValue {

	'title': string;

	'fullTitle': string;
}

export interface IIcon {

	'backgroundColor': string;

	'imageUrl': string;
}

export interface IInvocationInfo {

	'exec-duration-millis': number;

	'hostname': string;

	'req-id': string;

	'app-name'?: string;
}

export interface IStorageLocation {
	path: string,
	s: string,
	ts: string,
	host: string,
}

export interface ILandingBlock<EntityT extends LandingBlockEntitiesInner<any>> {

	'id': string;

	'title': string;

	'type': string;

	'typeForFrom': LandingBlockEnum;

	'description': string;

	'entities': Array<EntityT>;
}

export type LandingBlockEntitiesInner<T extends LandingBlockItemData> = ILandingBlockItem<T> | ILandingPodcastItem;

export interface ILandingBlockItem<T extends LandingBlockItemData> {

	'id': string;

	'type': LandingBlockEnum;

	'data': T;
}

export type LandingBlockItemData =
	IAlbum
	| IChartItem
	| IGeneratedPlaylistLandingBlock
	| IMixLink
	| IPlaylist
	| IPromotion
	| IContext;

export enum LandingBlockEnum {
	PERSONAL_PLAYLISTS = 'personal-playlists',
	PROMOTIONS = 'promotions',
	NEW_RELEASES = 'new-releases',
	NEW_PLAYLISTS = 'new-playlists',
	MIXES = 'mixes',
	CHART = 'chart',
	ARTISTS = 'artists',
	ALBUMS = 'albums',
	PLAYLISTS = 'playlists',
	PLAY_CONTEXTS = 'play-contexts',
	PODCASTS = 'podcasts'
}

export interface ILandingPodcastItem {

	'type': string;

	'description': string;

	'descriptionFormatted': string;

	'lastUpdated': string;

	'data': ILandingPodcastItemData;
}

export interface ILandingPodcastItemData {

	'podcast': IAlbum;

	'description': string;

	'descriptionFormatted': string;

	'lastUpdated': string;
}

export interface ILandingResult {

	'pumpkin': boolean;

	'contentId': string;

	'blocks': Array<ILandingBlock<any>>;
}

export interface ILicenceTextPart {

	'text'?: string;

	'url'?: string;
}

export interface ILyrics {

	'id'?: number;

	'lyrics'?: string;

	'hasRights'?: boolean;

	'fullLyrics'?: string;

	'textLanguage'?: string;

	'showTranslation'?: boolean;

	'url'?: string;
}

export interface IMenuItem {

	'title'?: string;

	'url'?: string;

	'selected'?: boolean;
}

export interface IMinMax {

	'value': number;

	'name': string;
}

export interface IMixLink {

	'title': string;

	'url': string;

	'urlScheme': string;

	'textColor': string;

	'backgroundColor': string;

	'coverWhite': string;
}

export interface IModelError {

	'name'?: string;

	'message'?: string;
}

export interface INewPlaylistItem {

	'uid': number;

	'kind': number;
}

export interface IOwner {

	'login': string;

	'name': string;

	'sex': string;

	'uid': number;

	'verified': boolean;
}

export interface IPermissionAlerts {

	'alerts'?: Array<string>;
}

export interface IPermissions {

	'until'?: string;

	'values'?: Array<PermissionsValuesEnum>;

	'default'?: Array<PermissionsDefaultEnum>;
}

export enum PermissionsValuesEnum {
	LANDING_PLAY = 'landing-play',
	FEED_PLAY = 'feed-play',
	RADIO_PLAY = 'radio-play',
	MIX_PLAY = 'mix-play',
	RADIO_SKIPS = 'radio-skips',
	PLAY_RADIO_FULL_TRACKS = 'play-radio-full-tracks'
}

export enum PermissionsDefaultEnum {
	LANDING_PLAY = 'landing-play',
	FEED_PLAY = 'feed-play',
	RADIO_PLAY = 'radio-play',
	MIX_PLAY = 'mix-play',
	RADIO_SKIPS = 'radio-skips',
	PLAY_RADIO_FULL_TRACKS = 'play-radio-full-tracks'
}

export interface IPlaylist {

	'playlistUuid': string;

	'description': string;

	'descriptionFormatted': string;

	'available': boolean;

	'collective': boolean;

	'cover'?: ICover;

	'created': string;

	'modified': string;

	'backgroundColor': string;

	'textColor': string;

	'durationMs': number;

	'isBanner': boolean;

	'isPremiere': boolean;

	'kind': number;

	'ogImage'?: string;

	'owner': IOwner;

	'prerolls'?: Array<object>;

	'revision': number;

	'snapshot': number;

	'tags': Array<IPlaylistTagsInner>;

	'title': string;

	'trackCount': number;

	'uid': number;

	'visibility': PlaylistVisibilityEnum;

	'likesCount': number;

	'tracks': Array<ITrackItem>;
}

export enum PlaylistVisibilityEnum {
	PUBLIC = 'public',
	PRIVATE = 'private'
}

export interface IPlaylistId {

	'uid'?: number;

	'kind'?: number;
}

export interface IPlaylistRecommendations {

	'batch_id'?: string;

	'tracks'?: Array<ITrack>;
}

export interface IPlaylistTagsInner {

	'id'?: string;

	'value'?: string;
}

export interface IPrice {

	'amount'?: number;

	'currency'?: string;
}

export interface IProduct {

	'productId'?: string;

	'type'?: string;

	'commonPeriodDuration'?: string;

	'duration'?: number;

	'trialDuration'?: number;

	'price'?: IPrice;

	'feature'?: string;

	'debug'?: boolean;

	'plus'?: boolean;

	'cheapest'?: boolean;

	'title'?: string;

	'familySub'?: boolean;

	'fbImage'?: string;

	'fbName'?: string;

	'family'?: boolean;

	'features'?: Array<string>;

	'description'?: string;

	'available'?: boolean;

	'trialAvailable'?: boolean;

	'trialPeriodDuration'?: string;

	'introPeriodDuration'?: string;

	'introPrice'?: IPrice;

	'startPeriodDuration'?: string;

	'startPrice'?: IPrice;

	'licenceTextParts'?: ILicenceTextPart;

	'vendorTrialAvailable'?: boolean;

	'buttonText'?: string;

	'buttonAdditionalText'?: string;

	'paymentMethodTypes'?: Array<string>;
}

export interface IPromoCodeStatus {

	'status'?: string;

	'statusDesc'?: string;

	'accountStatus'?: IStatus;
}

export interface IPromotion {

	'promoId': string;

	'title': string;

	'subtitle': string;

	'heading': string;

	'urlScheme': string;

	'url': string;

	'textColor': string;

	'gradient': string;

	'image': string;
}

export interface IQueueContext {

	'id'?: string;

	'description'?: string;

	'type': string;
}

export interface IQueueItem {

	'id': string;

	'context': IQueueContext;

	'modified': string;

	'tracks'?: Array<IQueueTrack>;

	'currentIndex'?: number;
}

export interface IQueueTrack {

	'trackId': string;

	'albumId': string;

	'from': string;
}

export interface IQueuesResult {

	'queues': Array<IQueueItem>;
}

export interface IRestrictionEnum {

	'type': string;

	'name': string;

	'possibleValues': IRestrictionPossibleValues;
}

export interface IRestriction2 {

	'type': string;

	'name': string;

	'possibleValues': IRestriction2PossibleValues;
}

export interface IRestriction2PossibleValues {

	'name': string;

	'value': string;

	'imageUrl': string;

	'serializedSeed': string;
}

export interface IRestrictionPossibleValues {

	'name': string;

	'value': string;
}

export interface IRestrictions {

	'language'?: IRestrictionEnum;

	'mood'?: IDiscreteScale;

	'energy'?: IDiscreteScale;

	'diversity'?: IRestrictionEnum;
}

export interface IRestrictions2 {

	'diversity'?: IRestriction2;

	'moodEnergy'?: IRestriction2;

	'language'?: IRestriction2;
}

export interface IRotorData {

	'title': string;

	'description': string;

	'imageUrl': string;

	'artists': Array<IArtist>;
}

export interface IRotorSettings {

	'language': string;

	'diversity': string;

	'mood': number;

	'energy': number;
}

export enum IRotorSettings2LanguageEnum {
	NON_RUSSIAN = 'non-russian',
	RUSSIAN = 'russian',
	ANY = 'any'
}

export enum IRotorSettings2MoodEnergyEnum {
	ACTIVE = 'active',
	FUN = 'fun',
	CALM = 'calm',
	SAD = 'sad',
	ALL = 'all'
}

export enum IRotorSettings2DiversityEnum {
	FAVORITE = 'favorite',
	DISCOVER = 'discover',
	POPULAR = 'popular',
	DEFAULT = 'default'
}

export interface IRotorSettings2 {

	'language': IRotorSettings2LanguageEnum;

	'diversity': IRotorSettings2DiversityEnum;

	'moodEnergy': IRotorSettings2MoodEnergyEnum;
}

export interface ISearch {

	'searchRequestId'?: string;

	'text': string;

	'best': IBest;

	'albums': ISearchAlbums;

	'artists': ISearchArtists;

	'playlists': ISearchPlaylists;

	'tracks': ISearchTracks;

	'videos'?: ISearchVideos;

	'podcasts'?: ISearchPodcasts;

	'podcast_episodes': ISearchPodcastEpisodes;

	'type'?: ObjectTypeEnum;

	'page'?: number;

	'perPage'?: number;

	'misspellCorrected': boolean;

	'misspellOriginal'?: string;

	'nocorrect': boolean;
}

export interface ISearchAlbums {

	'type': string;

	'total': number;

	'perPage': number;

	'order': number;

	'results': Array<IAlbum>;
}

export interface ISearchAlbumsAllOf {

	'results': Array<IAlbum>;
}

export interface ISearchArtists {

	'type': string;

	'total': number;

	'perPage': number;

	'order': number;

	'results': Array<IArtist>;
}

export interface ISearchArtistsAllOf {

	'results': Array<IArtist>;
}

export interface ISearchPlaylists {

	'type': string;

	'total': number;

	'perPage': number;

	'order': number;

	'results': Array<IPlaylist>;
}

export interface ISearchPlaylistsAllOf {

	'results': Array<IPlaylist>;
}

export interface ISearchPodcastEpisodes {

	'type': string;

	'total': number;

	'perPage': number;

	'order': number;

	'results': Array<object>;
}

export interface ISearchPodcasts {

	'type': string;

	'total': number;

	'perPage': number;

	'order': number;

	'results': Array<IAlbum>;
}

export interface ISearchPodcastsAllOf {

	'results': Array<object>;
}

export interface ISearchResult {

	'type': string;

	'total': number;

	'perPage': number;

	'order': number;
}

export interface ISearchTracks {

	'type': string;

	'total': number;

	'perPage': number;

	'order': number;

	'results': Array<ITrack>;
}

export interface ISearchTracksAllOf {

	'results': Array<ITrack>;
}

export enum ObjectTypeEnum {
	ARTIST = 'artist',
	ALBUM = 'album',
	TRACK = 'track',
	PODCAST = 'podcast',
	ALL = 'all',
	PERSONAL_PLAYLIST = 'personal-playlist',
	PLAYLIST = 'playlist'
}

export interface ISearchVideos {

	'type': string;

	'total': number;

	'perPage': number;

	'order': number;

	'results': Array<IVideo>;
}

export interface ISearchVideosAllOf {

	'results': Array<IVideo>;
}

export interface ISendStationFeedbackRequest {

	'type': SendStationFeedbackRequestTypeEnum;

	'timestamp'?: string;

	'from'?: string;

	'trackId'?: string;

	'totalPlayedSeconds'?: string;
}

export enum SendStationFeedbackRequestTypeEnum {
	RADIO_STARTED = 'radioStarted',
	TRACK_STARTED = 'trackStarted',
	TRACK_FINISHED = 'trackFinished',
	SKIP = 'skip'
}

export interface ISequenceItem {

	'type': string;

	'track': ITrack;

	'liked': boolean;

	'trackParameters': ISequenceItemTrackParameters;
}

export interface ISequenceItemTrackParameters {

	'bpm': number;

	'hue': number;

	'energy': number;
}

export interface ISettings {

	'inAppProducts'?: Array<IProduct>;

	'nativeProducts'?: Array<IProduct>;

	'webPaymentUrl'?: string;

	'webPaymentMonthProductPrice'?: IPrice;

	'promoCodesEnabled'?: boolean;
}

export interface ISimilarTracks {

	'track'?: ITrack;

	'similarTracks'?: Array<ITrack>;
}

export interface IStation {

	'id': IStationId;

	'parentId'?: IStationId;

	'name': string;

	'icon': IIcon;

	'mtsIcon': IIcon;

	'fullImageUrl'?: string;

	'mtsFullImageUrl'?: string;

	'idForFrom': string;

	'restrictions'?: IRestrictions;

	'restrictions2'?: IRestrictions2;
}

export interface IStationId {

	'type': string;

	'tag': string;
}

export interface IStationResult {

	'station'?: IStation;

	'data'?: IRotorData;

	'settings'?: IRotorSettings;

	'settings2'?: IRotorSettings2;

	'adParams'?: IAdParams;

	'rupTitle'?: string;

	'rupDescription'?: string;
}

export interface IStationTracksResult {

	'id': IStationTracksResultId;

	'sequence': Array<ISequenceItem>;

	'batchId': string;

	'pumpkin': boolean;

	'radioSessionId': string;
}

export interface IStationTracksResultId {

	'type': string;

	'tag': string;
}

export interface IStatus {

	'account': IAccount;

	'permissions': Permissions;

	'subscription': ISubscription;

	'subeditor': boolean;

	'subeditorLevel': number;

	'pretrialActive': boolean;

	'plus': IStatusPlus;

	'defaultEmail': string;

	'barBelow'?: IAlert;

	'userhash': string;
}

export interface IStatusPlus {

	'hasPlus'?: boolean;

	'isTutorialCompleted'?: boolean;

	'migrated'?: boolean;
}

export interface ISubscription {

	'hadAnySubscription'?: boolean;

	'canStartTrial'?: boolean;

	'mcdonalds'?: boolean;
}

export interface ISuggestions {

	'best'?: object;

	'suggestions'?: Array<string>;
}

export interface ISupplement {

	'id'?: number;

	'lyrics'?: ILyrics;

	'videos'?: IVideoSupplement;

	'radioIsAvailable'?: boolean;

	'description'?: string;
}

export interface ITag {

	'id': string;

	'value': string;

	'name': string;

	'ogDescription': string;

	'ogImage'?: string;
}

export interface ITagResult {

	'tag'?: ITag;

	'ids'?: Array<IPlaylistId>;
}

export interface ITrack {

	'albums': Array<IAlbum>;

	'artists': Array<IArtist>;

	'available': boolean;

	'availableForPremiumUsers': boolean;

	'availableFullWithoutPermission': boolean;

	'coverUri': string;

	'durationMs': number;

	'fileSize': number;

	'id': number;

	'lyricsAvailable': boolean;

	'major': ITrackMajor;

	'normalization': ITrackNormalization;

	'ogImage': string;

	'previewDurationMs': number;

	'realId': string;

	'rememberPosition': boolean;

	'storageDir': string;

	'title': string;

	'type': string;
}

export interface ITrackDownloadInfo {

	'codec': TrackDownloadInfoCodecEnum;

	'gain': boolean;

	'preview': string;

	'downloadInfoUrl': string;

	'direct': boolean;

	'bitrateInKbps': number;
}

export enum TrackDownloadInfoCodecEnum {
	MP3 = 'mp3',
	AAC = 'aac'
}

export interface ITrackItem {

	'id': number;

	'playCount': number;

	'recent': boolean;

	'timestamp': string;

	'track'?: ITrack;
}

export interface ITrackMajor {

	'id': number;

	'name': string;
}

export interface ITrackNormalization {

	'gain': number;

	'peak': number;
}

export interface ITrackShort {

	'id': string | number;

	'albumId': string;

	'timestamp': string;
}

export interface IAlbumShort {
	id: number;
	timestamp: string;
}

export interface IPlaylistShort {
	playlist: IPlaylist;
	timestamp?: string;
}

export interface ITracksList {

	'uid': number;

	'revisions': number;

	'tracks': Array<ITrackShort>;
}

export interface IUpdateQueueResult {

	'status': string;

	'mostRecentQueue': string;
}

export interface IUserSettings {

	'uid'?: number;

	'lastFmScrobblingEnabled'?: boolean;

	'facebookScrobblingEnabled'?: boolean;

	'shuffleEnabled'?: boolean;

	'addNewTrackOnPlaylistTop'?: boolean;

	'volumePercents'?: boolean;

	'userMusicVisibility'?: VisibilityEnum;

	'userSocialVisibility'?: VisibilityEnum;

	'adsDisabled'?: boolean;

	'modified'?: string;

	'rbtDisabled'?: string;

	'theme'?: UserSettingsThemeEnum;

	'promosDisabled'?: boolean;

	'autoPlayRadio'?: boolean;

	'syncQueueEnabled'?: boolean;
}

export enum UserSettingsThemeEnum {
	BLACK = 'black',
	DEFAULT = 'default'
}

export interface IVideo {

	'title'?: string;

	'cover'?: string;

	'embedUrl'?: string;

	'provider'?: string;

	'providerVideoId'?: string;

	'youtubeUrl'?: string;

	'thumbnailUrl'?: string;

	'duration'?: number;

	'text'?: string;

	'htmlAutoPlayVideoPlayer'?: string;

	'regions'?: Array<string>;
}

export interface IVideoSupplement {

	'cover'?: string;

	'provider'?: string;

	'title'?: string;

	'providerVideoId'?: string;

	'url'?: string;

	'embedUrl'?: string;

	'embed'?: string;
}

export enum VisibilityEnum {
	PRIVATE = 'private',
	PUBLIC = 'public'
}

export interface IResponse<T> {
	'invocationInfo': IInvocationInfo;
	'result': T;
}

export enum LikeActionEnum {
	REMOVE = 'remove',
	ADD_MULTIPLE = 'add-multiple',
}

