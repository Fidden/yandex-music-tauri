<template>
	<Navigation/>
	<main :class="cnNewReleasesScreen()">
		<ContentBlock title="Новые Релизы">
			<AlbumCard
				v-for="album in vm.newReleases"
				:key="album.id"
				:album="album"
			/>
		</ContentBlock>
	</main>
</template>

<script setup lang="ts">
import {NewReleasesScreenVm} from './new-releases-screen.vm';
import AlbumCard from '~/client/shared/components/album-card/album-card.vue';
import ContentBlock from '~/client/shared/components/content-block/content-block.vue';
import Navigation from '~/client/shared/components/navigation/navigation.vue';
import {cnNewReleasesScreen} from './new-releases-screen.const';

const vm = useVm(NewReleasesScreenVm, true);
</script>

<style lang="scss">
.new-releases-screen {
	.content-block__body {
		grid-template-columns: repeat(auto-fill, 168px);
	}
}
</style>
