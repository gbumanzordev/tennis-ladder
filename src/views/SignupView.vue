<script setup lang="ts">
import { ref, watch } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import BaseButton from '../components/ui/BaseButton.vue';
import BaseInput from '../components/ui/BaseInput.vue';
import { useAuth } from '../composables/useAuth';

const router = useRouter();
const { user, loading, error, register } = useAuth();

const email = ref('');
const password = ref('');
const displayName = ref('');

watch(user, (value) => value && router.replace('/ladders'));

const onSubmit = async () => {
    await register(email.value, password.value, displayName.value.trim());
};
</script>

<template>
    <div class="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-4 p-6">
        <h1 class="text-2xl font-semibold text-slate-900">Create an account</h1>

        <form class="flex flex-col gap-3" @submit.prevent="onSubmit">
            <BaseInput v-model="displayName" label="Display name" required :maxlength="60" />
            <BaseInput v-model="email" label="Email" type="email" required autocomplete="email" />
            <BaseInput
                v-model="password"
                label="Password"
                type="password"
                required
                :minlength="6"
                autocomplete="new-password"
            />
            <BaseButton type="submit" :disabled="loading">Sign up</BaseButton>
        </form>

        <p v-if="error" class="text-sm text-red-600">{{ error }}</p>

        <p class="text-sm text-slate-500">
            Already have an account?
            <RouterLink to="/login" class="text-lime-700 hover:underline">Sign in</RouterLink>
        </p>
    </div>
</template>
