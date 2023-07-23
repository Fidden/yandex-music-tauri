<template>
	<div :class="cnTracksTable('filter')">
		<div :class="cnTracksTable('filter-input')">
			<input
				:class="cnTracksTable('filter-input-el')"
				type="text"
				placeholder="Поиск"
			>
			<i
				class="far fa-search"
				:class="cnTracksTable('filter-input-icon')"
			/>
		</div>

		<select :class="cnTracksTable('filter-select')">
			<option
				:class="cnTracksTable('filter-select-option')"
				value="-1"
			>
				По стандарту
			</option>
			<option
				:class="cnTracksTable('filter-select-option')"
				value="0"
			>
				Название
			</option>
			<option
				:class="cnTracksTable('filter-select-option')"
				value="1"
			>
				Артист
			</option>
			<option
				:class="cnTracksTable('filter-select-option')"
				value="2"
			>
				Длительность
			</option>
		</select>
	</div>
</template>

<script setup lang="ts">
import {cnTracksTable} from './tracks-table.const';
</script>

<style lang="scss">
.tracks-table__filter {
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 16px;

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
