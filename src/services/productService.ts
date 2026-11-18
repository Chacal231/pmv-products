import { supabase } from '../config/supabase';
import type { Product } from '../types/Product';

// Devuelve todos los productos de la tabla "products", los más recientes primero
export const getProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
};
