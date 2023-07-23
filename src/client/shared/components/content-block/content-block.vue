<template>
	<section :class="cnContentBlock()">
		<h2 :class="cnContentBlock('title')">
			{{ title }}
		</h2>
		<p
			v-if="subtitle"
			:class="cnContentBlock('subtitle')"
		>
			{{ subtitle }}
		</p>
		<div :class="cnContentBlock('body')">
			<slot/>
		</div>
	</section>
</template>

<script setup lang="ts">
import {cnContentBlock} from './content-block.const';

defineProps<{
	title: string;
	subtitle?: string;
}>();
</script>

<style lang="scss">
.content-block {
	display: flex;
	flex-direction: column;

	&__title {
		font-weight: 500;
		font-size: 31.25px;
		line-height: 32px;
	}

	&__subtitle {
		font-weight: 400;
		font-size: 14px;
		line-height: 16px;
		color: #8E929C;
		margin-top: 2px;
	}

	&__body {
		margin-top: 20px;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(254px, 1fr));
		grid-template-rows: 1fr;
		gap: 7px;

		.user-playlist:nth-child(n + 7) {
			display: none;
		}
	}
}
</style>
