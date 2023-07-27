<template>
	<div :class="cnPlayer('body')">
		<slot/>
	</div>
</template>

<script setup lang="ts">
import {cnPlayer} from './player.const';
</script>

<style lang="scss">
.player__body {
	display: flex;
	flex-direction: row;
	align-items: center;
	position: relative;
}
</style>
