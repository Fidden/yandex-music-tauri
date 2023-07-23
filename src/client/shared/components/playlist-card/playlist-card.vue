<template>
	<NuxtLink
		:class="cnPlaylistCard()"
		:to="{name: 'playlist-uid-kind', params: {uid: playlist?.uid, kind: playlist?.kind}}"
	>
		<div :class="cnPlaylistCard('image')">
			<Image
				:src="playlist?.cover?.uri || playlist?.ogImage"
				:alt="playlist?.title"
				width="200"
				height="200"
				crop="200x200"
			/>
		</div>
		<h3 :class="cnPlaylistCard('title')">
			{{ playlist.title }}
		</h3>
		<p :class="cnPlaylistCard('description')">
			{{ playlist.description }}
		</p>
		<p
			v-if="showTracksCount"
			:class="cnPlaylistCard('track-count')"
		>
			{{ tracksCountHuman(playlist?.trackCount) }}
		</p>
	</NuxtLink>
</template>

<script setup lang="ts">
import Image from '~/client/shared/components/image.vue';
import {tracksCountHuman} from '~/client/shared/helpers/tracks-count-human';
import type {IPlaylist} from '~/client/shared/types/api';
import {cnPlaylistCard} from './playlist-card.const';

defineProps<{
	playlist?: IPlaylist;
	showTracksCount?: boolean;
}>();
</script>

<style lang="scss">
.playlist-card {
	display: flex;
	flex-direction: column;
	max-width: 168px;
	padding: 10px;
	background: rgba(41, 44, 59, 0.8);
	border-radius: 6px;
	height: 100%;
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
		aspect-ratio: 1/1;
		margin-bottom: 12px;
		position: relative;
		overflow: hidden;

		img {
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
