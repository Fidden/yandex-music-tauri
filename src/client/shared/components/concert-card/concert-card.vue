<template>
	<article
		:class="cnConcertCard()"
		@click="open(concert.afishaUrl)"
	>
		<ConcertCardImage
			:src="concert.images[0]"
			:alt="concert.concertTitle"
		/>
		<ConcertCardFooter>
			<ConcertCardDate :date="concert.datetime"/>
			<ConcertCardInfo
				:title="concert.concertTitle"
				:city="concert.city"
				:place="concert.place"
			/>
		</ConcertCardFooter>
	</article>
</template>

<script setup lang="ts">
import {open} from '@tauri-apps/api/shell';
import {IConcert} from '~/client/shared/types/api';
import {cnConcertCard} from './concert-card.const';
import ConcertCardDate from './concert-card__date.vue';
import ConcertCardFooter from './concert-card__footer.vue';
import ConcertCardImage from './concert-card__image.vue';
import ConcertCardInfo from './concert-card__info.vue';

defineProps<{
	concert: IConcert
}>();
</script>

<style lang="scss">
.concert-card {
	cursor: pointer;
	display: flex;
	flex-direction: column;
	width: 100%;
	border-radius: 6px;
	overflow: hidden;
	background: rgba(41, 44, 59, 0.8);
	transition: 200ms;

	&:hover {
		transition: 200ms;
		background: rgb(41, 44, 59);

		.concert-card__image img {
			transition: 200ms;
			transform: scale(1.05);
		}
	}
}
</style>
