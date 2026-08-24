# Testing & Mocking

Testing is built around **Vitest** for unit logic and **MSW (Mock Service Worker)** for network-level mocking.

## Unit Testing

We use `vitest` to run our test suite. Tests should focus on business logic, hooks (`useAuth`), and utility functions.

**Command**: `ply pnpm test` (actually `pnpm test`)

## API Mocking with MSW

To facilitate development without a live backend and to ensure stable integration tests, we use MSW to intercept network requests.

### Workflow

1.  **Spec-Driven Mocks**: Instead of manually defining every handler, we use `@msw/source/open-api` to generate handlers directly from our `openapi.json` specification.
2.  **Custom Handlers**: For complex scenarios (e.g., testing error states or specific query parameters), we implement custom handlers in:
    - `src/mocks/config.ts`
    - `src/mocks/schema.ts`
3.  **Browser Worker**: The MSW worker is initialised in `src/mocks/browser.ts`, which intercepts fetches at the network level in both development and test environments.

### Example Test Setup

When writing tests with Vitest, ensure that the MSW worker is started before running tests to catch all outgoing fetch requests.
