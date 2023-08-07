<template>
	<StationsScreen/>
</template>

<script lang="ts" setup>
import {StationsScreenVm} from '~/client/screens/stations-screen/stations-screen.vm';
import StationsScreen from '~/client/screens/stations-screen/stations-screen.vue';

const vm = useVm(StationsScreenVm);
vm.init();
</script>

<style lang="scss">

</style>
