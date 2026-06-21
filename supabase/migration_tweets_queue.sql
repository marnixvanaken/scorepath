-- Run this in your Supabase SQL editor: https://supabase.com/dashboard/project/_/sql

create table tweets_queue (
  id          uuid        primary key default gen_random_uuid(),
  account     text        not null,              -- 'laasteman' | 'scorepath'
  handle      text        not null,              -- '@LaatsteMan1998' | '@ScorepathEN'
  lang        text        not null,              -- 'nl' | 'en'
  type        text        not null,              -- 'birthplace' | 'recap' | 'best-thirds' | 'can-win'
  text        text        not null,              -- de volledige tweet-tekst
  scheduled_for date      not null,              -- voor welke dag bedoeld
  posted      boolean     not null default false,
  posted_at   timestamptz,
  dedupe_key  text        unique not null,       -- account+type+scheduled_for, voorkomt dubbelen
  created_at  timestamptz not null default now()
);

create index tweets_queue_posted_idx on tweets_queue (posted, scheduled_for);

-- De cron-route schrijft via de service_role key (bypassed RLS).
-- De admin-pagina leest ook via service_role (server-side), dus geen publieke policy nodig.
alter table tweets_queue enable row level security;
