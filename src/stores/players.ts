import { ref } from 'vue';
import * as playersApi from '../api/players';
import type { Player } from '../types/domain';
import { useLadderStore } from '@src/stores/ladders';
import { defineStore, storeToRefs } from 'pinia';

export const usePlayerStore = defineStore('players', () => {
  const ladderStore = useLadderStore();
  const { ladderId } = storeToRefs(ladderStore);
  const players = ref<Player[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const load = async () => {
    loading.value = true;
    error.value = null;
    try {
      players.value = await playersApi.listByLadder(ladderId.value);
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      loading.value = false;
    }
  };

  const create = async (name: string) => {
    loading.value = true;
    try {
      await playersApi.create(ladderId.value, name);
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
      await playersApi.rename(id, name);
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
      await playersApi.removeAt(id);
      await load();
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      loading.value = false;
    }
  };

  return {
    players,
    loading,
    error,
    load,
    create,
    rename,
    remove,
  };
});
