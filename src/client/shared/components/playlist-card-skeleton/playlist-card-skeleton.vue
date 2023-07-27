<template>
	<SkeletonTheme
		color="#363a4dcc"
		highlight="#484d66cc"
		:class="cnPlaylistCardSkeleton()"
	>
		<Skeleton
			:class="cnPlaylistCardSkeleton('image')"
			width="148px"
			height="148px"
		/>

		<Skeleton
			:class="cnPlaylistCardSkeleton('title')"
			width="70%"
			height="14px"
		/>

		<Skeleton
			:class="cnPlaylistCardSkeleton('description')"
			width="100%"
			height="30px"
		/>

		<Skeleton
			v-show="showTracksCount"
			:class="cnPlaylistCardSkeleton('tracks-count')"
			width="40%"
			height="12px"
		/>
	</SkeletonTheme>
</template>

<script setup lang="ts">
import {Skeleton, SkeletonTheme} from 'vue-loading-skeleton';
import {cnPlaylistCardSkeleton} from '~/client/shared/components/playlist-card-skeleton/playlist-card-skeleton.const';

defineProps<{
	showTracksCount?: boolean;
}>();
</script>

<style lang="scss">
.playlist-card-skeleton {
	display: flex;
	flex-direction: column;
	width: 168px;
	padding: 10px;
	background: #292C3BCC;
	border-radius: 6px;
	height: 100%;
	user-select: none;

	&__image {
		border-radius: 6px;
		margin-bottom: 8px;
		overflow: hidden;
	}

	&__description {
		transform: translateY(-6px);
	}

	&__tracks-count {
		transform: translateY(2px);
	}

	& > span {
		span {
			transform: translateY(-4px);
		}
	}
}
</style>
