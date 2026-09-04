<script setup lang="ts">
import { ref } from 'vue';
import BaseButton from '../ui/BaseButton.vue';
import BaseInput from '../ui/BaseInput.vue';

const emit = defineEmits<{ submit: [name: string] }>();

const name = ref('');

const onSubmit = () => {
    emit('submit', name.value.trim());
    name.value = '';
};
</script>

<template>
    <form class="flex items-end gap-2" @submit.prevent="onSubmit">
        <BaseInput v-model="name" label="New player" placeholder="Ana" required :maxlength="60" />
        <BaseButton type="submit">Add player</BaseButton>
    </form>
</template>
