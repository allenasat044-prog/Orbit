create table jobs (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  status text not null default 'queued' check (status in ('queued', 'running', 'succeeded', 'failed')),
  params jsonb not null default '{}'::jsonb,
  result jsonb,
  error jsonb,
  attempts integer not null default 0,
  created_by uuid references users(id) on delete set null,
  created_at timestamptz not null default now(),
  started_at timestamptz,
  finished_at timestamptz
);
create index jobs_status_idx on jobs (status, created_at);

create table imagery_assets (
  id uuid primary key default gen_random_uuid(),
  acquisition_id uuid not null references acquisitions(id) on delete cascade,
  asset_key text not null,
  storage_path text not null,
  sha256 text not null,
  size_bytes bigint not null,
  content_type text,
  downloaded_at timestamptz not null default now(),
  unique (acquisition_id, asset_key)
);

create table chips (
  id uuid primary key default gen_random_uuid(),
  acquisition_id uuid not null references acquisitions(id) on delete cascade,
  asset_id uuid not null references imagery_assets(id) on delete cascade,
  center_key text not null,
  center_lon double precision not null,
  center_lat double precision not null,
  size_px integer not null,
  width_px integer not null,
  height_px integer not null,
  pin_x integer not null,
  pin_y integer not null,
  gsd_m real,
  crs text,
  nodata_fraction real not null,
  bounds geometry(Polygon, 4326) not null,
  storage_path text not null,
  sha256 text not null,
  created_at timestamptz not null default now(),
  unique (acquisition_id, center_key)
);
create index chips_bounds_gix on chips using gist (bounds);

alter table jobs enable row level security;
alter table imagery_assets enable row level security;
alter table chips enable row level security;
