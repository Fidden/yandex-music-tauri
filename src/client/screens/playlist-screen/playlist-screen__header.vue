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
				{{ vm.playlist.title }}
			</p>

			<div :class="cnPlaylistScreen('header-additional')">
				<p><span>Составитель:</span> {{ vm.playlist.owner.name }}</p>
				<p>{{ tracksCountHuman(vm.playlist.trackCount) }}</p>
				<p>{{ convertDuration(vm.playlist.durationMs, true) }}</p>
			</div>

			<p
				v-if="vm.playlist?.description"
				:class="cnPlaylistScreen('header-description')"
			>
				{{ vm.playlist.description }}
			</p>

			<div :class="cnPlaylistScreen('header-controls')">
				<Button @click="globalEmitter.emit('tracks-table-play-shuffle')">
					<Icon
						size="1.6em"
						name="ic:round-play-arrow"
					/>
					Перемешать
				</Button>
				<Button variant="text">
					<Icon
						size="1.5rem"
						name="ic:round-favorite-border"
					/>
				</Button>
				<HLMenu>
					<HLMenuButton>
						<Icon
							size="1.5rem"
							name="ic:round-more-horiz"
						/>
					</HLMenuButton>
					<HLMenuItems>
						<HLMenuItem>
							Перемешать
						</HLMenuItem>
						<HLMenuItem>
							Поток по плейлисту
						</HLMenuItem>
						<HLMenuItem>
							Поделиться
						</HLMenuItem>
					</HLMenuItems>
				</HLMenu>
			</div>
		</div>
	</header>
</template>

<script setup lang="ts">
import {PlaylistScreenVm} from '~/client/screens/playlist-screen/playlist-screen.vm';
import Button from '~/client/shared/components/button/button.vue';
import Image from '~/client/shared/components/image.vue';
import {globalEmitter} from '~/client/shared/emitters/global-emitter';
import {tracksCountHuman} from '~/client/shared/helpers/tracks-count-human';
import {cnPlaylistScreen} from './playlist-screen.const';

const vm = useVm(PlaylistScreenVm, true);
</script>

<style lang="scss">
.playlist-screen__header {
	display: flex;
	flex-direction: row;
	gap: 20px;

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
