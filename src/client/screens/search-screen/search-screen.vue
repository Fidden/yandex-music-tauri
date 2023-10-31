<template>
	<main :class="cnSearchScreen()">
		<ContentBlock
			:key="vm.search?.searchRequestId"
			:class="cnSearchScreen('best')"
			title="Лучший результат"
			:loading="vm.pending.get('init')"
		>
			<template #default>
				<SearchCardBest
					v-if="vm.search?.best?.result && vm.search?.best?.type"
					:result="vm.search?.best?.result"
					:type="vm.search?.best?.type"
				/>
				<TracksTable
					v-if="vm.search?.tracks?.results?.length"
					hide-filter
					:page-mode="false"
					:tracks="vm.search.tracks.results"
				/>
			</template>
			<template #fallback>
				<SearchCardBestSkeleton/>
				<TracksTableSkeleton
					hide-filter
				/>
			</template>
		</ContentBlock>

		<ContentBlock
			title="Исполнители"
			:class="cnSearchScreen('artists')"
			:loading="vm.pending.get('init')"
		>
			<template #default>
				<Swiper
					v-if="vm.search?.artists?.results?.length"
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
			title="Альбомы"
			:class="cnSearchScreen('albums')"
			:loading="vm.pending.get('init')"
		>
			<template #default>
				<Swiper
					v-if="vm.search?.albums?.results?.length"
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
			title="Плейлисты"
			:class="cnSearchScreen('playlists')"
			:loading="vm.pending.get('init')"
		>
			<template #default>
				<Swiper
					v-if="vm.search?.playlists?.results?.length"
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
			:class="cnSearchScreen('podcasts')"
			title="Подкасты"
			:loading="vm.pending.get('init')"
		>
			<template #default>
				<Swiper
					v-if="vm.search?.podcasts?.results?.length"
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
import SearchCardBestSkeleton from '~/client/shared/components/search-card-best-skeleton/search-card-best-skeleton.vue';
import SearchCardBest from '~/client/shared/components/search-card-best/search-card-best.vue';
import TracksTableSkeleton from '~/client/shared/components/tracks-table-skeleton/tracks-table-skeleton.vue';
import TracksTable from '~/client/shared/components/tracks-table/tracks-table.vue';
import {globalEmitter} from '~/client/shared/emitters/global.emitter';
import {cnSearchScreen} from './search-screen.const';

const vm = useChildVm(SearchScreenVm);

globalEmitter.on('search:text-change', (text) => {
	vm.text = text;
	vm.fetch();
});
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

		.tracks-table__before, .tracks-table-skeleton__body-before {
			display: none;
		}

		.tracks-table-skeleton__body {
			margin: 0;
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
