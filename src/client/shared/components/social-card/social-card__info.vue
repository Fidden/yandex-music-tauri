<template>
	<div :class="cnSocialCard('info')">
		<p :class="cnSocialCard('info-title')">
			{{ transformedSocialNetwork }}
		</p>
		<p :class="cnSocialCard('info-link')">
			{{ title }}
		</p>
	</div>
</template>

<script setup lang="ts">
import {cnSocialCard} from './social-card.const';

const props = defineProps<{
	socialNetwork: string;
	title: string
}>();

const transformedSocialNetwork = computed(() => {
	switch (props.socialNetwork) {
		case 'tiktok': {
			return 'TikTok';
		}
		case 'youtube': {
			return 'YouTube';
		}
		case 'telegram': {
			return 'Telegram';
		}
		case 'twitter': {
			return 'Twitter';
		}
		default: {
			return props.socialNetwork?.toUpperCase();
		}
	}
});
</script>

<style lang="scss">
.social-card__info {
	&-title {
		font-size: 16px;
		line-height: 16px;
	}

	&-link {
		color: #8E929C;
		font-size: 14px;
		line-height: 16px;
	}
}
</style>
