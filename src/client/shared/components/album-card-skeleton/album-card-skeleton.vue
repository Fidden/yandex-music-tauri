<template>
	<SkeletonTheme
		color="#363a4dcc"
		highlight="#484d66cc"
		:class="cnAlbumCardSkeleton()"
	>
		<Skeleton
			:class="cnAlbumCardSkeleton('image')"
			width="148px"
			height="148px"
		/>

		<Skeleton
			:class="cnAlbumCardSkeleton('title')"
			width="70%"
			height="14px"
		/>

		<Skeleton
			:class="cnAlbumCardSkeleton('description')"
			width="100%"
			height="12px"
		/>

		<div :class="cnAlbumCardSkeleton('footer')">
			<Skeleton
				:class="cnAlbumCardSkeleton('tracks-count')"
				width="50px"
				height="12px"
			/>

			<Skeleton
				:class="cnAlbumCardSkeleton('year')"
				width="30px"
				height="12px"
			/>
		</div>
	</SkeletonTheme>
</template>

<script setup lang="ts">
import {Skeleton, SkeletonTheme} from 'vue-loading-skeleton';
import {cnAlbumCardSkeleton} from './album-card-skeleton.const';
</script>

<style lang="scss">
.album-card-skeleton {
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

	&__footer {
		display: flex;
		justify-content: space-between;
		transform: translateY(8px);
	}

	& > span {
		span {
			transform: translateY(-4px);
		}
	}
}
</style>
