<template>
	<NuxtLink
		:class="cnUserPlaylist()"
		:to="{name: 'playlist-uid-kind', params: {uid: playlist?.uid, kind: playlist?.kind}}"
	>
		<Image
			:class="cnUserPlaylist('image')"
			:src="playlist.ogImage"
			:alt="playlist.title"
			width="40"
			height="40"
			crop="100x100"
			type="playlist"
		/>
		<p :class="cnUserPlaylist('title')">
			{{ playlist.title }}
		</p>
	</NuxtLink>
</template>

<script setup lang="ts">
import Image from '~/client/shared/components/image.vue';
import type {IPlaylist} from '~/client/shared/types/api';
import {cnUserPlaylist} from './user-playlist.const';

defineProps<{
	playlist: IPlaylist;
}>();
</script>

<style lang="scss">
.user-playlist {
	display: flex;
	flex-direction: row;
	align-items: center;
	background: rgba(41, 45, 57, 0.8);
	border-radius: 4px;
	padding: 5px;
	gap: 26px;

	&__image {
		width: 46px;
		height: 46px;
		border-radius: 4px;
	}

	&__title {
		font-weight: 500;
		font-size: 14px;
		line-height: 17px;
	}
}
</style>
