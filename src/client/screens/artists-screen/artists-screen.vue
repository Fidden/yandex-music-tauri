<template>
	<main :class="cnArtistsScreen()">
		<ContentBlock
			title="Артисты"
			:loading="vm.pending.get('init')"
		>
			<template #default>
				<ArtistCard
					v-for="artist in vm.artists"
					:key="artist.id"
					:artist="artist"
				/>
			</template>
			<template #fallback>
				<ArtistCardSkeleton
					v-for="i in 8"
					:key="i"
				/>
			</template>
		</ContentBlock>
	</main>
</template>

<script setup lang="ts">
import {ArtistsScreenVm} from '~/client/screens/artists-screen/artists-screen.vm';
import ArtistCardSkeleton from '~/client/shared/components/artist-card-skeleton/artist-card-skeleton.vue';
import ArtistCard from '~/client/shared/components/artist-card/artist-card.vue';
import ContentBlock from '~/client/shared/components/content-block/content-block.vue';
import {cnArtistsScreen} from './artists-screen.const';

const vm = useVm(ArtistsScreenVm, true);
</script>

<style lang="scss">
.artists-screen {
	.content-block__body {
		margin-top: 20px;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(180px, 190px));
		gap: 16px;
	}
}
</style>
