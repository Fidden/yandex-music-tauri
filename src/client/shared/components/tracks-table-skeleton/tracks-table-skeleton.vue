<template>
	<SkeletonTheme
		color="#363a4dcc"
		highlight="#484d66cc"
		tag="main"
		:class="cnTracksTableSkeleton()"
	>
		<div :class="cnTracksTableSkeleton('filter')">
			<Skeleton
				width="215px"
				height="40px"
			/>
			<Skeleton
				width="170px"
				height="40px"
			/>
		</div>
		<div :class="cnTracksTableSkeleton('body')">
			<Skeleton
				width="100%"
				height="42px"
			/>

			<div
				v-for="i in tracksCount"
				:key="i"
				:class="cnTracksTableSkeleton('track')"
			>
				<div :class="cnTracksTableSkeleton('track-index')">
					{{ i }}
				</div>
				<Skeleton
					:class="cnTracksTableSkeleton('track-image')"
					width="40px"
					height="40px"
				/>
				<div :class="cnTracksTableSkeleton('track-info')">
					<Skeleton
						:class="cnTracksTableSkeleton('track-title')"
						width="60px"
						height="13px"
					/>
					<Skeleton
						:class="cnTracksTableSkeleton('track-artists')"
						width="90px"
						height="10px"
					/>
				</div>
				<Skeleton
					:class="cnTracksTableSkeleton('track-album')"
					width="70px"
					height="14px"
				/>
				<div/>
				<Skeleton
					:class="cnTracksTableSkeleton('track-time')"
					width="30px"
					height="12px"
				/>
			</div>
		</div>
	</SkeletonTheme>
</template>

<script setup lang="ts">
import {cnTracksTableSkeleton} from './tracks-table-skeleton.const';
import {Skeleton, SkeletonTheme} from 'vue-loading-skeleton';

withDefaults(defineProps<{
	tracksCount?: number
}>(), {
	tracksCount: 10
});
</script>

<style lang="scss">
.tracks-table-skeleton {
	&__filter {
		display: flex;
		gap: 10px;
	}

	&__body {
		margin-top: 18px;
	}

	&__track {
		display: grid;
		grid-template-rows: 1fr;
		grid-template-columns: 40px 40px 40fr 16fr 45px 45px;
		gap: 8px;
		height: 50px;

		&-index {
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 14px;
			color: rgb(54, 58, 77);
		}

		&-image {
			transform: translateY(2px);
		}

		&-info {
			display: flex;
			flex-direction: column;
		}

		&-title {
			transform: translateY(6px);
		}

		&-album {
			margin: auto 0;
			transform: translateY(2px);
		}

		&-time {
			margin: auto 0 auto auto;
			transform: translate(-5px, 2px);
		}
	}
}
</style>
