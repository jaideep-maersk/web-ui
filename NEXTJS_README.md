# Open WebUI - Next.js Migration

This repository contains both the original Svelte/Python stack and the new Next.js migration.

## Quick Start - Next.js Version

### Prerequisites
- Node.js 18.13.0 or later (up to 22.x.x)
- npm 6.0.0 or later

### Installation

1. Install dependencies:
```bash
npm install
```

2. Install Next.js dependencies:
```bash
npm install next@14 react@18 react-dom@18
npm install -D @types/react @types/react-dom @types/node
```

3. Copy environment file:
```bash
cp .env.next.example .env.local
```

4. Run development server:
```bash
npm run dev:next
```

Visit `http://localhost:3000` to see the Next.js app.

## Project Structure

### Next.js Files (New)
```
├── pages/              # Next.js pages and API routes
│   ├── _app.tsx       # App wrapper
│   ├── _document.tsx  # HTML document
│   ├── index.tsx      # Home page
│   ├── chat.tsx       # Chat interface
│   └── api/           # Backend API routes
│       ├── health.ts
│       ├── chat.ts
│       ├── models.ts
│       └── auth/
│           └── login.ts
├── components/        # React components
│   └── ui/           # UI primitives
├── lib/              # Utilities
├── styles/           # Global styles
├── next.config.mjs   # Next.js config
└── tsconfig.next.json # TypeScript config
```

### Original Files (Existing)
```
├── src/              # Svelte frontend
├── backend/          # Python FastAPI backend
└── ...
```

## Available Scripts

### Next.js Commands
- `npm run dev:next` - Start Next.js dev server (port 3000)
- `npm run build:next` - Build Next.js for production
- `npm run start:next` - Start Next.js production server
- `npm run lint:next` - Lint Next.js code

### Original Svelte Commands
- `npm run dev` - Start Svelte dev server (original)
- `npm run build` - Build Svelte app (original)

## Features Implemented

### ✅ Completed
- [x] Next.js 14 setup with TypeScript
- [x] Page routing (Home, Chat)
- [x] API routes (Health, Chat, Models, Auth)
- [x] Tailwind CSS integration
- [x] Example UI components (Button, Input, Modal)
- [x] API client utilities
- [x] TypeScript configuration
- [x] Development environment

### 🚧 To Be Implemented
- [ ] Full authentication system
- [ ] Database integration
- [ ] All Svelte components migration
- [ ] Complete API endpoints
- [ ] Real-time features
- [ ] State management
- [ ] Testing setup

## Documentation

- [Migration Guide](./NEXTJS_MIGRATION.md) - Comprehensive migration documentation
- [Dependencies Guide](./NEXTJS_DEPENDENCIES.md) - Required packages and installation

## API Routes

The Next.js backend provides these example endpoints:

- `GET /api/health` - Health check
- `POST /api/chat` - Chat completion (demo)
- `GET /api/models` - List AI models (demo)
- `POST /api/auth/login` - User authentication (demo)

## Technology Stack

### Frontend
- **Next.js 14** - React framework
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling

### Backend
- **Next.js API Routes** - Backend endpoints
- Will integrate with existing services (Ollama, OpenAI, etc.)

## Migration Strategy

This migration follows an **incremental approach**:

1. ✅ **Phase 1**: Next.js foundation (current)
2. **Phase 2**: Core components migration
3. **Phase 3**: API integration
4. **Phase 4**: Feature parity
5. **Phase 5**: Performance optimization

The original Svelte/Python stack remains functional during the transition.

## Contributing

When contributing to the Next.js version:

1. Use TypeScript for all new files
2. Follow the existing component patterns
3. Add proper error handling
4. Include JSDoc comments for complex functions
5. Test locally with `npm run dev:next`

## License

See [LICENSE](./LICENSE) for details.

---

For the original Svelte/Python documentation, see [README.md](./README.md).
