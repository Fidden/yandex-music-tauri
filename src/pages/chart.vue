<template>
	<ChartScreen/>
</template>

<script setup lang="ts">
import {ChartScreenVm} from '~/client/screens/chart-screen/chart-screen.vm';
import ChartScreen from '~/client/screens/chart-screen/chart-screen.vue';

const vm = useVm(ChartScreenVm);
vm.init();
</script>
