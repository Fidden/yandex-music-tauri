<template>
	<div :class="cnPlayer('range')">
		<div
			:style="{width: selectedWidth}"
			:class="cnPlayer('range-slide', {
				selected: true
			})"
		/>
		<input
			v-model.number="currentValue"
			:max="maxValue"
			:step="step || 1"
			:class="cnPlayer('range-el')"
			min="0"
			type="range"
			@input="emits('change', currentValue);"
		>
		<div
			:class="cnPlayer('range-slide', {
				unselected: true
			})"
		/>
	</div>
</template>

<script setup lang="ts">
import {cnPlayer} from '~/client/shared/components/player/player.const';

const emits = defineEmits<{
	(e: 'change', value: number): void;
}>();

const props = defineProps<{
	value: number;
	maxValue: number;
	step?: number;
}>();

const currentValue = ref(props.value);
watch(() => props.value, value => currentValue.value = value, {
	immediate: true,
	flush: 'post'
});

const selectedWidth = computed(() => {
	const divide = (currentValue.value / props.maxValue) * 100;
	if (isNaN(divide)) {
		return '0%';
	} else if (divide < 50) {
		return `calc(${divide}% + 5px)`;
	} else {
		return `calc(${divide}% - 5px)`;
	}
});
</script>

<style lang="scss">
.player__range {
	display: flex;
	flex-direction: row;
	align-items: center;
	position: relative;
	flex: 1;

	&-slide {
		background: #A1A1A1;
		width: calc(100% - 2px);
		height: 6px;
		position: absolute;
		z-index: 5;
		border-radius: 15px;
		left: 0;

		&--selected {
			background: var(--primary);
			z-index: 10;
		}
	}

	&-el {
		height: 6px;
		-webkit-appearance: none;
		outline: none;
		background: none;
		z-index: 20;
		width: 100%;

		&::-webkit-slider-thumb {
			-webkit-appearance: none;
			width: 19px;
			height: 19px;
			border-radius: 50%;
			cursor: pointer;
			border: 4px solid #434343;
			background: var(--primary);
		}
	}
}
</style>
