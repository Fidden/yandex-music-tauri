<template>
	<button
		:class="cnButton(null, [variant])"
	>
		<slot/>
	</button>
</template>

<script setup lang="ts">
import {cnButton} from './button.const';

withDefaults(defineProps<{
	variant?: 'primary' | 'text'
}>(), {
	variant: 'primary'
});
</script>

<style lang="scss">
.button {
	padding: 9px 37px;
	border-radius: 9999px;
	font-size: 14px;
	font-weight: 400;
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 4px;

	&:disabled {
		opacity: 0.5;
		pointer-events: none;
	}

	&--primary {
		border: 1px solid var(--primary);
		background: none;
		transition: 200ms;
		color: var(--primary);

		path {
			fill: var(--primary);
		}


		&:hover {
			transition: 200ms;
			color: black;
			background: var(--primary);

			path {
				fill: black;
			}
		}
	}


	&--text {
		padding: 10px;
		background: none;
	}
}
</style>
