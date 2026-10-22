create table model_comparisons (
  id uuid primary key default gen_random_uuid(),
  chip_id uuid not null references chips(id) on delete cascade,
  created_by uuid references users(id) on delete set null,
  created_at timestamptz not null default now(),
  results jsonb not null default '[]'::jsonb,
  scene_tags jsonb,
  scene_model jsonb,
  scene_error jsonb,
  unavailable jsonb not null default '[]'::jsonb
);
create index model_comparisons_chip_idx on model_comparisons (chip_id, created_at desc);

alter table model_comparisons enable row level security;
