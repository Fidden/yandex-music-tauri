<template>
	<div :class="cnPlayer('controls')">
		<Button variant="text">
			<Icon
				size="1.4rem"
				name="ic:round-favorite-border"
			/>
		</Button>
		<div :class="cnPlayer('controls-container')">
			<Button
				:disabled="!vm.canPrev"
				variant="text"
				@click="vm.prev()"
			>
				<Icon
					size="1.8rem"
					name="ic:round-skip-previous"
				/>
			</Button>

			<Button
				:class="cnPlayer('controls-pause')"
				variant="text"
				@click="vm.toggle()"
			>
				<LoadingCircle v-if="vm.pending.get('track')"/>
				<Icon
					v-else
					:size="vm.playing ? '1.8rem' : '2rem'"
					:name="vm.playing ? 'ic:round-pause' : 'ic:round-play-arrow'"
				/>
			</Button>

			<Button
				:disabled="!vm.canNext"
				variant="text"
				@click="vm.next()"
			>
				<Icon
					size="1.8rem"
					name="ic:round-skip-next"
				/>
			</Button>

			<Button variant="text">
				<Icon
					size="1.2rem"
					name="ic:round-repeat"
				/>
			</Button>
		</div>
	</div>
</template>

<script setup lang="ts">
import Button from '~/client/shared/components/button/button.vue';
import LoadingCircle from '~/client/shared/components/loading-circle.vue';
import {PlayerVm} from '~/client/shared/components/player/player.vm';
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
}
</style>
