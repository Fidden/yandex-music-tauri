<template>
	<ArtistsScreen/>
</template>

<script lang="ts" setup>
import {ArtistsScreenVm} from '~/client/screens/artists-screen/artists-screen.vm';
import ArtistsScreen from '~/client/screens/artists-screen/artists-screen.vue';

const vm = useVm(ArtistsScreenVm);
vm.init();
</script>
