<template>
	<article
		:class="cnChartTrack()"
		:style="{gridArea: `i${chartItem.chart.position}`}"
	>
		<ChartTrackPosition
			:number="chartItem.chart.position"
			:progress="chartItem.chart.progress"
		/>
		<ChartTrackImage
			:og-image="chartItem.track.ogImage"
			:title="chartItem.track.title"
			:track-id="chartItem.track.id"
		/>
		<ChartTrackInfo
			:title="chartItem.track.title"
			:artists="chartItem.track.artists"
		/>
		<ChartTrackDuration
			:duration-ms="chartItem.track.durationMs"
		/>
	</article>
</template>

<script setup lang="ts">
import {IChartItem} from '~/client/shared/types/api';
import {cnChartTrack} from './chart-track.const';
import ChartTrackDuration from './chart-track__duration.vue';
import ChartTrackImage from './chart-track__image.vue';
import ChartTrackInfo from './chart-track__info.vue';
import ChartTrackPosition from './chart-track__position.vue';

defineProps<{
	chartItem: IChartItem;
}>();
</script>

<style lang="scss">
.chart-track {
	display: flex;
	flex-direction: row;
	align-items: center;
}
</style>
