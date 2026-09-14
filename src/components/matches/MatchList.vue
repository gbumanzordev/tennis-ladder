<script setup lang="ts">
import BaseButton from '../ui/BaseButton.vue';
import { formatDate } from '../../utils/date';
import type { Match, Player } from '../../types/domain';

const props = defineProps<{ matches: Match[]; players: Player[] }>();
const emit = defineEmits<{
    edit: [match: Match];
    remove: [id: string];
}>();

const nameOf = (id: string) =>
    props.players.find((player) => player.id === id)?.name ?? 'Unknown';
</script>

<template>
    <ul class="flex flex-col gap-2">
        <li
            v-for="match in matches"
            :key="match.id"
            class="flex items-center justify-between gap-3 rounded-md border border-slate-200 bg-white p-3"
        >
            <div class="text-sm">
                <p class="text-slate-900">
                    {{ nameOf(match.player_a_id) }} vs
                    {{ nameOf(match.player_b_id) }}
                    <span class="text-slate-500"
                        >— won by {{ nameOf(match.winner_id) }}</span
                    >
                </p>
                <p class="text-xs text-slate-500">
                    {{ formatDate(match.played_on) }} ·
                    {{ match.score ?? 'no score' }}
                </p>
            </div>
            <BaseButton variant="secondary" @click="emit('edit', match)"
                >Edit</BaseButton
            >
            <BaseButton variant="danger" @click="emit('remove', match.id)"
                >Delete</BaseButton
            >
        </li>
    </ul>
</template>
