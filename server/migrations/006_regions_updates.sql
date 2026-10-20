create table regions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  center geometry(Point, 4326) not null,
  collection text not null default 'sentinel-2-l2a',
  max_cloud real not null default 30 check (max_cloud between 0 and 100),
  auto_caption boolean not null default false,
  active boolean not null default true,
  created_by uuid not null references users(id) on delete cascade,
  created_at timestamptz not null default now(),
  last_checked_at timestamptz,
  last_success_at timestamptz
);
create unique index regions_owner_name_key on regions (created_by, lower(name));
create index regions_center_gix on regions using gist (center);

create table update_runs (
  id uuid primary key default gen_random_uuid(),
  trigger text not null check (trigger in ('manual', 'scheduled')),
  status text not null default 'running' check (status in ('running', 'succeeded', 'failed')),
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  regions_checked integer not null default 0,
  new_acquisitions integer not null default 0,
  captions_created integer not null default 0,
  failed_tasks integer not null default 0,
  summary jsonb not null default '{}'::jsonb,
  created_by uuid references users(id) on delete set null
);
create index update_runs_started_idx on update_runs (started_at desc);
create unique index update_runs_one_running on update_runs ((true)) where status = 'running';

alter table regions enable row level security;
alter table update_runs enable row level security;
