# Tennis Ladder

A small Vue 3 + Supabase CRUD app. You sign in, create ladders, add players to a ladder, record matches
between them, and see the standings the matches produce.

## Stack

- Vue 3 (`<script setup lang="ts">`, Composition API only) + Vite + TypeScript strict
- Vue Router 4 with a `beforeEach` auth guard
- Tailwind CSS v4 (via `@tailwindcss/vite`), no component library
- Supabase: Postgres, email + password auth, RLS on every table
- ESLint (flat config) + Prettier

There is deliberately **no state management library and no test tooling**. Adding them is the next milestone.

## Setup

Requires Node 20+, Docker, and the [Supabase CLI](https://supabase.com/docs/guides/local-development).

```bash
npm install
supabase start          # boots Postgres, runs supabase/migrations, applies supabase/seed.sql
cp .env.example .env    # fill in the URL and anon key printed by `supabase start`
npm run dev
```

Seeded accounts (password `password123` for both):

| Email | Data |
|---|---|
| `alice@test.dev` | "Club Ladder" with 5 players and 10 matches |
| `bob@test.dev` | "Sunday Doubles", empty |

Other scripts: `npm run build`, `npm run lint`, `npm run format`, and `npm run db:types` to regenerate
`src/types/database.ts` against the running local database.

## Standings rules

The standings table is derived on the client from the players and matches of a ladder.

- **Played**: matches where the player is A or B.
- **Won**: matches where the player is the winner. **Lost**: played minus won.
- **Win %**: `won / played`, shown as a whole percent. A player with no matches shows `0%`.
- **Points**: 3 per win, 1 per loss. Losses score so that playing beats sitting out.
- **Order**: points descending, then win % descending, then name ascending.

## Architecture

- `src/api/` — the only place that talks to Supabase. Each function takes and returns plain domain types
  and throws on error. Nothing outside this folder imports the Supabase client.
- `src/composables/` — one composable per resource. They own `loading` and `error` refs and expose plain
  async functions that call `src/api/`. `useStandings` is the exception: it is a pure function wrapped in
  a `computed`, with no fetching.
- `src/components/` — `ui/` holds the generic building blocks (`BaseButton`, `BaseInput`, `BaseSelect`,
  `BaseDialog`, `EmptyState`); the other folders hold feature components that only take props and emit events.
- `src/views/` — one component per route. Views wire composables to components and do nothing else.
- `src/router/` — route table plus the auth guard.
- `src/lib/supabase.ts` — the single Supabase client instance.
- `src/types/` — `database.ts` is generated from the schema; `domain.ts` is the hand-written app vocabulary.
- `supabase/` — `migrations/0001_init.sql` (tables, signup trigger, RLS policies) and `seed.sql`.

## Routes

| Route | Screen |
|---|---|
| `/login`, `/signup` | Auth forms |
| `/ladders` | Ladder list with inline create, rename and delete |
| `/ladders/:id/standings` | Standings table (default tab) |
| `/ladders/:id/players` | Players with add, rename and delete |
| `/ladders/:id/matches` | Matches newest first, with create and delete |

## Known limitations

These are known and intentional for this stage; they are the starting points for the next milestone.

1. **Matches cannot be edited.** Only created and deleted.
2. **No loading or empty states on the ladder tabs.** Only the ladder list has them.
3. **Errors are barely surfaced.** Form validation is whatever the browser gives us natively, and API
   errors are logged to the console instead of shown to the user.
4. **Standings are computed on the client** rather than by a Postgres view or RPC.
5. **Score is free text.** No structure, no validation.
