<template>
	<div :class="cnHeader('logo')">
		<img
			:class="cnHeader('logo-img')"
			src="/img/logo.svg"
			alt="logo"
			height="15"
			width="15"
		>
		<h1 :class="cnHeader('logo-title')">
			Яндекс.Музыка
		</h1>
	</div>
</template>


<script lang="ts" setup>
import {cnHeader} from './header.const';
</script>

<style lang="scss">
.header__logo {
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 16px;
	user-select: none;

	&-title {
		font-size: 12px;
		font-weight: 400;
	}
}
</style>
