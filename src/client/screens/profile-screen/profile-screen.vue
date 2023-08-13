<template>
	<main :class="cnProfileScreen()">
		<ContentBlock title="Профиль">
			<ProfileScreenUser/>
			<ProfileScreenPlus/>
			<ProfileScreenActions/>
		</ContentBlock>
	</main>
</template>

<script setup lang="ts">
import ContentBlock from '~/client/shared/components/content-block/content-block.vue';
import {cnProfileScreen} from './profile-screen.const';
import ProfileScreenActions from './profile-screen__actions.vue';
import ProfileScreenPlus from './profile-screen__plus.vue';
import ProfileScreenUser from './profile-screen__user.vue';
</script>

<style lang="scss">
.profile-screen {
	.content-block__body {
		display: flex;
		flex-direction: column;
		gap: 16px;
		align-items: flex-start;
	}
}
</style>
