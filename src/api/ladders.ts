import { supabase } from '../lib/supabase';
import type { Ladder } from '../types/domain';

export const list = async (): Promise<Ladder[]> => {
    const { data, error } = await supabase.from('ladders').select('*').order('created_at', { ascending: true });
    if (error) throw error;
    return data ?? [];
};

export const create = async (name: string, ownerId: string): Promise<Ladder> => {
    const { data, error } = await supabase.from('ladders').insert({ name, owner_id: ownerId }).select().single();
    if (error) throw error;
    return data;
};

export const rename = async (id: string, name: string): Promise<Ladder> => {
    const { data, error } = await supabase.from('ladders').update({ name }).eq('id', id).select().single();
    if (error) throw error;
    return data;
};

export const remove = async (id: string): Promise<void> => {
    const { error } = await supabase.from('ladders').delete().eq('id', id);
    if (error) throw error;
};

export const getById = async (id: string): Promise<Ladder | null> => {
    const { data, error } = await supabase.from('ladders').select('*').eq('id', id).maybeSingle();
    if (error) throw error;
    return data;
};
