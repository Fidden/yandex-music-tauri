<template>
	<NuxtLink
		:to="{name: 'concert', params: {concert}}"
		:class="cnConcertCard()"
	>
		<ConcertCardImage
			:src="concert.images?.at(0)"
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
	</NuxtLink>
</template>

<script setup lang="ts">
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
	display: flex;
	flex-direction: column;
	width: 100%;
	border-radius: 6px;
	overflow: hidden;
	background: rgba(41, 44, 59, 0.8);
}
</style>
