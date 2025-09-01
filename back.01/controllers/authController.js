import { supabase, handleSupabaseQuery } from '../config/supabase.js';

export const login = async (req, res) => {
  console.log('Login controller function called');
  const { email, password } = req.body;
  const query = supabase.auth.signInWithPassword({ email, password });
  await handleSupabaseQuery(res, query);
};

export const signup = async (req, res) => {
  const { email, password } = req.body;
  const query = supabase.auth.signUp({ email, password });
  await handleSupabaseQuery(res, query);
};