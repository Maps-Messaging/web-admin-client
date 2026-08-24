# UI & Styling

The user interface is built using a modern, utility-first approach, ensuring high performance and design consistency.

## Tech Stack

- **Tailwind CSS (v4)**: Provides the core styling engine via utility classes.
- **Radix UI**: Provides unstyled, accessible primitive components (e.g., Dialog, Popover, Dropdown Menu).
- **Lucide React**: The primary icon library used throughout the application.
- **Class Variance Authority (CVA)**: Used for managing complex component variants (e.g., button sizes, colors) in a type-safe manner.

## Implementation Patterns

### 1. Component Architecture

We follow a pattern of building "Atomic" components.

- **Primitives**: Low-level Radix UI components.
- **UI Components**: Styled primitives wrapped with `cva` for consistent styling (found in `src/components/ui`).
- **Feature Components**: Higher-level, stateful components that compose multiple UI elements (e.n., User Tables, Schema Editors).

### 2. Styling Utilities

To manage complex class concatenations and avoid conflicts, we use:

- **`clsx`**: For conditional class application.
- **`tailwind-merge`**: To ensure that the last utility class defined wins in case of conflicts (crucial when overriding styles via props).

Example pattern used in `src/lib/utils.ts`:

```typescript
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### 3. Theming

The application supports consistent theming through a global `ThemeProvider` and Tailwind configuration, allowing for easy adjustments to colors, spacing, and typography across the entire app.
