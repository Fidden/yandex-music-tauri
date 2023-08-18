<template>
	<ContentBlock
		title="Главное"
		:class="cnIndexScreen('user-playlists')"
	>
		<Swiper
			v-if="vm.pending.get('index-screen')"
			slides-per-view="1.05"
			space-between="7"
		>
			<SwiperSlide
				v-for="i in 2"
				:key="i"
			>
				<div :class="cnIndexScreen('user-playlists-chunk')">
					<UserPlaylistSkeleton
						v-for="j in 6"
						:key="j"
					/>
				</div>
			</SwiperSlide>
		</Swiper>

		<Swiper
			v-else
			slides-per-view="1.05"
			space-between="7"
		>
			<SwiperSlide
				v-for="(chunk, index) in vm.userPlaylistsChunks"
				:key="index"
			>
				<div :class="cnIndexScreen('user-playlists-chunk')">
					<UserPlaylist
						v-for="playlist in chunk"
						:key="playlist.id"
						:playlist="playlist"
					/>
				</div>
			</SwiperSlide>
		</Swiper>
	</ContentBlock>
</template>

<script setup lang="ts">
import {cnIndexScreen} from '~/client/screens/index-screen/index-screen.const';
import {IndexScreenVm} from '~/client/screens/index-screen/index-screen.vm';
import ContentBlock from '~/client/shared/components/content-block/content-block.vue';
import UserPlaylistSkeleton from '~/client/shared/components/user-playlist-skeleton/user-playlist-skeleton.vue';
import UserPlaylist from '~/client/shared/components/user-playlist/user-playlist.vue';
import {useVm} from '~/client/shared/composables/useVm';

const vm = useVm(IndexScreenVm, true);
</script>

<style lang="scss">
.index-screen__user-playlists {
	.content-block__body {
		display: flex;
		height: fit-content;
	}

	&-chunk {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: 1fr;
		gap: 7px;
	}

	.swiper {
		margin-right: 0;
		flex: 1;
	}
}
</style>
