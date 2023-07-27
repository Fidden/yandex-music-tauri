<template>
	<NewPlaylistsScreen/>
</template>

<script setup lang="ts">
import {NewPlaylistsScreenVm} from '~/client/screens/new-playlists-screen/new-playlists-screen.vm';
import NewPlaylistsScreen from '~/client/screens/new-playlists-screen/new-playlists-screen.vue';

const vm = useVm(NewPlaylistsScreenVm);
await vm.init();
</script>
