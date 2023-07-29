<template>
	<main :class="cnStationsScreen()">
		<ContentBlock
			:class="cnStationsScreen('dashboard')"
			title="Радио"
		>
			<StationCard
				v-for="element in vm.stationDashboard?.stations"
				:key="element.station?.id"
				:station="element.station!"
			/>
		</ContentBlock>
		<ContentBlock
			:class="cnStationsScreen('list')"
			title="Подборки"
		>
			<nav :class="cnStationsScreen('list-nav')">
				<button
					v-for="key in vm.stationListSplittedKeys"
					:key="key"
					:class="cnStationsScreen('list-nav-button', {
						active: key === vm.selectedKey
					})"
					@click="vm.selectedKey = key"
				>
					{{ vm.keyToHuman(key) }}
				</button>
			</nav>
			<div :class="cnStationsScreen('list-body')">
				<StationCard
					v-for="station in vm.stationListByKey"
					:key="station?.id"
					:station="station"
					size="sm"
				/>
			</div>
		</ContentBlock>
	</main>
</template>

<script setup lang="ts">
import {cnStationsScreen} from '~/client/screens/stations-screen/stations-screen.const';
import {StationsScreenVm} from '~/client/screens/stations-screen/stations-screen.vm';
import ContentBlock from '~/client/shared/components/content-block/content-block.vue';
import StationCard from '~/client/shared/components/station-card/station-card.vue';

const vm = useVm(StationsScreenVm, true);
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
			display: flex;
			flex-direction: column;
		}

		&-body {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
			grid-template-rows: repeat(3, 1fr);
			gap: 7px;
		}

		&-nav {
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
	}
}
</style>
