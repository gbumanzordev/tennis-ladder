import { supabase } from '../lib/supabase';
import type { Match, NewMatch } from '../types/domain';

export const listByLadder = async (ladderId: string): Promise<Match[]> => {
    const { data, error } = await supabase
        .from('matches')
        .select('*')
        .eq('ladder_id', ladderId)
        .order('played_on', { ascending: false })
        .order('created_at', { ascending: false });
    if (error) throw error;
    return data ?? [];
};

export const create = async (match: NewMatch): Promise<Match> => {
    const { data, error } = await supabase
        .from('matches')
        .insert({
            ladder_id: match.ladderId,
            player_a_id: match.playerAId,
            player_b_id: match.playerBId,
            winner_id: match.winnerId,
            score: match.score,
            played_on: match.playedOn,
        })
        .select()
        .single();
    if (error) throw error;
    return data;
};

export const remove = async (id: string): Promise<void> => {
    const { error } = await supabase.from('matches').delete().eq('id', id);
    if (error) throw error;
};
