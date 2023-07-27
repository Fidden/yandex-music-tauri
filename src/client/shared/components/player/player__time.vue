<template>
	<p :class="cnPlayer('time')">
		{{ convertTime(time) }}
	</p>
</template>

<script setup lang="ts">
import {convertTime} from '~/client/shared/helpers/convert-time';
import {cnPlayer} from './player.const';

defineProps<{
	time: number;
}>();
</script>

<style lang="scss">
.player__time {
	font-weight: 400;
	font-size: 10px;
	line-height: 16px;
	color: #D8DBE4;
	font-family: 'Azeret Mono', monospace;
}
</style>
