<template>
	<Image
		:class="cnTracksTable('image')"
		:src="src"
		:alt="alt"
		width="40"
		height="40"
		type="track"
		crop="100x100"
	/>
</template>

<script setup lang="ts">
import Image from '~/client/shared/components/image.vue';
import {cnTracksTable} from './tracks-table.const';

defineProps<{
	src: string;
	alt: string;
}>();
</script>

<style lang="scss">
.tracks-table__image {
	width: 40px;
	height: 40px;
	border-radius: 4px;
}
</style>
