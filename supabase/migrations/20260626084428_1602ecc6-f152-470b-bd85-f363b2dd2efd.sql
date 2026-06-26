
create table public.pinterest_pins (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  image_url text not null,
  link_url text not null,
  style text not null check (style in ('dark','light')),
  link_target text not null check (link_target in ('site','bot')),
  topic text,
  astro_context text,
  image_prompt text,
  status text not null default 'published',
  error_message text,
  created_at timestamptz not null default now()
);

grant select on public.pinterest_pins to anon;
grant select, insert, update, delete on public.pinterest_pins to authenticated;
grant all on public.pinterest_pins to service_role;

alter table public.pinterest_pins enable row level security;

create policy "Public can read pinterest pins"
on public.pinterest_pins for select
using (true);

create index pinterest_pins_created_at_idx on public.pinterest_pins (created_at desc);
