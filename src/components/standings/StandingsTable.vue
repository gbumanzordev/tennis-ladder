<script setup lang="ts">
import type { StandingRow } from '../../types/domain';

defineProps<{ rows: StandingRow[] }>();
</script>

<template>
    <table class="w-full overflow-hidden rounded-lg border border-slate-200 bg-white text-sm">
        <thead class="bg-slate-100 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
                <th class="px-3 py-2">#</th>
                <th class="px-3 py-2">Player</th>
                <th class="px-3 py-2">Played</th>
                <th class="px-3 py-2">Won</th>
                <th class="px-3 py-2">Lost</th>
                <th class="px-3 py-2">Win %</th>
                <th class="px-3 py-2">Points</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in rows" :key="row.playerId" class="border-t border-slate-100">
                <td class="px-3 py-2 text-slate-500">{{ row.rank }}</td>
                <td class="px-3 py-2 font-medium text-slate-900">{{ row.name }}</td>
                <td class="px-3 py-2">{{ row.played }}</td>
                <td class="px-3 py-2">{{ row.won }}</td>
                <td class="px-3 py-2">{{ row.lost }}</td>
                <td class="px-3 py-2">{{ row.winPercent }}%</td>
                <td class="px-3 py-2">{{ row.points }}</td>
            </tr>
        </tbody>
    </table>
</template>
