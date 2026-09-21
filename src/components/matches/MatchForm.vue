<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import BaseButton from '../ui/BaseButton.vue';
import BaseInput from '../ui/BaseInput.vue';
import BaseSelect from '../ui/BaseSelect.vue';
import { todayForInput, toDateOnly } from '../../utils/date';
import type { NewMatch, Player } from '../../types/domain';
import { useCreateMatch, useUpdateMatch } from '@src/services/matchService.ts';
import { useMatchStore } from '@src/stores/match.ts';
import { storeToRefs } from 'pinia';

const props = defineProps<{
  players: Player[];
}>();

const matchStore = useMatchStore();

const { createMatch, isLoading, error } = useCreateMatch();
const { updateMatch } = useUpdateMatch();

const validationError = ref<string | null>(null);
const playerAId = ref('');
const playerBId = ref('');
const winnerId = ref('');
const score = ref('');
const playedOn = ref(todayForInput());

const { match, isEditing } = storeToRefs(matchStore);

const playerOptions = computed(() =>
  props.players.map((player) => ({ value: player.id, label: player.name })),
);

const resetForm = () => {
  playerAId.value = '';
  playerBId.value = '';
  winnerId.value = '';
  score.value = '';
  playedOn.value = todayForInput();
  validationError.value = null;
  isEditing.value = false;
  match.value = null;
};

const loadMatch = () => {
  if (match.value === null) {
    resetForm();
    return;
  }

  playerAId.value = match.value.player_a_id;
  playerBId.value = match.value.player_b_id;
  winnerId.value = match.value.winner_id;
  score.value = match.value.score ?? '';
  playedOn.value = match.value.played_on;
};

const onSubmit = async () => {
  validationError.value = null;
  if (playerAId.value === playerBId.value) {
    validationError.value = 'Player A and Player B have to be different';
    return;
  }
  if (
    winnerId.value !== playerAId.value &&
    winnerId.value !== playerBId.value
  ) {
    validationError.value = 'The winner player should be the player A or B';
    return;
  }
  const newMatch = ref<Omit<NewMatch, 'ladderId'>>({
    playerAId: playerAId.value,
    playerBId: playerBId.value,
    winnerId: winnerId.value,
    score: score.value.trim() || null,
    playedOn: toDateOnly(playedOn.value),
  });
  if (isEditing && match.value) {
    const matchId = match.value.id.toString();
    await updateMatch({ id: matchId, match: newMatch.value });
  } else {
    await createMatch(newMatch.value);
  }
  if (error.value) {
    return;
  }
  resetForm();
};

onMounted(loadMatch);

watch(
  match,
  () => {
    loadMatch();
  },
  { immediate: true },
);
</script>

<template>
  <div
    v-if="error"
    role="alert"
    class="rounded-md inline-flex bg-red-50 p-3 text-sm text-red-700"
  >
    {{ error.name }} : {{ error.message }}
  </div>
  <form
    class="grid grid-cols-1 gap-3 rounded-lg border border-slate-200 bg-white p-4 sm:grid-cols-5"
    @submit.prevent="onSubmit"
  >
    <p
      v-if="validationError"
      role="alert"
      class="rounded-md bg-red-50 p-3 text-sm text-red-700"
    >
      {{ validationError }}
    </p>
    <BaseSelect
      v-model="playerAId"
      label="Player A"
      :options="playerOptions"
      required
    />
    <BaseSelect
      v-model="playerBId"
      label="Player B"
      :options="playerOptions"
      required
    />
    <BaseSelect
      v-model="winnerId"
      label="Winner"
      :options="playerOptions"
      required
    />
    <BaseInput v-model="score" label="Score" placeholder="6-4 3-6 10-8" />
    <BaseInput v-model="playedOn" label="Played on" type="date" required />
    <div class="sm:col-span-5">
      <BaseButton type="submit" :disabled="isLoading">{{
        isEditing ? 'Save changes' : 'Add match'
      }}</BaseButton>
      <BaseButton
        v-if="isEditing"
        type="button"
        variant="ghost"
        @click="resetForm"
        >Cancel</BaseButton
      >
    </div>
  </form>
</template>
