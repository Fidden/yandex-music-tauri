<template>
	<ArtistScreen/>
</template>

<script setup lang="ts">
import {useRoute} from 'vue-router';
import {ArtistScreenVm} from '~/client/screens/artist-screen/artist-screen.vm';
import ArtistScreen from '~/client/screens/artist-screen/artist-screen.vue';

const route = useRoute();

const vm = useVm(ArtistScreenVm);
await vm.init({
	id: Number(route.params.id)
});

watch(() => route.params.id, async (id) => {
	await vm.init({
		id: Number(id)
	});

	document.querySelector('.layout-page__content')?.scrollTo({ top: 0, behavior: 'smooth' });
});
</script>
