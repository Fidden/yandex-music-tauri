<template>
	<main :class="cnLoginScreen()">
		<div :class="cnLoginScreen('image')">
			<img
				v-if="vm.qrLink"
				:src="vm.qrLink"
				height="256"
				width="256"
				alt="qr"
			>
		</div>
		<h1 :class="cnLoginScreen('title')">
			Быстрый вход по QR-коду
		</h1>
	</main>
</template>

<script setup lang="ts">
import {LoginScreenVm} from '~/client/screens/login-screen/login-screen.vm';
import {cnLoginScreen} from './login-screen.const';

const vm = useVm(LoginScreenVm);
vm.init();
</script>

<style lang="scss">
.login-screen {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 20px;

	&__title {
		font-size: 28px;
		font-weight: 400;
		text-align: center;
		line-height: 26px;
	}

	&__image {
		background: #262937;
		padding: 10px;
		border-radius: 8px;
		width: 256px;
		height: 256px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	img {
		filter: invert(1);
	}
}
</style>
