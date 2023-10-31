<template>
	<audio
		:ref="el => vm.audioRef = el as HTMLAudioElement"
		autoplay
		preload="auto"
		@loadeddata="vm.onDataLoad()"
		@buffered="vm.onTimeUpdate()"
		@timeupdate="vm.onTimeUpdate()"
	/>
</template>

<script setup lang="ts">
import {watchOnce} from '@vueuse/core';
import {PlayerVm} from '~/client/shared/components/player/player.vm';

const vm = useChildVm(PlayerVm);

watch(() => [vm.track?.id, vm.audioRef], ([trackId]) => vm.onTrackChange(trackId), {
	immediate: true
});

watch(() => vm.volume, volume => vm.onVolumeChange(volume));

watch(() => vm.timeShallow, time => vm.onTimeShallowChange(time));

watch(() => vm.time, () => vm.onTrackEnd());

watchOnce(() => vm.audioRef, (value) => {
	if (value)
		vm.setupAudioVolume();
});
</script>

<style scoped lang="scss">
audio {
	display: none;
}
</style>
