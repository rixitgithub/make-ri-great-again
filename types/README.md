# Types folder

Central place for **shared / domain** types used across the app.

## Structure

| Folder        | Use for |
|---------------|--------|
| **shared/**   | App-wide shapes, domain models, API contracts, enums. |
| **api/**      | Shared request/response types and API-specific types. |

## When to use this vs elsewhere

- **Feature-only types** → `types/` inside the feature or next to the feature (e.g. `app/(Auth)/appsumo/types/`).
- **Component types** → Same folder as the component (e.g. `Button.types.ts` next to `Button.tsx`).
- **Global / env** → Root `global.d.ts` or `env.d.ts`.

## Naming

Use `*.types.ts` for type-only files (e.g. `User.types.ts`, `auth.types.ts`).
