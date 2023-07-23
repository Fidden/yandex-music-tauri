<template>
	<NuxtImg
		v-bind="$props"
		:src="croppedSrc"
		:placeholder="placeholderImage"
	/>
</template>

<script setup lang="ts">
const props = defineProps<{
	src: string;
	width?: string | number;
	height?: string | number;
	placeholder?: string;
	sizes?: string;
	densities?: string;
	fit?: 'cover' | 'contain' | 'fill' | 'scale-down' | 'none';
	preset?: string;
	preload?: boolean;
	crop: string;
	type?: 'track' | 'album' | 'artist' | 'playlist';
}>();

const [width, height] = props.crop.split('x');
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
const croppedSrc = computed(() => props.src.length ? `https://${props.src?.replace('%%', `${width}x${height}`)}` : placeholderImage.value);
</script>
