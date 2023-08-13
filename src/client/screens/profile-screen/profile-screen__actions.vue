<template>
	<div :class="cnProfileScreen('actions')">
		<h2 :class="cnProfileScreen('actions-title')">
			Действия
		</h2>
		<ul :class="cnProfileScreen('actions-list')">
			<li :class="cnProfileScreen('actions-item')">
				<a
					href="https://passport.yandex.ru/profile/services"
					target="_blank"
				>
					Настроить подписку Плюс
				</a>
			</li>
			<li :class="cnProfileScreen('actions-item')">
				<a
					href="https://plus.yandex.ru/gift?serviceName=music&promoName=music_common"
					target="_blank"
				>
					Активировать промокод
				</a>
			</li>
			<li
				:class="cnProfileScreen('actions-item')"
				@click="vm.exit()"
			>
				Выйти из аккаунта
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import {cnProfileScreen} from './profile-screen.const';
import {ProfileScreenVm} from './profile-screen.vm';

const vm = useVm(ProfileScreenVm, true);
</script>


<style lang="scss">
.profile-screen__actions {
	display: flex;
	flex-direction: column;

	&-title {
		font-size: 20px;
		line-height: 30px;
		font-weight: 500;
	}

	&-list {
		padding: 0;
		margin: 0;
		list-style-type: none;
	}

	&-item {
		color: #8E929C;
		cursor: pointer;

		a {
			all: inherit;
		}

		&:hover {
			transition: 100ms;
			color: var(--primary);
		}
	}
}
</style>
