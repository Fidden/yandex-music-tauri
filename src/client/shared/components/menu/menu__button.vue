<script setup lang="ts">
import {cnMenu} from './menu.const';
</script>

<template>
	<HLMenuButton
		as="button"
		:class="cnMenu('button')"
	>
		<slot/>
	</HLMenuButton>
</template>

<style lang="scss">
.menu__button {
	display: flex;
	flex-direction: row;
	background: none;
}
</style>
