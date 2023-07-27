<template>
	<div :class="cnPlayer('seek')">
    <PlayerTime
        v-memo="[Math.floor(vm.time)]"
        :time="vm.time"
    />
    <PlayerRange
        v-memo="[Math.floor(vm.time)]"
        :max-value="vm.duration"
        :value="vm.time"
        :step="0.01"
        @change="value => vm.timeShallow = value"
    />
    <PlayerTime
        v-memo="[vm.duration]"
        :time="vm.duration"
    />
	</div>
</template>

<script setup lang="ts">
import {PlayerVm} from '~/client/shared/components/player/player.vm';
import PlayerRange from '~/client/shared/components/player/player__range.vue';
import PlayerTime from '~/client/shared/components/player/player__time.vue';
import {cnPlayer} from './player.const';

const vm = useVm(PlayerVm, true);
</script>

<style lang="scss">
.player__seek {
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-top: 8px;
	gap: 5px;
}
</style>
