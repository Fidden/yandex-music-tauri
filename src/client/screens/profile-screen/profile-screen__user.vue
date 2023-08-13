<template>
	<div :class="cnProfileScreen('user')">
		<Image
			:class="cnProfileScreen('user-avatar')"
			:src="UserModel.avatarUrl"
			alt="avatar"
			crop="100x100"
			width="70"
			height="70"
		/>
		<div :class="cnProfileScreen('user-info')">
			<div :class="cnProfileScreen('user-realname')">
				{{ UserModel.fullInfo?.real_name }}
			</div>
			<div :class="cnProfileScreen('user-login')">
				#{{ UserModel.fullInfo?.login }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import {cnProfileScreen} from './profile-screen.const';
import Image from '~/client/shared/components/image.vue';
import {UserModel} from '~/client/shared/models/user.model';
</script>

<style lang="scss">
.profile-screen__user {
	display: flex;
	flex-direction: row;
	align-items: center;

	&-avatar {
		border-radius: 50%;
	}

	&-info {
		display: flex;
		flex-direction: column;
		margin-left: 10px;
	}

	&-realname {
		font-size: 20px;
		line-height: 16px;
	}

	&-login {
		font-size: 16px;
		color: #8E929C;
	}
}
</style>
