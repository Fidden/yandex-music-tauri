<template>
	<div :class="cnTracksTable('album')">
		<NuxtLink
			v-for="album in albums"
			:key="album.id"
			:to="{name: 'album-id', params: {id: album.id}}"
		>
			{{ album.title }}
		</NuxtLink>
	</div>
</template>

<script setup lang="ts">
import type {IAlbum} from '~/client/shared/types/api';
import {cnTracksTable} from './tracks-table.const';

defineProps<{
	albums: IAlbum[];
}>();
</script>

<style lang="scss">
.tracks-table__album {
	align-items: center;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	max-width: 100%;
	margin: auto 0;
	color: #8E929C;
	font-size: 14px;

	a {
		font-size: inherit;
		color: inherit;

		&:hover {
			text-decoration: underline;
		}
	}
}
</style>
