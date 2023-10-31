<template>
	<Navigation/>
	<main :class="cnArtistScreen()">
		<ArtistScreenHeader/>
		<ContentBlock
			v-if="vm.briefInfo?.lastReleases?.length"
			:class="cnArtistScreen('last-releases')"
			title="Недавние релизы"
		>
			<Swiper
				:slides-per-view="'auto'"
				:space-between="6"
			>
				<SwiperSlide
					v-for="lastRelease in vm.briefInfo.lastReleases"
					:key="lastRelease?.id"
				>
					<AlbumCard :album="lastRelease"/>
				</SwiperSlide>
			</Swiper>
		</ContentBlock>

		<ContentBlock
			v-if="vm.briefInfo?.popularTracks?.length"
			:class="cnArtistScreen('popular-tracks')"
			title="Популярные треки"
		>
			<TracksTable
				hide-filter
				:page-mode="false"
				:tracks="vm.briefInfo.popularTracks"
			/>
		</ContentBlock>

		<ContentBlock
			v-if="vm.briefInfo?.albums?.length"
			:class="cnArtistScreen('popular-albums')"
			title="Популярные альбомы"
		>
			<Swiper
				:slides-per-view="'auto'"
				:space-between="6"
			>
				<SwiperSlide
					v-for="album in vm.briefInfo.albums"
					:key="album?.id"
				>
					<AlbumCard
						:album="album"
					/>
				</SwiperSlide>
			</Swiper>
		</ContentBlock>

		<ContentBlock
			v-if="vm.briefInfo?.alsoAlbums?.length"
			:class="cnArtistScreen('popular-collections')"
			title="Сборники"
		>
			<Swiper
				:slides-per-view="'auto'"
				:space-between="6"
			>
				<SwiperSlide
					v-for="album in vm.briefInfo.alsoAlbums"
					:key="album?.id"
				>
					<AlbumCard
						:album="album"
					/>
				</SwiperSlide>
			</Swiper>
		</ContentBlock>

		<ContentBlock
			v-if="vm.briefInfo?.similarArtists?.length"
			:class="cnArtistScreen('similar-artists')"
			title="Похожие артисты"
		>
			<Swiper
				:slides-per-view="'auto'"
				:space-between="6"
			>
				<SwiperSlide
					v-for="artist in vm.briefInfo.similarArtists"
					:key="artist?.id"
				>
					<ArtistCard
						:artist="artist"
					/>
				</SwiperSlide>
			</Swiper>
		</ContentBlock>

		<ContentBlock
			v-if="vm.briefInfo?.concerts?.length"
			:class="cnArtistScreen('concerts')"
			title="Концерты"
		>
			<Swiper
				:slides-per-view="'auto'"
				:space-between="6"
			>
				<SwiperSlide
					v-for="concert in vm.briefInfo.concerts"
					:key="concert?.id"
				>
					<ConcertCard
						:concert="concert"
					/>
				</SwiperSlide>
			</Swiper>
		</ContentBlock>

		<ContentBlock
			v-if="vm.briefInfo?.artist?.links?.length"
			:class="cnArtistScreen('socials')"
			title="Соц. сети"
		>
			<Swiper
				:slides-per-view="'auto'"
				:space-between="6"
			>
				<SwiperSlide
					v-for="link in vm.briefInfo?.artist?.links"
					:key="link.title"
				>
					<SocialCard
						:link="link"
					/>
				</SwiperSlide>
			</Swiper>
		</ContentBlock>
	</main>
</template>

<script setup lang="ts">
import {Swiper, SwiperSlide} from 'swiper/vue';
import {ArtistScreenVm} from '~/client/screens/artist-screen/artist-screen.vm';
import AlbumCard from '~/client/shared/components/album-card/album-card.vue';
import ArtistCard from '~/client/shared/components/artist-card/artist-card.vue';
import ConcertCard from '~/client/shared/components/concert-card/concert-card.vue';
import ContentBlock from '~/client/shared/components/content-block/content-block.vue';
import Navigation from '~/client/shared/components/navigation/navigation.vue';
import SocialCard from '~/client/shared/components/social-card/social-card.vue';
import TracksTable from '~/client/shared/components/tracks-table/tracks-table.vue';
import {cnArtistScreen} from './artist-screen.const';
import ArtistScreenHeader from './artist-screen__header.vue';

const vm = useChildVm(ArtistScreenVm);
</script>

<style lang="scss">
.artist-screen {
	display: flex;
	flex-direction: column;
	gap: 45px;


	&__popular-albums, &__popular-collections, &__similar-artists, &__concerts, &__socials {
		.content-block__body {
			display: flex;
		}
	}

	&__popular-tracks {
		.content-block__body {
			grid-template-columns: 1fr;
		}
	}

	.swiper-slide {
		width: fit-content
	}

	&__concerts {
		.swiper-slide {
			max-width: 250px;
		}
	}

	.swiper {
		margin-left: 0 !important;
	}
}
</style>
