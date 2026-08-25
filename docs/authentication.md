# Authentication Architecture

This project uses a centralised `AuthService` to manage authentication state and notify subscribers of changes (e.g., login, logout).

## Core Components

### 1. `AuthService` (`src/lib/auth.ts`)

The `AuthService` class implements an observable pattern using a subscriber model. This ensures that any component interested in the authentication state can react to changes without prop drilling.

- **State Management**: Maintains a private `user` object of type `LoginResponse`.
- **Subscription**: Provides a `subscribe` method that allows listeners to register for updates whenever the user state changes (via `notify`).
- **Methods**:
  - `login(data)`: Performs an API call to `/api/v1/login` and updates the local user state.
  - `logout()`: Calls the logout endpoint and clears the local user state.
  - `isAuthenticated()`: Returns a boolean indicating if a user is currently logged in.

### 2. `useAuth` Hook (`src/hooks/useAuth.ts`)

To bridge the imperative `AuthService` with React's rendering lifecycle, we use the `useAuth` hook. It leverages `useSyncExternalStore` to efficiently subscribe to `AuthService` changes.

```typescript
const { user, login, logout, isAuthenticated } = useAuth();
```

## Route Guarding

Authentication is enforced at the routing level using TanStack Router's layout routes.

- **Authenticated Routes**: All routes under the `_authenticated` path prefix are protected.
- **Mechanism**: The router checks the authentication status before allowing access to these routes, redirecting unauthenticated users to the `/login` page if necessary.
