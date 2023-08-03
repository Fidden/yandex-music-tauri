<template>
	<main :class="cnPlaylistsScreen()">
		<ContentBlock
			title="Плейлисты"
			:loading="vm.pending.get('init')"
		>
			<template #default>
				<PlaylistCard
					v-for="playlist in vm.playlists"
					:key="playlist.playlistUuid"
					:playlist="playlist"
					show-tracks-count
				/>
			</template>
			<template #fallback>
				<PlaylistCardSkeleton
					v-for="i in 10"
					:key="i"
				/>
			</template>
		</ContentBlock>

		<ContentBlock
			title="Вам так же понравились эти плейлисты"
			:loading="vm.pending.get('init')"
		>
			<template #default>
				<PlaylistCard
					v-for="playlist in vm.playlistsLiked"
					:key="playlist.playlist.playlistUuid"
					:playlist="playlist.playlist"
					show-tracks-count
				/>
			</template>
			<template #fallback>
				<PlaylistCardSkeleton
					v-for="i in 10"
					:key="i"
				/>
			</template>
		</ContentBlock>
	</main>
</template>

<script setup lang="ts">
import {PlaylistsScreenVm} from '~/client/screens/playlists-screen/playlists-screen.vm';
import ContentBlock from '~/client/shared/components/content-block/content-block.vue';
import PlaylistCard from '~/client/shared/components/playlist-card/playlist-card.vue';
import {cnPlaylistsScreen} from './playlists-screen.const';
import PlaylistCardSkeleton from '~/client/shared/components/playlist-card-skeleton/playlist-card-skeleton.vue';

const vm = useVm(PlaylistsScreenVm, true);
</script>

<style lang="scss">
.playlists-screen {
	display: flex;
	flex-direction: column;
	gap: 32px;

	.content-block__body {
		margin-top: 20px;
		display: grid;
		grid-template-columns: repeat(auto-fill, 168px);
		gap: 8px;
	}
}
</style>
