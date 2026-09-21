<script setup lang="ts">
import { ref } from 'vue';
import MatchForm from '../components/matches/MatchForm.vue';
import MatchList from '../components/matches/MatchList.vue';
import EmptyState from '@src/components/ui/EmptyState.vue';
import BaseDialog from '@src/components/ui/BaseDialog.vue';
import { useMatchStore } from '@src/stores/match.ts';

import { useMatches, useDeleteMatch } from '@src/services/matchService.ts';
import { usePlayers } from '@src/services/playerService.ts';
import { storeToRefs } from 'pinia';

const { data: matches, isLoading, error } = useMatches();
const { data: players } = usePlayers();
const matchStore = useMatchStore();

const { match, isEditing } = storeToRefs(matchStore);

const { deleleMatch } = useDeleteMatch();

const isDeleting = ref(false);
const matchToDelete = ref('');

const confirmDelete = (id: string) => {
  matchToDelete.value = id;
  isDeleting.value = true;
};

const deleteMatchFn = async () => {
  await deleleMatch(matchToDelete.value);
  isDeleting.value = false;
  isEditing.value = false;
  match.value = null;
};
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
    <MatchForm :players="players ?? []" />
    <p v-if="isLoading" class="text-sm text-slate-500">Loading matches...</p>

    <MatchList
      v-else-if="matches && players"
      :matches="matches"
      :players="players"
      @remove="confirmDelete"
    />
    <EmptyState
      v-else
      title="No matches yet"
      description="Create your first matches."
    />
    <BaseDialog :open="isDeleting" title="Warning">
      Are you sure you want to delete this Player?
      <template #actions>
        <button
          type="button"
          class="text-sm text-slate-500 hover:underline"
          @click="isDeleting = false"
        >
          Cancel
        </button>
        <BaseButton @click="deleteMatchFn">Ok</BaseButton>
      </template>
    </BaseDialog>
  </div>
</template>
