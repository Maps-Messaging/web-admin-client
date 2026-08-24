# Routing & Navigation

The application uses **TanStack Router** for type-safe, efficient, and high-performance routing.

## Route Structure

The route tree is automatically generated based on the file system structure within the `src/routes` directory.

### 1. Root Route (`src/routes/__root.tsx`)

The root route serves as the base of the application. It contains:

- The main `Outlet` for rendering child routes.
- Integrated development tools: `TanStack Devtools`, `React Query Devtools`, and `TanStack Router Devtools`.

### 2. Layout Routes & Path Prefixes

We use pathless layout routes to group related routes and apply shared logic (like authentication).

- **`_authenticated`**: A layout route that wraps all protected content. Any route defined under this prefix requires a valid session via `AuthService`.
- **Public Routes**: Routes like `/login` are outside the `_authenticated` scope and are accessible to all users.

### 3. Route Generation

The routing tree is not manually maintained. Instead, it is generated at build/dev time using the `@tanstack/router-plugin`.

- The resulting file is located at `src/routeTree.gen.ts`.
- **Note**: Never manually edit `src/routeTree.gen.ts`.

## Navigation Patterns

- **Link Component**: Use the TanStack `Link` component for all internal navigation to ensure type safety and programmatic control over route transitions.
- **Breadcrumbs**: Navigation paths are dynamically generated using hooks that parse the active route configuration.
