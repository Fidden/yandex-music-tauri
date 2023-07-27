<template>
	<div :class="cnConcertCard('footer')">
		<slot/>
	</div>
</template>

<script setup lang="ts">
import {cnConcertCard} from './concert-card.const';
</script>

<style lang="scss">
.concert-card__footer {
	padding: 8px;
	display: flex;
	flex-direction: row;
	align-items: center;
	overflow: hidden;
	flex: 1;
}
</style>
