<script setup lang="ts">
import {cnNavigation} from './navigation.const';
</script>

<template>
	<div :class="cnNavigation()">
		<button
			:class="cnNavigation('button')"
			@click="$router.back()"
		>
			<Icon
				size="1.5rem"
				name="ic:round-chevron-left"
			/>
		</button>
		<button
			disabled
			:class="cnNavigation('button')"
			@click="$router.forward()"
		>
			<Icon
				size="1.5rem"
				name="ic:round-chevron-right"
			/>
		</button>
	</div>
</template>

<style lang="scss">
.navigation {
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 10px;
	padding-bottom: 20px;

	&__button {
		border-radius: 50px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		background: #161b23;
		color: white;
		transition: 200ms;
		width: 36px;
		height: 36px;

		&:hover path {
			transition: 200ms;
			fill: var(--primary);
		}

		&:disabled {
			pointer-events: none;
			opacity: 0.7;
		}
	}
}
</style>
