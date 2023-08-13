<template>
	<main
		v-draggable
		:class="cnLoginScreen()"
	>
		<div :class="cnLoginScreen('content')">
			<header :class="cnLoginScreen('header')">
				<img
					src="/logos/ya.svg"
					alt="ya"
				>
				<img
					src="/logos/ya-id.svg"
					alt="ya-id"
				>
				<img
					src="/logos/ya-id-name.svg"
					alt="ya-id-name"
				>
			</header>
			<div
				:class="cnLoginScreen('image')"
				:style="{backgroundImage: `url(${vm.qrLink})`}"
			>
				<img
					src="/logos/ya.svg"
					alt="ya"
					width="64"
					height="64"
				>
			</div>
			<p :class="cnLoginScreen('text')">
				Просканируйте QR любым удобным способом. Например, откройте приложение Яндекс, нажмите в поисковой
				строке <span :class="cnLoginScreen('qr')"/>
				и наведите камеру на QR-код:
			</p>
		</div>
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
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 20px;
	background: url('/img/walley.jpg');
	background-size: cover;

	&__content {
		background: #131317;
		padding: 32px;
		border-radius: 32px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		max-width: 360px;
		width: 100%;
		gap: 32px;
	}

	&__header {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 5px;
		border: 2px solid #fff;
		border-radius: 32px;
		padding: 4px;
	}

	&__image {
		background: white;
		padding: 10px;
		border-radius: 8px;
		width: 256px;
		height: 256px;
		background-size: cover;
		position: relative;

		img {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			background: white;
			padding: 8px;
			border-radius: 50%;
		}
	}

	&__text {
		text-align: center;
		font-size: 16px;
		line-height: 16px;
		max-width: 260px;
	}

	&__qr {
		background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M20.889 5.989c.062.464.103.986.129 1.585h2.001c-.102-2.488-.434-4.013-1.507-5.086-1.073-1.073-2.598-1.404-5.086-1.507v2.001c.599.026 1.12.067 1.585.13 1.223.164 1.744.447 2.087.79.343.344.626.864.79 2.087Zm-2.878 14.9c-.464.062-.986.103-1.585.129v2.001c2.488-.102 4.013-.434 5.086-1.507 1.073-1.073 1.404-2.598 1.507-5.086h-2.001c-.026.599-.067 1.12-.13 1.585-.164 1.223-.447 1.744-.79 2.087-.343.343-.864.627-2.087.79Zm-14.9-2.878a17.827 17.827 0 0 1-.129-1.585H.981c.102 2.488.434 4.013 1.507 5.086 1.073 1.073 2.598 1.405 5.086 1.507v-2.001a17.818 17.818 0 0 1-1.585-.13c-1.223-.164-1.743-.447-2.087-.79-.343-.343-.626-.864-.79-2.087Zm2.878-14.9c.464-.062.986-.103 1.585-.129V.981c-2.488.103-4.013.434-5.086 1.507C1.415 3.561 1.083 5.086.981 7.574h2.001c.026-.599.067-1.12.13-1.585.164-1.223.447-1.743.79-2.087.344-.343.864-.626 2.087-.79ZM14.426 12a2.426 2.426 0 1 1-4.852 0 2.426 2.426 0 0 1 4.852 0Zm2 0a4.426 4.426 0 1 1-8.852 0 4.426 4.426 0 0 1 8.852 0Z' fill='%23fff'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-size: contain;
		display: inline-block;
		height: 20px;
		vertical-align: text-bottom;
		width: 20px;
	}
}
</style>
