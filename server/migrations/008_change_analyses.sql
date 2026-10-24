create table change_analyses (
  id uuid primary key default gen_random_uuid(),
  before_chip_id uuid not null references chips(id) on delete cascade,
  after_chip_id uuid not null references chips(id) on delete cascade,
  status text not null check (status in ('ok', 'insufficient_data')),
  scl_used boolean not null default false,
  results jsonb not null default '{}'::jsonb,
  notes jsonb not null default '[]'::jsonb,
  overlay_path text,
  created_by uuid references users(id) on delete set null,
  created_at timestamptz not null default now(),
  unique (before_chip_id, after_chip_id)
);
create index change_analyses_after_idx on change_analyses (after_chip_id);

alter table change_analyses enable row level security;
