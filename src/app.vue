<template>
	<AppScreen>
		<RouterView v-slot="{ Component }">
			<KeepAlive
				:include="[
					'index',
					'albums',
					'artists',
					'playlists',
					'stations',
					'tracks'
				]"
			>
				<Component :is="Component"/>
			</KeepAlive>
		</RouterView>
	</AppScreen>
</template>

<script lang="ts" setup>
import {AppScreenVm} from '~/client/screens/app-screen/app-screen.vm';
import AppScreen from '~/client/screens/app-screen/app-screen.vue';

const vm = useVm(AppScreenVm);
await vm.init();
</script>
