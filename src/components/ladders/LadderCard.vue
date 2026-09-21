<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import BaseButton from '../ui/BaseButton.vue';
import BaseInput from '../ui/BaseInput.vue';
import type { Ladder } from '../../types/domain';

const props = defineProps<{ ladder: Ladder }>();
const emit = defineEmits<{
  rename: [id: string, name: string];
  remove: [id: string];
}>();

const editing = ref(false);
const draft = ref(props.ladder.name);

const save = () => {
  editing.value = false;
  emit('rename', props.ladder.id, draft.value.trim());
};
</script>

<template>
  <li
    class="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-4"
  >
    <form
      v-if="editing"
      class="flex flex-1 items-end gap-2"
      @submit.prevent="save"
    >
      <BaseInput v-model="draft" required :maxlength="80" />
      <BaseButton type="submit">Save</BaseButton>
      <BaseButton variant="ghost" @click="editing = false">Cancel</BaseButton>
    </form>

    <template v-else>
      <RouterLink
        :to="`/ladders/${ladder.id}`"
        class="font-medium text-slate-900 hover:underline"
      >
        {{ ladder.name }}
      </RouterLink>
      <div class="flex gap-2">
        <BaseButton variant="secondary" @click="editing = true"
          >Rename</BaseButton
        >
        <BaseButton variant="danger" @click="emit('remove', ladder.id)"
          >Delete</BaseButton
        >
      </div>
    </template>
  </li>
</template>
