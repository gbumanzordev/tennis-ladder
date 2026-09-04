-- Tennis Ladder schema: profiles mirror auth.users, ladders own players and matches.

create table public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    display_name text not null,
    created_at timestamptz not null default now()
);

create table public.ladders (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references public.profiles(id) on delete cascade,
    name text not null check (char_length(name) between 1 and 80),
    created_at timestamptz not null default now()
);

create table public.players (
    id uuid primary key default gen_random_uuid(),
    ladder_id uuid not null references public.ladders(id) on delete cascade,
    name text not null check (char_length(name) between 1 and 60),
    created_at timestamptz not null default now()
);

create table public.matches (
    id uuid primary key default gen_random_uuid(),
    ladder_id uuid not null references public.ladders(id) on delete cascade,
    player_a_id uuid not null references public.players(id),
    player_b_id uuid not null references public.players(id),
    winner_id uuid not null references public.players(id),
    score text,
    played_on date not null default current_date,
    created_at timestamptz not null default now()
);

create index on public.players (ladder_id);
create index on public.matches (ladder_id, played_on desc);

-- Signup writes display_name into user metadata; mirror it into profiles.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
    insert into public.profiles (id, display_name)
    values (new.id, coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1)));
    return new;
end;
$$;

create trigger on_auth_user_created
    after insert on auth.users
    for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.ladders enable row level security;
alter table public.players enable row level security;
alter table public.matches enable row level security;

create policy "profiles are self readable" on public.profiles
    for select using (id = auth.uid());

create policy "profiles are self writable" on public.profiles
    for update using (id = auth.uid()) with check (id = auth.uid());

create policy "ladders by owner" on public.ladders
    for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());

create policy "players by ladder owner" on public.players
    for all using (
        exists (select 1 from public.ladders l where l.id = players.ladder_id and l.owner_id = auth.uid())
    ) with check (
        exists (select 1 from public.ladders l where l.id = players.ladder_id and l.owner_id = auth.uid())
    );

create policy "matches by ladder owner" on public.matches
    for all using (
        exists (select 1 from public.ladders l where l.id = matches.ladder_id and l.owner_id = auth.uid())
    ) with check (
        exists (select 1 from public.ladders l where l.id = matches.ladder_id and l.owner_id = auth.uid())
    );
