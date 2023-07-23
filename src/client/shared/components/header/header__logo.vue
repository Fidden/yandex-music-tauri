<template>
	<div :class="cnHeader('logo')">
		<NuxtImg
			:class="cnHeader('logo-img')"
			alt="logo"
			height="15"
			src="/img/logo.svg"
			width="15"
		/>
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
