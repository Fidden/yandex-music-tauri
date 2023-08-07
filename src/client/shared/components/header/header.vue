<template>
	<header
		v-draggable
		:class="cnHeader()"
	>
		<HeaderLogo/>
		<HeaderSearch/>
		<HeaderControls/>
		<HeaderNodrag/>
	</header>
</template>

<script lang="ts" setup>
import {HeaderVm} from '~/client/shared/components/header/header.vm';
import {cnHeader} from './header.const';
import HeaderControls from './header__controls.vue';
import HeaderLogo from './header__logo.vue';
import HeaderNodrag from './header__nodrag.vue';
import HeaderSearch from './header__search.vue';

const router = useRouter();
const route = useRoute();

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
}
</style>
