<template>
	<div :class="cnPlayer('controls')">
		<Button
			variant="text"
			@click="vm.toggleLike()"
		>
			<MatIcon
				name="favorite"
				size="22px"
				:fill="vm.isTrackLiked"
			/>
		</Button>
		<div :class="cnPlayer('controls-container')">
			<Button
				v-if="vm.isStation"
				variant="text"
				:class="cnPlayer('controls-settings', {
					active: vm.isSettingsOpen
				})"
				@click="vm.settingsToggle()"
			>
				<MatIcon
					size="1.5em"
					name="tune"
				/>
			</Button>

			<Button
				:disabled="!vm.canPrev"
				variant="text"
				@click="vm.prev()"
			>
				<MatIcon
					name="skip_previous"
					fill
				/>
			</Button>

			<Button
				:class="cnPlayer('controls-pause')"
				variant="text"
				@click="vm.toggle()"
			>
				<LoadingCircle v-if="vm.pending.get('track')"/>
				<MatIcon
					v-else
					:name="vm.playing ? 'pause' : 'play_arrow'"
					fill
				/>
			</Button>

			<Button
				:disabled="!vm.canNext"
				variant="text"
				@click="vm.next(true)"
			>
				<MatIcon
					name="skip_next"
					fill
				/>
			</Button>

			<Button
				variant="text"
				:class="cnPlayer('controls-repeat', {active: vm.repeat !== RepeatEnum.NONE})"
				@click="vm.onRepeat()"
			>
				<MatIcon
					:name="vm.repeat === RepeatEnum.ONCE ? 'repeat_one': 'repeat'"
					size="20px"
				/>
			</Button>
		</div>
	</div>
</template>

<script setup lang="ts">
import Button from '~/client/shared/components/button/button.vue';
import LoadingCircle from '~/client/shared/components/loading-circle.vue';
import MatIcon from '~/client/shared/components/mat-icon.vue';
import {PlayerVm, RepeatEnum} from '~/client/shared/components/player/player.vm';
import {cnPlayer} from './player.const';

const vm = useVm(PlayerVm, true);
</script>

<style lang="scss">
.player__controls {
	flex: 1;
	position: relative;

	&-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		gap: 15px;
		flex: 1;
	}

	&-pause {
		width: 32px;
		height: 32px;
		padding: 0;
		justify-content: center;

		svg {
			flex-shrink: 0;
		}
	}

	&-repeat--active, &-settings--active {
		color: var(--primary)
	}

	&-settings--active {
		pointer-events: none;
	}
}
</style>
