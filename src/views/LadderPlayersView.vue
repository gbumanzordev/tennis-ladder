<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import PlayerForm from '../components/players/PlayerForm.vue';
import PlayerList from '../components/players/PlayerList.vue';
import { useLadderStore } from '@src/stores/ladders.ts';
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '@src/stores/players.ts';
import EmptyState from '@src/components/ui/EmptyState.vue';

const ladderStore = useLadderStore();
const playerStore = usePlayerStore();
const route = useRoute();

watch(
    () => route.params.id,
    (newId) => {
        ladderStore.ladderId = newId.toString();
        playerStore.load();
    },
);

const { players, error, loading } = storeToRefs(playerStore);

onMounted(() => {
    if (route.params.id) {
        ladderStore.ladderId = route.params.id.toString();
        playerStore.load();
    }
});
</script>

<template>
    <div class="flex flex-col gap-4">
        <p
            v-if="error"
            role="alert"
            class="rounded-md bg-red-50 p-3 text-sm text-red-700"
        >
            {{ error }}
        </p>
        <PlayerForm @submit="playerStore.create" />
        <p v-if="loading" class="text-sm text-slate-500">Loading players...</p>
        <EmptyState
            v-else-if="players.length === 0"
            title="No players yet"
            description="Add the first player"
        />
        <PlayerList
            v-else
            :players="players"
            @rename="playerStore.rename"
            @remove="playerStore.remove"
        />
    </div>
</template>
