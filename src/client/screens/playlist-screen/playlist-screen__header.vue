<template>
	<header :class="cnPlaylistScreen('header')">
		<Image
			:class="cnPlaylistScreen('header-image')"
			:src="vm.playlist!.ogImage"
			:alt="vm.playlist!.title"
			width="160"
			height="160"
			crop="200x200"
			type="playlist"
		/>
		<div :class="cnPlaylistScreen('header-info')">
			<p :class="cnPlaylistScreen('header-type')">
				Плейлист
			</p>
			<p :class="cnPlaylistScreen('header-title')">
				{{ vm.playlist!.title }}
			</p>

			<div :class="cnPlaylistScreen('header-additional')">
				<p><span>Составитель:</span> {{ vm.playlist!.owner.name }}</p>
				<p>{{ tracksCountHuman(vm.playlist!.trackCount) }}</p>
				<p>{{ convertDuration(vm.playlist!.durationMs, true) }}</p>
			</div>

			<p
				v-if="vm.playlist?.description"
				:class="cnPlaylistScreen('header-description')"
			>
				{{ vm.playlist.description }}
			</p>

			<div :class="cnPlaylistScreen('header-controls')">
				<Button @click="vm.onShuffle()">
					<MatIcon
						fill
						size="1.3em"
						name="play_arrow"
					/>
					Перемешать
				</Button>
				<Button
					variant="text"
					:class="cnPlaylistScreen('header-like', {
						active: vm.playlistIsLiked
					})"
					@click="vm.onLike()"
				>
					<MatIcon
						name="favorite"
						:fill="vm.playlistIsLiked"
					/>
				</Button>
				<Menu>
					<MenuButton>
						<Icon
							size="1.5rem"
							name="ic:round-more-horiz"
						/>
					</MenuButton>
					<MenuItems>
						<MenuItem @click="vm.onShuffle()">
							Перемешать
						</MenuItem>
						<MenuItem @click="vm.onShare()">
							Поделиться
						</MenuItem>
					</MenuItems>
				</Menu>
			</div>
		</div>
	</header>
</template>

<script setup lang="ts">
import {PlaylistScreenVm} from '~/client/screens/playlist-screen/playlist-screen.vm';
import Button from '~/client/shared/components/button/button.vue';
import Image from '~/client/shared/components/image.vue';
import MatIcon from '~/client/shared/components/mat-icon.vue';
import Menu from '~/client/shared/components/menu/menu.vue';
import MenuButton from '~/client/shared/components/menu/menu__button.vue';
import MenuItem from '~/client/shared/components/menu/menu__item.vue';
import MenuItems from '~/client/shared/components/menu/menu__items.vue';
import {tracksCountHuman} from '~/client/shared/helpers/tracks-count-human';
import {cnPlaylistScreen} from './playlist-screen.const';

const vm = useVm(PlaylistScreenVm, true);
</script>

<style lang="scss">
.playlist-screen__header {
	display: flex;
	flex-direction: row;
	gap: 20px;
	height: 160px;

	&-like--active {
		color: var(--primary)
	}

	&-image {
		border-radius: 6px;
	}

	&-info {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin-top: auto;
	}

	&-type {
		color: #8E929C;
		font-size: 13px;
		font-weight: 400;
		line-height: 16px;
	}

	&-title {
		font-size: 24px;
		font-weight: 500;
		line-height: 16px;
	}

	&-description {
		font-size: 14px;
		font-weight: 300;
		line-height: 16px;
	}

	&-additional {
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 12.8px;

		p {
			color: #FFF;
			font-weight: 500;
			line-height: 16px;

			&:after {
				display: inline-block;
				width: 3px;
				height: 3px;
				border-radius: 1000px;
				background: #FFF;
				content: ' ';
				margin: 2px 10px;
			}

			&:last-child {
				&:after {
					display: none;
				}
			}
		}

		span {
			color: #8E929C;
			font-weight: 400;
		}
	}

	&-controls {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 8px;
	}
}
</style>
