<template>
	<PlaylistScreen/>
</template>

<script setup lang="ts">
import {useRoute} from 'vue-router';
import {PlaylistScreenVm} from '~/client/screens/playlist-screen/playlist-screen.vm';
import PlaylistScreen from '~/client/screens/playlist-screen/playlist-screen.vue';

const route = useRoute();

const vm = useVm(PlaylistScreenVm);
await vm.init({
	kind: Number(route.params.kind),
	uid: Number(route.params.uid)
});
</script>
