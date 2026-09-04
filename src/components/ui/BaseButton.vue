<script setup lang="ts">
import { computed } from 'vue';

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost';

const props = withDefaults(defineProps<{ variant?: Variant; type?: 'button' | 'submit'; disabled?: boolean }>(), {
    variant: 'primary',
    type: 'button',
    disabled: false,
});

const base =
    'inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600';

const variants: Record<Variant, string> = {
    primary: 'bg-lime-600 text-white hover:bg-lime-700',
    secondary: 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100',
    danger: 'border border-red-300 bg-white text-red-700 hover:bg-red-50',
    ghost: 'text-slate-600 hover:bg-slate-100',
};

const classes = computed(() => [base, variants[props.variant]]);
</script>

<template>
    <button :type="type" :disabled="disabled" :class="classes">
        <slot />
    </button>
</template>
