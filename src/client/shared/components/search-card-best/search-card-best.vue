<template>
	<article :class="cnSearchCardBest()">
		<Image
			:class="cnSearchCardBest('image')"
			:src="vm.src"
			:alt="vm.title"
			crop="100x100"
			width="100"
			height="100"
		/>
		<Component
			:is="vm.link ? NuxtLink : 'h2'"
			:to="vm.link?.payload"
			:class="cnSearchCardBest('title')"
		>
			{{ vm.title }}
		</Component>
		<p :class="cnSearchCardBest('type')">
			{{ vm.typeHuman }}
		</p>
		<button
			:class="cnSearchCardBest('play')"
			@click="vm.onPlay()"
		>
			<MatIcon
				name="play_arrow"
				fill
			/>
		</button>
	</article>
</template>

<script setup lang="ts">
import {NuxtLink} from '#components';
import Image from '~/client/shared/components/image.vue';
import MatIcon from '~/client/shared/components/mat-icon.vue';
import {SearchCardBestVm} from '~/client/shared/components/search-card-best/search-card-best.vm';
import {BestResult, ObjectTypeEnum} from '~/client/shared/types/api';
import {cnSearchCardBest} from './search-card-best.const';

const props = defineProps<{
	result: BestResult,
	type: ObjectTypeEnum;
}>();

const vm = useVm(SearchCardBestVm);

watch(props, newProps => vm.update(newProps), {deep: true, immediate: true});
</script>

<style lang="scss">
.search-card-best {
	height: 100%;
	background: #151a22;
	padding: 20px;
	border-radius: 6px;
	display: flex;
	flex-direction: column;
	transition: 200ms;
	cursor: pointer;
	position: relative;
	grid-area: artist-search;
	gap: 12px;

	&__image {
		border-radius: 50%;
	}

	&__title {
		font-size: 32px;
		line-height: 28px;

		&::before {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			content: ' ';
		}
	}

	&__type {
		margin-top: auto;
		font-size: 14px;
		font-weight: bold;
		background: rgba(0, 0, 0, 0.4);
		width: min-content;
		padding: 4px 12px;
		border-radius: 500px;
	}

	&__play {
		opacity: 0;
		position: absolute;
		right: 20px;
		bottom: 10px;
		background: var(--primary);
		display: flex;
		justify-content: center;
		align-items: center;
		width: 48px;
		height: 48px;
		border-radius: 50%;
		color: black;
		transition: 200ms;
		box-shadow: 0 8px 8px rgba(0, 0, 0, .3);
	}

	&:hover {
		background: #141920;
		transition: 200ms;

		.search-card-best__play {
			opacity: 1;
			bottom: 20px;
			transition: 200ms;
		}
	}
}
</style>
