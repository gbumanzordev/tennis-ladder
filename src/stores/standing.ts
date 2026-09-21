import { computed } from 'vue';
import { usePlayers } from '@src/services/playerService';
import { useMatches } from '@src/services/matchService';
import { defineStore } from 'pinia';

export const useStandingStore = defineStore('standings', () => {
  const POINTS_PER_WIN = 3;
  const POINTS_PER_LOSS = 1;
  const { data: players } = usePlayers();
  const { data: matches } = useMatches();

  const computeStandings = computed(() =>
    players.value?.map((player) => {
      const played =
        matches.value?.filter(
          (match) =>
            match.player_a_id === player.id || match.player_b_id === player.id,
        ).length ?? 0;
      const won =
        matches.value?.filter((match) => match.winner_id === player.id)
          .length ?? 0;
      const lost = played - won;

      return {
        rank: 0,
        playerId: player.id,
        name: player.name,
        played,
        won,
        lost,
        winPercent: played === 0 ? 0 : Math.round((won / played) * 100),
        points: won * POINTS_PER_WIN + lost * POINTS_PER_LOSS,
      };
    }),
  );

  const standings = computed(() =>
    computeStandings.value
      ?.sort((a, b) => {
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
