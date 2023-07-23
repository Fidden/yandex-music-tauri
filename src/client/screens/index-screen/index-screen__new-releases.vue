<template>
	<ContentBlock
		title="Новые релизы"
		subtitle="Новые треки, альбомы и сборники"
		:class="cnIndexScreen('new-releases')"
	>
		<Swiper
			:slides-per-view="'auto'"
			:space-between="6"
		>
			<SwiperSlide
				v-for="release in vm.newReleases?.entities"
				:key="release?.id"
			>
				<AlbumCard
					:album="release.data"
				/>
			</SwiperSlide>
		</Swiper>
	</ContentBlock>
</template>

<script setup lang="ts">
import {Swiper, SwiperSlide} from 'swiper/vue';
import {IndexScreenVm} from '~/client/screens/index-screen/index-screen.vm';
import ContentBlock from '~/client/shared/components/content-block/content-block.vue';
import AlbumCard from '~/client/shared/components/album-card/album-card.vue';
import {cnIndexScreen} from './index-screen.const';

const vm = useVm(IndexScreenVm, true);
</script>

<style lang="scss">
.index-screen__new-releases {
	.swiper-slide {
		width: fit-content
	}

	.content-block__body {
		display: flex;
	}
}
</style>
