<template>
	<header
		v-draggable
		:class="cnHeader(null, {
		   revert: platformName === 'darwin'
	    })"
	>
		<HeaderLogo/>
		<HeaderSearch/>
		<HeaderControls/>
		<HeaderNodrag/>
	</header>
</template>

<script lang="ts" setup>
import {platform} from '@tauri-apps/api/os';
import {useRoute, useRouter} from 'vue-router';
import {HeaderVm} from '~/client/shared/components/header/header.vm';
import {globalEmitter} from '~/client/shared/emitters/global.emitter';
import {cnHeader} from './header.const';
import HeaderControls from './header__controls.vue';
import HeaderLogo from './header__logo.vue';
import HeaderNodrag from './header__nodrag.vue';
import HeaderSearch from './header__search.vue';

const router = useRouter();
const route = useRoute();
const platformName = await platform();

const vm = useVm(HeaderVm, true);
vm.init(route.query?.text as string);

watch(() => vm.search, value => {
	if (!value || !value.length) {
		return;
	}

	if (route.name !== 'search') {
		router.push({name: 'search'});
	}

	globalEmitter.emit('search:text-change', value);
});
</script>

<style lang="scss">
.header {
	height: 75px;
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 20px;
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	background: #161b23;

	&--revert {
		flex-direction: row-reverse;

		.header__controls {
			flex-direction: row-reverse;
			align-items: center;
			gap: 8px;

			&-button {
				border-radius: 50px;
				width: 12px;
				height: 12px;
				flex-shrink: 0;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0;

				.mat-icon {
					display: none;
				}

				&:nth-child(3) {
					background: #FF5D5B;
				}

				&:nth-child(2) {
					background: #FFBB39;
				}

				&:nth-child(1) {
					background: #00CD4E;
				}
			}
		}
	}
}
</style>
