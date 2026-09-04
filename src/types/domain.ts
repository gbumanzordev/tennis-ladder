import type { Database } from './database';

type Tables = Database['public']['Tables'];

export type Profile = Tables['profiles']['Row'];
export type Ladder = Tables['ladders']['Row'];
export type Player = Tables['players']['Row'];
export type Match = Tables['matches']['Row'];

export type NewMatch = {
    ladderId: string;
    playerAId: string;
    playerBId: string;
    winnerId: string;
    score: string | null;
    playedOn: string;
};

export type StandingRow = {
    rank: number;
    playerId: string;
    name: string;
    played: number;
    won: number;
    lost: number;
    winPercent: number;
    points: number;
};
