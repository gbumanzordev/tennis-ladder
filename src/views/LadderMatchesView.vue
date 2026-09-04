<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import MatchForm from '../components/matches/MatchForm.vue';
import MatchList from '../components/matches/MatchList.vue';
import { useMatches } from '../composables/useMatches';
import { usePlayers } from '../composables/usePlayers';

const route = useRoute();
const ladderId = route.params.id as string;

const { players, load: loadPlayers } = usePlayers(ladderId);
const { matches, load: loadMatches, create, remove } = useMatches(ladderId);

onMounted(() => {
    loadPlayers();
    loadMatches();
});
</script>

<template>
    <div class="flex flex-col gap-4">
        <MatchForm :players="players" @submit="create" />
        <MatchList :matches="matches" :players="players" @remove="remove" />
    </div>
</template>
