<template>
	<nav
		v-if="vm.stationListSplittedKeys.length > 1"
		:class="cnStationsScreen('filter')"
	>
		<button
			v-for="key in vm.stationListSplittedKeys"
			:key="key"
			:class="cnStationsScreen('filter-button', {
				active: key === vm.selectedKey
			})"
			@click="vm.selectedKey = key"
		>
			{{ vm.keyToHuman(key) }}
		</button>
	</nav>
	<StationsScreenFilterSkeleton v-else/>
</template>

<script setup lang="ts">
import {cnStationsScreen} from './stations-screen.const';
import {StationsScreenVm} from './stations-screen.vm';
import StationsScreenFilterSkeleton from './stations-screen__filter-skeleton.vue';

const vm = useChildVm(StationsScreenVm);
</script>

<style lang="scss">
.stations-screen__filter {
	display: flex;
	flex-direction: row;
	border-bottom: 1px solid #353B4E;
	margin-bottom: 24px;

	&-button {
		background: none;
		transition: 0.2s;
		color: #8E929C;
		font-weight: 500;
		font-size: 16px;
		line-height: 32px;
		box-sizing: border-box;
		border-bottom: 2px solid rgba(0, 0, 0, 0);

		&--active {
			border-bottom: 2px solid var(--primary);
			color: white !important;
			transition: 0.2s;
		}
	}
}
</style>
