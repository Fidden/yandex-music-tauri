<template>
	<TracksTableFilter v-if="!hideFilter"/>
	<RecycleScroller
		page-mode
		:item-size="50"
		:items="tracks"
		key-field="id"
	>
		<template #before>
			<div
				:class="cnTracksTable('before', {
					hideImages
				})"
			>
				<p :class="cnTracksTable('before-index')">
					#
				</p>
				<p
					v-if="!hideImages"
					:class="cnTracksTable('before-image')"
				/>
				<p :class="cnTracksTable('before-name')">
					Название
				</p>
				<p :class="cnTracksTable('before-album')">
					Альбом
				</p>
				<p/>
				<i :class="cnTracksTable('before-clock fal fa-clock fa-sm')"/>
			</div>
		</template>
		<template #default="{ item, index}">
			<article
				:class="cnTracksTable('track', {
					disabled: !item.available,
					hideImages
				})"
			>
				<TracksTableIndex
					:index="index"
				/>
				<TracksTableImage
					v-if="!hideImages"
					:src="item.ogImage"
					:alt="item.title"
				/>
				<TracksTableTitle
					:title="item.title"
					:artists="item.artists"
					:content-warning="item.contentWarning"
				/>
				<TracksTableAlbum
					:albums="item.albums"
				/>
				<th/>
				<TracksTableTime :duration-ms="item.durationMs"/>
			</article>
		</template>
	</RecycleScroller>
</template>

<script setup lang="ts">
import type {IPopularTrack, ITrack} from '~/client/shared/types/api';
import {cnTracksTable} from './tracks-table.const';
import TracksTableAlbum from './tracks-table__album.vue';
import TracksTableFilter from './tracks-table__filter.vue';
import TracksTableImage from './tracks-table__image.vue';
import TracksTableIndex from './tracks-table__index.vue';
import TracksTableTime from './tracks-table__time.vue';
import TracksTableTitle from './tracks-table__title.vue';

defineProps<{
	tracks: ITrack[] | IPopularTrack[];
	hideImages?: boolean;
	hideFilter?: boolean;
}>();
</script>

<style lang="scss">
@import url('vue-virtual-scroller/dist/vue-virtual-scroller.css');

.tracks-table {
	&__before {
		display: grid;
		grid-template-rows: 1fr;
		gap: 8px;
		grid-template-columns: 40px 40px 40fr 16fr 45px 45px;
		min-height: 50px;

		&-index, &-name, &-album, &-clock {
			display: flex;
			align-items: center;
		}

		&-index {
			justify-content: center;
		}

		&-clock {
			justify-content: flex-end;
		}

		&--hideImages {
			grid-template-columns: 40px 40fr 16fr 45px 45px;
		}
	}


	&__track {
		display: grid;
		grid-template-rows: 1fr;
		grid-template-columns: 40px 40px 40fr 16fr 45px 45px;
		gap: 8px;
		min-height: 40px;

		&--disabled {
			opacity: 0.3;
			pointer-events: none;
		}

		&--hideImages {
			grid-template-columns: 40px 40fr 16fr 45px 45px;
		}
	}
}
</style>
