import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://hxtnofwbutoqhgqgqwzx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4dG5vZndidXRvcWhncWdxd3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxNjI2MDIsImV4cCI6MjA3MTczODYwMn0.YosfWBP0CdM9f4IUp-nL42c41M_YWiLOH6xgpA1knWU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function handleSupabaseQuery(res, query) {
  try {
    const { data, error } = await query;
    if (error) {
      console.error('Supabase query error:', error);
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(data);
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}