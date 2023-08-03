<template>
	<main :class="cnAlbumsScreen()">
		<ContentBlock
			title="Альбомы"
			:loading="vm.pending.get('init')"
		>
			<template #default>
				<AlbumCard
					v-for="album in vm.albums"
					:key="album.id"
					:album="album"
				/>
			</template>
			<template #fallback>
				<AlbumCardSkeleton
					v-for="i in 10"
					:key="i"
				/>
			</template>
		</ContentBlock>
	</main>
</template>

<script setup lang="ts">
import AlbumCard from '~/client/shared/components/album-card/album-card.vue';
import ContentBlock from '~/client/shared/components/content-block/content-block.vue';
import {cnAlbumsScreen} from './albums-screen.const';
import {AlbumsScreenVm} from './albums-screen.vm';
import AlbumCardSkeleton from '~/client/shared/components/album-card-skeleton/album-card-skeleton.vue';

const vm = useVm(AlbumsScreenVm, true);
</script>

<style lang="scss">
.albums-screen {
	.content-block__body {
		margin-top: 20px;
		display: grid;
		grid-template-columns: repeat(auto-fill, 168px);
		gap: 8px;
	}
}
</style>
