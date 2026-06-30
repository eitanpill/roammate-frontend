-- RoamMate database schema
-- Run this in Supabase: SQL Editor -> New query -> paste -> Run.

create table if not exists public.properties (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  host_id         text,
  host_name       text,
  name            text not null,
  description     text,
  type            text,
  address         text,
  max_guests      int not null default 2,
  price_per_night numeric not null default 0,
  amenities       text[] not null default '{}',
  rating          numeric not null default 0,
  image_emoji     text not null default '🏞️'
);

-- Row Level Security: for the MVP anyone may read and create listings.
-- Tighten these once real Supabase Auth is wired (e.g. host_id = auth.uid()).
alter table public.properties enable row level security;

drop policy if exists "properties_public_read" on public.properties;
create policy "properties_public_read"
  on public.properties for select
  using (true);

drop policy if exists "properties_public_insert" on public.properties;
create policy "properties_public_insert"
  on public.properties for insert
  with check (true);
