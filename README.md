# Web Admin Client

An administrative interface for managing the system infrastructure and users.

## 🚀 Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [TanStack Router](httpss://tanstack.com/router/latest)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query/latest) & [OpenAPI-fetch](https://openapi-ts.org/openapi-fetch/)
- **Styling**: [Tailwind CSS 4](httpshttps://tailwindcss.com/) & [Radix UI](https://www.radix-ui.com/)
- **Testing**: [Vitest](https://vitest.dev/) & [MSW (Mock Service Worker)](https://mswjs.io/)

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (latest LTS recommended)
- [pnpm](https://pnpm.io/)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd web-admin-client
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

### Development

Run the application in development mode with hot reloading:

```bash
pnpm dev
```

The app will be available at `http://localhost:3000`.

### API Generation

This project uses an OpenAPI-first approach. If you modify the API spec, regenerate the types:

```bash
pnpm gen-api
```

## 📜 Available Scripts

| Command        | Description                                       |
| -------------- | ------------------------------------------------- |
| `pnpm dev`     | Starts the Vite development server.               |
| `pnpm build`   | Builds the application for production.            |
| `pnpm test`    | Runs the Vitest test suite.                       |
| `pnpm gen-api` | Regenerates TypeScript types from `openapi.json`. |
| `pnpm format`  | Formats code using Prettier.                      |

## 📂 Repository Structure

See the [AGENTS.md](./AGENTS.md) for a detailed breakdown of the codebase architecture and development workflows.
