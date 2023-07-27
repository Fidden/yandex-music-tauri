<template>
	<ContentBlock
		title="Хиты и новинки"
		subtitle="Новая популярная музыка для вас от нашей редакции"
		:to="{name: 'new-playlists'}"
		:class="cnIndexScreen('new-playlists')"
	>
		<Swiper
			v-if="vm.pending.get('index-screen')"
			:slides-per-view="'auto'"
			:space-between="6"
		>
			<SwiperSlide
				v-for="i in 5"
				:key="i"
			>
				<PlaylistCardSkeleton show-tracks-count/>
			</SwiperSlide>
		</Swiper>

		<Swiper
			v-else
			:slides-per-view="'auto'"
			:space-between="6"
		>
			<SwiperSlide
				v-for="playlist in vm.newPlaylists?.entities"
				:key="playlist?.id"
			>
				<PlaylistCard
					show-tracks-count
					:playlist="playlist.data"
				/>
			</SwiperSlide>
		</Swiper>
	</ContentBlock>
</template>

<script setup lang="ts">
import {Swiper, SwiperSlide} from 'swiper/vue';
import ContentBlock from '~/client/shared/components/content-block/content-block.vue';
import PlaylistCardSkeleton from '~/client/shared/components/playlist-card-skeleton/playlist-card-skeleton.vue';
import PlaylistCard from '~/client/shared/components/playlist-card/playlist-card.vue';
import {cnIndexScreen} from './index-screen.const';
import {IndexScreenVm} from './index-screen.vm';

const vm = useVm(IndexScreenVm);
</script>

<style lang="scss">
.index-screen__new-playlists {
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
