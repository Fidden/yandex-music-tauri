<template>
	<SearchScreen/>
</template>

<script setup lang="ts">
import {SearchScreenVm} from '~/client/screens/search-screen/search-screen.vm';
import SearchScreen from '~/client/screens/search-screen/search-screen.vue';

const route = useRoute();
const vm = useVm(SearchScreenVm);

watch(() => route.query, query => {
	const queryText = query.text?.toString();
	if (!queryText || !queryText.trim().length) {
		return;
	}

	vm.text = queryText;
	vm.fetch();
}, {immediate: true});

await vm.init();
</script>
