<template>
	<div :class="cnConcertCard('date')">
		<p :class="cnConcertCard('date-number')">
			{{ day }}
		</p>
		<p :class="cnConcertCard('date-month')">
			{{ month }}
		</p>
	</div>
</template>

<script setup lang="ts">
import {cnConcertCard} from './concert-card.const';

const props = defineProps<{
	date: string
}>();

const date = new Date(props.date);

const day = date.getUTCDate();
const month = date.toLocaleString('ru', {month: 'short'});
</script>

<style lang="scss">
.concert-card__date {
	display: flex;
	flex-direction: column;
	margin-right: 15px;
	justify-content: center;
	align-items: center;
	padding: 0 15px 0 10px;
	position: relative;

	&-number, &-month {
		font-weight: 300;
		font-size: 14px;
		line-height: 16px;
	}

	&-number {
		color: var(--primary);
	}

	&-month {
		&:first-letter {
			text-transform: uppercase;
		}
	}

	&::after {
		width: 1px;
		height: 80%;
		right: 0;
		top: 50%;
		content: ' ';
		background: #55565b;
		position: absolute;
		transform: translateY(-50%);
	}
}
</style>
