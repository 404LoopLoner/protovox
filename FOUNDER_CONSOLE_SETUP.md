# ProtoVox Founder Console — setup

## What is included
- `founder.html` — private co-founder console (not linked in public navigation)
- `founder-console.css` / `founder-console.js` — responsive dashboard, request filters, detail drawer, status updates and CSV export
- `supabase-config.js` — browser-safe Supabase project URL and anon key placeholder
- `proto-submit.js` — website form submission bridge
- `SUPABASE_SETUP.sql` — database schema and row-level security policies

## Connect it to the real website
1. Create or open the ProtoVox Supabase project.
2. In Supabase SQL Editor, run the complete `SUPABASE_SETUP.sql` file.
3. In Supabase Authentication > Users, invite/create the three co-founder accounts:
   - Arjun Krishna
   - Aditya Krishna
   - Nanda Kishor S
4. Copy each user's Auth UUID. Uncomment and complete the founder insert statements at the bottom of `SUPABASE_SETUP.sql`, then run them. Only these UUIDs are allowed to read/update requests.
5. In Supabase Project Settings > API, copy the Project URL and `anon` / publishable key into `supabase-config.js`.
   - Do not put a `service_role` key in any website file.
6. Publish the whole website folder to the same GitHub Pages hosting location.
7. Open `founder.html` directly and sign in with one of the invited founder accounts.

## Website forms that feed the console
- Workshop booking → Workshops
- Student idea submission → Ideas
- Help request → Help Desk
- Contact form → General Enquiries
- Research discussion → General Enquiries / Research
- Project kit request form → Kit Orders

When Supabase is configured, submissions are inserted into `proto_requests`. When it is not configured or the insert fails, the existing email-draft fallback is used rather than silently discarding the visitor's request.

## Security model
- Public visitors can INSERT a request only. They cannot SELECT, UPDATE or DELETE records.
- Only authenticated users whose UUID is present in `founder_admins` can read or update the requests.
- The `founder_admins` table has row-level security; each founder can only read their own access record.
- The dashboard itself is not a security boundary. Supabase RLS is the actual data-access control.
- Keep co-founder credentials private and enable MFA in Supabase for each founder account.

## Important limitations
- This console records enquiries and kit purchase requests; it is not a payment gateway or a confirmed order-management/fulfilment system.
- No payments, refunds, shipment tracking or customer messaging are processed yet.
- Configure Supabase email/auth settings and your production domain before inviting founders.
