<template>
	<div :class="cnConcertCard('image')">
		<img
			:src="src"
			:alt="alt"
			loading="lazy"
			width="250"
			height="150"
		>
	</div>
</template>

<script setup lang="ts">
import {cnConcertCard} from './concert-card.const';

defineProps<{
	src: string;
	alt: string;
}>();
</script>

<style lang="scss">
.concert-card__image {
	width: 100%;

	img {
		object-fit: cover;
	}
}
</style>
