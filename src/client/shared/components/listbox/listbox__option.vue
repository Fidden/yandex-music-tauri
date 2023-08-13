<template>
	<HLListboxOption
		:class="cnListbox('option')"
		:value="value"
		:disabled="!!disabled"
	>
		<slot/>
	</HLListboxOption>
</template>

<script setup lang="ts">
import {cnListbox} from './listbox.const';

defineProps<{
	value?: any,
	disabled?: boolean
}>();
</script>

<style lang="scss">
.listbox__option {
	height: 30px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 0 10px;
	font-size: 14px;
	transition: 200ms;
	cursor: pointer;
	gap: 8px;

	&:hover {
		background: rgb(44, 53, 77);
		transition: 200ms;
	}
}
</style>
