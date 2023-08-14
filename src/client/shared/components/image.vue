<template>
	<img
		:src="croppedSrc"
		:alt="alt"
		:width="width"
		:height="height"
		:loading="platform.name === 'darwin' ? 'eager' : 'lazy'"
	>
</template>

<script setup lang="ts">
import {platform} from '@tauri-apps/api/os';
import {cropImage} from '~/client/shared/helpers/crop-image';

const props = defineProps<{
	src: string | undefined;
	alt: string;
	width?: string | number;
	height?: string | number;
	preload?: boolean;
	crop: string;
	type?: 'track' | 'album' | 'artist' | 'playlist' | 'profile';
	placeholder?: string;
}>();

const [_width, _height] = props.crop.split('x');
const placeholderImage = computed(() => {
	if (props.placeholder) {
		return props.placeholder;
	}

	switch (props.type) {
		case 'track':
			return '/img/placeholders/track.svg';
		case 'artist':
			return '/img/placeholders/artist.svg';
		case 'playlist':
			return '/img/placeholders/playlist.svg';
		case 'album':
			return '/img/placeholders/album.svg';
	}
});
const croppedSrc = computed(() => props.src?.length ? cropImage(props.src, _width, _height) : placeholderImage.value);
</script>
