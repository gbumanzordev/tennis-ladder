<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import MatchForm from '../components/matches/MatchForm.vue';
import MatchList from '../components/matches/MatchList.vue';
import { usePlayerStore } from '@src/stores/players.ts';
import { useMatchStore } from '@src/stores/matches.ts';
import { storeToRefs } from 'pinia';
import { useLadderStore } from '@src/stores/ladders.ts';
import EmptyState from '@src/components/ui/EmptyState.vue';

const ladderStore = useLadderStore();

const route = useRoute();

const playerStore = usePlayerStore();
const matchStore = useMatchStore();

const { players } = storeToRefs(playerStore);
const { matches, loading } = storeToRefs(matchStore);

watch(
    () => route.params.id,
    (newId) => {
        ladderStore.ladderId = newId.toString();
        playerStore.load();
        matchStore.load();
    },
);

onMounted([playerStore.load, matchStore.load]);
</script>

<template>
    <div class="flex flex-col gap-4">
        <MatchForm :players="players" @submit="matchStore.create" />
        <p v-if="loading" class="text-sm text-slate-500">Loading matches...</p>

        <MatchList
            v-else-if="matches.length"
            :matches="matches"
            :players="players"
            @remove="matchStore.remove"
        />

        <EmptyState
            v-else
            title="No matches yet"
            description="Create your first matches."
        />
    </div>
</template>
