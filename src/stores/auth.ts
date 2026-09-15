import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { Session, User } from '@supabase/supabase-js';
import { useLadderStore } from './ladders';
import { usePlayerStore } from './players';
import { useMatchStore } from './matches';

import {
    getSession,
    onAuthStateChange,
    signIn,
    signOut,
    signUp,
} from '@src/api/auth';

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null);
    const session = ref<Session | null>(null);
    const loading = ref(false);
    const initialized = ref(false);
    const userId = computed(() => user.value?.id ?? null);

    const isAuthenticated = computed(() => !!user.value);
    const init = async () => {
        if (initialized.value) {
            return;
        }

        loading.value = true;

        try {
            const currentSession = await getSession();

            session.value = currentSession;
            user.value = currentSession?.user ?? null;

            onAuthStateChange((newSession) => {
                session.value = newSession;
                user.value = newSession?.user ?? null;
            });

            initialized.value = true;
        } finally {
            loading.value = false;
        }
    };

    const signInUser = async (email: string, password: string) => {
        loading.value = true;

        try {
            const authenticateUser = await signIn(email, password);

            user.value = authenticateUser;
            return authenticateUser;
        } finally {
            loading.value = false;
        }
    };

    const signUpUser = async (
        email: string,
        password: string,
        displayName: string,
    ) => {
        loading.value = true;

        try {
            const newUser = await signUp(email, password, displayName);
            user.value = newUser;

            return newUser;
        } finally {
            loading.value = false;
        }
    };

    const signOutUser = async () => {
        loading.value = true;

        try {
            await signOut();

            user.value = null;
            session.value = null;
            const ladderStore = useLadderStore();
            const playerStore = usePlayerStore();
            const matches = useMatchStore();

            ladderStore.$reset();
            playerStore.$reset();
            matches.$reset();
        } finally {
            loading.value = false;
        }
    };

    const displayName = computed(() => {
        const meta = user.value?.user_metadata as
            { display_name?: string } | undefined;
        return meta?.display_name ?? user.value?.email ?? '';
    });

    return {
        user,
        userId,
        displayName,
        session,
        loading,
        initialized,
        isAuthenticated,
        init,
        signInUser,
        signUpUser,
        signOutUser,
    };
});
