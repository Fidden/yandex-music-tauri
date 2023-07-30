<script setup lang="ts">
import {cnMenu} from './menu.const';
</script>

<template>
	<HLMenu
		as="div"
		:class="cnMenu()"
	>
		<slot/>
	</HLMenu>
</template>

<style lang="scss">
.menu {
	display: flex;
	flex-direction: column;
	position: relative;
}
</style>
