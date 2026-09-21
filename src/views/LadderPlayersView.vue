<script setup lang="ts">
import { ref } from 'vue';
import PlayerForm from '../components/players/PlayerForm.vue';
import PlayerList from '../components/players/PlayerList.vue';
import EmptyState from '@src/components/ui/EmptyState.vue';
import BaseDialog from '@src/components/ui/BaseDialog.vue';
import BaseButton from '@src/components/ui/BaseButton.vue';

import {
  usePlayers,
  useDeleteAtPlayer,
  useRenamePlayer,
} from '@src/services/playerService.ts';

const { data: players, isLoading, error } = usePlayers();

const { deleteAtPlayer } = useDeleteAtPlayer();
const { renamePlayer } = useRenamePlayer();

const isDeleting = ref(false);
const playerToDelete = ref('');

const confirmDelete = (id: string) => {
  playerToDelete.value = id;
  isDeleting.value = true;
};

const deleteAtPlayerFn = async () => {
  await deleteAtPlayer(playerToDelete.value);
  isDeleting.value = false;
};

const renamePlayerFn = async (id: string, name: string) => {
  await renamePlayer({ id, name });
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
    <PlayerForm />
    <p v-if="isLoading" class="text-sm text-slate-500">Loading players...</p>

    <PlayerList
      v-else-if="players"
      :players="players"
      @rename="renamePlayerFn"
      @remove="confirmDelete"
    />
    <EmptyState
      v-else
      title="No players yet"
      description="Add the first player"
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
        <BaseButton @click="deleteAtPlayerFn">Ok</BaseButton>
      </template>
    </BaseDialog>
  </div>
</template>
