import { ref } from 'vue';
import * as matchesApi from '../api/matches';
import type { Match, NewMatch } from '../types/domain';

export const useMatches = (ladderId: string) => {
    const matches = ref<Match[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const load = async () => {
        loading.value = true;
        error.value = null;
        try {
            matches.value = await matchesApi.listByLadder(ladderId);
        } catch (err) {
            error.value = (err as Error).message;
            console.error(err);
        } finally {
            loading.value = false;
        }
    };

    const create = async (match: Omit<NewMatch, 'ladderId'>) => {
        try {
            await matchesApi.create({ ...match, ladderId });
            await load();
        } catch (err) {
            console.error(err);
        }
    };

    const remove = async (id: string) => {
        try {
            await matchesApi.remove(id);
            await load();
        } catch (err) {
            console.error(err);
        }
    };

    return { matches, loading, error, load, create, remove };
};
