<template>
	<div :class="cnTracksTable('filter')">
		<div :class="cnTracksTable('filter-input')">
			<input
				v-debounce:400ms="val => vm.filter.name = val"
				:class="cnTracksTable('filter-input-el')"
				type="text"
				placeholder="Поиск"
			>
			<i
				class="far fa-search"
				:class="cnTracksTable('filter-input-icon')"
			/>
		</div>

		<Listbox v-model="vm.filter.orderBy.key">
			<ListboxButton>
				{{ vm.filterOrderValue }}
			</ListboxButton>
			<ListboxOptions>
				<ListboxOption
					v-for="item in vm.filterOptions"
					:key="item.key"
					:class="cnTracksTable('filter-option', [item.sort])"
					@click="vm.onFilterChange(item)"
				>
					{{ item.value }}
					<MatIcon
						v-show="item.sort"
						size="20px"
						name="sort"
					/>
				</ListboxOption>
			</ListboxOptions>
		</Listbox>
	</div>
</template>

<script setup lang="ts">
import Listbox from '~/client/shared/components/listbox/listbox.vue';
import ListboxButton from '~/client/shared/components/listbox/listbox__button.vue';
import ListboxOption from '~/client/shared/components/listbox/listbox__option.vue';
import ListboxOptions from '~/client/shared/components/listbox/listbox__options.vue';
import MatIcon from '~/client/shared/components/mat-icon.vue';
import {TracksTableVm} from '~/client/shared/components/tracks-table/tracks-table.vm';
import {cnTracksTable} from './tracks-table.const';

const vm = useChildVm(TracksTableVm);
</script>

<style lang="scss">
.tracks-table__filter {
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 16px;

	&-option {
		.mat-icon {
			opacity: 0;
			transition: 200ms;
		}

		&:hover {
			.mat-icon {
				opacity: 1;
				transition: 200ms;
			}
		}

		&--desc {
			.mat-icon {
				transform: rotate(180deg);
				transition: 200ms;
			}
		}
	}

	&-input {
		position: relative;
		width: 215px;
		height: 40px;

		&-el {
			padding: 8px 12px;
			color: white;
			background: rgba(44, 53, 77, 0.57);
			border-radius: 4px;
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;

			&::placeholder {
				color: white;
			}
		}

		&-icon {
			position: absolute;
			right: 2px;
			top: 50%;
			transform: translate(-50%, -50%);
		}
	}

	&-select {
		background: none;
		outline: none;
		border: none;
		cursor: pointer;
		padding: 8px 12px;

		&-option {
			color: black;
			background: none;
		}
	}
}
</style>
