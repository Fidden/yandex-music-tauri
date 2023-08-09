<template>
	<LoginScreen v-if="screenState === ScreenStateEnum.LOGIN"/>
	<AppScreen v-else/>
</template>

<script lang="ts" setup>
import AppScreen from '~/client/screens/app-screen/app-screen.vue';
import LoginScreen from '~/client/screens/login-screen/login-screen.vue';
import {globalEmitter} from '~/client/shared/emitters/global.emitter';
import {BaseModel} from '~/client/shared/types/abstract/base.model';
import {ScreenStateEnum} from '~/client/shared/types/app';

const screenState = ref(localStorage.token ? ScreenStateEnum.APP : ScreenStateEnum.LOGIN);

globalEmitter.on('auth:success', (token) => {
	localStorage.setItem('token', token);
	screenState.value = ScreenStateEnum.APP;
	BaseModel.updateToken(token);
});
</script>
