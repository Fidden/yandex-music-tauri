<template>
	<main :class="cnTracksScreen()">
		<ContentBlock title="Мои треки">
			<TracksTable
				:tracks="vm.tracksLists"
			/>
		</ContentBlock>
	</main>
</template>

<script setup lang="ts">
import ContentBlock from '~/client/shared/components/content-block/content-block.vue';
import TracksTable from '~/client/shared/components/tracks-table/tracks-table.vue';
import {cnTracksScreen} from './tracks-screen.const';
import {TracksScreenVm} from './tracks-screen.vm';

const vm = useVm(TracksScreenVm, true);
</script>

<style lang="scss">
.tracks-screen {
	.content-block__body {
		display: flex;
		flex-direction: column;
	}
}
</style>
