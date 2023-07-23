<template>
	<ContentBlock
		title="Хиты и новинки"
		subtitle="Новая популярная музыка для вас от нашей редакции"
		:class="cnIndexScreen('new-playlists')"
	>
		<Swiper
			:slides-per-view="'auto'"
			:space-between="6"
		>
			<SwiperSlide
				v-for="playlist in vm.newPlaylists?.entities"
				:key="playlist?.id"
			>
				<PlaylistCard
					:show-tracks-count="true"
					:playlist="playlist.data"
				/>
			</SwiperSlide>
		</Swiper>
	</ContentBlock>
</template>

<script setup lang="ts">
import {Swiper, SwiperSlide} from 'swiper/vue';
import ContentBlock from '~/client/shared/components/content-block/content-block.vue';
import PlaylistCard from '~/client/shared/components/playlist-card/playlist-card.vue';
import {cnIndexScreen} from './index-screen.const';
import {IndexScreenVm} from './index-screen.vm';

const vm = useVm(IndexScreenVm);
</script>

<style lang="scss">
.index-screen__new-playlists {
	.swiper-slide {
		width: fit-content
	}

	.content-block__body {
		display: flex;
	}
}
</style>
