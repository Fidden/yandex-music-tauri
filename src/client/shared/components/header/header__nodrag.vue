<template>
	<div
		v-draggable:disable
		:class="cnHeader('nodrag', {left: true})"
	/>
	<div
		v-draggable:disable
		:class="cnHeader('nodrag', {right: true})"
	/>
	<div
		v-draggable:disable
		:class="cnHeader('nodrag', {top: true})"
	/>
</template>

<script lang="ts" setup>
import {cnHeader} from './header.const';
</script>

<style lang="scss">
.header__nodrag {
	position: absolute;
}

.header__nodrag--left {
	left: 0;
	top: 0;
	width: 5px;
	height: 100%;
}

.header__nodrag--right {
	right: 0;
	top: 0;
	width: 5px;
	height: 100%;
}

.header__nodrag--top {
	left: 0;
	top: 0;
	width: 100%;
	height: 5px;
}
</style>
