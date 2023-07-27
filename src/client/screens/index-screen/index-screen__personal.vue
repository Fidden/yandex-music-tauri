<template>
	<ContentBlock
		title="Собираем для вас"
		:class="cnIndexScreen('personal')"
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
				v-for="playlist in vm.personalPlaylists?.entities"
				:key="playlist.id"
			>
				<PersonalPlaylistCard
					:personal-playlist="playlist.data"
				/>
			</SwiperSlide>
		</Swiper>
	</ContentBlock>
</template>

<script setup lang="ts">
import {Swiper, SwiperSlide} from 'swiper/vue';
import {cnIndexScreen} from '~/client/screens/index-screen/index-screen.const';
import {IndexScreenVm} from '~/client/screens/index-screen/index-screen.vm';
import ContentBlock from '~/client/shared/components/content-block/content-block.vue';
import PersonalPlaylistCard from '~/client/shared/components/personal-playlist-card/personal-playlist-card.vue';
import PlaylistCardSkeleton from '~/client/shared/components/playlist-card-skeleton/playlist-card-skeleton.vue';

const vm = useVm(IndexScreenVm, true);
</script>

<style lang="scss">
.index-screen__personal {
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
