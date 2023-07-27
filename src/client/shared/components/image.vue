<template>
	<img
		:src="croppedSrc"
		:alt="alt"
		:width="width"
		:height="height"
		loading="lazy"
	>
</template>

<script setup lang="ts">
import {cropImage} from '~/client/shared/helpers/crop-image';

const props = defineProps<{
	src: string | undefined;
	alt: string;
	width?: string | number;
	height?: string | number;
	preload?: boolean;
	crop: string;
	type?: 'track' | 'album' | 'artist' | 'playlist';
}>();

const [_width, _height] = props.crop.split('x');
const placeholderImage = computed(() => {
	switch (props.type) {
		case 'track':
			return '/img/placeholders/track-placeholder.svg';
		case 'artist':
			return '/img/placeholders/artist-placeholder.svg';
		case 'playlist':
			return '/img/placeholders/playlist-placeholder.svg';
		case 'album':
			return '/img/placeholders/album-placeholder.svg';
	}
});
const croppedSrc = computed(() => props.src?.length ? cropImage(props.src, _width, _height) : placeholderImage.value);
</script>
