<template>
	<HLListbox
		v-model="selectValue"
		:class="cnListbox()"
		:disabled="disabled"
		as="div"
		role="combobox"
	>
		<slot/>
	</HLListbox>
</template>

<script setup lang="ts">
import {cnListbox} from './listbox.const';

defineProps<{
	disabled?: boolean;
}>();

const emit = defineEmits<{
	(e: 'update:modelValue', data: any): void
}>();

const selectValue = ref<any>();

watch(selectValue, (value) => {
	emit('update:modelValue', value);
}, {deep: true});
</script>

<style lang="scss">
.listbox {
	position: relative;
}
</style>
