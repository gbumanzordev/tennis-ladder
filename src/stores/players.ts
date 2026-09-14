import { ref } from 'vue';
import * as playersApi from '../api/players';
import type { Player } from '../types/domain';
import { useLadderStore } from '@src/stores/ladders';
import { defineStore, storeToRefs } from 'pinia';

export const usePlayerStore = defineStore('player', () => {
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
        console.log('create');
        try {
            await playersApi.create(ladderId.value, name);
            await load();
        } catch (err) {
            error.value = (err as Error).message;
        }
    };

    const rename = async (id: string, name: string) => {
        try {
            await playersApi.rename(id, name);
            await load();
        } catch (err) {
            error.value = (err as Error).message;
        }
    };

    const remove = async (id: string) => {
        try {
            await playersApi.remove(id);
            await load();
        } catch (err) {
            error.value = (err as Error).message;
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
