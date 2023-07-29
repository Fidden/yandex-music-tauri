<template>
	<article :class="cnStationCard(null, [size])">
		<div
			:class="cnStationCard('image')"
			:style="{background: station.icon.backgroundColor}"
		>
			<Image
				:src="station.icon.imageUrl"
				:alt="station.name"
				crop="200x200"
			/>
		</div>
		<p :class="cnStationCard('title')">
			{{ station.name }}
		</p>
	</article>
</template>

<script setup lang="ts">
import Image from '~/client/shared/components/image.vue';
import {IStation} from '~/client/shared/types/api';
import {cnStationCard} from './station-card.const';

defineProps<{
	station: IStation;
	size?: 'sm';
}>();
</script>

<style lang="scss">
.station-card {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
	cursor: pointer;
	background: rgba(41, 44, 59, 0.75);
	border-radius: 6px;
	padding: 13px 13px 21px 13px;
	width: 213px;
	gap: 13px;
	transition: 200ms;

	&:hover {
		transition: 200ms;
		background: rgba(41, 44, 59, 1);
	}

	&__image {
		width: 100%;
		aspect-ratio: 1 / 1;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 4px;
	}

	&--sm {
		flex-direction: row;
		width: 100%;
		padding: 4px 6px;
		justify-content: flex-start;

		.station-card__image {
			height: 42px;
			width: 42px;
		}

		.station-card__title {
			font-size: 16px;
			line-height: 18px;
			font-weight: 400;
		}
	}
}
</style>
