<template>
	<Navigation/>
	<main :class="cnStationsScreen()">
		<ContentBlock
			:class="cnStationsScreen('dashboard')"
			title="Радио"
			:loading="vm.pending.get('init')"
		>
			<template #default>
				<StationCard
					v-for="element in vm.stationDashboard?.stations"
					:key="element.station?.idForFrom"
					:station="element.station!"
				/>
			</template>
			<template #fallback>
				<StationCardSkeleton
					v-for="i in 4"
					:key="i"
				/>
			</template>
		</ContentBlock>
		<ContentBlock
			:class="cnStationsScreen('list')"
			title="Подборки"
			:loading="vm.pending.get('init')"
		>
			<template #before>
				<StationsScreenFilter/>
			</template>
			<template #default>
				<StationCard
					v-for="station in vm.stationListByKey"
					:key="station?.idForFrom"
					:station="station"
					size="sm"
				/>
			</template>
			<template #fallback>
				<StationCardSkeleton
					v-for="i in 26"
					:key="i"
					size="sm"
				/>
			</template>
		</ContentBlock>
	</main>
</template>

<script setup lang="ts">
import ContentBlock from '~/client/shared/components/content-block/content-block.vue';
import Navigation from '~/client/shared/components/navigation/navigation.vue';
import StationCardSkeleton from '~/client/shared/components/station-card-skeleton/station-card-skeleton.vue';
import StationCard from '~/client/shared/components/station-card/station-card.vue';
import {cnStationsScreen} from './stations-screen.const';
import {StationsScreenVm} from './stations-screen.vm';
import StationsScreenFilter from './stations-screen__filter.vue';

const vm = useChildVm(StationsScreenVm);
</script>


<style lang="scss">
.stations-screen {
	display: flex;
	flex-direction: column;
	gap: 45px;

	&__dashboard {
		.content-block__body {
			grid-template-columns: repeat(auto-fill, 213px);
		}
	}

	&__list {
		.content-block__body {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
			grid-template-rows: repeat(3, 1fr);
			gap: 7px;
		}
	}
}
</style>
