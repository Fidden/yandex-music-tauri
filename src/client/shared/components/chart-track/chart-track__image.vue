<template>
	<div :class="cnChartTrack('image')">
		<Image
			:src="ogImage"
			:alt="title"
			crop="100x100"
			width="42"
			height="42"
		/>
		<div
			v-if="trackId == playerVm.track?.id"
			:class="cnChartTrack('image-icon')"
		>
			<div
				:class="cnChartTrack('image-playing', {
					stop: !playerVm.playing
				})"
			>
				<span :class="cnChartTrack('image-bar')"/>
				<span :class="cnChartTrack('image-bar')"/>
				<span :class="cnChartTrack('image-bar')"/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Image from '~/client/shared/components/image.vue';
import {PlayerVm} from '~/client/shared/components/player/player.vm';
import {cnChartTrack} from './chart-track.const';

defineProps<{
	ogImage: string;
	title: string;
	trackId: string;
}>();

const playerVm = useChildVm(PlayerVm);
</script>

<style lang="scss">
.chart-track__image {
	border-radius: 4px;
	overflow: hidden;
	position: relative;

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
			.chart-track__image-bar {
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
</style>
