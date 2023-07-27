<template>
	<NuxtLink
		:class="cnPersonalPlaylistCard()"
		:to="{name: 'playlist-uid-kind', params: {uid: personalPlaylist.data.uid, kind: personalPlaylist.data.kind}}"
	>
		<div :class="cnPersonalPlaylistCard('image')">
			<Image
				:src="personalPlaylist.data.cover?.uri"
				:alt="personalPlaylist.data.title"
				crop="200x200"
				type="playlist"
			/>
		</div>
		<h3 :class="cnPersonalPlaylistCard('title')">
			{{ personalPlaylist.data.title }}
		</h3>
		<p :class="cnPersonalPlaylistCard('description')">
			{{ personalPlaylist.data.description }}
		</p>
		<p :class="cnPersonalPlaylistCard('track-count')">
			{{ personalPlaylist.data.trackCount }} Треков
		</p>
	</NuxtLink>
</template>

<script setup lang="ts">
import Image from '~/client/shared/components/image.vue';
import type {IGeneratedPlaylistLandingBlock} from '~/client/shared/types/api';
import {cnPersonalPlaylistCard} from './personal-playlist-card.const';

defineProps<{
	personalPlaylist: IGeneratedPlaylistLandingBlock;
}>();
</script>


<style lang="scss">
.personal-playlist-card {
	display: flex;
	flex-direction: column;
	width: 168px;
	padding: 10px;
	background: rgba(41, 44, 59, 0.8);
	border-radius: 6px;
	height: 253px;
	user-select: none;

	&__title {
		font-weight: 500;
		font-size: 14px;
		line-height: 16px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	&__image {
		border-radius: 6px;
		width: 100%;
		margin-bottom: 12px;
		aspect-ratio: 1/1;
		position: relative;
		overflow: hidden;

		img {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
		}
	}

	&__footer {
		margin-top: auto;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding-top: 9px;
	}

	&__year, &__type, &__description, &__track-count {
		font-weight: 400;
		font-size: 12px;
		line-height: 16px;
		color: #8E929C;
	}

	&__description {
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		font-size: 13px;
	}

	&__track-count {
		padding-top: 9px;
		margin-top: auto;
	}
}
</style>
