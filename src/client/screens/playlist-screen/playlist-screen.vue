<template>
	<Navigation/>
	<main :class="cnPlaylistScreen()">
		<PlaylistScreenHeader/>
		<TracksTable
			v-if="vm.tracks"
			:tracks="vm.tracks"
		/>
	</main>
</template>

<script setup lang="ts">
import Navigation from '~/client/shared/components/navigation/navigation.vue';
import TracksTable from '~/client/shared/components/tracks-table/tracks-table.vue';
import {cnPlaylistScreen} from './playlist-screen.const';
import {PlaylistScreenVm} from './playlist-screen.vm';
import PlaylistScreenHeader from './playlist-screen__header.vue';

const vm = useChildVm(PlaylistScreenVm);
</script>

<style lang="scss">
.playlist-screen {
	display: flex;
	flex-direction: column;
	gap: 26px;
}
</style>
