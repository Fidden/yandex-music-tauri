<template>
	<LayoutPage>
		<slot/>
		<Player/>
		<Toasts/>
	</LayoutPage>
</template>

<script lang="ts" setup>
import Player from '~/client/shared/components/player/player.vue';
import Toasts from '~/client/shared/components/toasts/toasts.vue';
import LayoutPage from '~/client/shared/layouts/layout-page/layout-page.vue';
</script>

<style lang="scss">
@import url("~/assets/css/reset.css");
@import 'vue-tauri-draggable/style.css';
@import 'vue-loading-skeleton/dist/style.css';

:root {
	--primary: #FCCA00;
	--primary-transperent: rgba(247, 240, 150, 0.03);
	--background: rgba(30, 34, 45, 0.3);
	--light-background: #131A2C;
}

* {
	color: white;
	font-family: 'Rubik', sans-serif;
}

body {
	display: flex;
	flex-direction: column;
	background: #161b23;
	overflow: hidden;
}

#app {
	display: flex;
	flex-direction: column;
	flex: 1;
	overflow: hidden;
}

button, input, a {
	outline: none;
	border: none;
	text-decoration: none;
}

button, a {
	cursor: pointer;
}


*::-webkit-scrollbar {
	background: none;
	width: 12px;
	border-radius: 20px;
}

*::-webkit-scrollbar-track {
	background: none;
}

*::-webkit-scrollbar-thumb {
	background-color: var(--primary);
	border-radius: 20px;
	border: 4px solid rgba(0, 0, 0, 0);
	background-clip: padding-box;
}
</style>
