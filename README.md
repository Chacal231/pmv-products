# Actividad PMV · Catálogo de productos (Ionic React + Supabase + Bootstrap)

App Ionic React que carga la tabla `products` de Supabase en la página **Home** y muestra cada producto en una tarjeta de Bootstrap con:

- **Imagen PNG** dentro de `<figure>` + `<figcaption>`
- **Vídeo MP4** con `<video>` (y `<object>` como alternativa)
- **Fecha** con `<time>` en formato español
- Precio y descripción

## Estructura

```
src/
├── config/supabase.ts        # Cliente de Supabase (lee el .env)
├── services/productService.ts # Consulta a la tabla products
├── types/Product.ts           # Interfaz Product
├── components/ProductCard.tsx # Tarjeta Bootstrap
└── pages/Home.tsx             # Carga y pinta las tarjetas
public/media/                  # PNG y MP4 de ejemplo
supabase/products.sql          # Crear tabla + RLS + datos de ejemplo
```

## Puesta en marcha

1. Ejecuta `supabase/products.sql` en **Supabase > SQL Editor**.
2. Copia `.env.example` a `.env` y pon tu URL y anon key (Supabase > Project Settings > API).
3. `npm install`
4. `ionic serve` (o `npm run dev`)

## Despliegue en Vercel

1. Sube el repo a GitHub (el `.env` NO se sube, está en `.gitignore`).
2. En Vercel: **Add New > Project** > importa el repo (Framework: Vite).
3. En **Environment Variables** añade `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.
4. **Deploy**.
