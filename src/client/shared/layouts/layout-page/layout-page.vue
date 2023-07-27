<template>
	<div :class="cnLayoutPage()">
		<Header/>
		<div
			ref="layoutContentRef"
			:class="cnLayoutPage('content')"
			@scroll="handleScroll"
		>
			<Bar/>
			<slot/>
		</div>
	</div>
</template>

<script lang="ts" setup>
import {useRoute} from 'vue-router';
import Bar from '~/client/shared/components/bar/bar.vue';
import Header from '~/client/shared/components/header/header.vue';
import {cnLayoutPage} from './layout-page.const';

const route = useRoute();
const layoutContentRef = ref<HTMLDivElement | null>(null);
const scrollCache = ref(new Map<string, number>());
//TODO: убрать запоминание скрола если переход был сделан по клику на базовую ссылку ( в <Bar/> или на страницах карточек )
watch(() => route.name, async (value) => {
	if (!layoutContentRef.value) {
		return;
	}

	const offset = scrollCache.value.get(String(value));
	if (!offset)
		return;

	await nextTick();

	layoutContentRef.value!.scrollTo({
		top: offset
	});
});

function handleScroll() {
	if (!layoutContentRef.value) {
		return;
	}

	scrollCache.value.set(String(route.name), layoutContentRef.value!.scrollTop);
}
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

		&::-webkit-scrollbar-thumb {
			height: 30px;
		}
	}
}
</style>
