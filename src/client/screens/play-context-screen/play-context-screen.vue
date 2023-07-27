<template>
	<main :class="cnPlayContextScreen()">
		<ContentBlock title="Вы недавно слушали">
			<Fragment
				v-for="context in vm.playContexts?.entities"
				:key="context.id"
			>
				<PlaylistCard
					v-if="context.data.context === SearchType.PLAYLIST"
					:show-tracks-count="true"
					:playlist="context.data.payload as unknown as IPlaylist"
				/>
				<PersonalPlaylistCard
					v-else-if="context.data.context === SearchType.PERSONAL_PLAYLIST"
					:show-tracks-count="true"
					:personal-playlist="context.data.payload as unknown as IGeneratedPlaylistLandingBlock"
				/>
				<AlbumCard
					v-else-if="context.data.context === SearchType.ALBUM"
					:show-tracks-count="true"
					:album="context.data.payload as unknown as IAlbum"
				/>
				<ArtistCard
					v-else-if="context.data.context === SearchType.ARTIST"
					:show-tracks-count="true"
					:artist="context.data.payload as unknown as IArtist"
				/>
			</Fragment>
		</ContentBlock>
	</main>
</template>

<script setup lang="ts">
import {cnPlayContextScreen} from '~/client/screens/play-context-screen/play-context-screen.const';
import {PlayContextScreenVm} from '~/client/screens/play-context-screen/play-context-screen.vm';
import AlbumCard from '~/client/shared/components/album-card/album-card.vue';
import ArtistCard from '~/client/shared/components/artist-card/artist-card.vue';
import ContentBlock from '~/client/shared/components/content-block/content-block.vue';
import Fragment from '~/client/shared/components/fragment.vue';
import PersonalPlaylistCard from '~/client/shared/components/personal-playlist-card/personal-playlist-card.vue';
import PlaylistCard from '~/client/shared/components/playlist-card/playlist-card.vue';
import {IAlbum, IArtist, IGeneratedPlaylistLandingBlock, IPlaylist, SearchType} from '~/client/shared/types/api';

const vm = useVm(PlayContextScreenVm, true);
</script>

<style lang="scss">
.play-context-screen {
	.content-block__body {
		margin-top: 20px;
		display: grid;
		grid-template-columns: repeat(auto-fill, 168px);
		gap: 8px;
	}
}
</style>
