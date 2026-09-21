import type { Match } from '@src/types/domain';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMatchStore = defineStore('match', () => {
  const match = ref<Match | null>(null);
  const isEditing = ref(false);
  const fill = async (matchParam: Match) => {
    match.value = null;
    isEditing.value = false;
    if (matchParam.id.length > 1) {
      match.value = matchParam;
      isEditing.value = true;
    } else {
      isEditing.value = false;
      match.value = null;
    }
  };
  return { match, fill, isEditing };
});
