# AI Agents & Developers

This document provides guidelines for AI agents (e.g., Claude, GitHub Copilot) and human developers working on this codebase to ensure consistency and efficiency.

## Context & Navigation

### 1. Codebase Structure

- `src/api/`: Contains the type-safe API client definitions generated from OpenAPI.
- `src/components/ui/`: Low-level, reusable UI primitives (Radix + Tailwind).
- `src/components/[feature]/`: Feature-specific components.
- `src/hooks/`: Custom React hooks (e.g., `useAuth`, `use-debounced-value`).
- `src/lib/`: Core utilities and singleton services (e.g., `authService`, `utils.ts`).
- `src/routes/`: The application's routing tree, organized by filesystem.
- `resources/`: Contains the source of truth for the API (`openapi.json`).

### 2. Key Files for Reference

- **API Types**: `src/api/spec.d.ts` (Generated). Always refer to this for request/response shapes.
- **Authentication Logic**: `src/lib/auth.ts` and `src/hooks/useAuth.ts`.
- **Routing Configuration**: `src/routes/__root.tsx` and `src/routeTree.gen.ts`.

## Development Workflow

### 1. API Changes

If the backend API changes:

1. Update `resources/openapi.json`.
2. Run `pnpm gen-api` to regenerate TypeScript types.
3. Verify that the changes haven't broken existing components via TypeScript errors.

### 2. Adding New Features

1. **Define Data Requirements**: Determine if new API endpoints are needed in the OpenAPI spec.
2. **Create Routes**: Add new files in `src/routes/`. Use `_authenticated` prefix for protected routes.
3. **Build Components**: Utilize existing components in `src/components/ui` to maintain design consistency.
4. **Mocking (Optional)**: If the backend endpoint is not yet available, update the MSW handlers in `src/mocks/config.ts` or `src/mocks/schema.ts`.

### 3. Testing

- Use **Vitest** for all new logic.
- Ensure that any new network-dependent code is covered by **MSW** mocks to keep tests hermetic and fast.

## Coding Standards

- **TypeScript**: Strict typing is mandatory. Avoid `any` at all costs.
- **Immutability**: Prefer immutable patterns, especially when updating state in the `AuthService`.
- **Styling**: Use Tailwind utility classes. For complex components, use the `cn()` utility from `src/lib/utils.ts`.
- **No Manual Route Edits**: Never manually edit `src/routeTree.gen.ts`; it is an auto-generated file.
