-- ProtoVox founder console database setup (Supabase SQL Editor)
-- Run once in your Supabase project. Use the anon/public key in browser code only.
create extension if not exists pgcrypto;

create table if not exists public.founder_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  founder_name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.proto_requests (
  id uuid primary key default gen_random_uuid(),
  request_type text not null check (request_type in ('kit_order','workshop','idea','help','research','contact')),
  subject text not null default 'Website request',
  sender_name text not null default 'Website visitor',
  email text not null default '',
  phone text not null default '',
  organisation text not null default '',
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'new' check (status in ('new','reviewing','in_progress','completed','declined')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

grant usage on schema public to anon, authenticated;
grant insert on public.proto_requests to anon, authenticated;
grant select, update, delete on public.proto_requests to authenticated;
grant select on public.founder_admins to authenticated;

alter table public.founder_admins enable row level security;
alter table public.proto_requests enable row level security;

create or replace function public.is_proto_founder()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.founder_admins
    where user_id = auth.uid()
  );
$$;

revoke all on function public.is_proto_founder() from public;
grant execute on function public.is_proto_founder() to authenticated;

drop policy if exists "Founder can read own access record" on public.founder_admins;
create policy "Founder can read own access record"
on public.founder_admins for select to authenticated
using (user_id = auth.uid());

drop policy if exists "Public can submit ProtoVox requests" on public.proto_requests;
create policy "Public can submit ProtoVox requests"
on public.proto_requests for insert to anon, authenticated
with check (
  request_type in ('kit_order','workshop','idea','help','research','contact')
  and status = 'new'
  and length(subject) <= 180
  and length(sender_name) <= 120
  and length(email) <= 180
);

drop policy if exists "Founders can read all requests" on public.proto_requests;
create policy "Founders can read all requests"
on public.proto_requests for select to authenticated
using (public.is_proto_founder());

drop policy if exists "Founders can update requests" on public.proto_requests;
create policy "Founders can update requests"
on public.proto_requests for update to authenticated
using (public.is_proto_founder())
with check (public.is_proto_founder());

drop policy if exists "Founders can delete requests" on public.proto_requests;
create policy "Founders can delete requests"
on public.proto_requests for delete to authenticated
using (public.is_proto_founder());

-- IMPORTANT: after creating each co-founder in Supabase Authentication > Users,
-- copy that user's UUID and run the matching insert below.
-- Replace the UUID and founder name with the actual values.
-- insert into public.founder_admins(user_id, founder_name) values
-- ('COFOUNDER_AUTH_USER_UUID_1','Arjun Krishna'),
-- ('COFOUNDER_AUTH_USER_UUID_2','Aditya Krishna'),
-- ('COFOUNDER_AUTH_USER_UUID_3','Nanda Kishor S');
