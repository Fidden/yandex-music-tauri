<template>
	<ContentBlock
		title="Новые релизы"
		subtitle="Новые треки, альбомы и сборники"
		:to="{name: 'new-releases'}"
		:class="cnIndexScreen('new-releases')"
	>
		<Swiper
			v-if="vm.pending.get('index-screen')"
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
		<Swiper
			v-else
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
import AlbumCardSkeleton from '~/client/shared/components/album-card-skeleton/album-card-skeleton.vue';
import AlbumCard from '~/client/shared/components/album-card/album-card.vue';
import ContentBlock from '~/client/shared/components/content-block/content-block.vue';
import {cnIndexScreen} from './index-screen.const';

const vm = useVm(IndexScreenVm, true);
</script>

<style lang="scss">
.index-screen__new-releases {
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
