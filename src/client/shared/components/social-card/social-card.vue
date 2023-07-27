<template>
	<div
		:class="cnSocialCard()"
		@click="open(link.href)"
	>
		<SocialCardIcon
			:type="link.type"
			:social-network="link.socialNetwork"
		/>
		<SocialCardInfo
			:title="link.title"
			:social-network="link.socialNetwork"
		/>
	</div>
</template>

<script setup lang="ts">
import {open} from '@tauri-apps/api/shell';
import {ILink} from '~/client/shared/types/api';
import {cnSocialCard} from './social-card.const';
import SocialCardIcon from './social-card__icon.vue';
import SocialCardInfo from './social-card__info.vue';

defineProps<{
	link: ILink;
}>();
</script>

<style lang="scss">
.social-card {
	cursor: pointer;
	height: 60px;
	border-radius: 6px;
	background: rgba(41, 44, 59, 0.8);
	padding: 8px 12px;
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 8px;
	transition: 200ms;

	&:hover {
		transition: 200ms;
		background: rgba(41, 44, 59, 1);
	}
}
</style>
