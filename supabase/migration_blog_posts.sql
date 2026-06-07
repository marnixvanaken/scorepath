-- Run this in your Supabase SQL editor: https://supabase.com/dashboard/project/_/sql

create table blog_posts (
  id          uuid        primary key default gen_random_uuid(),
  slug        text        unique not null,
  title       text        not null,
  description text        not null,
  content     text        not null,
  date        date        not null,
  read_time   integer     not null default 5,
  category    text        not null,
  tags        text[]      not null default '{}',
  published   boolean     not null default true,
  created_at  timestamptz not null default now()
);

-- Zodat de cron-route anoniem kan lezen (leesbaarheid voor de website)
alter table blog_posts enable row level security;

create policy "Iedereen kan gepubliceerde posts lezen"
  on blog_posts for select
  using (published = true);

-- De cron-route schrijft via service_role key (bypassed RLS), geen extra policy nodig
