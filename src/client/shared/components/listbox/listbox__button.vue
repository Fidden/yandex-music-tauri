<template>
	<HLListboxButton :class="cnListbox('button')">
		<slot/>
		<MatIcon name="keyboard_arrow_down"/>
	</HLListboxButton>
</template>

<script setup lang="ts">

import MatIcon from '~/client/shared/components/mat-icon.vue';
import {cnListbox} from './listbox.const';
</script>

<style lang="scss">
.listbox__button {
	width: 100%;
	min-width: 150px;
	background: none;
	height: 40px;
	display: flex;
	align-items: center;
	gap: 8px;

	.mat-icon {
		margin-left: auto;
		transition: 200ms;
	}

	&[data-headlessui-state=open] {
		.mat-icon {
			transform: rotate(180deg);
			transition: 200ms;
		}
	}
}
</style>
