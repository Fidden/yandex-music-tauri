<template>
	<div :class="cnPlayer('track')">
		<Image
			:class="cnPlayer('track-image')"
			:src="vm.track!.ogImage || vm.track!.coverUri"
			:alt="vm.track!.title"
			width="40"
			height="40"
			crop="100x100"
			type="track"
		/>
		<div :class="cnPlayer('track-info')">
			<NuxtLink
				v-if="vm.track?.title"
				ref="trackTitleRef"
				:class="cnPlayer('track-title')"
				:to="{name: 'album-id', params: {id: vm.track.albums[0].id}}"
			>
				<span
					ref="trackTitleTextRef"
					:key="vm.track.title"
					:class="cnPlayer('track-title-text')"
					:style="{animationPlayState: trackAnimationPlayState, animationDuration: `${vm.track.title.length * 0.2}s`}"
				>
					{{ vm.track.title }}
				</span>
			</NuxtLink>

			<p
				v-if="vm.track?.artists?.length"
				ref="artistTitleRef"
				:class="cnPlayer('track-artists')"
			>
				<span
					ref="artistTitleTextRef"
					:key="vm.track.artists.toString()"
					:class="cnPlayer('track-artists-text')"
					:style="{animationPlayState: artistAnimationPlayState, animationDuration: `${vm.track.artists.toString().length * 0.2}s`}"
				>
					<NuxtLink
						v-for="artist in vm.track.artists"
						:key="artist.name"
						:to="{name: 'artist-id', params: {id: artist.id}}"
					>
					{{ artist.name }}
				</NuxtLink>
				</span>
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import Image from '~/client/shared/components/image.vue';
import {PlayerVm} from '~/client/shared/components/player/player.vm';
import {cnPlayer} from './player.const';

const INFO_BLOCK_WIDTH = 130;

const vm = useChildVm(PlayerVm);

const trackTitleRef = ref<HTMLParagraphElement | null>(null);
const trackTitleTextRef = ref<HTMLSpanElement | null>(null);
const trackAnimationPlayState = ref<'running' | 'paused'>('paused');

const artistTitleRef = ref<HTMLParagraphElement | null>(null);
const artistTitleTextRef = ref<HTMLAnchorElement | null>(null);
const artistAnimationPlayState = ref<'running' | 'paused'>('paused');

watchEffect(() => {
	trackAnimationPlayState.value = Number(trackTitleTextRef.value?.offsetWidth) >= INFO_BLOCK_WIDTH ? 'running' : 'paused';
});

watchEffect(() => {
	artistAnimationPlayState.value = Number(artistTitleTextRef.value?.offsetWidth) >= INFO_BLOCK_WIDTH ? 'running' : 'paused';
});
</script>

<style lang="scss">
.player__track {
	display: flex;
	flex-direction: row;
	align-content: center;
	gap: 10px;

	&-image {
		border-radius: 4px;
	}

	&-info {
		display: flex;
		flex-direction: column;
		margin: auto 0;
		width: 130px;
		overflow: hidden;
	}

	&-title {
		position: relative;
		width: 100%;
		display: block;

		&-text {
			display: block;
			width: max-content;
			animation: movingTitleText infinite 6s alternate ease-in-out running;
			font-size: 14px;
			font-weight: 500;
			line-height: 16px;

			&:hover {
				animation-play-state: paused !important;
				cursor: pointer;
			}
		}
	}

	&-artists {
		width: 100%;
		display: block;
		line-height: 14px;

		&-text {
			display: block;
			width: max-content;
			animation: movingTitleText infinite 6s alternate ease-in-out running;
			white-space: nowrap;

			&:hover {
				animation-play-state: paused !important;
			}

			a {
				color: #8E919A;
				font-size: 12px;
				font-weight: 400;
				line-height: 16px;
				white-space: nowrap;
				cursor: pointer;

				&:hover {
					text-decoration: underline;
				}

				&:after {
					content: ',';
					margin-right: 3px;
				}

				&:last-child {
					&:after {
						display: none;
					}
				}
			}
		}
	}

	@keyframes movingTitleText {
		0%, 20% {
			transform: translateX(0px);
		}

		40%, 60% {
			transform: translateX(calc(-100% + 130px));
		}

		80%, 100% {
			transform: translateX(0px);
		}
	}
}
</style>
