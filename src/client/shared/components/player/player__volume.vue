<template>
	<div :class="cnPlayer('volume')">
		<Button
			variant="text"
			:class="cnPlayer('volume-hq', {
				active: vm.highQuality
			})"
			@click="vm.toggleHighQuality()"
		>
			<MatIcon
				size="26px"
				name="high_quality"
				:fill="vm.highQuality"
			/>
		</Button>
		<Icon
			size="1.5rem"
			name="ic:round-volume-down"
		/>
		<PlayerRange
			:max-value="100"
			:value="vm.volume"
			@change="value => vm.volume = value"
		/>
	</div>
</template>

<script setup lang="ts">
import Button from '~/client/shared/components/button/button.vue';
import MatIcon from '~/client/shared/components/mat-icon.vue';
import {PlayerVm} from '~/client/shared/components/player/player.vm';
import {cnPlayer} from './player.const';
import PlayerRange from './player__range.vue';

const vm = useVm(PlayerVm, true);
</script>

<style lang="scss">
.player__volume {
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 4px;
	margin-left: auto;

	&-hq {
		transition: 200ms;

		&--active {
			transition: 200ms;
			color: var(--primary);
		}
	}
}
</style>
