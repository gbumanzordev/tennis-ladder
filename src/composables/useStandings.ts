import { computed, type Ref } from 'vue';
import type { Match, Player, StandingRow } from '../types/domain';

const POINTS_PER_WIN = 3;
const POINTS_PER_LOSS = 1;

export const computeStandings = (
    players: Player[],
    matches: Match[],
): StandingRow[] => {
    const rows = players.map((player) => {
        const played = matches.filter(
            (match) =>
                match.player_a_id === player.id ||
                match.player_b_id === player.id,
        ).length;
        const won = matches.filter(
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
    });

    return rows
        .sort((a, b) => {
            if (b.points !== a.points) {
                return b.points - a.points;
            }
            if (b.winPercent !== a.winPercent) {
                return b.winPercent - a.winPercent;
            }
            return a.name.localeCompare(b.name);
        })
        .map((row, index) => ({ ...row, rank: index + 1 }));
};

export const useStandings = (players: Ref<Player[]>, matches: Ref<Match[]>) =>
    computed(() => computeStandings(players.value, matches.value));
