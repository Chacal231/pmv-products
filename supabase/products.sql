-- =========================================================
--  Tabla "products" para la Actividad PMV (Ionic React)
--  Pegar en Supabase > SQL Editor > New query > Run
-- =========================================================

create table if not exists public.products (
  id          bigint generated always as identity primary key,
  name        text          not null,
  description text,
  price       numeric(10,2) not null default 0,
  image_url   text          not null,   -- imagen .png
  video_url   text          not null,   -- vídeo .mp4
  created_at  timestamptz   not null default now()  -- fecha
);

-- Seguridad: activar RLS y permitir solo LECTURA pública
alter table public.products enable row level security;

drop policy if exists "Lectura pública de productos" on public.products;
create policy "Lectura pública de productos"
  on public.products
  for select
  to anon, authenticated
  using (true);

-- Datos de ejemplo (las imágenes y vídeos están en /public/media del proyecto)
insert into public.products (name, description, price, image_url, video_url, created_at) values
  ('Auriculares inalámbricos', 'Bluetooth 5.3, cancelación de ruido y 30 h de batería.', 79.99,
   '/media/auriculares.png', '/media/auriculares.mp4', '2026-11-15'),
  ('Teclado mecánico', 'Switches rojos, retroiluminación RGB y formato TKL.', 64.50,
   '/media/teclado.png', '/media/teclado.mp4', '2026-11-10'),
  ('Ratón gaming', 'Sensor de 26.000 DPI, 6 botones programables.', 39.90,
   '/media/raton.png', '/media/raton.mp4', '2026-11-02'),
  ('Monitor 27"', 'Panel IPS QHD a 165 Hz, 1 ms de respuesta.', 249.00,
   '/media/monitor.png', '/media/monitor.mp4', '2026-10-28');
