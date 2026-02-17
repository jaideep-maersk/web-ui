# Next.js Migration Guide

This directory contains the Next.js migration of the Open WebUI project.

## Project Structure

```
/
├── pages/              # Next.js pages (routes)
│   ├── _app.tsx       # App wrapper with global providers
│   ├── _document.tsx  # HTML document structure
│   ├── index.tsx      # Home page (/)
│   ├── chat.tsx       # Chat interface (/chat)
│   └── api/           # API routes (backend)
│       ├── health.ts  # Health check endpoint
│       ├── chat.ts    # Chat completion endpoint
│       ├── models.ts  # Models listing endpoint
│       └── auth/
│           └── login.ts # Authentication endpoint
├── components/        # React components
│   ├── ui/           # UI primitives (buttons, inputs, etc.)
│   └── common/       # Shared components
├── lib/              # Utility functions and helpers
│   └── utils/        # Common utilities
├── styles/           # Global styles
│   └── globals.css   # Tailwind + custom CSS
├── public/           # Static assets
└── next.config.mjs   # Next.js configuration
```

## Getting Started

### Prerequisites

- Node.js 18.13.0 or later (up to 22.x.x)
- npm 6.0.0 or later

### Installation

```bash
# Install dependencies
npm install

# Install Next.js dependencies
npm install next@14 react@18 react-dom@18
npm install -D @types/react @types/react-dom @types/node
```

### Development

```bash
# Run development server
npm run dev:next

# Build for production
npm run build:next

# Start production server
npm run start:next
```

The app will be available at `http://localhost:3000`.

## API Routes

API routes are located in `pages/api/` and follow Next.js conventions:

### Example: Health Check

```typescript
// pages/api/health.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ status: 'ok' });
}
```

### Available Endpoints

- `GET /api/health` - Health check
- `POST /api/chat` - Chat completion (demo)
- `GET /api/models` - List available models (demo)
- `POST /api/auth/login` - User login (demo)

## Component Migration Guide

### Svelte to React Conversion

#### Svelte Component Example:
```svelte
<script lang="ts">
  let count = 0;
  
  function increment() {
    count += 1;
  }
</script>

<button on:click={increment}>
  Count: {count}
</button>
```

#### React Component Equivalent:
```typescript
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  function increment() {
    setCount(count + 1);
  }
  
  return (
    <button onClick={increment}>
      Count: {count}
    </button>
  );
}
```

### Key Differences

| Svelte | React |
|--------|-------|
| `let variable` | `useState()` |
| `$:` reactive | `useEffect()` |
| `on:click` | `onClick` |
| `bind:value` | `value` + `onChange` |
| `{#if}` | `{condition &&}` or ternary |
| `{#each}` | `.map()` |

## Environment Variables

Create a `.env.local` file:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api
OLLAMA_BASE_URL=http://localhost:11434
OPENAI_API_KEY=your-key-here

# App Configuration
NODE_ENV=development
```

Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

## TypeScript Configuration

The project uses TypeScript for type safety. See `tsconfig.next.json` for configuration.

### Type Safety Benefits

- Catch errors at compile time
- Better IDE autocomplete
- Self-documenting code
- Refactoring confidence

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Docker

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build:next

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

## Migration Status

### ✅ Completed

- [x] Next.js 14 setup with TypeScript
- [x] Tailwind CSS configuration
- [x] Example pages (Home, Chat)
- [x] Example API routes (Health, Chat, Models, Auth)
- [x] Project structure and conventions
- [x] Development scripts

### 🚧 In Progress

- [ ] Component library migration
- [ ] Full authentication system
- [ ] Database integration
- [ ] Real-time features (WebSocket)

### 📋 To Do

- [ ] Migrate all Svelte components
- [ ] Implement all backend routes
- [ ] Set up state management
- [ ] Add testing infrastructure
- [ ] Performance optimization
- [ ] Documentation completion

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## Notes

This is a foundation for migrating the full Open WebUI application. The migration should be done incrementally, feature by feature, ensuring each part works before moving to the next.

The existing Svelte/Python setup can run alongside this Next.js version during the transition period.
