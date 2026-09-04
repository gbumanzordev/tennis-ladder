<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router';
import BaseButton from './components/ui/BaseButton.vue';
import { useAuth } from './composables/useAuth';

const route = useRoute();
const router = useRouter();
const { user, displayName, logout } = useAuth();

const showHeader = computed(() => Boolean(user.value) && !route.meta.public);

const onSignOut = async () => {
    await logout();
    router.replace('/login');
};
</script>

<template>
    <header v-if="showHeader" class="border-b border-slate-200 bg-white">
        <div class="mx-auto flex max-w-3xl items-center justify-between p-4">
            <RouterLink to="/ladders" class="font-semibold text-slate-900">Tennis Ladder</RouterLink>
            <div class="flex items-center gap-3">
                <span class="text-sm text-slate-500">{{ displayName }}</span>
                <BaseButton variant="secondary" @click="onSignOut">Sign out</BaseButton>
            </div>
        </div>
    </header>

    <main class="mx-auto max-w-3xl p-4">
        <RouterView />
    </main>
</template>
