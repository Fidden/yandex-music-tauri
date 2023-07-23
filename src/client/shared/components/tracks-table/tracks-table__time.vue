<template>
	<p :class="cnTracksTable('time')">
		{{ durationMs ? convertDuration(durationMs) : '0:00' }}
	</p>
</template>

<script setup lang="ts">
import {cnTracksTable} from './tracks-table.const';
import {convertDuration} from '~/client/shared/helpers/convert-duration';

defineProps<{
	durationMs?: number;
}>();
</script>


<style lang="scss">
.tracks-table__time {
	font-size: 12px;
	width: 100%;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
	z-index: 20;
}
</style>
