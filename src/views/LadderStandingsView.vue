<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import StandingsTable from '../components/standings/StandingsTable.vue';
import { useMatchStore } from '@src/stores/matches.ts';
import { usePlayerStore } from '@src/stores/players.ts';
import { useLadderStore } from '@src/stores/ladders.ts';
import { useStandingStore } from '@src/stores/standing.ts';

import { storeToRefs } from 'pinia';

const route = useRoute();

const standingStore = useStandingStore();
const ladderStore = useLadderStore();
const matchStore = useMatchStore();
const playerStore = usePlayerStore();

watch(
    () => route.params.id,
    (newId) => {
        ladderStore.ladderId = newId.toString();
        playerStore.load();
        matchStore.load();
    },
);

const {
    players,
    error: playersError,
    loading: playersLoading,
} = storeToRefs(playerStore);
const { error: matchesError, loading: matchesLoading } =
    storeToRefs(matchStore);
const { standings } = storeToRefs(standingStore);

const loading = () => playersLoading.value || matchesLoading.value;

onMounted(() => {
    if (route.params.id) {
        ladderStore.ladderId = route.params.id.toString();
        playerStore.load();
        matchStore.load();
    }
});
</script>

<template>
    <p
        v-if="playersError || matchesError"
        role="alert"
        class="rounded-md bg-red-50 p-3 text-sm text-red-700"
    >
        {{ playersError ?? matchesError }}
    </p>
    <p v-if="loading()" class="text-sm text-slate-500">Loading standing...</p>
    <EmptyState
        v-else-if="players.length === 0"
        title="No players yet"
        description="Add the first player"
    />
    <StandingsTable v-else :rows="standings" />
</template>
