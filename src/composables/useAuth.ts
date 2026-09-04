import { computed, ref } from 'vue';
import type { User } from '@supabase/supabase-js';
import * as authApi from '../api/auth';

const user = ref<User | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

let started = false;

export const useAuth = () => {
    const start = async () => {
        if (started) {
            return;
        }
        started = true;

        authApi.onAuthStateChange((session) => {
            user.value = session?.user ?? null;
        });

        user.value = (await authApi.getSession())?.user ?? null;
    };

    const login = async (email: string, password: string) => {
        loading.value = true;
        error.value = null;
        try {
            user.value = await authApi.signIn(email, password);
        } catch (err) {
            error.value = (err as Error).message;
        } finally {
            loading.value = false;
        }
    };

    const register = async (email: string, password: string, displayName: string) => {
        loading.value = true;
        error.value = null;
        try {
            user.value = await authApi.signUp(email, password, displayName);
        } catch (err) {
            error.value = (err as Error).message;
        } finally {
            loading.value = false;
        }
    };

    const logout = async () => {
        await authApi.signOut();
        user.value = null;
    };

    const displayName = computed(() => {
        const meta = user.value?.user_metadata as { display_name?: string } | undefined;
        return meta?.display_name ?? user.value?.email ?? '';
    });

    return { user, displayName, loading, error, start, login, register, logout };
};
