<template>
	<header :class="cnArtistScreen('header')">
		<Image
			:class="cnArtistScreen('header-image')"
			:src="vm.briefInfo!.artist.cover?.uri"
			:alt="vm.briefInfo!.artist.name"
			width="160"
			height="160"
			crop="300x300"
			type="artist"
		/>
		<div :class="cnArtistScreen('header-info')">
			<p :class="cnArtistScreen('header-type')">
				Исполнитель
			</p>
			<p :class="cnArtistScreen('header-title')">
				{{ vm.briefInfo!.artist?.name }}
			</p>

			<div :class="cnArtistScreen('header-additional')">
				<p v-if="vm.lastMonthListeners">
					<span>Слушателей:</span>
					{{ vm.lastMonthListeners }} в месяц
				</p>

				<p v-if="vm.likesCount">
					{{ vm.likesCount }}
					<span>лайков</span>
				</p>
			</div>

			<div :class="cnArtistScreen('header-controls')">
				<Button>
					<Icon
						size="1.6em"
						name="ic:round-play-arrow"
					/>
					Слушать
				</Button>
				<Button
					variant="text"
					:class="cnPlaylistScreen('header-like', {
						active: vm.isLiked
					})"
					@click="vm.onLike()"
				>
					<MatIcon
						name="favorite"
						:fill="vm.isLiked"
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
						<MenuItem @click="vm.onWaveStart()">
							Поток по артисту
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
import {cnPlaylistScreen} from '~/client/screens/playlist-screen/playlist-screen.const';
import Button from '~/client/shared/components/button/button.vue';
import Image from '~/client/shared/components/image.vue';
import MatIcon from '~/client/shared/components/mat-icon.vue';
import Menu from '~/client/shared/components/menu/menu.vue';
import MenuButton from '~/client/shared/components/menu/menu__button.vue';
import MenuItem from '~/client/shared/components/menu/menu__item.vue';
import MenuItems from '~/client/shared/components/menu/menu__items.vue';
import {cnArtistScreen} from './artist-screen.const';
import {ArtistScreenVm} from './artist-screen.vm';

const vm = useVm(ArtistScreenVm, true);
</script>

<style lang="scss">
.artist-screen__header {
	display: flex;
	flex-direction: row;
	gap: 20px;

	&-image {
		border-radius: 50%;
	}

	&-type {
		color: #8E929C;
		font-size: 13px;
		font-weight: 400;
		line-height: 16px;
	}

	&-info {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin-top: auto;
	}

	&-title {
		font-size: 42px;
		line-height: 42px;
		font-weight: 500;
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
