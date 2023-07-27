<template>
	<div :class="cnConcertCard('info')">
		<p :class="cnConcertCard('info-title')">
			{{ title }}
		</p>
		<p :class="cnConcertCard('info-additional')">
			<span :class="cnConcertCard('info-city')">
				{{ city }}
			</span>
			<span :class="cnConcertCard('info-place')">
				{{ place }}
			</span>
		</p>
	</div>
</template>

<script setup lang="ts">
import {cnConcertCard} from './concert-card.const';

defineProps<{
	title: string;
	city: string;
	place: string;
}>();
</script>

<style lang="scss">
.concert-card__info {
	display: flex;
	flex-direction: column;
	flex: 1;

	&-title {
		font-size: 14px;
		line-height: 16px;
	}

	&-additional {
		display: flex;
		flex-direction: row;
		align-items: center;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		flex: 1;
	}

	&-city, &-place {
		font-size: 12px;
		color: #8E929C;
		line-height: 14px;
	}

	&-city {
		position: relative;
		padding-right: 14px;

		&:after {
			position: absolute;
			right: 4px;
			top: 50%;
			transform: translate(-50%, -50%);
			background: #8E929C;
			width: 4px;
			height: 4px;
			content: ' ';
			border-radius: 50%;
		}
	}
}
</style>
