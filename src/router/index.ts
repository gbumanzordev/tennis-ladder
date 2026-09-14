import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

import LadderView from '../views/LadderView.vue';
import { useAuthStore } from '@src/stores/auth.ts';

const routes: RouteRecordRaw[] = [
    { path: '/', redirect: '/ladders' },
    { path: '/login', name: 'login', component: () => import('../views/LoginView.vue'), meta: { public: true } },
    { path: '/signup', name: 'signup', component: () => import('../views/SignupView.vue'), meta: { public: true } },
    { path: '/ladders', name: 'ladders', component: () => import('../views/LaddersView.vue') },
    {
        path: '/ladders/:id',
        component: LadderView,
        children: [
            { path: '', redirect: (to) => `/ladders/${to.params.id}/standings` },
            { path: 'standings', name: 'standings', component: () => import('../views/LadderStandingsView.vue') },
            { path: 'players', name: 'players', component: () => import('../views/LadderPlayersView.vue') },
            { path: 'matches', name: 'matches', component: () => import('../views/LadderMatchesView.vue') },
        ],
    },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to) => {
    const authStore = useAuthStore();

    await authStore.init();

    if (!to.meta.public && !authStore.isAuthenticated) {
        return { path: '/login', query: { redirect: to.fullPath } };
    }
    return true;
});

export default router;
