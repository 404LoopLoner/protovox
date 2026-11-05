# ProtoVox Command Centre update

## Files
- `founder.html` — updated console structure and navigation
- `founder-console.css` — dark tactical / JARVIS-inspired responsive UI
- `founder-console.js` — Supabase auth, request pipeline, internship view and live demand charts
- `supabase-config.js` — copied from the supplied project configuration
- `PROTO_VOX_INTERNSHIP_MIGRATION.sql` — additive database migration for internship request types

## Install
1. Back up the current four Founder Console files.
2. Replace `founder.html`, `founder-console.css`, `founder-console.js`, and `supabase-config.js` in the website root with these files.
3. In Supabase SQL Editor, run `PROTO_VOX_INTERNSHIP_MIGRATION.sql` once. If it reports that the constraint already exists, inspect the exact error before retrying.
4. Test locally with Live Server, sign in, refresh records, open Workshops and Internships, update a test request status, and inspect Intelligence.
5. Push to GitHub only after the local tests pass.

## Important data behaviour
- Internship applications must be submitted to `proto_requests` with `request_type: 'internship'` for this console to display them.
- The project chart classifies `idea`, `kit_order`, `research`, and `project_enquiry` requests from their subject and payload text.
- The internship chart classifies `internship` records using their submitted track/domain/interest fields and text.
- Unknown categories are grouped as `Other / unspecified`. These charts show enquiry/application volume, not confirmed demand, sales or placements.
- The console only queries `proto_requests`; the separate category tables created earlier are not automatically merged into this table.

## Security
The browser config contains only the Supabase publishable key supplied for this project. Never add a Supabase secret/service-role key to browser files or commit it to GitHub. Founder access is still enforced by the `is_proto_founder()` RPC and RLS policies.
