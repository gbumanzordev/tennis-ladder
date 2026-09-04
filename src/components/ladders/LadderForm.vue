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
        <BaseInput v-model="name" label="New ladder" placeholder="Club Ladder" required :maxlength="80" />
        <BaseButton type="submit">Add</BaseButton>
    </form>
</template>
