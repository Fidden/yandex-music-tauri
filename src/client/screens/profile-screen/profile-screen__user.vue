<template>
	<div :class="cnProfileScreen('user')">
		<div
			:class="cnProfileScreen('user-avatar', {
				active: !!UserModel.avatarUrl
			})"
		>
			<Image
				:src="UserModel.avatarUrl"
				alt="avatar"
				crop="100x100"
				width="70"
				height="70"
				placeholder="/img/placeholders/profile.svg"
			/>
		</div>
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
import Image from '~/client/shared/components/image.vue';
import {UserModel} from '~/client/shared/models/user.model';
import {cnProfileScreen} from './profile-screen.const';
</script>

<style lang="scss">
.profile-screen__user {
	display: flex;
	flex-direction: row;
	align-items: center;

	&-avatar {
		border-radius: 50%;
		background: #3e3f3a;
		width: 70px;
		height: 70px;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;

		img {
			width: 40px;
			height: 40px;
		}

		&--active {
			background: none;

			img {
				width: 70px;
				height: 70px;
				border-radius: 50%;
			}
		}
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
