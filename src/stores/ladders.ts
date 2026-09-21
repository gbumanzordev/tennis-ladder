import { ref } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import type { Ladder } from '@src/types/domain';
import * as laddersApi from '../api/ladders';

import { useAuthStore } from './auth';

export const useLadderStore = defineStore('ladders', () => {
  const authStore = useAuthStore();
  const { userId, isAuthenticated } = storeToRefs(authStore);

  const ladderId = ref('');
  const loading = ref(false);
  const error = ref<string | null>(null);

  const ladderName = ref<string>('');
  const ladders = ref<Ladder[]>([]);

  const load = async () => {
    loading.value = true;
    error.value = null;
    try {
      ladders.value = await laddersApi.list();
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      loading.value = false;
    }
  };

  const create = async (name: string) => {
    loading.value = true;

    if (!isAuthenticated.value) {
      return;
    }
    try {
      if (userId.value) await laddersApi.create(name, userId.value);
      await load();
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      loading.value = false;
    }
  };

  const rename = async (id: string, name: string) => {
    loading.value = true;

    try {
      await laddersApi.rename(id, name);
      await load();
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      loading.value = false;
    }
  };

  const remove = async (id: string) => {
    loading.value = true;

    try {
      await laddersApi.remove(id);
      await load();
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      loading.value = false;
    }
  };

  return {
    ladderName,
    ladderId,
    ladders,
    load,
    create,
    rename,
    remove,
    loading,
    error,
  };
});
