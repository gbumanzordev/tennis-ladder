<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import BaseButton from '../ui/BaseButton.vue';
import BaseInput from '../ui/BaseInput.vue';
import BaseSelect from '../ui/BaseSelect.vue';
import { todayForInput, toDateOnly } from '../../utils/date';
import type { Match, NewMatch, Player } from '../../types/domain';

const props = defineProps<{
    players: Player[];
    match?: Match | null;
}>();
const emit = defineEmits<{
    submit: [match: Omit<NewMatch, 'ladderId'>];
    cancel: [];
}>();

const validationError = ref<string | null>(null);
const playerAId = ref('');
const playerBId = ref('');
const winnerId = ref('');
const score = ref('');
const playedOn = ref(todayForInput());

const isEditing = computed(() => !!props.match);

const playerOptions = computed(() =>
    props.players.map((player) => ({ value: player.id, label: player.name })),
);

const resetForm = () => {
    playerAId.value = '';
    playerBId.value = '';
    winnerId.value = '';
    score.value = '';
    playedOn.value = todayForInput();
    validationError.value = null;
};

const loadMatch = (match: Match | null | undefined) => {
    if (!match) {
        resetForm();
        return;
    }

    playerAId.value = match.player_a_id;
    playerBId.value = match.player_b_id;
    winnerId.value = match.winner_id;
    score.value = match.score ?? '';
    playedOn.value = match.played_on;
};

watch(
    () => props.match,
    (match) => loadMatch(match),
    { immediate: true },
);

const onSubmit = () => {
    validationError.value = null;
    if (playerAId.value === playerBId.value) {
        validationError.value =
            'choose diferent players. *player A is the same player A';
        return;
    }
    if (
        winnerId.value !== playerAId.value &&
        winnerId.value !== playerBId.value
    ) {
        validationError.value = 'The winner player should be the player A or B';
        return;
    }
    emit('submit', {
        playerAId: playerAId.value,
        playerBId: playerBId.value,
        winnerId: winnerId.value,
        score: score.value.trim() || null,
        playedOn: toDateOnly(playedOn.value),
    });

    if (!isEditing.value) {
        resetForm();
    }
};
</script>

<template>
    <p
        v-if="validationError"
        role="alert"
        class="rounded-md bg-red-50 p-3 text-sm text-red-700"
    >
        {{ validationError }}
    </p>
    <form
        class="grid grid-cols-1 gap-3 rounded-lg border border-slate-200 bg-white p-4 sm:grid-cols-5"
        @submit.prevent="onSubmit"
    >
        <BaseSelect
            v-model="playerAId"
            label="Player A"
            :options="playerOptions"
            required
        />
        <BaseSelect
            v-model="playerBId"
            label="Player B"
            :options="playerOptions"
            required
        />
        <BaseSelect
            v-model="winnerId"
            label="Winner"
            :options="playerOptions"
            required
        />
        <BaseInput v-model="score" label="Score" placeholder="6-4 3-6 10-8" />
        <BaseInput v-model="playedOn" label="Played on" type="date" required />
        <div class="sm:col-span-5">
            <BaseButton type="submit">{{
                isEditing ? 'Save changes' : 'Add match'
            }}</BaseButton>
            <BaseButton
                v-if="isEditing"
                type="button"
                variant="ghost"
                @click="emit('cancel')"
            ></BaseButton>
        </div>
    </form>
</template>
