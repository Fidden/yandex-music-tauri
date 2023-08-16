<script setup lang="ts">
import {IChartItem} from '~/client/shared/types/api';
import {cnChartTrack} from './chart-track.const';

defineProps<{
	number: number;
	progress: IChartItem['chart']['progress']
}>();
</script>

<template>
	<div :class="cnChartTrack('position')">
		<p :class="cnChartTrack('position-number')">
			{{ number }}
		</p>
		<div :class="cnChartTrack('position-progress', [progress])"/>
	</div>
</template>

<style lang="scss">
.chart-track__position {
	width: 25px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 4px;

	&-number {
		font-size: 14px;
	}

	&-progress {
		height: 2px;
		width: 7px;
		background: #777;
	}
}
</style>
