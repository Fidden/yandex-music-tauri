<template>
	<ContentBlock
		:class="cnIndexScreen('chart')"
		title="Чарт"
		subtitle="Треки, популярные на Яндекс Музыке прямо сейчас"
	>
		<ChartTrack
			v-for="(entity, index) in vm.chart?.entities"
			:key="entity.id"
			:chart-item="entity.data"
			@click="globalEmitter.emit('player:set-queue', vm.chartTracksFromIndex(index))"
		/>
	</ContentBlock>
</template>

<script setup lang="ts">
import {IndexScreenVm} from '~/client/screens/index-screen/index-screen.vm';
import ChartTrack from '~/client/shared/components/chart-track/chart-track.vue';
import ContentBlock from '~/client/shared/components/content-block/content-block.vue';
import {globalEmitter} from '~/client/shared/emitters/global.emitter';
import {cnIndexScreen} from './index-screen.const';

const vm = useVm(IndexScreenVm, true);
</script>

<style lang="scss">
.index-screen__chart {
	.content-block__body {
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(5, 1fr);
		grid-template-areas:
			"i1 i6"
			"i2 i7"
			"i3 i8"
			"i4 i9"
			"i5 i10";
		gap: 8px 30px;
	}
}
</style>
