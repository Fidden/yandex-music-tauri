<script setup lang="ts">
import {cnMenu} from './menu.const';
</script>

<template>
	<HLMenuItems
		as="ul"
		:class="cnMenu('items')"
	>
		<slot/>
	</HLMenuItems>
</template>

<style lang="scss">
.menu__items {
	padding: 5px;
	margin: 0;
	position: absolute;
	left: 0;
	bottom: 0;
	transform: translateY(100%);
	list-style-type: none;
	overflow: hidden;
	border-radius: 4px;
	display: flex;
	flex-direction: column;
	width: max-content;
	background: rgba(44, 53, 77, 0.57);
}
</style>
