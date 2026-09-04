import { supabase } from '../lib/supabase';
import type { Player } from '../types/domain';

export const listByLadder = async (ladderId: string): Promise<Player[]> => {
    const { data, error } = await supabase
        .from('players')
        .select('*')
        .eq('ladder_id', ladderId)
        .order('created_at', { ascending: true });
    if (error) throw error;
    return data ?? [];
};

export const create = async (ladderId: string, name: string): Promise<Player> => {
    const { data, error } = await supabase.from('players').insert({ ladder_id: ladderId, name }).select().single();
    if (error) throw error;
    return data;
};

export const rename = async (id: string, name: string): Promise<Player> => {
    const { data, error } = await supabase.from('players').update({ name }).eq('id', id).select().single();
    if (error) throw error;
    return data;
};

export const remove = async (id: string): Promise<void> => {
    const { error } = await supabase.from('players').delete().eq('id', id);
    if (error) throw error;
};
