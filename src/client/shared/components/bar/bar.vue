<template>
	<aside :class="cnBar()">
		<NuxtLink
			v-for="(item, index) in routes"
			:key="index"
			:class="cnBar('link', {
				active: $route.name === item.to.name
			})"
			:to="item.to"
		>
			<i :class="item.icon"/>
		</NuxtLink>
		<div
			:style="{top: lineTopPosition}"
			:class="cnBar('line')"
		/>
	</aside>
</template>

<script lang="ts" setup>
import {cnBar} from './bar.const';
import {useRoute} from 'vue-router';

const route = useRoute();

const routes = [
	{
		to: {name: 'index'},
		icon: 'fas fa-home-alt'
	},
	{
		to: {name: 'stations'},
		icon: 'fal fa-broadcast-tower'
	},
	{
		to: {name: 'tracks'},
		icon: 'fal fa-music'
	},
	{
		to: {name: 'artists'},
		icon: 'fal fa-user-music'
	},
	{
		to: {name: 'albums'},
		icon: 'fal fa-album'
	},
	{
		to: {name: 'playlists'},
		icon: 'fal fa-list-music'
	}
];

const lineTopPosition = computed(() => {
	const routeId: number = routes.findIndex(item => item.to.name === String(route.name));
	if (routeId < 0) {
		return '25px';
	}

	return `${routeId * 50 + 25}px`;
});
</script>

<style lang="scss">
.bar {
	width: 60px;
	padding: 0 5px;
	display: flex;
	flex-direction: column;
	position: fixed;
	left: 0;
	top: 75px;
	background: #161b23;
	height: 100%;

	&__line {
		position: absolute;
		left: 0;
		top: 25px;
		height: 17px;
		width: 4px;
		border-radius: 9px;
		background: var(--primary);
		transform: translateY(-50%);
		transition: 0.2s;
	}

	&__link {
		width: 50px;
		height: 50px;
		background: none;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: #AFB8C1;
		transition: 0.2s;

		i {
			color: inherit;
		}

		&--active {
			background: var(--primary-transperent);
			border-radius: 4px;
			color: var(--primary);
		}

		&:hover {
			transition: 0.2s;
			color: var(--primary);
		}
	}
}
</style>
