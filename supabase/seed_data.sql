-- Ladder fixtures for the alice@test.dev and bob@test.dev accounts.
-- Runs against local (after seed.sql) and against a hosted project (after signing both
-- accounts up through /signup), because the owners are resolved by email.
-- Safe to re-run: everything is keyed on fixed ids and upserted.

insert into public.ladders (id, owner_id, name)
values
    (
        'aaaaaaaa-0000-4000-8000-000000000001',
        (select id from auth.users where email = 'alice@test.dev'),
        'Club Ladder'
    ),
    (
        'bbbbbbbb-0000-4000-8000-000000000001',
        (select id from auth.users where email = 'bob@test.dev'),
        'Sunday Doubles'
    )
on conflict (id) do nothing;

-- Bruno is inserted before Ana on purpose: they end up tied, so the ordering of the
-- standings table is only correct if the name tiebreak is applied.
insert into public.players (id, ladder_id, name)
values
    ('cccccccc-0000-4000-8000-000000000001', 'aaaaaaaa-0000-4000-8000-000000000001', 'Bruno'),
    ('cccccccc-0000-4000-8000-000000000002', 'aaaaaaaa-0000-4000-8000-000000000001', 'Ana'),
    ('cccccccc-0000-4000-8000-000000000003', 'aaaaaaaa-0000-4000-8000-000000000001', 'Carla'),
    ('cccccccc-0000-4000-8000-000000000004', 'aaaaaaaa-0000-4000-8000-000000000001', 'Diego'),
    ('cccccccc-0000-4000-8000-000000000005', 'aaaaaaaa-0000-4000-8000-000000000001', 'Elena')
on conflict (id) do nothing;

-- Elena plays no matches.
insert into public.matches (id, ladder_id, player_a_id, player_b_id, winner_id, score, played_on)
values
    ('dddddddd-0000-4000-8000-000000000001', 'aaaaaaaa-0000-4000-8000-000000000001', 'cccccccc-0000-4000-8000-000000000002', 'cccccccc-0000-4000-8000-000000000001', 'cccccccc-0000-4000-8000-000000000002', '6-4 6-3', current_date - 20),
    ('dddddddd-0000-4000-8000-000000000002', 'aaaaaaaa-0000-4000-8000-000000000001', 'cccccccc-0000-4000-8000-000000000001', 'cccccccc-0000-4000-8000-000000000002', 'cccccccc-0000-4000-8000-000000000001', '7-6 4-6 10-8', current_date - 18),
    ('dddddddd-0000-4000-8000-000000000003', 'aaaaaaaa-0000-4000-8000-000000000001', 'cccccccc-0000-4000-8000-000000000002', 'cccccccc-0000-4000-8000-000000000003', 'cccccccc-0000-4000-8000-000000000002', '6-2 6-2', current_date - 16),
    ('dddddddd-0000-4000-8000-000000000004', 'aaaaaaaa-0000-4000-8000-000000000001', 'cccccccc-0000-4000-8000-000000000002', 'cccccccc-0000-4000-8000-000000000004', 'cccccccc-0000-4000-8000-000000000002', '6-0 6-1', current_date - 14),
    ('dddddddd-0000-4000-8000-000000000005', 'aaaaaaaa-0000-4000-8000-000000000001', 'cccccccc-0000-4000-8000-000000000002', 'cccccccc-0000-4000-8000-000000000004', 'cccccccc-0000-4000-8000-000000000002', '6-3 6-4', current_date - 12),
    ('dddddddd-0000-4000-8000-000000000006', 'aaaaaaaa-0000-4000-8000-000000000001', 'cccccccc-0000-4000-8000-000000000001', 'cccccccc-0000-4000-8000-000000000003', 'cccccccc-0000-4000-8000-000000000001', '6-4 7-5', current_date - 10),
    ('dddddddd-0000-4000-8000-000000000007', 'aaaaaaaa-0000-4000-8000-000000000001', 'cccccccc-0000-4000-8000-000000000001', 'cccccccc-0000-4000-8000-000000000004', 'cccccccc-0000-4000-8000-000000000001', '6-1 6-2', current_date - 8),
    ('dddddddd-0000-4000-8000-000000000008', 'aaaaaaaa-0000-4000-8000-000000000001', 'cccccccc-0000-4000-8000-000000000001', 'cccccccc-0000-4000-8000-000000000004', 'cccccccc-0000-4000-8000-000000000001', '6-2 6-4', current_date - 6),
    ('dddddddd-0000-4000-8000-000000000009', 'aaaaaaaa-0000-4000-8000-000000000001', 'cccccccc-0000-4000-8000-000000000003', 'cccccccc-0000-4000-8000-000000000004', 'cccccccc-0000-4000-8000-000000000003', '7-5 6-4', current_date - 4),
    ('dddddddd-0000-4000-8000-000000000010', 'aaaaaaaa-0000-4000-8000-000000000001', 'cccccccc-0000-4000-8000-000000000003', 'cccccccc-0000-4000-8000-000000000004', 'cccccccc-0000-4000-8000-000000000003', '6-3 3-6 10-7', current_date - 2)
on conflict (id) do nothing;
