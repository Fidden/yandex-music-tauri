<template>
	<p :class="cnArtistsLinks()">
		<NuxtLink
			v-for="artist in artists"
			:key="artist.id"
			:class="cnArtistsLinks('link')"
			:to="{name: 'artist-id', params: {id: artist.id}}"
		>
			{{ artist.name }}
			<span :class="cnArtistsLinks('link-comma')">
				,
			</span>
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
	display: inline-flex;
	overflow: hidden;
	white-space: nowrap;
	flex-grow: 0;

	&__link {
		font-weight: 400;
		font-size: 12px;
		line-height: 16px;
		color: #8E929C;
		display: flex;
		flex-direction: row;
		white-space: nowrap;

		&-comma {
			all: inherit;
			margin-right: 5px;
		}

		&:hover {
			text-decoration: underline;
		}

		&:last-child {
			.artists-links__link-comma {
				display: none;
			}
		}
	}
}
</style>
