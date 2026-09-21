<script setup lang="ts">
import { useCreateLadder } from '@src/services/ladderService.ts';
import BaseButton from '../ui/BaseButton.vue';
import BaseInput from '../ui/BaseInput.vue';
import { ref } from 'vue';

const name = ref('');

const { isLoading, error, createLadder } = useCreateLadder();

const onSubmit = async () => {
  await createLadder(name.value);
  name.value = '';
};
</script>

<template>
  <div
    v-if="error"
    role="alert"
    class="rounded-md inline-flex bg-red-50 p-3 text-sm text-red-700"
  >
    {{ error.name }} : {{ error.message }}
  </div>
  <form class="flex items-end gap-2" @submit.prevent="onSubmit">
    <BaseInput
      v-model="name"
      label="New ladder"
      placeholder="Club Ladder"
      required
      :maxlength="80"
    />
    <BaseButton type="submit" :disabled="isLoading">Add</BaseButton>
  </form>
</template>
