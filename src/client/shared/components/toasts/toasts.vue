<template>
	<TransitionGroup
		name="toasts"
		tag="ul"
		:class="cnToasts()"
	>
		<li
			v-for="toast in vm.toasts"
			:key="toast.id"
			:class="cnToasts('item')"
		>
			{{ toast.text }}
		</li>
	</TransitionGroup>
</template>

<script setup lang="ts">
import {globalEmitter} from '~/client/shared/emitters/global.emitter';
import {cnToasts} from './toasts.const';
import {ToastsVm} from './toasts.vm';

const vm = useVm(ToastsVm);

globalEmitter.on('toast:add', (text) => {
	vm.add(text);
});
</script>

<style lang="scss">
.player ~ .toasts {
	bottom: 80px;
}

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
}

.toasts-enter-active, .toasts-leave-active {
	transform: translateY(0);
}

.toasts-enter-from, .toasts-leave-to {
	opacity: 0;
	transform: translateY(100px);
}
</style>
