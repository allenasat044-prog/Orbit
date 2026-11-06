-- Location and website were created without a default, so new profiles had NULL there.
update profiles set location = '' where location is null;
update profiles set website = '' where website is null;

alter table profiles
  alter column location set default '',
  alter column location set not null,
  alter column website set default '',
  alter column website set not null;
