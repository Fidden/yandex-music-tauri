<template>
	<header :class="cnArtistScreen('header')">
		<Image
			:class="cnArtistScreen('header-image')"
			:src="vm.briefInfo?.artist.cover?.uri"
			:alt="vm.briefInfo?.artist.name"
			width="160"
			height="160"
			crop="200x200"
		/>
		<div :class="cnArtistScreen('header-info')">
			<p :class="cnArtistScreen('header-type')">
				Исполнитель
			</p>
			<p :class="cnArtistScreen('header-title')">
				{{ vm.briefInfo.artist.name }}
			</p>

			<div :class="cnArtistScreen('header-controls')">
				<Button>
					<Icon
						size="1.6em"
						name="ic:round-play-arrow"
					/>
					Слушать
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
import Button from '~/client/shared/components/button/button.vue';
import Image from '~/client/shared/components/image.vue';
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

	&-controls {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 8px;
	}
}
</style>
