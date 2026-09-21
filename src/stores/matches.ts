import { ref } from 'vue';
import * as matchesApi from '../api/matches';
import type { Match, NewMatch } from '../types/domain';
import { useLadderStore } from '@src/stores/ladders';
import { defineStore, storeToRefs } from 'pinia';

export const useMatchStore = defineStore('matches', () => {
    const ladderStore = useLadderStore();
    const { ladderId } = storeToRefs(ladderStore);
    const matches = ref<Match[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const load = async () => {
        loading.value = true;
        error.value = null;
        try {
            matches.value = await matchesApi.listByLadder(ladderId.value);
        } catch (err) {
            error.value = (err as Error).message;
        } finally {
            loading.value = false;
        }
    };

    const create = async (match: Omit<NewMatch, 'ladderId'>) => {
        loading.value = true;
        error.value = null;
        try {
            await matchesApi.create({ ...match, ladderId: ladderId.value });
            await load();
        } catch (err) {
            error.value = (err as Error).message;
        } finally {
            loading.value = false;
        }
    };

    const remove = async (id: string) => {
        loading.value = true;
        error.value = null;
        try {
            await matchesApi.remove(id);
            await load();
        } catch (err) {
            error.value = (err as Error).message;
        } finally {
            loading.value = false;
        }
    };

    const update = async (id: string, match: Omit<NewMatch, 'ladderId'>) => {
        loading.value = true;
        error.value = null;
        try {
            await matchesApi.update(id, match);
            await load();
        } catch (err) {
            error.value = (err as Error).message;
        } finally {
            loading.value = false;
        }
    };

    return { matches, loading, error, load, create, remove, update };
});
