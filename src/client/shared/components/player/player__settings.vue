<template>
	<Transition name="settings">
		<section
			v-if="vm.currentStationResult && vm.isStation && vm.isSettingsOpen"
			v-click-outside="() => vm.onSettings()"
			:class="cnPlayer('settings')"
		>
			<h3 :class="cnPlayer('settings-title')">
				Настроить волну
			</h3>
			<ul
				v-if="vm.currentStationResult?.station?.restrictions2"
				:class="cnPlayer('settings-list')"
			>
				<li
					v-for="(item, key) in vm.currentStationResult.station.restrictions2"
					:key="key"
					:class="cnPlayer('settings-list-item')"
					:data-name="item?.name"
					:data-count="item!.possibleValues.length"
				>
					<button
						v-for="possible in item!.possibleValues"
						:key="possible.value"
						:class="cnPlayer('settings-list-item-button', {
						active: vm.currentStationResult.settings2[key] === possible.value
					})"
						:data-value="possible.value"
						@click="vm.onSettingChange(key, possible.value)"
					>
						<img
							v-if="key === 'diversity' || key === 'moodEnergy'"
							:width="key === 'moodEnergy' ? 50 : 60"
							:height="key === 'moodEnergy' ? 50 : 60"
							:src="`/img/station/${possible.value}.png`"
							:alt="possible.value"
						>
						{{ possible.name }}
					</button>
				</li>
			</ul>
			<Button
				:class="cnPlayer('settings-reset')"
				@click="vm.onClearSettings()"
			>
				Сбросить
			</Button>
		</section>
	</Transition>
</template>

<script setup lang="ts">
import Button from '~/client/shared/components/button/button.vue';
import {PlayerVm} from '~/client/shared/components/player/player.vm';
import {cnPlayer} from './player.const';

const vm = useChildVm(PlayerVm);
</script>

<style lang="scss">
.player__settings {
	position: absolute;
	top: -10px;
	left: 0;
	transform: translateY(-100%);
	background: #242833;
	padding: 40px 20px;
	border-radius: 6px;
	color: white;
	flex-direction: column;
	gap: 20px;
	max-width: 70%;
	max-height: calc(100vh - 190px);

	&-title {
		font-size: 18px;
		font-weight: 400;
		text-align: center;
	}

	&-list {
		display: flex;
		flex-direction: column;
		list-style-type: none;
		padding: 0;
		gap: 36px;
		margin: 40px 0 0 0;

		&-item {
			display: flex;
			flex-direction: row;
			width: 100%;
			border-radius: 20px;
			position: relative;
			gap: 8px;

			&[data-count='0'] {
				display: none;
			}

			&-button {
				background: #151A22FF;
				display: flex;
				flex-direction: column;
				align-items: center;
				flex: 1;
				padding: 10px 18px;
				color: white;
				font-size: 14px;
				font-weight: 300;
				border-radius: 20px;
				border: 2px solid transparent;
				transition: 200ms;
				gap: 8px;

				&--active {
					border: 2px solid var(--primary);
				}

				&[data-value='default'], &[data-value='all'], &[data-value='any'] {
					display: none;
				}

				&:hover {
					transition: 200ms;
					background: rgba(21, 26, 34, 0.7);
				}
			}

			&::before {
				position: absolute;
				left: 50%;
				top: -6px;
				content: attr(data-name);
				transform: translate(-50%, -100%);
				font-size: 14px;
				font-weight: 500;
				text-transform: uppercase;
				color: #8E929C;
			}
		}
	}

	&-reset {
		margin: 30px auto 0 auto;
	}

	&-title {
		font-size: 22px;
		line-height: 18px;
		font-weight: 400;
		margin-bottom: 60px;
	}
}

.settings-enter-active,
.settings-leave-active {
	transition: transform 0.5s ease;
}

.settings-enter-from,
.settings-leave-to {
	transform: translate(-200%, -100%);
}
</style>
