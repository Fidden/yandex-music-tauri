<template>
	<NuxtLink
		:class="cnAlbumCard()"
		:to="{name: 'album-id', params: {id: album.id}}"
	>
		<div :class="cnAlbumCard('image')">
			<Image
				:src="album?.ogImage"
				:alt="album?.title!"
				width="148"
				height="148"
				crop="200x200"
				type="album"
			/>
		</div>

		<h3 :class="cnAlbumCard('title')">
			{{ album.title }}
		</h3>
		<ArtistsLinks
			:artists="album.artists"
		/>
		<footer :class="cnAlbumCard('footer')">
			<p :class="cnAlbumCard('type')">
				{{ album.type }}
			</p>
			<p :class="cnAlbumCard('year')">
				{{ album.year }}
			</p>
		</footer>
	</NuxtLink>
</template>


<script setup lang="ts">
import ArtistsLinks from '~/client/shared/components/artists-links/artists-links.vue';
import Image from '~/client/shared/components/image.vue';
import type {IAlbum} from '~/client/shared/types/api';
import {ILastRelease} from '~/client/shared/types/api';
import {cnAlbumCard} from './album-card.const';

defineProps<{
	album: IAlbum | ILastRelease;
}>();
</script>

<style lang="scss">
.album-card {
	display: flex;
	flex-direction: column;
	width: 168px;
	padding: 10px;
	background: rgba(41, 44, 59, 0.8);
	border-radius: 6px;
	height: 253px;
	user-select: none;
	flex: 1;
	transition: 200ms;

	&:hover {
		transition: 200ms;
		background: rgba(41, 44, 59, 1);
	}

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
		overflow: hidden;
		position: relative;

		img {
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			position: absolute;
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
