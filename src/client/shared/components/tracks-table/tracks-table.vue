<template>
	<TracksTableFilter v-if="!hideFilter"/>
	<RecycleScroller
		:page-mode="pageMode"
		:item-size="50"
		:items="vm.filteredTracks"
		key-field="id"
	>
		<template #before>
			<div
				:class="cnTracksTable('before', {
					hideImages,
					isPodcast
				})"
			>
				<p :class="cnTracksTable('before-index')">
					#
				</p>
				<p v-if="isPodcast"/>
				<p
					v-if="!hideImages"
					:class="cnTracksTable('before-image')"
				/>
				<p :class="cnTracksTable('before-name')">
					Название
				</p>
				<p
					v-if="!isPodcast"
					:class="cnTracksTable('before-album')"
				>
					Альбом
				</p>
				<p/>
				<i :class="cnTracksTable('before-clock fal fa-clock fa-sm')"/>
			</div>
		</template>
		<template #default="{ item, index }">
			<article
				:class="cnTracksTable('track', {
		            disabled: !item.available,
		            hideImages,
		            isPodcast
		        })"
				@click="vm.addToQueue(index, item.id)"
			>
				<div :class="cnTracksTable('index')">
					<Icon
						v-if="playerVm.track?.id == item.id"
						:class="cnTracksTable('index-pause')"
						:name="playerVm.playing ? 'ic:round-pause' : 'ic:round-play-arrow'"
						size="1.4em"
					/>
					<Fragment v-else>
			            <span :class="cnTracksTable('index-el')">
			              {{ trackCount && isPodcast ? trackCount - index : index + 1 }}
			            </span>
						<Icon
							:class="cnTracksTable('index-icon')"
							name="ic:round-play-arrow"
							size="1.4em"
						/>
					</Fragment>
				</div>
				<p
					v-if="isPodcast"
					:class="cnTracksTable('date')"
				>
					{{
						new Date(item.pubDate).toLocaleString('ru', {
							month: 'short',
							day: '2-digit'
						})
					}}
				</p>
				<div
					v-show="!hideImages"
					:class="cnTracksTable('image')"
				>
					<Image
						:key="item.id"
						:src="item.ogImage"
						:alt="item.title"
						width="40"
						height="40"
						type="track"
						crop="100x100"
					/>
					<div
						v-if="item.id == playerVm.track?.id"
						:class="cnTracksTable('image-icon')"
					>
						<div
							:class="cnTracksTable('image-playing', {
								stop: !playerVm.playing
							})"
						>
							<span :class="cnTracksTable('image-bar')"/>
							<span :class="cnTracksTable('image-bar')"/>
							<span :class="cnTracksTable('image-bar')"/>
						</div>
					</div>
				</div>
				<div :class="cnTracksTable('title')">
					<p :class="cnTracksTable('title-text')">
						{{ item.title }}
					</p>
					<div :class="cnTracksTable('title-body')">
						<p
							v-if="item.contentWarning"
							:class="cnTracksTable('title-warning')"
						>
							{{ item.contentWarning?.at(0) }}
						</p>
						<ArtistsLinks :artists="item.artists"/>
					</div>
				</div>
				<div
					v-if="!isPodcast"
					:class="cnTracksTable('album')"
				>
					<NuxtLink
						v-for="album in item.albums"
						:key="album.id"
						:to="{name: 'album-id', params: {id: album.id}}"
						@click.stop
					>
						{{ album.title }}
					</NuxtLink>
				</div>
				<th/>
				<p :class="cnTracksTable('time')">
					{{ item.durationMs ? convertDuration(item.durationMs) : '0:00' }}
				</p>
			</article>
		</template>
	</RecycleScroller>
</template>

<script setup lang="ts">
import ArtistsLinks from '~/client/shared/components/artists-links/artists-links.vue';
import Fragment from '~/client/shared/components/fragment.vue';
import Image from '~/client/shared/components/image.vue';
import {PlayerVm} from '~/client/shared/components/player/player.vm';
import {TracksTableVm, TrackType} from '~/client/shared/components/tracks-table/tracks-table.vm';
import {globalEmitter} from '~/client/shared/emitters/global.emitter';
import {convertDuration} from '~/client/shared/helpers/convert-duration';
import {AlbumTypeEnum} from '~/client/shared/types/api';
import {cnTracksTable} from './tracks-table.const';
import TracksTableFilter from './tracks-table__filter.vue';

const props = withDefaults(defineProps<{
	tracks: TrackType[];
	hideImages?: boolean;
	hideFilter?: boolean;
	trackCount?: number;
	type?: AlbumTypeEnum;
	pageMode?: boolean;
}>(), {
	pageMode: true
});

const vm = useVm(TracksTableVm);
const playerVm = useVm(PlayerVm, true);
const isPodcast = props.type === AlbumTypeEnum.PODCAST;

watch(() => props.tracks, tracks => vm.init({tracks}), {immediate: true});

globalEmitter.on('tracks-table:play-shuffle', () => {
	const randomStartIndex = Math.floor(Math.random() * vm.filteredTracks.length);
	vm.addToQueue(randomStartIndex);
});
</script>

<style lang="scss">
@import url("vue-virtual-scroller/dist/vue-virtual-scroller.css");

.tracks-table {
	&__before {
		display: grid;
		gap: 8px;
		grid-template-columns: 40px 40px 40fr 16fr 45px 45px;
		grid-template-rows: 42px;

		&-index,
		&-name,
		&-album,
		&-clock {
			display: flex;
			align-items: center;
		}

		&-index {
			justify-content: center;
		}

		&-clock {
			justify-content: center;
		}

		&--hideImages {
			grid-template-columns: 40px 40fr 16fr 45px 45px;
		}

		&--isPodcast {
			grid-template-columns: 40px 4fr 40fr 45px 45px;
		}
	}

	&__track {
		display: grid;
		grid-template-rows: 1fr;
		grid-template-columns: 40px 40px 40fr 16fr 45px 45px;
		gap: 8px;
		height: 50px;
		padding: 2px 0;
		border-radius: 4px;

		&--disabled {
			opacity: 0.3;
			pointer-events: none;
		}

		&--hideImages {
			grid-template-columns: 40px 40fr 16fr 45px 45px;
		}

		&--isPodcast {
			grid-template-columns: 40px 4fr 40fr 45px 45px;

			.tracks-table__title-body {
				display: none;
			}

			.tracks-table__index-el {
				color: #8E929C;
			}
		}
	}

	&__album {
		align-items: center;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		max-width: 100%;
		margin: auto 0;
		color: #8E929C;
		font-size: 14px;

		a {
			font-size: inherit;
			color: inherit;

			&:hover {
				text-decoration: underline;
			}
		}
	}

	&__date {
		font-size: 14px;
		line-height: 16px;
		font-weight: 400;
		margin: auto auto auto 0;
		color: #8E929C;
	}

	&__image {
		width: 40px;
		height: 40px;
		border-radius: 4px;
		overflow: hidden;
		position: relative;
		margin: auto 0;

		&-icon {
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.6);
			position: absolute;
			left: 0;
			top: 0;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			border-radius: 4px;
		}

		&-playing {
			width: 32px;
			height: 32px;
			border-radius: .3rem;
			display: flex;
			justify-content: space-between;
			align-items: flex-end;
			padding: .5rem;
			box-sizing: border-box;

			&--stop {
				.tracks-table__image-bar {
					animation-play-state: paused;
				}
			}
		}

		&-bar {
			display: inline-block;
			background: var(--primary);
			width: 4px;
			height: 100%;
			animation: up-and-down 1.3s ease infinite alternate;
			will-change: height;

			&:nth-child(1) {
				height: 60%;
			}

			&:nth-child(2) {
				height: 30%;
				animation-delay: -2.2s;
			}

			&:nth-child(3) {
				height: 75%;
				animation-delay: -3.7s;
			}
		}

		@keyframes up-and-down {
			10% {
				height: 30%;
			}

			30% {
				height: 100%;
			}

			60% {
				height: 50%;
			}

			80% {
				height: 75%;
			}

			100% {
				height: 60%;
			}
		}
	}


	&__index {
		display: flex;
		font-size: 14px;
		position: relative;

		&-icon {
			display: none !important;
		}

		&-el, &-icon, &-pause {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}
	}

	&__time {
		font-size: 12px;
		width: 100%;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		z-index: 20;
	}

	&__title {
		display: flex;
		flex-direction: column;
		justify-content: center;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;

		&-text {
			font-size: 15px;
			line-height: 15px;
			width: max-content;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			max-width: 100%;
		}

		&-body {
			display: flex;
			flex-direction: row;
			align-items: center;
		}

		&-warning {
			color: #161b23;
			background: #8E929C;
			width: 11px;
			height: 11px;
			text-transform: uppercase;
			font-size: 7px;
			font-weight: 500;
			line-height: 12px;
			text-align: center;
			border-radius: 2px;
			margin-right: 4px;
		}
	}
}

.vue-recycle-scroller__item-view.hover {
	.tracks-table__track {
		background: #202531;
	}

	.tracks-table__index-el {
		display: none;
	}

	.tracks-table__index-icon {
		display: block !important;
	}
}
</style>
