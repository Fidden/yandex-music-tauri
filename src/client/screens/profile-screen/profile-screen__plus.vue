<template>
	<div
		v-if="vm.hasPlus"
		:class="cnProfileScreen('plus')"
	>
		<h2 :class="cnProfileScreen('plus-title')">
			Подписка Плюс оформлена
		</h2>
		<p :class="cnProfileScreen('plus-exp')">
			Полный доступ к фонотеке закончится {{ vm.permissionsDate }}
		</p>
	</div>
</template>

<script setup lang="ts">
import {ProfileScreenVm} from '~/client/screens/profile-screen/profile-screen.vm';
import {cnProfileScreen} from './profile-screen.const';

const vm = useVm(ProfileScreenVm, true);
</script>

<style lang="scss">
.profile-screen__plus {
	display: flex;
	flex-direction: column;
	margin-top: 20px;

	&-title {
		font-size: 20px;
		line-height: 24px;
		font-weight: 500;
	}

	&-exp {
		color: #8E929C;
	}
}
</style>
