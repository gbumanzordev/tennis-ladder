import { supabase } from '../lib/supabase';
import type { Session, User } from '@supabase/supabase-js';

export const signIn = async (email: string, password: string): Promise<User> => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data.user;
};

export const signUp = async (email: string, password: string, displayName: string): Promise<User | null> => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { display_name: displayName } },
    });
    if (error) throw error;
    return data.user;
};

export const signOut = async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
};

export const getSession = async (): Promise<Session | null> => {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
};

export const onAuthStateChange = (handler: (session: Session | null) => void) => {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => handler(session));
    return () => data.subscription.unsubscribe();
};
