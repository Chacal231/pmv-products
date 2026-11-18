import { createClient } from '@supabase/supabase-js';

// Las variables se leen del archivo .env (en Vercel: Settings > Environment Variables).
// En Vite tienen que empezar por VITE_ para que lleguen al navegador.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Faltan VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY en el archivo .env');
}

// Cliente único de Supabase para toda la app
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
