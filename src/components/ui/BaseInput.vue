<script setup lang="ts">
const model = defineModel<string>({ required: true });

defineProps<{
    label?: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    minlength?: number;
    maxlength?: number;
    autocomplete?: string;
}>();
</script>

<template>
    <label class="flex w-full flex-col gap-1">
        <span v-if="label" class="text-xs font-medium uppercase tracking-wide text-slate-500">{{ label }}</span>
        <input
            v-model="model"
            :type="type ?? 'text'"
            :placeholder="placeholder"
            :required="required"
            :minlength="minlength"
            :maxlength="maxlength"
            :autocomplete="autocomplete"
            class="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-lime-600 focus:outline-none"
        />
    </label>
</template>
