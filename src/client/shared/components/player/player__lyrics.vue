<template>
	<Transition>
		<div
			v-show="vm.lyrics && vm.showLyrics"
			:class="cnPlayer('lyrics')"
		>
			<ul
				:class="cnPlayer('lyrics-list')"
				@scroll="vm.onLyricsScroll"
			>
				<li
					v-for="(item, index) in vm.lyrics"
					:key="index"
					:ref="el => vm.lyricsItemsRef.push(el)"
					:class="cnPlayer('lyrics-item')"
					:data-index="index"
					:data-active="item[0] < vm.time && vm.lyrics?.at(index + 1)?.at(0) > vm.time"
					@click="vm.audioRef!.currentTime = item[0]"
				>
					{{ item[1] }}
				</li>
			</ul>
		</div>
	</Transition>
</template>

<script setup lang="ts">
import {useRoute} from 'vue-router';
import {PlayerVm} from '~/client/shared/components/player/player.vm';
import {cnPlayer} from './player.const';

const route = useRoute();
const vm = useVm(PlayerVm, true);

watch(() => route.name, () => vm.showLyrics = false);
</script>

<style lang="scss">
.player__lyrics {
	display: flex;
	flex-direction: column;
	position: fixed;
	left: 68px;
	top: 75px;
	width: calc(100% - 75px);
	height: calc(100% - 150px);
	background: #1b202c;
	z-index: 10;
	padding: 20px 0;

	&-list {
		list-style-type: none;
		max-width: 90%;
		margin: 0 auto;
		overflow-y: auto;
		padding: 0;

		&::-webkit-scrollbar {
			width: 0;
		}
	}

	&-item {
		text-align: center;
		font-size: 28px;
		line-height: 52px;
		opacity: 0.3;
		transition: 200ms;
		cursor: pointer;

		&[data-active="true"] {
			color: white;
			opacity: 1;
			transition: 200ms;
		}

		&:hover {
			opacity: 1;
			color: var(--primary);
			transition: 200ms;
		}
	}
}

.v-enter-active,
.v-leave-active {
	transition: transform 0.5s ease;
}

.v-enter-from,
.v-leave-to {
	transform: translateY(100%);
}
</style>
