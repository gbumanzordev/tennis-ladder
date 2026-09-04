-- Local only: creates the two demo accounts directly in auth.users.
-- A hosted project cannot be seeded this way; sign the accounts up through /signup instead
-- and then run seed_data.sql, which resolves the owners by email either way.
-- Profiles are created by the on_auth_user_created trigger.
-- alice@test.dev / bob@test.dev, password "password123".

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
