# API Layer

The project follows an "API-First" approach using OpenAPI specifications to drive type safety and development efficiency.

## Workflow

1.  **Source of Truth**: The `resources/openapi.json` file contains the complete API specification.
2.  **Code Generation**: We use `openapi-typescript` to generate TypeScript definitions from the JSON spec.
    - **Command**: `pnpm gen-api`
    - **Output**: `src/api/spec.d.t` (contains `paths` and `components`).
3.  **Client Implementation**:
    - **`openapi-fetch`**: Provides a type-safe fetch client (`fetchClient`) that adheres to the generated types.
    - **`openapi-react-query`**: Wraps the fetch client into TanStack Query hooks (`apiClient`), enabling easy data fetching, caching, and mutation management.

## API Clients

### `fetchClient` (`src/api/api-client.ts`)

A lightweight, type-safe wrapper around the Fetch API. It ensures that all request paths and bodies are validated against the OpenAPI schema at compile time.

### `apiClient` (`src/api/api-client.ts`)

The primary interface for data fetching within components. It provides the standard TanStack Query pattern:

```typescript
// Example usage in a component
const { data, isLoading } = apiClient.useQuery({
  path: "/api/v1/some-endpoint",
});
```

## Query Configuration (`src/api/query-client.ts`)

The global `queryClient` is configured with optimised defaults to reduce unnecessary network traffic:

- **`staleTime`**: 30 seconds (prevents immediate refetching on component remount).
- **`gcTime`**: 5 minutes (time before unused data is garbage collected).
- **`refetchOnWindowFocus`**: Disabled to prevent frequent background requests.
- **Mutations**: Retries are disabled (`retry: 0`) to ensure immediate feedback on failures.
