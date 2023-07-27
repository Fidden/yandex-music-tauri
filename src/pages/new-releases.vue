<template>
	<NewReleasesScreen/>
</template>

<script setup lang="ts">
import {NewReleasesScreenVm} from '~/client/screens/new-releases-screen/new-releases-screen.vm';
import NewReleasesScreen from '~/client/screens/new-releases-screen/new-releases-screen.vue';

const vm = useVm(NewReleasesScreenVm);
await vm.init();
</script>

<style scoped lang="scss">

</style>
