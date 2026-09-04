import { ref } from 'vue';
import * as laddersApi from '../api/ladders';
import type { Ladder } from '../types/domain';
import { useAuth } from './useAuth';

const ladders = ref<Ladder[]>([]);

export const useLadders = () => {
    const { user } = useAuth();
    const loading = ref(false);
    const error = ref<string | null>(null);

    const load = async () => {
        loading.value = true;
        error.value = null;
        try {
            ladders.value = await laddersApi.list();
        } catch (err) {
            error.value = (err as Error).message;
            console.error(err);
        } finally {
            loading.value = false;
        }
    };

    const create = async (name: string) => {
        if (!user.value) {
            return;
        }
        try {
            await laddersApi.create(name, user.value.id);
        } catch (err) {
            console.error(err);
        }
    };

    const rename = async (id: string, name: string) => {
        try {
            const updated = await laddersApi.rename(id, name);
            const index = ladders.value.findIndex((ladder) => ladder.id === id);
            if (index !== -1) {
                ladders.value[index] = updated;
            }
        } catch (err) {
            console.error(err);
        }
    };

    const remove = async (id: string) => {
        try {
            await laddersApi.remove(id);
            await load();
        } catch (err) {
            console.error(err);
        }
    };

    return { ladders, loading, error, load, create, rename, remove };
};
