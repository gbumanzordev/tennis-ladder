-- Two users so account switching can be exercised: alice@test.dev / bob@test.dev, password "password123".
-- Profiles are created by the on_auth_user_created trigger.

insert into auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    raw_app_meta_data, raw_user_meta_data, created_at, updated_at
)
values
    (
        '00000000-0000-0000-0000-000000000000',
        '11111111-1111-1111-1111-111111111111',
        'authenticated', 'authenticated', 'alice@test.dev',
        extensions.crypt('password123', extensions.gen_salt('bf')), now(),
        '{"provider":"email","providers":["email"]}', '{"display_name":"Alice"}', now(), now()
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        '22222222-2222-2222-2222-222222222222',
        'authenticated', 'authenticated', 'bob@test.dev',
        extensions.crypt('password123', extensions.gen_salt('bf')), now(),
        '{"provider":"email","providers":["email"]}', '{"display_name":"Bob"}', now(), now()
    );

insert into auth.identities (id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
select
    gen_random_uuid(), u.id, u.id::text,
    jsonb_build_object('sub', u.id::text, 'email', u.email),
    'email', now(), now(), now()
from auth.users u
where u.email in ('alice@test.dev', 'bob@test.dev');

insert into public.ladders (id, owner_id, name, created_at)
values
    ('aaaaaaaa-0000-4000-8000-000000000001', '11111111-1111-1111-1111-111111111111', 'Club Ladder', now()),
    ('bbbbbbbb-0000-4000-8000-000000000001', '22222222-2222-2222-2222-222222222222', 'Sunday Doubles', now());

-- Bruno is inserted before Ana on purpose: they end up tied, so the ordering of the
-- standings table is only correct if the name tiebreak is applied.
insert into public.players (id, ladder_id, name, created_at)
values
    ('cccccccc-0000-4000-8000-000000000001', 'aaaaaaaa-0000-4000-8000-000000000001', 'Bruno', now()),
    ('cccccccc-0000-4000-8000-000000000002', 'aaaaaaaa-0000-4000-8000-000000000001', 'Ana', now()),
    ('cccccccc-0000-4000-8000-000000000003', 'aaaaaaaa-0000-4000-8000-000000000001', 'Carla', now()),
    ('cccccccc-0000-4000-8000-000000000004', 'aaaaaaaa-0000-4000-8000-000000000001', 'Diego', now()),
    ('cccccccc-0000-4000-8000-000000000005', 'aaaaaaaa-0000-4000-8000-000000000001', 'Elena', now());

-- Elena plays no matches.
insert into public.matches (ladder_id, player_a_id, player_b_id, winner_id, score, played_on)
values
    ('aaaaaaaa-0000-4000-8000-000000000001', 'cccccccc-0000-4000-8000-000000000002', 'cccccccc-0000-4000-8000-000000000001', 'cccccccc-0000-4000-8000-000000000002', '6-4 6-3', current_date - 20),
    ('aaaaaaaa-0000-4000-8000-000000000001', 'cccccccc-0000-4000-8000-000000000001', 'cccccccc-0000-4000-8000-000000000002', 'cccccccc-0000-4000-8000-000000000001', '7-6 4-6 10-8', current_date - 18),
    ('aaaaaaaa-0000-4000-8000-000000000001', 'cccccccc-0000-4000-8000-000000000002', 'cccccccc-0000-4000-8000-000000000003', 'cccccccc-0000-4000-8000-000000000002', '6-2 6-2', current_date - 16),
    ('aaaaaaaa-0000-4000-8000-000000000001', 'cccccccc-0000-4000-8000-000000000002', 'cccccccc-0000-4000-8000-000000000004', 'cccccccc-0000-4000-8000-000000000002', '6-0 6-1', current_date - 14),
    ('aaaaaaaa-0000-4000-8000-000000000001', 'cccccccc-0000-4000-8000-000000000002', 'cccccccc-0000-4000-8000-000000000004', 'cccccccc-0000-4000-8000-000000000002', '6-3 6-4', current_date - 12),
    ('aaaaaaaa-0000-4000-8000-000000000001', 'cccccccc-0000-4000-8000-000000000001', 'cccccccc-0000-4000-8000-000000000003', 'cccccccc-0000-4000-8000-000000000001', '6-4 7-5', current_date - 10),
    ('aaaaaaaa-0000-4000-8000-000000000001', 'cccccccc-0000-4000-8000-000000000001', 'cccccccc-0000-4000-8000-000000000004', 'cccccccc-0000-4000-8000-000000000001', '6-1 6-2', current_date - 8),
    ('aaaaaaaa-0000-4000-8000-000000000001', 'cccccccc-0000-4000-8000-000000000001', 'cccccccc-0000-4000-8000-000000000004', 'cccccccc-0000-4000-8000-000000000001', '6-2 6-4', current_date - 6),
    ('aaaaaaaa-0000-4000-8000-000000000001', 'cccccccc-0000-4000-8000-000000000003', 'cccccccc-0000-4000-8000-000000000004', 'cccccccc-0000-4000-8000-000000000003', '7-5 6-4', current_date - 4),
    ('aaaaaaaa-0000-4000-8000-000000000001', 'cccccccc-0000-4000-8000-000000000003', 'cccccccc-0000-4000-8000-000000000004', 'cccccccc-0000-4000-8000-000000000003', '6-3 3-6 10-7', current_date - 2);
