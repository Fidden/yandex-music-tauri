<script setup lang="ts">

import {cnListbox} from '~/client/shared/components/listbox/listbox.const';
</script>

<template>
	<HLListboxOptions :class="cnListbox('options')">
		<slot/>
	</HLListboxOptions>
</template>

<style lang="scss">
.listbox__options {
	position: absolute;
	left: 0;
	bottom: 0;
	transform: translateY(calc(100% + 20px));
	list-style-type: none;
	background: #252c3f;
	padding: 6px;
	z-index: 100;
	border-radius: 4px;
}
</style>
