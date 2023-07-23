<template>
	<AlbumsScreen/>
</template>

<script lang="ts" setup>
import {AlbumsScreenVm} from '~/client/screens/albums-screen/albums-screen.vm';
import AlbumsScreen from '~/client/screens/albums-screen/albums-screen.vue';

const vm = useVm(AlbumsScreenVm);
vm.init();
</script>
