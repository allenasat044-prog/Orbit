-- Google / GitHub sign-in: accounts made through a provider have no password.

alter table users alter column password_hash drop not null;

create table oauth_identities (
  provider text not null check (provider in ('google', 'github')),
  provider_user_id text not null,
  user_id uuid not null references users(id) on delete cascade,
  email text,
  created_at timestamptz not null default now(),
  primary key (provider, provider_user_id)
);
create index oauth_identities_user_idx on oauth_identities (user_id);

alter table oauth_identities enable row level security;
