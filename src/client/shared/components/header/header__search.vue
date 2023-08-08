<template>
	<div
		v-draggable:disable
		:class="cnHeader('search')"
	>
		<input
			v-debounce:400ms="val => vm.search = val"
			:class="cnHeader('search-input')"
			placeholder="Поиск"
			type="text"
		>
	</div>
</template>

<script lang="ts" setup>
import {HeaderVm} from '~/client/shared/components/header/header.vm';
import {cnHeader} from './header.const';

const vm = useVm(HeaderVm, true);
</script>

<style lang="scss">
.header__search {
	flex: 1;
	margin: auto 80px;
	align-self: stretch;
	overflow: hidden;
	border-radius: 5px;
	background: rgba(34, 41, 57, 0.5);
	border: 1px solid rgba(255, 255, 255, 0.04);
	height: 35px;

	&-input {
		width: 100%;
		height: 100%;
		padding: 0 10px;
		font-size: 14px;
		background: none;
		outline: none;
		border: none;
		color: white;
	}
}
</style>
