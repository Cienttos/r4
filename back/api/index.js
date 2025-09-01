import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hxtnofwbutoqhgqgqwzx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4dG5vZndidXRvcWhncWdxd3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxNjI2MDIsImV4cCI6MjA3MTczODYwMn0.YosfWBP0CdM9f4IUp-nL42c41M_YWiLOH6xgpA1knWU';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  console.log('--- NEW LOGIN REQUEST ---');
  console.log('--- THIS IS THE CORRECT CODE ---');

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  console.log('Request body:', req.body);

  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required in the request body.' });
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.error('Supabase error:', error);
    return res.status(401).json({ error: error.message });
  }

  console.log('Supabase response:', data);
  return res.status(200).json(data);
}
