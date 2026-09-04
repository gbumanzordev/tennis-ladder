<script setup lang="ts">
import { computed, ref } from 'vue';
import BaseButton from '../ui/BaseButton.vue';
import BaseInput from '../ui/BaseInput.vue';
import BaseSelect from '../ui/BaseSelect.vue';
import { todayForInput, toDateOnly } from '../../utils/date';
import type { NewMatch, Player } from '../../types/domain';

const props = defineProps<{ players: Player[] }>();
const emit = defineEmits<{ submit: [match: Omit<NewMatch, 'ladderId'>] }>();

const playerAId = ref('');
const playerBId = ref('');
const winnerId = ref('');
const score = ref('');
const playedOn = ref(todayForInput());

const playerOptions = computed(() => props.players.map((player) => ({ value: player.id, label: player.name })));

const onSubmit = () => {
    emit('submit', {
        playerAId: playerAId.value,
        playerBId: playerBId.value,
        winnerId: winnerId.value,
        score: score.value.trim() || null,
        playedOn: toDateOnly(playedOn.value),
    });

    playerAId.value = '';
    playerBId.value = '';
    winnerId.value = '';
    score.value = '';
    playedOn.value = todayForInput();
};
</script>

<template>
    <form
        class="grid grid-cols-1 gap-3 rounded-lg border border-slate-200 bg-white p-4 sm:grid-cols-5"
        @submit.prevent="onSubmit"
    >
        <BaseSelect v-model="playerAId" label="Player A" :options="playerOptions" required />
        <BaseSelect v-model="playerBId" label="Player B" :options="playerOptions" required />
        <BaseSelect v-model="winnerId" label="Winner" :options="playerOptions" required />
        <BaseInput v-model="score" label="Score" placeholder="6-4 3-6 10-8" />
        <BaseInput v-model="playedOn" label="Played on" type="date" required />
        <div class="sm:col-span-5">
            <BaseButton type="submit">Add match</BaseButton>
        </div>
    </form>
</template>
