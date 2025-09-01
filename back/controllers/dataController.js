import { supabase, handleSupabaseQuery } from '../config/supabase.js';

export const getAllItems = async (req, res) => {
  const { tableName } = req.params;
  const query = supabase.from(tableName).select('*');
  await handleSupabaseQuery(res, query);
};

export const getItemById = async (req, res) => {
  const { tableName, id } = req.params;
  const query = supabase.from(tableName).select('*').eq('id', id).single();
  await handleSupabaseQuery(res, query);
};

export const createItem = async (req, res) => {
  const { tableName } = req.params;
  const query = supabase.from(tableName).insert([req.body]).select();
  await handleSupabaseQuery(res, query);
};

export const updateItem = async (req, res) => {
  const { tableName, id } = req.params;
  const query = supabase.from(tableName).update(req.body).eq('id', id).select();
  await handleSupabaseQuery(res, query);
};

export const deleteItem = async (req, res) => {
  const { tableName, id } = req.params;
  const query = supabase.from(tableName).delete().eq('id', id);
  await handleSupabaseQuery(res, query);
};