<template>
	<SkeletonTheme
		color="#363a4dcc"
		highlight="#484d66cc"
		:class="cnSearchCardBestSkeleton()"
	>
		<Skeleton
			width="100px"
			height="100px"
			circle
			:class="cnSearchCardBestSkeleton('image')"
		/>

		<Skeleton
			width="120px"
			height="26px"
			:class="cnSearchCardBestSkeleton('text')"
		/>

		<Skeleton
			width="80px"
			height="26px"
			:class="cnSearchCardBestSkeleton('type')"
		/>
	</SkeletonTheme>
</template>

<script setup lang="ts">
import {Skeleton, SkeletonTheme} from 'vue-loading-skeleton';
import {cnSearchCardBestSkeleton} from './search-card-best-skeleton.const';
</script>

<style lang="scss">
.search-card-best-skeleton {
	width: 100%;
	height: 100%;
	background: #151a22;
	opacity: 0.6;
	padding: 20px;
	border-radius: 6px;
	display: flex;
	flex-direction: column;

	&__image span {
		transform: translateY(-6px);
	}

	&__text span {
		margin-top: 9px;
	}

	&__type {
		margin-top: auto;

		span {
			border-radius: 999px;
		}
	}
}
</style>
