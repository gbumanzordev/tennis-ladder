<script setup lang="ts">
import { ref } from 'vue';
import BaseButton from '../ui/BaseButton.vue';
import BaseInput from '../ui/BaseInput.vue';
import { useCreatePlayer } from '@src/services/playerService.ts';

const name = ref('');

const { isLoading, error, createPlayer } = useCreatePlayer();

const onSubmit = async () => {
  await createPlayer(name.value);
  name.value = '';
};
</script>

<template>
  <div
    v-if="error"
    role="alert"
    class="rounded-md bg-red-50 p-3 text-sm text-red-700"
  >
    {{ error.name }} : {{ error.message }}
  </div>
  <form class="flex items-end gap-2" @submit.prevent="onSubmit">
    <BaseInput
      v-model="name"
      label="New player"
      placeholder="Ana"
      required
      :maxlength="60"
    />
    <BaseButton type="submit" :disabled="isLoading">Add player</BaseButton>
  </form>
</template>
