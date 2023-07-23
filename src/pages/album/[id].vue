<template>
	<AlbumScreen/>
</template>

<script setup lang="ts">
import {useRoute} from 'vue-router';
import {AlbumScreenVm} from '~/client/screens/album-screen/album-screen.vm';
import AlbumScreen from '~/client/screens/album-screen/album-screen.vue';

const route = useRoute();

const vm = useVm(AlbumScreenVm);
await vm.init({
	id: Number(route.params.id)
});
</script>
