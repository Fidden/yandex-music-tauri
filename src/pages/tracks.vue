<template>
	<TracksScreen/>
</template>

<script lang="ts" setup>
import {TracksScreenVm} from '~/client/screens/tracks-screen/tracks-screen.vm';
import TracksScreen from '~/client/screens/tracks-screen/tracks-screen.vue';

const vm = useVm(TracksScreenVm);
vm.init();
</script>
