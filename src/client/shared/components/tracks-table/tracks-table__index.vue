<template>
	<div :class="cnTracksTable('index')">
		{{ index + 1 }}
	</div>
</template>

<script setup lang="ts">
import {cnTracksTable} from './tracks-table.const';

defineProps<{
	index: number;
}>();
</script>


<style lang="scss">
.tracks-table__index {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	font-size: 14px;
}
</style>
