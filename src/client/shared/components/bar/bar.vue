<template>
	<aside :class="cnBar()">
		<button
			v-for="(item, index) in vm.routes"
			:key="index"
			:class="cnBar('link', {
				active: $route.name === item.to.name,
				[item.classModifier]: item.classModifier?.length
			})"
			@click="() => {
				layoutVm.scrollCache.delete(item.to.name);
				router.push(item.to)
			}"
		>
			<MatIcon
				v-if="item.icon"
				:name="item.icon"
			/>
			<Image
				v-if="item.image"
				:src="item.image.src"
				:alt="item.image.alt"
				:crop="item.image.crop"
			/>
		</button>
		<div
			:style="{top: vm.linePosition}"
			:class="cnBar('line')"
		/>
	</aside>
</template>

<script lang="ts" setup>
import {useRoute} from 'vue-router';
import {BarVm} from '~/client/shared/components/bar/bar.vm';
import Image from '~/client/shared/components/image.vue';
import MatIcon from '~/client/shared/components/mat-icon.vue';
import {LayoutPageVm} from '~/client/shared/layouts/layout-page/layout-page.vm';
import {cnBar} from './bar.const';

const route = useRoute();
const router = useRouter();

const vm = useVm(BarVm);
const layoutVm = useVm(LayoutPageVm, true);

watch(() => route.name, () => vm.updateCurrenRoute(route), {immediate: true});
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
	height: calc(100% - 80px);
	z-index: 100;

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

			.mat-icon {
				font-variation-settings: 'FILL' 1,
				'wght' 300,
				'GRAD' 200,
				'opsz' 48 !important;
				color: var(--primary);
			}
		}

		&--profile {
			overflow: hidden;
			position: relative;
			margin-top: auto;

			> img {
				border-radius: 9999px;
				width: 30px;
				height: 30px;
			}

			&::after {
				background-image: url('/logos/plus.svg');
				position: absolute;
				z-index: 0;
				top: 50%;
				left: 50%;
				box-sizing: border-box;
				width: 30px;
				height: 30px;
				content: "";
				background-repeat: no-repeat;
				background-position: 50%;
				background-size: contain;
				transform: translate(-50%,-50%) scale(1.208);
			}
		}

		&:hover {
			transition: 0.2s;

			.mat-icon {
				font-variation-settings: 'FILL' 0,
				'wght' 200,
				'GRAD' 200,
				'opsz' 48;
			}
		}
	}

	.mat-icon {
		font-variation-settings: 'FILL' 0,
		'wght' 100,
		'GRAD' 200,
		'opsz' 36;
		transition: 200ms;
	}
}
</style>
