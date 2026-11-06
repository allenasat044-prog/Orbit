-- Basic profile: drop the README idea, add plain profile fields (names, bio, photos).

alter table profiles
  add column first_name text not null default '',
  add column last_name text not null default '',
  add column bio text not null default '',
  add column avatar_image text,
  add column cover_image text;

update profiles set
  first_name = split_part(coalesce(display_name, ''), ' ', 1),
  last_name = btrim(substr(coalesce(display_name, ''), length(split_part(coalesce(display_name, ''), ' ', 1)) + 1)),
  bio = coalesce(headline, '');

alter table profiles
  drop column readme,
  drop column headline,
  drop column display_name,
  drop column is_public;
