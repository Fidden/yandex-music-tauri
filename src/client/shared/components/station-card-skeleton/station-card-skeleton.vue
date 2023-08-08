<template>
	<SkeletonTheme
		color="#363a4dcc"
		highlight="#484d66cc"
		:class="cnStationCardSkeleton(null, [size])"
	>
		<Skeleton
			:class="cnStationCardSkeleton('image')"
			width="187px"
			height="187px"
		/>
		<Skeleton
			:class="cnStationCardSkeleton('title')"
			width="60%"
			height="23px"
		/>
	</SkeletonTheme>
</template>

<script setup lang="ts">
import {Skeleton, SkeletonTheme} from 'vue-loading-skeleton';
import {cnStationCardSkeleton} from './station-card-skeleton.const';

defineProps<{
	size?: 'sm';
}>();
</script>

<style lang="scss">
.station-card-skeleton {
	display: flex;
	flex-direction: column;
	background: rgba(41, 44, 59, 0.75);
	border-radius: 6px;
	padding: 13px 13px 21px 13px;
	gap: 13px;

	&--sm {
		flex-direction: row;
		align-items: center;
		padding: 4px 6px;
		justify-content: flex-start;
		transform: translateY(-8px);

		.station-card-skeleton__image span {
			width: 42px !important;
			height: 42px !important;
			transform: translateY(-2px);
		}

		.station-card-skeleton__title {
			width: 70%;
			margin-right: auto;

			span {
				width: 100% !important;
				height: 18px !important;
				margin-right: auto;
			}
		}
	}

	&__title {
		display: flex;
		flex-direction: row;

		span {
			margin: 0 auto;
		}
	}
}
</style>
