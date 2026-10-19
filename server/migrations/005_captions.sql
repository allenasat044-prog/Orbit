create table captions (
  id uuid primary key default gen_random_uuid(),
  chip_id uuid not null references chips(id) on delete cascade,
  acquisition_id uuid not null references acquisitions(id) on delete cascade,
  model_id text not null,
  checkpoint text not null,
  revision text,
  device text,
  dtype text,
  prompt text not null,
  prompt_key text not null,
  caption text not null,
  latency_ms integer,
  created_by uuid references users(id) on delete set null,
  created_at timestamptz not null default now(),
  unique (chip_id, model_id, prompt_key)
);
create index captions_chip_idx on captions (chip_id);

alter table captions enable row level security;
