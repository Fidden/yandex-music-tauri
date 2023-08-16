<template>
	<p :class="cnChartTrack('duration')">
		{{ convertDuration(durationMs) }}
	</p>
</template>

<script setup lang="ts">
import {cnChartTrack} from './chart-track.const';

defineProps<{
	durationMs: number;
}>();
</script>

<style lang="scss">
.chart-track__duration {
	margin-left: auto;
	color: #8E929C;
	font-size: 12px;
}
</style>
