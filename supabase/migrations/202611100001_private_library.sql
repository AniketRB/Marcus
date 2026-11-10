create extension if not exists pgcrypto;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '',
  created_at timestamptz not null default now()
);

create table public.books (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (length(trim(title)) between 1 and 300),
  author text not null check (length(trim(author)) between 1 and 200),
  translator text,
  edition text,
  language text,
  reading_position text,
  status text not null default 'reading' check (status in ('reading', 'finished')),
  started_at date not null default current_date,
  finished_at date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index books_owner_created on public.books(owner_id, created_at desc);

create table public.entries (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  book_id uuid not null references public.books(id) on delete cascade,
  client_id uuid not null,
  type text not null check (type in ('post', 'reflection')),
  user_note text not null default '',
  source_text text,
  page_ref text,
  tags text[] not null default '{}',
  media_refs text[] not null default '{}',
  hidden_from_export boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (owner_id, client_id)
);

create index entries_book_created on public.entries(book_id, created_at desc);

create function public.entry_owner_matches_book() returns trigger
language plpgsql security invoker as $$
begin
  if not exists (select 1 from public.books where id = new.book_id and owner_id = new.owner_id) then
    raise exception 'Entry owner must own book';
  end if;
  return new;
end;
$$;

create trigger entry_owner_matches_book before insert or update of book_id, owner_id
on public.entries for each row execute function public.entry_owner_matches_book();

alter table public.profiles enable row level security;
alter table public.books enable row level security;
alter table public.entries enable row level security;

create policy profiles_select_own on public.profiles for select to authenticated using (id = (select auth.uid()));
create policy profiles_insert_own on public.profiles for insert to authenticated with check (id = (select auth.uid()));
create policy profiles_update_own on public.profiles for update to authenticated using (id = (select auth.uid())) with check (id = (select auth.uid()));

create policy books_select_own on public.books for select to authenticated using (owner_id = (select auth.uid()));
create policy books_insert_own on public.books for insert to authenticated with check (owner_id = (select auth.uid()));
create policy books_update_own on public.books for update to authenticated using (owner_id = (select auth.uid())) with check (owner_id = (select auth.uid()));
create policy books_delete_own on public.books for delete to authenticated using (owner_id = (select auth.uid()));

create policy entries_select_own on public.entries for select to authenticated using (owner_id = (select auth.uid()));
create policy entries_insert_own on public.entries for insert to authenticated with check (owner_id = (select auth.uid()));
create policy entries_update_own on public.entries for update to authenticated using (owner_id = (select auth.uid())) with check (owner_id = (select auth.uid()));
create policy entries_delete_own on public.entries for delete to authenticated using (owner_id = (select auth.uid()));
