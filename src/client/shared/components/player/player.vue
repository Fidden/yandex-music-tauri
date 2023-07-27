<template>
  <PlayerAudio/>
	<Transition>
		<div
			v-if="vm.track"
			:class="cnPlayer()"
		>
			<PlayerSeek/>
			<PlayerBody>
				<PlayerTrack/>
				<PlayerControls/>
				<PlayerVolume/>
			</PlayerBody>
		</div>
	</Transition>
</template>

<script setup lang="ts">
import {cnPlayer} from './player.const';
import {PlayerVm} from './player.vm';
import PlayerAudio from './player__audio.vue';
import PlayerBody from './player__body.vue';
import PlayerControls from './player__controls.vue';
import PlayerSeek from './player__seek.vue';
import PlayerTrack from './player__track.vue';
import PlayerVolume from './player__volume.vue';

const vm = useVm(PlayerVm);

navigator.mediaSession.setActionHandler('previoustrack', () => {
	vm.prev();
});

navigator.mediaSession.setActionHandler('nexttrack', () => {
	vm.next();
});
</script>

<style lang="scss">
.player {
	position: fixed;
	display: flex;
	flex-direction: column;
	padding: 8px;
	border-radius: 6px;
	left: 68px;
	bottom: 8px;
	width: calc(100% - 76px);
	background: #242833;
	z-index: 20;
	gap: 8px;
}

.v-enter-active,
.v-leave-active {
	transition: transform 0.5s ease;
}

.v-enter-from,
.v-leave-to {
	transform: translateY(120%);
}
</style>
