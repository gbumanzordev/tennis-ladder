<script setup lang="ts">
import { ref, watch } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import BaseButton from '../components/ui/BaseButton.vue';
import BaseInput from '../components/ui/BaseInput.vue';
import { useAuth } from '../composables/useAuth';

const route = useRoute();
const router = useRouter();
const { user, loading, error, login } = useAuth();

const email = ref('');
const password = ref('');

const goToApp = () => {
    const redirect = route.query.redirect;
    router.replace(typeof redirect === 'string' ? redirect : '/ladders');
};

watch(user, (value) => value && goToApp(), { immediate: true });

const onSubmit = async () => {
    await login(email.value, password.value);
};
</script>

<template>
    <div class="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-4 p-6">
        <h1 class="text-2xl font-semibold text-slate-900">Sign in</h1>

        <form class="flex flex-col gap-3" @submit.prevent="onSubmit">
            <BaseInput v-model="email" label="Email" type="email" required autocomplete="email" />
            <BaseInput v-model="password" label="Password" type="password" required autocomplete="current-password" />
            <BaseButton type="submit" :disabled="loading">Sign in</BaseButton>
        </form>

        <p v-if="error" class="text-sm text-red-600">{{ error }}</p>

        <p class="text-sm text-slate-500">
            No account?
            <RouterLink to="/signup" class="text-lime-700 hover:underline">Create one</RouterLink>
        </p>
    </div>
</template>
