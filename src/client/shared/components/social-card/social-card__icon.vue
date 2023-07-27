<template>
	<div
		:class="cnSocialCard('icon')"
		:style="{background: icon.color}"
	>
		<Icon
			size="1.2rem"
			:name="icon.icon"
		/>
	</div>
</template>

<script setup lang="ts">
import {cnSocialCard} from './social-card.const';

const props = defineProps<{
	socialNetwork: string;
	type: string;
}>();

const icon = computed(() => {
	if (props.type === 'official') {
		return {
			color: 'black',
			icon: 'ph:globe'
		};
	}

	switch (props.socialNetwork) {
		case 'telegram': {
			return {
				color: '#2AABEE',
				icon: 'mingcute:telegram-fill'
			};
		}
		case 'tiktok': {
			return {
				color: '#333',
				icon: 'logos:tiktok-icon'
			};
		}
		case 'vk': {
			return {
				color: '#06f',
				icon: 'ion:logo-vk'
			};
		}
		case 'youtube': {
			return {
				color: '#f00',
				icon: 'simple-icons:youtube'
			};
		}
		case 'twitter': {
			return {
				color: '#1D9BF0',
				icon: 'bxl:twitter'
			};
		}
		default: {
			return {
				color: 'black',
				icon: ''
			};
		}
	}
});
</script>

<style lang="scss">
.social-card__icon {
	height: 100%;
	aspect-ratio: 1/1;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
}
</style>
