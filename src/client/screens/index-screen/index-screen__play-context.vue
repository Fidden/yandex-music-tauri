<template>
	<ContentBlock
		title="Вы недавно слушали"
		:class="cnIndexScreen('play-context')"
		:to="{
			name: 'play-context',
			query: {playContexts: JSON.stringify(vm.playContexts)}
		}"
	>
		<Swiper
			:slides-per-view="'auto'"
			:space-between="6"
		>
			<SwiperSlide
				v-for="context in vm.playContexts?.entities"
				:key="context.id"
			>
				<PlaylistCard
					v-if="context.data.context === ObjectTypeEnum.PLAYLIST"
					:show-tracks-count="true"
					:playlist="context.data.payload as unknown as IPlaylist"
				/>
				<PersonalPlaylistCard
					v-else-if="context.data.context === ObjectTypeEnum.PERSONAL_PLAYLIST"
					:show-tracks-count="true"
					:personal-playlist="context.data.payload as unknown as IGeneratedPlaylistLandingBlock"
				/>
				<AlbumCard
					v-else-if="context.data.context === ObjectTypeEnum.ALBUM"
					:show-tracks-count="true"
					:album="context.data.payload as unknown as IAlbum"
				/>
				<ArtistCard
					v-else-if="context.data.context === ObjectTypeEnum.ARTIST"
					:show-tracks-count="true"
					:artist="context.data.payload as unknown as IArtist"
				/>
			</SwiperSlide>
		</Swiper>
	</ContentBlock>
</template>

<script setup lang="ts">
import {Swiper, SwiperSlide} from 'swiper/vue';
import AlbumCard from '~/client/shared/components/album-card/album-card.vue';
import ArtistCard from '~/client/shared/components/artist-card/artist-card.vue';
import ContentBlock from '~/client/shared/components/content-block/content-block.vue';
import PersonalPlaylistCard from '~/client/shared/components/personal-playlist-card/personal-playlist-card.vue';
import PlaylistCard from '~/client/shared/components/playlist-card/playlist-card.vue';
import {IAlbum, IArtist, IGeneratedPlaylistLandingBlock, IPlaylist, ObjectTypeEnum} from '~/client/shared/types/api';
import {cnIndexScreen} from './index-screen.const';
import {IndexScreenVm} from './index-screen.vm';

const vm = useVm(IndexScreenVm, true);
</script>

<style lang="scss">
.index-screen__play-context {
	.content-block__body {
		display: flex;
	}

	.swiper-slide {
		width: fit-content
	}

	.swiper-wrapper {
		height: 253px;
	}
}
</style>
