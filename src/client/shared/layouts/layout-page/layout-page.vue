<template>
	<div :class="cnLayoutPage()">
		<Header/>
		<Bar/>
		<div
			:ref="el => vm.layoutContentRef = el as HTMLDivElement"
			:class="cnLayoutPage('content')"
			@scroll="vm.onScroll($route)"
		>
			<slot/>
		</div>
	</div>
</template>

<script lang="ts" setup>
import {useRoute} from 'vue-router';
import Bar from '~/client/shared/components/bar/bar.vue';
import Header from '~/client/shared/components/header/header.vue';
import {LayoutPageVm} from '~/client/shared/layouts/layout-page/layout-page.vm';
import {cnLayoutPage} from './layout-page.const';

const route = useRoute();
const vm = useVm(LayoutPageVm);

//TODO: убрать запоминание скрола если переход был сделан по клику на базовую ссылку ( в <Bar/> или на страницах карточек )
watch(() => route.name, routeName => vm.onRouteChange(routeName as string));
</script>

<style lang="scss">
.layout-page {
	display: flex;
	flex-direction: column;

	&__scroll-hover {
		position: absolute;
		right: 0;
		top: 0;
		width: 30px;
		height: 100%;
		z-index: 0;
	}

	&__content {
		border-radius: 8px 0;
		position: fixed;
		overflow-y: scroll;
		inset: 0;
		left: 60px;
		top: 75px;
		background: #1b202c;
		overscroll-behavior: contain;
		flex: 1;
		padding: 45px 54px 104px 54px;
		display: flex;
		flex-direction: column;
		overflow-x: hidden;

		&::-webkit-scrollbar-thumb {
			height: 30px;
		}
	}
}
</style>
