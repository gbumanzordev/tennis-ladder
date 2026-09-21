<script setup lang="ts">
import { ref } from 'vue';
import BaseButton from '../ui/BaseButton.vue';
import BaseInput from '../ui/BaseInput.vue';
import type { Player } from '../../types/domain';

defineProps<{ players: Player[] }>();
const emit = defineEmits<{
  rename: [id: string, name: string];
  remove: [id: string];
}>();

const editingId = ref<string | null>(null);
const draft = ref('');

const startEditing = (player: Player) => {
  editingId.value = player.id;
  draft.value = player.name;
};

const save = (id: string) => {
  editingId.value = null;
  emit('rename', id, draft.value.trim());
};
</script>

<template>
  <ul class="flex flex-col gap-2">
    <li
      v-for="player in players"
      :key="player.id"
      class="flex items-center justify-between gap-3 rounded-md border border-slate-200 bg-white p-3"
    >
      <form
        v-if="editingId === player.id"
        class="flex flex-1 items-end gap-2"
        @submit.prevent="save(player.id)"
      >
        <BaseInput v-model="draft" required :maxlength="60" />
        <BaseButton type="submit">Save</BaseButton>
        <BaseButton variant="ghost" @click="editingId = null"
          >Cancel</BaseButton
        >
      </form>

      <template v-else>
        <span class="text-sm text-slate-900">{{ player.name }}</span>
        <div class="flex gap-2">
          <BaseButton variant="secondary" @click="startEditing(player)"
            >Rename</BaseButton
          >
          <BaseButton variant="danger" @click="emit('remove', player.id)"
            >Delete</BaseButton
          >
        </div>
      </template>
    </li>
  </ul>
</template>
