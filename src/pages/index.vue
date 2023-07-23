<template>
	<IndexScreen/>
</template>

<script lang="ts" setup>
import {IndexScreenVm} from '~/client/screens/index-screen/index-screen.vm';
import IndexScreen from '~/client/screens/index-screen/index-screen.vue';

const vm = useVm(IndexScreenVm);
vm.init();
</script>
