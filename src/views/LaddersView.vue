<script setup lang="ts">
import { ref } from 'vue';
import BaseDialog from '@src/components/ui/BaseDialog.vue';
import LadderCard from '../components/ladders/LadderCard.vue';
import LadderForm from '../components/ladders/LadderForm.vue';
import EmptyState from '../components/ui/EmptyState.vue';

import {
  useLadders,
  useDeleteLadder,
  useRenameLadder,
} from '@src/services/ladderService.ts';
import BaseButton from '@src/components/ui/BaseButton.vue';

const { data: ladders, isLoading, error } = useLadders();

const { deleteLadder } = useDeleteLadder();
const { renameLadder } = useRenameLadder();

const isDeleting = ref(false);
const ladderIdToDelete = ref('');

const confirmDelete = (id: string) => {
  ladderIdToDelete.value = id;
  isDeleting.value = true;
};

const deleteLadderFn = async () => {
  await deleteLadder(ladderIdToDelete.value);
  isDeleting.value = false;
};

const renameLadderFn = async (id: string, name: string) => {
  await renameLadder({ id, name });
};
</script>

<template>
  <section class="flex flex-col gap-5">
    <h1 class="text-2xl font-semibold text-slate-900">My ladders</h1>
    <p
      v-if="error"
      role="alert"
      class="rounded-md bg-red-50 p-3 text-sm text-red-700"
    >
      {{ error.name }} : {{ error.message }}
    </p>
    <LadderForm />
    <BaseDialog :open="isDeleting" title="Warning">
      Are you sure you want to delete this Ladder?
      <template #actions>
        <button
          type="button"
          class="text-sm text-slate-500 hover:underline"
          @click="isDeleting = false"
        >
          Cancel
        </button>
        <BaseButton @click="deleteLadderFn">Ok</BaseButton>
      </template>
    </BaseDialog>
    <p v-if="isLoading" class="text-sm text-slate-500">Loading ladders...</p>
    <ul v-else-if="ladders" class="flex flex-col gap-2">
      <LadderCard
        v-for="ladder in ladders"
        :key="ladder.id"
        :ladder="ladder"
        @rename="renameLadderFn"
        @remove="confirmDelete"
      />
    </ul>

    <EmptyState
      v-else
      title="No ladders yet"
      description="Create your first ladder with the form above."
    />
  </section>
</template>
