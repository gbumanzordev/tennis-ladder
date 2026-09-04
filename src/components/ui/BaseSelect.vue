<script setup lang="ts">
const model = defineModel<string>({ required: true });

defineProps<{
    label?: string;
    options: { value: string; label: string }[];
    placeholder?: string;
    required?: boolean;
}>();
</script>

<template>
    <label class="flex w-full flex-col gap-1">
        <span v-if="label" class="text-xs font-medium uppercase tracking-wide text-slate-500">{{ label }}</span>
        <select
            v-model="model"
            :required="required"
            class="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-lime-600 focus:outline-none"
        >
            <option value="" disabled>{{ placeholder ?? 'Select…' }}</option>
            <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
        </select>
    </label>
</template>
