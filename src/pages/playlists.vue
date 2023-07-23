<template>
	<PlaylistsScreen/>
</template>

<script lang="ts" setup>
import {PlaylistsScreenVm} from '~/client/screens/playlists-screen/playlists-screen.vm';
import PlaylistsScreen from '~/client/screens/playlists-screen/playlists-screen.vue';

const vm = useVm(PlaylistsScreenVm);
vm.init();
</script>
