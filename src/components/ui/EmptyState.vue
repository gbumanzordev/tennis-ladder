<script setup lang="ts">
defineProps<{ title: string; description?: string }>();
</script>

<template>
    <div class="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
        <h3 class="text-base font-semibold text-slate-900">{{ title }}</h3>
        <p v-if="description" class="mt-1 text-sm text-slate-500">{{ description }}</p>
        <div class="mt-4">
            <slot />
        </div>
    </div>
</template>
