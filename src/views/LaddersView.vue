<script setup lang="ts">
import { onMounted } from 'vue';
import LadderCard from '../components/ladders/LadderCard.vue';
import LadderForm from '../components/ladders/LadderForm.vue';
import EmptyState from '../components/ui/EmptyState.vue';
import { useLadders } from '../composables/useLadders';

const { ladders, loading, load, create, rename, remove } = useLadders();

onMounted(load);
</script>

<template>
    <section class="flex flex-col gap-5">
        <h1 class="text-2xl font-semibold text-slate-900">My ladders</h1>

        <LadderForm @submit="create" />

        <p v-if="loading" class="text-sm text-slate-500">Loading ladders…</p>

        <ul v-else-if="ladders.length" class="flex flex-col gap-2">
            <LadderCard v-for="ladder in ladders" :key="ladder.id" :ladder="ladder" @rename="rename" @remove="remove" />
        </ul>

        <EmptyState v-else title="No ladders yet" description="Create your first ladder with the form above." />
    </section>
</template>
