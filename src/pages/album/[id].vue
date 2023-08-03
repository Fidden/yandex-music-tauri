<template>
  <AlbumScreenSkeleton v-if="vm.pending.get('init')"/>
  <AlbumScreen v-else/>
</template>

<script setup lang="ts">
import {useRoute} from 'vue-router';
import {AlbumScreenVm} from '~/client/screens/album-screen/album-screen.vm';
import AlbumScreen from '~/client/screens/album-screen/album-screen.vue';
import AlbumScreenSkeleton from '~/client/screens/album-screen-skeleton/album-screen-skeleton.vue';

const route = useRoute();

const vm = useVm(AlbumScreenVm);
vm.init({
	id: Number(route.params.id)
});
</script>
