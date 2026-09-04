<script setup lang="ts">
defineProps<{ open: boolean; title: string }>();
const emit = defineEmits<{ close: [] }>();
</script>

<template>
    <div v-if="open" class="fixed inset-0 z-10 flex items-center justify-center bg-slate-900/40 p-4">
        <div class="w-full max-w-md rounded-lg bg-white p-5 shadow-lg">
            <h2 class="mb-3 text-lg font-semibold text-slate-900">{{ title }}</h2>
            <slot />
            <div class="mt-4 flex justify-end gap-2">
                <slot name="actions">
                    <button type="button" class="text-sm text-slate-500 hover:underline" @click="emit('close')">
                        Close
                    </button>
                </slot>
            </div>
        </div>
    </div>
</template>
