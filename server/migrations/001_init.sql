create extension if not exists postgis;

create table providers (
  id text primary key,
  name text not null,
  created_at timestamptz not null default now()
);

insert into providers (id, name) values ('copernicus', 'Copernicus Data Space Ecosystem');
