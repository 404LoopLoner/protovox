-- ProtoVox Command Centre migration: enable internship records in unified request pipeline.
-- Safe to run in Supabase SQL Editor. Does not delete or rewrite existing requests.
begin;

-- Older installations may have a request_type CHECK constraint that excludes internship.
alter table public.proto_requests drop constraint if exists proto_requests_request_type_check;

-- Re-add an explicit allowed-type constraint including internship.
alter table public.proto_requests
  add constraint proto_requests_request_type_check
  check (request_type in ('kit_order','workshop','internship','idea','help','research','contact','project_enquiry'));

create index if not exists idx_proto_requests_internship_created
  on public.proto_requests (created_at desc)
  where request_type = 'internship';

commit;
