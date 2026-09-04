<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import PlayerForm from '../components/players/PlayerForm.vue';
import PlayerList from '../components/players/PlayerList.vue';
import { usePlayers } from '../composables/usePlayers';

const route = useRoute();
const ladderId = route.params.id as string;

const { players, load, create, rename, remove } = usePlayers(ladderId);

onMounted(load);
</script>

<template>
    <div class="flex flex-col gap-4">
        <PlayerForm @submit="create" />
        <PlayerList :players="players" @rename="rename" @remove="remove" />
    </div>
</template>
