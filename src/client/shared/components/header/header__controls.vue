<template>
	<div :class="cnHeader('controls')">
		<button
			v-for="control in controls"
			:key="control.icon"
			:class="cnHeader('controls-button')"
			@click="control.callback"
		>
			<Icon
				:size="control.size"
				:name="control.icon"
			/>
		</button>
	</div>
</template>

<script lang="ts" setup>
import {appWindow} from '@tauri-apps/api/window';
import {cnHeader} from './header.const';

const controls = [
	{
		icon: 'ic:baseline-minimize',
		size: '1rem',
		callback: () => appWindow.minimize()
	},
	{
		icon: 'ic:baseline-crop-square',
		size: '1rem',
		callback: () => appWindow.toggleMaximize()
	},
	{
		icon: 'ic:baseline-close',
		size: '1.1rem',
		callback: () => appWindow.close()
	}
];
</script>

<style lang="scss">
.header__controls {
	height: 100%;
	display: flex;
	flex-direction: row;
	align-items: stretch;
	gap: 4px;
	user-select: none;

	&-button {
		background: none;
		max-width: 45px;
		height: 100%;
		outline: none;
		border: none;

		&:first-child {
			padding-bottom: 4px;
		}
	}
}
</style>
