<template>
	<div :class="cnTracksTable('title')">
		<p :class="cnTracksTable('title-text')">
			{{ title }}
		</p>
		<div :class="cnTracksTable('title-body')">
			<p
				v-if="contentWarning"
				:class="cnTracksTable('title-warning')"
			>
				{{ contentWarning?.at(0) }}
			</p>
			<ArtistsLinks :artists="artists"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import ArtistsLinks from '~/client/shared/components/artists-links/artists-links.vue';
import type {IArtist} from '~/client/shared/types/api';
import {cnTracksTable} from './tracks-table.const';

defineProps<{
	title: string;
	artists: IArtist[];
	contentWarning?: string;
}>();
</script>

<style lang="scss">
.tracks-table__title {
	display: flex;
	flex-direction: column;
	justify-content: center;

	&-text {
		font-size: 15px;
		line-height: 15px;
		width: max-content;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 100%;
	}

	&-body {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	&-warning {
		color: #8E929C;
		border: 1px solid #8E929C;
		width: 12px;
		height: 12px;
		text-transform: uppercase;
		font-size: 7px;
		font-weight: 500;
		line-height: 12px;
		text-align: center;
		border-radius: 2px;
		margin-right: 4px;
	}
}
</style>
