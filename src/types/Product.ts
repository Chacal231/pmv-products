// Modelo de un producto: coincide con las columnas de la tabla "products" en Supabase
export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  image_url: string; // imagen .png
  video_url: string; // vídeo .mp4
  created_at: string; // fecha
}
