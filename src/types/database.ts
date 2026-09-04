// Generated with `supabase gen types typescript --local` (npm run db:types). Do not edit by hand.

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string;
                    display_name: string;
                    created_at: string;
                };
                Insert: {
                    id: string;
                    display_name: string;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    display_name?: string;
                    created_at?: string;
                };
                Relationships: [];
            };
            ladders: {
                Row: {
                    id: string;
                    owner_id: string;
                    name: string;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    owner_id: string;
                    name: string;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    owner_id?: string;
                    name?: string;
                    created_at?: string;
                };
                Relationships: [];
            };
            players: {
                Row: {
                    id: string;
                    ladder_id: string;
                    name: string;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    ladder_id: string;
                    name: string;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    ladder_id?: string;
                    name?: string;
                    created_at?: string;
                };
                Relationships: [];
            };
            matches: {
                Row: {
                    id: string;
                    ladder_id: string;
                    player_a_id: string;
                    player_b_id: string;
                    winner_id: string;
                    score: string | null;
                    played_on: string;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    ladder_id: string;
                    player_a_id: string;
                    player_b_id: string;
                    winner_id: string;
                    score?: string | null;
                    played_on?: string;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    ladder_id?: string;
                    player_a_id?: string;
                    player_b_id?: string;
                    winner_id?: string;
                    score?: string | null;
                    played_on?: string;
                    created_at?: string;
                };
                Relationships: [];
            };
        };
        Views: Record<never, never>;
        Functions: Record<never, never>;
        Enums: Record<never, never>;
        CompositeTypes: Record<never, never>;
    };
};
