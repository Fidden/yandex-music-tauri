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
import {HeaderVm} from '~/client/shared/components/header/header.vm';
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
	router.push({
		name: 'search',
		query: {text: value}
	});
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

			&-button {
				border-radius: 50px;
				width: 15px;
				height: 15px;
				flex-shrink: 0;
				display: flex;
				justify-content: center;
				align-items: center;

				.mat-icon {
					display: none;
				}

				&:nth-child(3) {
					background: #FF5D5B;
					border: 1px solid #CF544D;
				}

				&:nth-child(2) {
					background: #FFBB39;
					border: 1px solid #CFA64E;
				}

				&:nth-child(1) {
					background: #00CD4E;
					border: 1px solid #0EA642;
				}
			}
		}
	}
}
</style>
