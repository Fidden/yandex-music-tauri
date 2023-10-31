<template>
	<Navigation/>
	<main :class="cnAlbumScreen()">
		<AlbumScreenHeader/>
		<TracksTable
			hide-images
			:hide-filter="vm.isSingle"
			:tracks="vm.tracks"
			:track-count="vm.album?.trackCount"
			:type="vm.album?.type"
		/>
	</main>
</template>

<script setup lang="ts">
import AlbumScreenHeader from '~/client/screens/album-screen/album-screen__header.vue';
import Navigation from '~/client/shared/components/navigation/navigation.vue';
import TracksTable from '~/client/shared/components/tracks-table/tracks-table.vue';
import {cnAlbumScreen} from './album-screen.const';
import {AlbumScreenVm} from './album-screen.vm';

const vm = useChildVm(AlbumScreenVm);
</script>

<style lang="scss">
.album-screen {
	display: flex;
	flex-direction: column;
	gap: 26px;
}
</style>
