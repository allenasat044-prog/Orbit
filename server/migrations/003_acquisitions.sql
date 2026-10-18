create table acquisitions (
  id uuid primary key default gen_random_uuid(),
  provider_id text not null references providers(id),
  collection text not null,
  external_id text not null,
  acquired_at timestamptz not null,
  platform text,
  constellation text,
  instruments text[],
  processing_level text,
  product_type text,
  grid_code text,
  cloud_cover real,
  gsd real,
  footprint geometry(Geometry, 4326) not null,
  stac_url text,
  visual_asset_key text,
  assets jsonb not null default '{}'::jsonb,
  properties jsonb not null default '{}'::jsonb,
  attribution text not null,
  ingested_by uuid references users(id) on delete set null,
  ingested_at timestamptz not null default now(),
  unique (provider_id, external_id)
);

create index acquisitions_footprint_gix on acquisitions using gist (footprint);
create index acquisitions_acquired_at_idx on acquisitions (acquired_at desc);
create index acquisitions_collection_idx on acquisitions (collection, acquired_at desc);

alter table acquisitions enable row level security;
