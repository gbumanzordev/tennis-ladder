import { computed } from 'vue';
import { usePlayerStore } from '@src/stores/players';
import { useMatchStore } from '@src/stores/matches';
import { defineStore } from 'pinia';

export const useStandingStore = defineStore('stand', () => {
    const POINTS_PER_WIN = 3;
    const POINTS_PER_LOSS = 1;
    const playerStore = usePlayerStore();
    const matchStore = useMatchStore();

    const computeStandings = computed(() =>
        playerStore.players.map((player) => {
            const played = matchStore.matches.filter(
                (match) =>
                    match.player_a_id === player.id ||
                    match.player_b_id === player.id,
            ).length;
            const won = matchStore.matches.filter(
                (match) => match.winner_id === player.id,
            ).length;
            const lost = played - won;

            return {
                rank: 0,
                playerId: player.id,
                name: player.name,
                played,
                won,
                lost,
                winPercent: isNaN(Math.round((won / played) * 100))
                    ? 0
                    : Math.round((won / played) * 100),
                points: won * POINTS_PER_WIN + lost * POINTS_PER_LOSS,
            };
        }),
    );

    const standings = computed(() =>
        computeStandings.value
            .sort((a, b) => {
                if (b.points !== a.points) {
                    return b.points - a.points;
                }
                if (b.winPercent !== a.winPercent) {
                    return b.winPercent - a.winPercent;
                }
                return a.name.localeCompare(b.name);
            })
            .map((row, index) => ({ ...row, rank: index + 1 })),
    );

    return {
        standings,
        computeStandings,
    };
});
