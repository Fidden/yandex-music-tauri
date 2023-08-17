<script setup lang="ts">
import {cnChartScreen} from '~/client/screens/chart-screen/chart-screen.const';
import {ChartScreenVm} from '~/client/screens/chart-screen/chart-screen.vm';
import ContentBlock from '~/client/shared/components/content-block/content-block.vue';
import TracksTableSkeleton from '~/client/shared/components/tracks-table-skeleton/tracks-table-skeleton.vue';
import TracksTable from '~/client/shared/components/tracks-table/tracks-table.vue';

const vm = useVm(ChartScreenVm, true);
</script>

<template>
	<ContentBlock
		:class="cnChartScreen()"
		title="Чарт"
		subtitle="Треки, популярные на Яндекс.Музыке прямо сейчас"
		:loading="vm.pending.get('init')"
	>
		<template #default>
			<TracksTable
				:tracks="vm.tracks"
			/>
		</template>
		<template #fallback>
			<TracksTableSkeleton/>
		</template>
	</ContentBlock>
</template>

<style lang="scss">
.chart-screen {
	.content-block__body {
		display: flex;
		flex-direction: column;
	}
}
</style>
