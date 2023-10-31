<template>
	<Navigation/>
	<main :class="cnNewPlaylistsScreen()">
		<ContentBlock
			title="Хиты и новинки"
			subtitle="Новая популярная музыка для вас от нашей редакции"
		>
			<PlaylistCard
				v-for="playlist in vm.newPlaylists"
				:key="playlist.id"
				:playlist="playlist"
			/>
		</ContentBlock>
	</main>
</template>

<script setup lang="ts">
import {NewPlaylistsScreenVm} from '~/client/screens/new-playlists-screen/new-playlists-screen.vm';
import ContentBlock from '~/client/shared/components/content-block/content-block.vue';
import Navigation from '~/client/shared/components/navigation/navigation.vue';
import PlaylistCard from '~/client/shared/components/playlist-card/playlist-card.vue';
import {cnNewPlaylistsScreen} from './new-playlists-screen.const';

const vm = useChildVm(NewPlaylistsScreenVm);
</script>

<style lang="scss">
.new-playlists-screen {
	.content-block__body {
		grid-template-columns: repeat(auto-fill, 168px);
	}
}
</style>
