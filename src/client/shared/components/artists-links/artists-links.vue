<template>
	<p :class="cnArtistsLinks()">
		<NuxtLink
			v-for="artist in artists"
			:key="artist.id"
			:class="cnArtistsLinks('link')"
			:to="{name: 'artist-id', params: {id: artist.id}}"
			@click.stop
		>
			{{ artist.name }}
		</NuxtLink>
	</p>
</template>

<script setup lang="ts">
import type {IArtist} from '~/client/shared/types/api';
import {cnArtistsLinks} from './artists-links.const';

defineProps<{
	artists: IArtist[];
}>();
</script>


<style lang="scss">
.artists-links {
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	max-width: 100%;
	color: #8E929C;

	&__link {
		font-weight: 400;
		font-size: 12px;
		line-height: 16px;
		color: #8E929C;
		position: relative;
		margin-right: 6px;

		&:after {
			position: absolute;
			right: -3px;
			bottom: -1px;
			content: ',';
			display: block;
			font-size: 12px;
		}

		&:hover {
			text-decoration: underline;
		}


		&:last-child {
			&:after {
				display: none;
			}
		}
	}
}
</style>
