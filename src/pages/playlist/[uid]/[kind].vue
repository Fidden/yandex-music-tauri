<template>
  <PlaylistScreenSkeleton v-if="vm.pending.get('init')"/>
  <PlaylistScreen v-else/>
</template>

<script setup lang="ts">
import {useRoute} from 'vue-router';
import {PlaylistScreenVm} from '~/client/screens/playlist-screen/playlist-screen.vm';
import PlaylistScreen from '~/client/screens/playlist-screen/playlist-screen.vue';
import PlaylistScreenSkeleton from '~/client/screens/playlist-screen-skeleton/playlist-screen-skeleton.vue';

const route = useRoute();

const vm = useVm(PlaylistScreenVm);
vm.init({
	kind: Number(route.params.kind),
	uid: Number(route.params.uid)
});
</script>
