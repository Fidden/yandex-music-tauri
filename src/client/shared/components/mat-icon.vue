<template>
	<Component
		:is="as"
		class="mat-icon"
	>
		{{ name }}
	</Component>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
	name: string,
	as?: string,
	fill?: boolean,
	wght?: number,
	grad?: number,
	opsz?: number,
	size?: string,
}>(), {
	as: 'span',
	fill: false,
	wght: 400,
	grad: 0,
	opsz: 48,
	size: '24px'
});

const fillNumber = computed(() => props.fill ? 1 : 0);
</script>

<style lang="scss">
.mat-icon {
	font-family: 'Material Symbols Outlined';
	font-weight: normal;
	font-style: normal;
	font-size: v-bind('size');
	line-height: 1;
	letter-spacing: normal;
	text-transform: none;
	display: inline-block;
	white-space: nowrap;
	word-wrap: normal;
	direction: ltr;
	-webkit-font-feature-settings: 'liga';
	-webkit-font-smoothing: antialiased;
	color: inherit;

	font-variation-settings: 'FILL' v-bind('fillNumber'),
	'wght' v-bind('wght'),
	'GRAD' v-bind('grad'),
	'opsz' v-bind('opsz')
}
</style>
