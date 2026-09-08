# Architectura -- Tennis Ladder

# Overview

- Tennis Ladder is a Vue3 + Tailwindcss + Supabase local. 
- The application is organized so that the views coordinate the UI.
- The composables contain the client-side resource logic.
- The API is responsioble for communicating with supabase.

At the current version there is no Pinia still. Most state is held in Vue refs inside composables.

# How a screen gets its data
- Vue Router selects the view for the current URL with meta public/required auth.
- The view obtains the current ladder id from the route when necessary ${to.params.id}.
- The view creates the required composables, such as usePlayers or useMatches.
- The view render de components, such Form and Card for list

# Create match
- the form only has required, no include validating.
- When click "submit", the component actives the function onsubmit.
- THe function onsubmit emit the event submit with dataForm
- THe emit call to create in useMatches.
- When create new match, cleam inputs.
- active load().

```mermaidjs
flowchart LR
A[Matches] -->|render| B[Match Form]
B --> |click add match| C(onSubmit)
C --> D{Validation basic required}
D -->|empty required| E[Field is required]
E -->B
D -->|Emit| F[call create > useMatches]
F -->|stored| G[clean and load]
```

# API
 
The current API Modules are:
- auth.ts
  With supabase authentication
    - signIn
    - signUp
    - signOut
    - getSession
    - onAuthStateChange

- ladders.ts
  With supabase
    - list
    - create (name, ownerId)
    - rename (update) parems(id, name)
    - remove (id)
    - getById (id)
- players.ts
  With supabase
    - listByLadder(id)
    - create (ladderId, playerName)
    - rename (id, name)
    - remove (id)
- matches.ts
  With supabase
    - listByLadder(id)
    - create (type Match in domain.ts)
    - remove (id)

# Components
In the folder have folder for each {ladders, matches, players, standing} and UI [Button, and more] 
The structure is card/form
UI with variant styles

# Composables

All composables connect with API 
Vue refs

# Types

Supabase and types for match, standing and others

# Router
Vue router has routes with meta for public and required auth
router call to view
routes provides ladder id from
validating with beforeEach to 

# Utils

Functions to format Date

# Styles

import Tailwindcss