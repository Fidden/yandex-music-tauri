<template>
	<ContentBlock
		title="Вы недавно слушали"
		:class="cnIndexScreen('play-context')"
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
					v-if="context.data.context === 'playlist'"
					:show-tracks-count="true"
					:playlist="context.data.payload"
				/>
				<PersonalPlaylistCard
					v-else-if="context.data.context === 'personal-playlist'"
					:show-tracks-count="true"
					:playlist="context.data.payload"
				/>
			</SwiperSlide>
		</Swiper>
	</ContentBlock>
</template>

<script setup lang="ts">
import {Swiper, SwiperSlide} from 'swiper/vue';
import ContentBlock from '~/client/shared/components/content-block/content-block.vue';
import PersonalPlaylistCard from '~/client/shared/components/personal-playlist-card/personal-playlist-card.vue';
import PlaylistCard from '~/client/shared/components/playlist-card/playlist-card.vue';
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
}
</style>
