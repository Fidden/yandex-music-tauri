<template>
	<TransitionGroup
		name="toasts"
		tag="ul"
		:class="cnToasts(null, {
			playerOpen: !!playerVm.track
		})"
	>
		<li
			v-for="toast in toastStore.toasts"
			:key="toast.id"
			:class="cnToasts('item')"
		>
			{{ toast.text }}
		</li>
	</TransitionGroup>
</template>

<script setup lang="ts">
import {PlayerVm} from '~/client/shared/components/player/player.vm';
import {cnToasts} from './toasts.const';

const toastStore = useToastStore();
const playerVm = useVm(PlayerVm, true);
</script>

<style lang="scss">
.toasts {
	display: flex;
	flex-direction: column;
	position: fixed;
	left: 50%;
	bottom: 20px;
	transform: translate(-50%, -50%);
	list-style-type: none;
	gap: 8px;
	transition: 500ms;

	&__item {
		background: var(--primary);
		color: black;
		border-radius: 6px;
		padding: 5px 15px;
		font-size: 16px;
		line-height: 18px;
		font-weight: 400;
		transition: 500ms;
	}

	&--playerOpen {
		bottom: 80px;
		transition: 500ms;
	}
}

.toasts-enter-active, .toasts-leave-active {
	transform: translateY(0);
}

.toasts-enter-from, .toasts-leave-to {
	opacity: 0;
	transform: translateY(100px);
}
</style>
