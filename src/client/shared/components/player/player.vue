<template>
	<PlayerLyrics/>
	<Transition>
		<div
			v-if="vm.track"
			:class="cnPlayer()"
		>
			<PlayerAudio/>
			<PlayerSettings/>
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
import {globalEmitter} from '~/client/shared/emitters/global.emitter';
import {UserModel} from '~/client/shared/models/user.model';
import {cnPlayer} from './player.const';
import {PlayerVm} from './player.vm';
import PlayerAudio from './player__audio.vue';
import PlayerBody from './player__body.vue';
import PlayerControls from './player__controls.vue';
import PlayerLyrics from './player__lyrics.vue';
import PlayerSeek from './player__seek.vue';
import PlayerSettings from './player__settings.vue';
import PlayerTrack from './player__track.vue';
import PlayerVolume from './player__volume.vue';

const vm = useVm(PlayerVm);

watch(() => vm.currentStationResult?.settings2, async value => {
	if (!vm.playedQueue) {
		return;
	}

	await UserModel.rotor.station.settings2(vm.currentStation!, value!.diversity, value!.language, value!.moodEnergy);
	await vm.stationLoadNextChunk(false, true);
}, {deep: true});

globalEmitter.on('player:set-queue', (tracks) => {
	vm.setQueue(tracks);
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
	width: calc(100% - 84px);
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
