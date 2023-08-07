<template>
	<article :class="cnSearchCardBest()">
		<Image
			:class="cnSearchCardBest('image')"
			:src="imageSource"
			:alt="title"
			crop="100x100"
			width="100"
			height="100"
		/>
		<h2 :class="cnSearchCardBest('title')">
			{{ title }}
		</h2>
		<p :class="cnSearchCardBest('type')">
			{{ typeHuman }}
		</p>
		<button :class="cnSearchCardBest('play')">
			<MatIcon
				name="play_arrow"
				fill
			/>
		</button>
	</article>
</template>

<script setup lang="ts">
import Image from '~/client/shared/components/image.vue';
import MatIcon from '~/client/shared/components/mat-icon.vue';
import {BestResult} from '~/client/shared/types/api';
import {cnSearchCardBest} from './search-card-best.const';

const props = defineProps<{
	result: BestResult,
	type: string;
}>();

const imageSource = computed(() => {
	if ('cover' in props.result) {
		return props.result.cover?.uri;
	}

	if ('ogImage' in props.result) {
		return props.result.ogImage;
	}
});

const title = computed(() => {
	if ('title' in props.result) {
		return props.result.title;
	} else if ('name' in props.result) {
		return props.result.name;
	}

	return props.result;
});

const typeHuman = computed(() => {
	if (props.type === 'artist') {
		return 'Артист';
	} else if (props.type === 'podcast') {
		return 'Подкаст';
	} else if (props.type === 'album') {
		return 'Альбом';
	} else if (props.type === 'playlist') {
		return 'Плейлист';
	} else if (props.type === 'track') {
		return 'Трек';
	}

	return props.type;
});
</script>

<style lang="scss">
.search-card-best {
	height: 100%;
	background: #151a22;
	padding: 20px;
	border-radius: 6px;
	display: flex;
	flex-direction: column;
	transition: 200ms;
	cursor: pointer;
	position: relative;
	grid-area: artist-search;
	gap: 12px;

	&__image {
		border-radius: 50%;
	}

	&__title {
		font-size: 32px;
		line-height: 28px;
	}

	&__type {
		margin-top: auto;
		font-size: 14px;
		font-weight: bold;
		background: rgba(0, 0, 0, 0.4);
		width: min-content;
		padding: 4px 12px;
		border-radius: 500px;
	}

	&__play {
		opacity: 0;
		position: absolute;
		right: 20px;
		bottom: 10px;
		background: var(--primary);
		display: flex;
		justify-content: center;
		align-items: center;
		width: 48px;
		height: 48px;
		border-radius: 50%;
		color: black;
		transition: 200ms;
		box-shadow: 0 8px 8px rgba(0, 0, 0, .3);
	}

	&:hover {
		background: #141920;
		transition: 200ms;

		.search-card-best__play {
			opacity: 1;
			bottom: 20px;
			transition: 200ms;
		}
	}
}
</style>
