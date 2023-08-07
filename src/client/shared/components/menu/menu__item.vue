<script setup lang="ts">
import {cnMenu} from './menu.const';
</script>

<template>
	<HLMenuItem
		as="li"
		:class="cnMenu('item')"
	>
		<slot/>
	</HLMenuItem>
</template>

<style lang="scss">
.menu__item {
	transition: 200ms;
	min-height: 30px;
	font-size: 14px;
	line-height: 16px;
	cursor: pointer;
	padding: 0 10px;
	display: flex;
	align-items: center;
	border-radius: 2px;

	&:hover {
		transition: 200ms;
		background: rgba(44, 53, 77, 1);
	}
}
</style>
