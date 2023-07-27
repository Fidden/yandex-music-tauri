<template>
	<PlayContextScreen/>
</template>

<script setup lang="ts">
import {useRoute} from 'vue-router';
import {PlayContextScreenVm} from '~/client/screens/play-context-screen/play-context-screen.vm';
import PlayContextScreen from '~/client/screens/play-context-screen/play-context-screen.vue';
import {IContext, ILandingBlock, ILandingBlockItem} from '~/client/shared/types/api';

const route = useRoute();

const vm = useVm(PlayContextScreenVm);
vm.init(JSON.parse(route.query.playContexts) as unknown as ILandingBlock<ILandingBlockItem<IContext>>);
</script>
