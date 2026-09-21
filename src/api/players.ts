import { supabase } from '../lib/supabase';
import type { Player } from '../types/domain';

export const listByLadder = async (ladderId: string): Promise<Player[]> => {
  const { data, error } = await supabase
    .from('players')
    .select('*')
    .eq('ladder_id', ladderId)
    .is('deleted_at', null)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data ?? [];
};

export const listByLadderDeleteAt = async (
  ladderId: string,
): Promise<Player[]> => {
  const { data, error } = await supabase
    .from('players')
    .select('*')
    .eq('ladder_id', ladderId)
    .not('deleted_at', 'is', null)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data ?? [];
};

export const create = async (
  ladderId: string,
  name: string,
): Promise<Player> => {
  const { data, error } = await supabase
    .from('players')
    .insert({ ladder_id: ladderId, name })
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const rename = async (id: string, name: string): Promise<Player> => {
  const { data, error } = await supabase
    .from('players')
    .update({ name })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const removeAt = async (id: string): Promise<void> => {
  const removeAt = new Date().toISOString();
  const { error } = await supabase
    .from('players')
    .update({ deleted_at: removeAt.toString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
};
