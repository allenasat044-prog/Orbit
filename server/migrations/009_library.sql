-- Stage 9: personal library (profile README, lists, labels, bookmarks)

create table profiles (
  user_id uuid primary key references users(id) on delete cascade,
  username text not null,
  display_name text,
  headline text,
  location text,
  website text,
  is_public boolean not null default true,
  readme text not null default '',
  updated_at timestamptz not null default now()
);
create unique index profiles_username_key on profiles (lower(username));

create table labels (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  name text not null,
  color text not null default '#8daaff',
  created_at timestamptz not null default now()
);
create unique index labels_owner_name_key on labels (user_id, lower(name));

create table lists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  name text not null,
  description text not null default '',
  created_at timestamptz not null default now()
);
create unique index lists_owner_name_key on lists (user_id, lower(name));

create table bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  title text not null,
  note text not null default '',
  lat double precision,
  lon double precision,
  caption_id uuid references captions(id) on delete set null,
  list_id uuid references lists(id) on delete set null,
  created_at timestamptz not null default now(),
  check ((lat is null) = (lon is null))
);
create index bookmarks_user_idx on bookmarks (user_id, created_at desc);
create unique index bookmarks_user_caption_key on bookmarks (user_id, caption_id) where caption_id is not null;

create table bookmark_labels (
  bookmark_id uuid not null references bookmarks(id) on delete cascade,
  label_id uuid not null references labels(id) on delete cascade,
  primary key (bookmark_id, label_id)
);
create index bookmark_labels_label_idx on bookmark_labels (label_id);

alter table profiles enable row level security;
alter table labels enable row level security;
alter table lists enable row level security;
alter table bookmarks enable row level security;
alter table bookmark_labels enable row level security;
