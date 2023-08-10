<template>
	<SearchScreen/>
</template>

<script setup lang="ts">
import {SearchScreenVm} from '~/client/screens/search-screen/search-screen.vm';
import SearchScreen from '~/client/screens/search-screen/search-screen.vue';

const vm = useVm(SearchScreenVm);
vm.init();
</script>
