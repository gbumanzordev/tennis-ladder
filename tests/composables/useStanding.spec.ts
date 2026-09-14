import { ref } from 'vue';

import { computeStandings, useStandings } from '@src/composables/useStandings';
import type { Match, Player } from '@src/types/domain';
const playerA: Player = {
    id: 'p1',
    name: 'Player A',
    ladder_id: 'l1',
    created_at: '',
};
const playerB: Player = {
    id: 'p2',
    name: 'Player B',
    ladder_id: 'l1',
    created_at: '',
};
const match1: Match = {
    id: 'm1',
    ladder_id: 'l1',
    player_a_id: 'p1',
    player_b_id: 'p2',
    played_on: '2026-09-09',
    created_at: '2026-09-09',
    score: '6-2 6-4',
    winner_id: 'p1',
};
const match2: Match = {
    id: 'm2',
    ladder_id: 'l1',
    player_a_id: 'p1',
    player_b_id: 'p2',
    played_on: '2026-09-09',
    created_at: '2026-09-09',
    score: '6-2 6-4',
    winner_id: 'p1',
};
const match3: Match = {
    id: 'm3',
    ladder_id: 'l1',
    player_a_id: 'p1',
    player_b_id: 'p2',
    played_on: '2026-09-09',
    created_at: '2026-09-09',
    score: '6-2 6-4',
    winner_id: 'p2',
};
describe('computeStanding', () => {
    test('Player with no matches', () => {
        const row = computeStandings([playerA], []);
        expect(row).toMatchObject([
            {
                rank: 1,
                playerId: 'p1',
                name: 'Player A',
                played: 0,
                won: 0,
                lost: 0,
                winPercent: 0, //should be 0 issue in NaN
                points: 0,
            },
        ]);
    });

    test('Player with one win', () => {
        const row = computeStandings([playerA, playerB], [match1]);
        expect(row[0]).toMatchObject({
            rank: 1,
            playerId: 'p1',
            name: 'Player A',
            played: 1,
            won: 1,
            lost: 0,
            winPercent: 100,
            points: 3,
        });
    });

    test('Player with one loss', () => {
        const row = computeStandings([playerA, playerB], [match1]);
        expect(row[1]).toMatchObject({
            rank: 2,
            playerId: 'p2',
            name: 'Player B',
            played: 1,
            won: 0,
            lost: 1,
            winPercent: 0,
            points: 1, //why point 1
        });
    });

    test('Player with two win and one loss', () => {
        const row = computeStandings(
            [playerA, playerB],
            [match1, match2, match3],
        );
        expect(row[0]).toMatchObject({
            rank: 1,
            playerId: 'p1',
            name: 'Player A',
            played: 3,
            won: 2,
            lost: 1,
            winPercent: 67,
            points: 7, //why point 1
        });
    });

    test('orders players by points desc', () => {
        const standings = computeStandings(
            [playerA, playerB],
            [match1, match2, match3],
        );
        expect(standings.map((row) => row.name)).toEqual([
            'Player A',
            'Player B',
        ]);
    });

    test('win percentage when points are tied', () => {
        const matches: Match[] = [
            {
                id: 'm2',
                ladder_id: 'l1',
                player_a_id: 'p3',
                player_b_id: 'p2',
                played_on: '2026-09-09',
                created_at: '2026-09-09',
                score: '6-2 6-4',
                winner_id: 'p3',
            },
            {
                id: 'm3',
                ladder_id: 'l1',
                player_a_id: 'p3',
                player_b_id: 'p2',
                played_on: '2026-09-09',
                created_at: '2026-09-09',
                score: '6-2 6-4',
                winner_id: 'p3',
            },
        ];
        matches.push(match1);
        const standings = computeStandings([playerA, playerB], matches);
        expect(standings.map((row) => row.name)).toEqual([
            'Player A',
            'Player B',
        ]);
    });

    test('win percentage when points are tied', () => {
        const standings = computeStandings(
            [playerA, playerB],
            [match1, match3],
        );
        expect(standings.map((row) => row.name)).toEqual([
            'Player A',
            'Player B',
        ]);
    });

    test('ranks according to the final ordering', () => {
        const standings = computeStandings(
            [playerA, playerB],
            [match1, match3],
        );
        expect(standings[0].rank).toBe(1);
        expect(standings[1].rank).toBe(2);
    });
});

describe('useStandings', () => {
    test('', () => {
        const players = ref<Player[]>([playerA, playerB]);
        const matches = ref<Match[]>([match1]);

        const standings = useStandings(players, matches);

        expect(standings.value[0]).toMatchObject({
            lost: 0,
            name: 'Player A',
            playerId: 'p1',
            points: 3,
            rank: 1,
            won: 1,
        });

        players.value.push({
            id: 'p3',
            name: 'Player c',
            ladder_id: 'l1',
            created_at: '',
        });

        expect(standings.value).toHaveLength(3);
    });
});
