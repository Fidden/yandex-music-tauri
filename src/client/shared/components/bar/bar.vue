<template>
	<aside :class="cnBar()">
		<NuxtLink
			v-for="(item, index) in vm.routes"
			:key="index"
			:class="cnBar('link', {
				active: $route.name === item.to.name
			})"
			:to="item.to"
		>
			<i :class="item.icon"/>
		</NuxtLink>
		<div
			:style="{top: vm.linePosition}"
			:class="cnBar('line')"
		/>
	</aside>
</template>

<script lang="ts" setup>
import {useRoute} from 'vue-router';
import {BarVm} from '~/client/shared/components/bar/bar.vm';
import {cnBar} from './bar.const';

const route = useRoute();
const vm = useVm(BarVm);

watch(() => route.name, () => vm.updateCurrenRoute(route), {immediate: true});
</script>

<style lang="scss">
.bar {
	width: 60px;
	padding: 0 5px;
	display: flex;
	flex-direction: column;
	position: fixed;
	left: 0;
	top: 75px;
	background: #161b23;
	height: 100%;

	&__line {
		position: absolute;
		left: 0;
		top: 25px;
		height: 17px;
		width: 4px;
		border-radius: 9px;
		background: var(--primary);
		transform: translateY(-50%);
		transition: 0.2s;
	}

	&__link {
		width: 50px;
		height: 50px;
		background: none;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: #AFB8C1;
		transition: 0.2s;

		i {
			color: inherit;
		}

		&--active {
			background: var(--primary-transperent);
			border-radius: 4px;
			color: var(--primary);
		}

		&:hover {
			transition: 0.2s;
			color: var(--primary);
		}
	}
}
</style>
