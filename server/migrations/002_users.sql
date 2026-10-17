create table users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  password_hash text not null,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

create unique index users_email_lower_key on users (lower(email));

alter table users enable row level security;
