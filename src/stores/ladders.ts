import { computed, ref } from 'vue';
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

    const selecledLadder = computed(() =>
        ladders.value?.find((ladder) => ladder.id === ladderId.value),
    );
    const isLoading = computed(() => loading.value);

    const ladders = ref<Ladder[]>([]);

    const load = async () => {
        loading.value = true;
        error.value = null;
        console.log(loading.value, 'from load');
        try {
            ladders.value = await laddersApi.list();
        } catch (err) {
            error.value = (err as Error).message;
        } finally {
            console.log('gets to finally');
            loading.value = false;
            console.log(loading.value);
        }
    };

    const create = async (name: string) => {
        if (!isAuthenticated || !userId.value) {
            return;
        }
        try {
            if (userId.value) await laddersApi.create(name, userId.value);
            await load();
        } catch (err) {
            error.value = (err as Error).message;
        }
    };

    const rename = async (id: string, name: string) => {
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
        try {
            await laddersApi.remove(id);
            await load();
        } catch (err) {
            error.value = (err as Error).message;
        }
    };

    return {
        ladderId,
        selecledLadder,
        isLoading,
        ladders,
        load,
        create,
        rename,
        remove,
        loading,
        error,
    };
});
