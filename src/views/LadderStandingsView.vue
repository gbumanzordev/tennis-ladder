<script setup lang="ts">
import { computed, onUnmounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import StandingsTable from '../components/standings/StandingsTable.vue';
import { useStandingStore } from '@src/stores/standing.ts';
import { usePlayers } from '@src/services/playerService.ts';
import { useMatches } from '@src/services/matchService.ts';
import { storeToRefs } from 'pinia';
import { useQueryCache } from '@pinia/colada';
import EmptyState from '@src/components/ui/EmptyState.vue';

const route = useRoute();

const {
  error: playersError,
  isLoading: playersLoading,
  updatePlayers,
} = usePlayers();

const { error: matchesError, isLoading: matchesLoading } = useMatches();

const queryCache = useQueryCache();

const loading = computed(() => playersLoading.value || matchesLoading.value);

const standingStore = useStandingStore();
const { standings } = storeToRefs(standingStore);

watch(
  () => route.params.id,
  () => {
    updatePlayers();
  },
);

onUnmounted(() => {
  queryCache.invalidateQueries({ key: ['players', 'matches'] });
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
  <p v-if="loading" class="text-sm text-slate-500">Loading standing...</p>
  <div v-else>
    <StandingsTable v-if="standings?.values" :rows="standings" />
    <EmptyState
      v-else
      title="No data yet"
      description="Add the first player and match"
    />
  </div>
</template>
