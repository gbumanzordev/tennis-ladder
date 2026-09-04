<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import StandingsTable from '../components/standings/StandingsTable.vue';
import { useMatches } from '../composables/useMatches';
import { usePlayers } from '../composables/usePlayers';
import { useStandings } from '../composables/useStandings';

const route = useRoute();
const ladderId = route.params.id as string;

const { players, load: loadPlayers } = usePlayers(ladderId);
const { matches, load: loadMatches } = useMatches(ladderId);

const standings = useStandings(players, matches);

onMounted(() => {
    loadPlayers();
    loadMatches();
});
</script>

<template>
    <StandingsTable :rows="standings" />
</template>
