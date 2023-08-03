<template>
	<div :class="cnHeader('controls')">
		<button
			v-for="control in controls"
			:key="control.icon"
			:class="cnHeader('controls-button')"
			@click="control.callback"
		>
			<MatIcon
				:size="control.size"
				:name="control.icon"
			/>
		</button>
	</div>
</template>

<script lang="ts" setup>
import {appWindow} from '@tauri-apps/api/window';
import MatIcon from '~/client/shared/components/mat-icon.vue';
import {cnHeader} from './header.const';

const controls = [
	{
		icon: 'minimize',
		size: '16px',
		callback: () => appWindow.minimize()
	},
	{
		icon: 'check_box_outline_blank',
		size: '16px',
		callback: () => appWindow.toggleMaximize()
	},
	{
		icon: 'close',
		size: '19px',
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
