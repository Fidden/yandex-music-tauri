<template>
	<NuxtLink
		:class="cnArtistCard()"
		:to="{name: 'artist-id', params: {id: artist.id}}"
	>
		<div :class="cnArtistCard('image')">
			<Image
				:src="artist.cover?.uri"
				:alt="artist.name"
				crop="200x200"
				type="artist"
			/>
		</div>
		<h4 :class="cnArtistCard('title')">
			{{ artist.name }}
		</h4>
		<p :class="cnArtistCard('count')">
			{{ artist?.counts?.tracks }} Треков
		</p>
	</NuxtLink>
</template>

<script setup lang="ts">
import Image from '~/client/shared/components/image.vue';
import type {IArtist} from '~/client/shared/types/api';
import {cnArtistCard} from './artist-card.const';

defineProps<{
	artist: IArtist;
}>();
</script>

<style lang="scss">
.artist-card {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 8px;
	width: 180px;

	&__image {
		width: 100%;
		max-width: 100%;
		aspect-ratio: 1/1;
		border-radius: 50%;
		object-fit: cover;
		overflow: hidden;
		margin-bottom: 4px;
		position: relative;

		img {
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			position: absolute;
		}
	}

	&__title {
		font-weight: 500;
		font-size: 16px;
		line-height: 13px;
	}

	&__count {
		font-weight: 400;
		font-size: 12px;
	}
}
</style>
