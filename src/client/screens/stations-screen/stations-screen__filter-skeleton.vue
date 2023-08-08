<template>
	<SkeletonTheme
		color="#363a4dcc"
		highlight="#484d66cc"
	>
		<Skeleton
			:class="cnStationsScreen('filter-skeleton')"
			width="100%"
			height="37px"
		/>
	</SkeletonTheme>
</template>

<script setup lang="ts">
import {Skeleton, SkeletonTheme} from 'vue-loading-skeleton';
import {cnStationsScreen} from './stations-screen.const';
</script>

<style lang="scss">
.stations-screen__filter-skeleton span {
	margin-bottom: 24px;
	transform: translateY(-4px);
}
</style>
