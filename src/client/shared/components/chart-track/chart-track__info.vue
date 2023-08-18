<template>
	<div :class="cnChartTrack('info')">
		<p :class="cnChartTrack('info-title')">
			{{ title }}
		</p>
		<ArtistsLinks :artists="artists"/>
	</div>
</template>

<script setup lang="ts">
import ArtistsLinks from '~/client/shared/components/artists-links/artists-links.vue';
import {IArtist} from '~/client/shared/types/api';
import {cnChartTrack} from './chart-track.const';

defineProps<{
	title: string;
	artists: IArtist[];
}>();
</script>

<style lang="scss">
.chart-track__info {
	display: flex;
	flex-direction: column;
	padding-left: 6px;

	&-title {
		font-size: 15px;
		line-height: 14px;
	}
}
</style>
