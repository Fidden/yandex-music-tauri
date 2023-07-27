<template>
	<SkeletonTheme
		color="#363a4dcc"
		highlight="#484d66cc"
		:class="cnUserPlaylistSkeleton()"
	>
		<Skeleton
			:class="cnUserPlaylistSkeleton('image')"
			width="46px"
			height="46px"
		/>

		<Skeleton
			:class="cnUserPlaylistSkeleton('text')"
			width="60%"
			height="17px"
		/>
	</SkeletonTheme>
</template>

<script setup lang="ts">
import {Skeleton, SkeletonTheme} from 'vue-loading-skeleton';
import {cnUserPlaylistSkeleton} from './user-playlist-skeleton.const';
</script>

<style lang="scss">
.user-playlist-skeleton {
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 26px;
	width: 100%;
	padding: 5px;
	background: #292C3BCC;
	border-radius: 4px;
	height: 100%;
	user-select: none;

	&__image {
		border-radius: 4px;
		overflow: hidden;
		max-height: 46px;
		width: 46px;
	}

	&__text {
		flex: 1;
		transform: translateY(4px);
	}

	& > span {
		span {
			transform: translateY(-4px);
		}
	}
}
</style>
