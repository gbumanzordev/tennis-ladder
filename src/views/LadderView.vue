<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router';
import * as laddersApi from '../api/ladders';
import type { Ladder } from '../types/domain';

const route = useRoute();
const ladderId = route.params.id as string;

const ladder = ref<Ladder | null>(null);

onMounted(async () => {
    try {
        ladder.value = await laddersApi.getById(ladderId);
    } catch (err) {
        console.error(err);
    }
});

const tabs = [
    { to: 'standings', label: 'Standings' },
    { to: 'players', label: 'Players' },
    { to: 'matches', label: 'Matches' },
];
</script>

<template>
    <section class="flex flex-col gap-5">
        <div>
            <RouterLink to="/ladders" class="text-sm text-slate-500 hover:underline">← All ladders</RouterLink>
            <h1 class="text-2xl font-semibold text-slate-900">{{ ladder?.name ?? 'Ladder' }}</h1>
        </div>

        <nav class="flex gap-1 border-b border-slate-200">
            <RouterLink
                v-for="tab in tabs"
                :key="tab.to"
                :to="`/ladders/${ladderId}/${tab.to}`"
                class="border-b-2 border-transparent px-3 py-2 text-sm text-slate-600 hover:text-slate-900"
                active-class="border-lime-600 text-slate-900"
            >
                {{ tab.label }}
            </RouterLink>
        </nav>

        <RouterView />
    </section>
</template>
