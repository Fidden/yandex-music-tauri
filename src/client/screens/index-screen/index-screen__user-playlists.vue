<template>
	<ContentBlock title="Главное">
		<UserPlaylist
			v-for="playlist in vm.userPlaylists"
			:key="playlist.playlistUuid"
			:playlist="playlist"
		/>
	</ContentBlock>
</template>

<script setup lang="ts">
import {IndexScreenVm} from '~/client/screens/index-screen/index-screen.vm';
import ContentBlock from '~/client/shared/components/content-block/content-block.vue';
import UserPlaylist from '~/client/shared/components/user-playlist/user-playlist.vue';
import {useVm} from '~/client/shared/composables/useVm';

const vm = useVm(IndexScreenVm, true);
</script>
