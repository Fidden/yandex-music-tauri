<template>
	<main :class="cnIndexScreen()">
		<IndexScreenUserPlaylists/>
		<IndexScreenPersonal/>
		<IndexScreenNewReleases/>
		<IndexScreenNewPlaylists/>
		<IndexScreenChart/>
		<IndexScreenPlayContext/>
	</main>
</template>

<script lang="ts" setup>
import {cnIndexScreen} from './index-screen.const';
import IndexScreenChart from './index-screen__chart.vue';
import IndexScreenNewPlaylists from './index-screen__new-playlists.vue';
import IndexScreenNewReleases from './index-screen__new-releases.vue';
import IndexScreenPersonal from './index-screen__personal.vue';
import IndexScreenPlayContext from './index-screen__play-context.vue';
import IndexScreenUserPlaylists from './index-screen__user-playlists.vue';
</script>

<style lang="scss">
.index-screen {
	display: flex;
	flex-direction: column;
	gap: 45px;

	.swiper {
		margin-left: 0 !important;
	}
}
</style>
