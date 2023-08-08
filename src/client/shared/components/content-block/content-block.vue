<template>
	<section :class="cnContentBlock()">
		<header :class="cnContentBlock('header')">
			<div :class="cnContentBlock('info')">
				<h2 :class="cnContentBlock('title')">
					{{ title }}
				</h2>
				<p
					v-if="subtitle"
					:class="cnContentBlock('subtitle')"
				>
					{{ subtitle }}
				</p>
			</div>
			<NuxtLink
				v-if="to"
				:to="to"
				:class="cnContentBlock('link')"
			>
				{{ toText }}
			</NuxtLink>
		</header>
		<slot name="before"/>
		<div :class="cnContentBlock('body')">
			<slot v-if="!loading"/>
			<slot
				v-else
				name="fallback"
			/>
			<slot name="after"/>
		</div>
	</section>
</template>

<script setup lang="ts">
import {RouteLocationRaw} from '#vue-router';
import {cnContentBlock} from './content-block.const';

withDefaults(defineProps<{
	title: string;
	subtitle?: string;
	to?: RouteLocationRaw;
	toText?: string;
	loading?: boolean;
}>(), {
	toText: 'Смотреть всё'
});
</script>

<style lang="scss">
.content-block {
	display: flex;
	flex-direction: column;

	&__header {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-bottom: 20px;
	}

	&__info {
		display: flex;
		flex-direction: column;
	}

	&__title {
		font-weight: 500;
		font-size: 31.25px;
		line-height: 32px;
	}

	&__link {
		font-size: 14px;
		line-height: 16px;
		margin-left: auto;
		transition: 200ms;

		&:hover {
			transition: 200ms;
			color: var(--primary);
		}
	}

	&__subtitle {
		font-weight: 400;
		font-size: 14px;
		line-height: 16px;
		color: #8E929C;
		margin-top: 2px;
	}

	&__body {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(254px, 1fr));
		grid-template-rows: 1fr;
		gap: 7px;
	}
}
</style>
