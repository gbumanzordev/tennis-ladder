import { ref } from 'vue';
import * as playersApi from '../api/players';
import type { Player } from '../types/domain';

export const usePlayers = (ladderId: string) => {
    const players = ref<Player[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const load = async () => {
        loading.value = true;
        error.value = null;
        try {
            players.value = await playersApi.listByLadder(ladderId);
        } catch (err) {
            error.value = (err as Error).message;
            console.error(err);
        } finally {
            loading.value = false;
        }
    };

    const create = async (name: string) => {
        try {
            await playersApi.create(ladderId, name);
            await load();
        } catch (err) {
            console.error(err);
        }
    };

    const rename = async (id: string, name: string) => {
        try {
            await playersApi.rename(id, name);
            await load();
        } catch (err) {
            console.error(err);
        }
    };

    const remove = async (id: string) => {
        try {
            await playersApi.remove(id);
            await load();
        } catch (err) {
            console.error(err);
        }
    };

    return { players, loading, error, load, create, rename, remove };
};
