<template>
	<section
		v-if="vm.currentStationResult && vm.isStation && vm.isSettingsOpen"
		v-click-outside="() => vm.settingsToggle()"
		:class="cnPlayer('settings')"
	>
		<ul
			v-if="vm.currentStationResult?.station?.restrictions2"
			:class="cnPlayer('settings-list')"
		>
			<li
				v-for="(item, key) in vm.currentStationResult.station.restrictions2"
				:key="key"
				:class="cnPlayer('settings-list-item')"
				:data-name="item?.name"
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
	</section>
</template>

<script setup lang="ts">
import {PlayerVm} from '~/client/shared/components/player/player.vm';
import {cnPlayer} from './player.const';

const vm = useVm(PlayerVm, true);
</script>

<style lang="scss">
.player__settings {
	position: absolute;
	top: -10px;
	left: 0;
	transform: translateY(-100%);
	background: #242833;
	padding: 20px;
	border-radius: 6px;
	color: white;
	flex-direction: column;
	gap: 20px;
	max-width: 70%;

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
}
</style>
