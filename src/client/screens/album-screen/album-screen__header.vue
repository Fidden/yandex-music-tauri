<template>
	<header :class="cnAlbumScreen('header')">
		<Image
			:class="cnAlbumScreen('header-image')"
			:src="vm.album?.ogImage"
			:alt="vm.album?.title"
			width="160"
			height="160"
			crop="200x200"
			type="album"
		/>
		<div :class="cnAlbumScreen('header-info')">
			<p :class="cnAlbumScreen('header-type')">
				{{ albumTypeHelper.toHuman(vm.album?.type) }}
			</p>
			<p :class="cnAlbumScreen('header-title')">
				{{ vm.album?.title }}
			</p>

			<div
				v-if="albumType === 'album' || albumType === 'single'"
				:class="cnAlbumScreen('header-additional')"
			>
				<p v-if="vm.album?.artists?.length">
					<span>Исполнитель:</span>&nbsp;
					<ArtistsLinks :artists="vm.album.artists"/>
				</p>
				<p v-if="vm.album?.year">
					{{ vm.album.year }}
				</p>
				<p v-if="vm.album?.type">
					{{ vm.album.type }}
				</p>
				<p v-if="vm.isSingle">
					{{ tracksCountHuman(vm.album!.trackCount) }}
				</p>
			</div>

			<p
				v-if="vm.album?.description"
				:class="cnAlbumScreen('header-description')"
			>
				{{ vm.album.description }}
			</p>

			<div :class="cnAlbumScreen('header-controls')">
				<Button @click="vm.shuffle()">
					<Icon
						size="1.6em"
						name="ic:round-play-arrow"
					/>
					{{ vm.hasOneTrack ? 'Слушать' : 'Перемешать' }}
				</Button>
				<Button variant="text">
					<Icon
						size="1.5rem"
						name="ic:round-favorite-border"
					/>
				</Button>

				<Button variant="text">
					<Icon
						size="1.5rem"
						name="ic:round-more-horiz"
					/>
				</Button>
			</div>
		</div>
	</header>
</template>

<script setup lang="ts">
import ArtistsLinks from '~/client/shared/components/artists-links/artists-links.vue';
import Button from '~/client/shared/components/button/button.vue';
import Image from '~/client/shared/components/image.vue';
import {albumType as albumTypeHelper} from '~/client/shared/helpers/album-type';
import {tracksCountHuman} from '~/client/shared/helpers/tracks-count-human';
import {cnAlbumScreen} from './album-screen.const';
import {AlbumScreenVm} from './album-screen.vm';

const vm = useChildVm(AlbumScreenVm);
const albumType = albumTypeHelper.get(vm.album?.type);
</script>

<style lang="scss">
.album-screen__header {
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
			display: inline-block;
			vertical-align: bottom;

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
				margin: 0;

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

	.artists-links {
		max-width: 337px;
	}
}
</style>

