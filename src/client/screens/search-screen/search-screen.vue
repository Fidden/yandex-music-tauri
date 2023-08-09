<template>
	<main :class="cnSearchScreen()">
		<ContentBlock
			v-if="showOn('best')"
			:key="vm.search?.searchRequestId"
			:class="cnSearchScreen('best')"
			title="Лучший результат"
		>
			<SearchCardBest
				:result="vm.search?.best?.result"
				:type="vm.search?.best?.type"
			/>
			<TracksTable
				v-if="vm.search?.tracks?.results?.length"
				hide-filter
				:page-mode="false"
				:tracks="vm.search.tracks.results"
			/>
		</ContentBlock>

		<ContentBlock
			v-if="showOn('artists')"
			title="Исполнители"
			:class="cnSearchScreen('artists')"
			:loading="vm.pending.get('init')"
		>
			<template #default>
				<Swiper
					:slides-per-view="'auto'"
					:space-between="6"
				>
					<SwiperSlide
						v-for="artist in vm.search?.artists?.results"
						:key="artist!.id"
					>
						<ArtistCard
							:key="artist!.id"
							:artist="artist"
						/>
					</SwiperSlide>
				</Swiper>
			</template>
			<template #fallback>
				<Swiper
					:slides-per-view="'auto'"
					:space-between="6"
				>
					<SwiperSlide
						v-for="i in 5"
						:key="i"
					>
						<ArtistCardSkeleton/>
					</SwiperSlide>
				</Swiper>
			</template>
		</ContentBlock>

		<ContentBlock
			v-if="showOn('albums')"
			title="Альбомы"
			:class="cnSearchScreen('albums')"
			:loading="vm.pending.get('init')"
		>
			<template #default>
				<Swiper
					:slides-per-view="'auto'"
					:space-between="6"
				>
					<SwiperSlide
						v-for="album in vm.search?.albums?.results"
						:key="album?.id"
					>
						<AlbumCard
							:key="album?.id"
							:album="album"
						/>
					</SwiperSlide>
				</Swiper>
			</template>
			<template #fallback>
				<Swiper
					:slides-per-view="'auto'"
					:space-between="6"
				>
					<SwiperSlide
						v-for="i in 6"
						:key="i"
					>
						<AlbumCardSkeleton/>
					</SwiperSlide>
				</Swiper>
			</template>
		</ContentBlock>

		<ContentBlock
			v-if="showOn('playlists')"
			title="Плейлисты"
			:class="cnSearchScreen('playlists')"
			:loading="vm.pending.get('init')"
		>
			<template #default>
				<Swiper
					:slides-per-view="'auto'"
					:space-between="6"
				>
					<SwiperSlide
						v-for="playlist in vm.search?.playlists?.results"
						:key="playlist.uid + playlist.kind"
					>
						<PlaylistCard
							show-tracks-count
							:playlist="playlist"
						/>
					</SwiperSlide>
				</Swiper>
			</template>
			<template #fallback>
				<Swiper
					:slides-per-view="'auto'"
					:space-between="6"
				>
					<SwiperSlide
						v-for="i in 6"
						:key="i"
					>
						<PlaylistCardSkeleton show-tracks-count/>
					</SwiperSlide>
				</Swiper>
			</template>
		</ContentBlock>

		<ContentBlock
			v-if="showOn('podcasts')"
			:class="cnSearchScreen('podcasts')"
			title="Подкасты"
			:loading="vm.pending.get('init')"
		>
			<template #default>
				<Swiper
					:slides-per-view="'auto'"
					:space-between="6"
				>
					<SwiperSlide
						v-for="podcast in vm.search?.podcasts?.results"
						:key="podcast.id"
					>
						<AlbumCard
							:album="podcast"
						/>
					</SwiperSlide>
				</Swiper>
			</template>
			<template #fallback>
				<Swiper
					:slides-per-view="'auto'"
					:space-between="6"
				>
					<SwiperSlide
						v-for="i in 6"
						:key="i"
					>
						<AlbumCardSkeleton/>
					</SwiperSlide>
				</Swiper>
			</template>
		</ContentBlock>
	</main>
</template>

<script setup lang="ts">
import {Swiper, SwiperSlide} from 'swiper/vue';
import {SearchScreenVm} from '~/client/screens/search-screen/search-screen.vm';
import AlbumCardSkeleton from '~/client/shared/components/album-card-skeleton/album-card-skeleton.vue';
import AlbumCard from '~/client/shared/components/album-card/album-card.vue';
import ArtistCardSkeleton from '~/client/shared/components/artist-card-skeleton/artist-card-skeleton.vue';
import ArtistCard from '~/client/shared/components/artist-card/artist-card.vue';
import ContentBlock from '~/client/shared/components/content-block/content-block.vue';
import PlaylistCardSkeleton from '~/client/shared/components/playlist-card-skeleton/playlist-card-skeleton.vue';
import PlaylistCard from '~/client/shared/components/playlist-card/playlist-card.vue';
import SearchCardBest from '~/client/shared/components/search-card-best/search-card-best.vue';
import TracksTable from '~/client/shared/components/tracks-table/tracks-table.vue';
import {ISearch} from '~/client/shared/types/api';
import {cnSearchScreen} from './search-screen.const';

const vm = useVm(SearchScreenVm, true);

const showOn = (key: keyof ISearch) => {
	if (vm.pending.get('init')) {
		return true;
	}

	if (!vm.pending.get('init') && vm.search) {
		return vm.search[key]?.results?.length > 0 || Object.keys(vm.search[key]?.result || {}).length > 0;
	}
};
</script>

<style lang="scss">
.search-screen {
	display: flex;
	flex-direction: column;
	gap: 45px;

	&__best {
		.vue-recycle-scroller {
			grid-area: tracks-table;
		}

		.content-block__body {
			grid-template-columns: 370px 1fr;
			grid-template-rows: 237px;
			grid-template-areas: "artist-search  tracks-table";
		}

		.tracks-table__before {
			display: none;
		}

		.tracks-table__album {
			opacity: 0;
			pointer-events: none;
		}
	}

	&__artists, &__albums, &__playlists, &__podcasts {
		.content-block__body {
			display: flex;
		}

		.swiper-slide {
			width: min-content;
		}
	}

	.swiper {
		margin-left: 0 !important;
	}
}
</style>
