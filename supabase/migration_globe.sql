-- Run this in your Supabase SQL editor: https://supabase.com/dashboard/project/_/sql
--
-- Club-globe datamodel (fase 2, wereldwijde schaal). Spiegelt de driedeling
-- uit data/clubs.json + data/memberships.json + data/uefa.json, maar dan in
-- Postgres zodat het naar duizenden clubs schaalt en seizoenen kan bewaren.
-- Vul het met: npm run sync-globe (leest de JSON en upsert naar deze tabellen).

-- 1. Competitie-metadata (Eredivisie, Championship, Brasileirão, ...).
create table globe_competitions (
  code           text        primary key,          -- 'ED', 'ELC', 'BSA', ...
  country        text        not null,              -- flagcdn-stijl: 'nl', 'gb-eng', 'br'
  tier           integer     not null,              -- 1 = hoogste niveau, 2 = tweede divisie
  label          text        not null,              -- officiële naam, niet gelokaliseerd
  current_season text        not null,              -- actief seizoen, bv. '2026/27' of '2026'
  created_at     timestamptz not null default now()
);

-- 2. Clubregister: seizoenloze identiteit. Eén rij per club, wereldwijd.
create table globe_clubs (
  id                text        primary key,        -- 'nl-ajax', 'br-flamengo', ...
  name              text        not null,
  country           text        not null,           -- eigen land van de club (kan afwijken van de competitie)
  city              text        not null,
  lat               double precision not null,
  lng               double precision not null,
  stadium_name      text        not null,
  stadium_capacity  integer,                         -- null = onbekend
  fd_id             integer,                         -- football-data.org team-id, null indien onbekend
  crest             text,                            -- '/logos/{id}.png' of null (badge-fallback)
  created_at        timestamptz not null default now()
);

create index globe_clubs_country_idx on globe_clubs (country);

-- 3. Lidmaatschappen: welke clubs spelen in welke competitie per seizoen.
--    De actuele opstelling = rijen waar season = globe_competitions.current_season.
create table globe_memberships (
  competition text not null references globe_competitions (code) on delete cascade,
  season      text not null,                         -- '2026/27' of kalenderjaar '2026'
  club_id     text not null references globe_clubs (id) on delete cascade,
  primary key (competition, season, club_id)
);

create index globe_memberships_current_idx on globe_memberships (competition, season);
create index globe_memberships_club_idx on globe_memberships (club_id);

-- 4. UEFA-deelname (Champions/Europa/Conference League), eigen levenscyclus.
create table globe_uefa (
  season     text not null,                          -- '2026/27'
  tournament text not null check (tournament in ('UCL', 'UEL', 'UECL')),
  club_id    text not null references globe_clubs (id) on delete cascade,
  primary key (season, tournament, club_id)
);

create index globe_uefa_season_idx on globe_uefa (season);

-- RLS: clubdata is publiek leesbaar (de globe leest anoniem); schrijven gaat
-- via de service_role key (sync-script), die RLS omzeilt.
alter table globe_competitions enable row level security;
alter table globe_clubs         enable row level security;
alter table globe_memberships   enable row level security;
alter table globe_uefa          enable row level security;

create policy "Iedereen kan competities lezen"    on globe_competitions for select using (true);
create policy "Iedereen kan clubs lezen"           on globe_clubs        for select using (true);
create policy "Iedereen kan lidmaatschappen lezen" on globe_memberships  for select using (true);
create policy "Iedereen kan UEFA-deelname lezen"   on globe_uefa         for select using (true);
