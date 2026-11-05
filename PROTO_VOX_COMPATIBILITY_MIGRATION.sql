-- ProtoVox compatibility layer for the current Founder Console and website forms.
-- Run this once in Supabase SQL Editor. It does not remove the existing category tables.

begin;

create table if not exists public.proto_requests (
  id uuid primary key default gen_random_uuid(),
  request_type text not null default 'contact',
  subject text not null default 'Website enquiry',
  sender_name text not null default 'Website visitor',
  email text not null default '',
  phone text not null default '',
  organisation text not null default '',
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'new'
    check (status in ('new', 'reviewing', 'in_progress', 'completed', 'declined')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.proto_requests enable row level security;

grant insert on public.proto_requests to anon, authenticated;
grant select, update, delete on public.proto_requests to authenticated;

drop policy if exists "ProtoVox public request submission" on public.proto_requests;
create policy "ProtoVox public request submission"
  on public.proto_requests for insert
  to anon, authenticated
  with check (status = 'new');

drop policy if exists "ProtoVox founders can read requests" on public.proto_requests;
create policy "ProtoVox founders can read requests"
  on public.proto_requests for select
  to authenticated
  using (public.is_proto_founder());

drop policy if exists "ProtoVox founders can update requests" on public.proto_requests;
create policy "ProtoVox founders can update requests"
  on public.proto_requests for update
  to authenticated
  using (public.is_proto_founder())
  with check (public.is_proto_founder());

drop policy if exists "ProtoVox founders can delete requests" on public.proto_requests;
create policy "ProtoVox founders can delete requests"
  on public.proto_requests for delete
  to authenticated
  using (public.is_proto_founder());

create index if not exists idx_proto_requests_created_at
  on public.proto_requests (created_at desc);
create index if not exists idx_proto_requests_type_status
  on public.proto_requests (request_type, status);

commit;
