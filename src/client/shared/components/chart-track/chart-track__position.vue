<script setup lang="ts">
import MatIcon from '~/client/shared/components/mat-icon.vue';
import {ChartProgressEnum} from '~/client/shared/types/api';
import {cnChartTrack} from './chart-track.const';

defineProps<{
	number: number;
	progress: ChartProgressEnum
}>();
</script>

<template>
	<div :class="cnChartTrack('position')">
		<p :class="cnChartTrack('position-number')">
			{{ number }}
		</p>
		<div :class="cnChartTrack('position-progress', [progress])">
			<MatIcon
				name="change_history"
				fill
				size="8px"
			/>
		</div>
	</div>
</template>

<style lang="scss">
.chart-track__position {
	width: 25px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 4px;

	&-number {
		font-size: 14px;
	}

	&-progress {
		display: flex;
		flex-direction: column;

		&--same {
			height: 2px;
			width: 7px;
			background: #777;

			.mat-icon {
				display: none;
			}
		}

		&--up {
			.mat-icon {
				color: #51cf66;
			}
		}

		&--down {
			.mat-icon {
				transform: rotate(180deg);
				color: #f33;
			}
		}
	}
}
</style>
