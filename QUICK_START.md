# Quick Start Guide - Next.js Migration

## 🚀 Get Started in 5 Minutes

### 1. Install Dependencies

```bash
# Install Next.js and React (if not already installed)
npm install --legacy-peer-deps next@14 react@18 react-dom@18 @types/react @types/react-dom @types/node clsx tailwind-merge

# Or use the package.json scripts
npm install
```

### 2. Set Up Environment

```bash
# Copy environment template
cp .env.next.example .env.local

# Edit .env.local with your settings (optional for demo)
```

### 3. Run Development Server

```bash
npm run dev:next
```

Visit **http://localhost:3000** 🎉

## 📱 Try These Pages

- **/** - Home page with feature overview
- **/chat** - Interactive chat interface
- **/settings** - Settings form example
- **/api/health** - API health check
- **/api/models** - List of AI models

## 📚 Documentation

- **[MIGRATION_SUMMARY.md](./MIGRATION_SUMMARY.md)** - Complete overview (10KB)
- **[NEXTJS_MIGRATION.md](./NEXTJS_MIGRATION.md)** - Migration guide (5KB)
- **[API_ROUTES_GUIDE.md](./API_ROUTES_GUIDE.md)** - API implementation guide (11KB)
- **[NEXTJS_README.md](./NEXTJS_README.md)** - Detailed setup (4KB)

## 🏗️ Project Structure

```
/
├── pages/              # Routes & API
│   ├── index.tsx      # Home page
│   ├── chat.tsx       # Chat interface
│   ├── settings.tsx   # Settings page
│   └── api/           # Backend endpoints
│       ├── health.ts
│       ├── chat.ts
│       ├── models.ts
│       └── auth/
│           └── login.ts
│
├── components/ui/      # React components
│   ├── Button.tsx
│   ├── Input.tsx
│   └── Modal.tsx
│
├── lib/               # Utilities
│   ├── api.ts        # API client
│   └── utils/
│
└── styles/           # Global CSS
    └── globals.css
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev:next      # Start Next.js dev server

# Production
npm run build:next    # Build for production
npm run start:next    # Start production server

# Linting
npm run lint:next     # Lint Next.js code
```

## ✨ What's Included

### Pages (3)
✅ Home - Landing page with features
✅ Chat - Interactive chat interface
✅ Settings - Form with state management

### API Routes (4)
✅ `/api/health` - Health check
✅ `/api/chat` - Chat completion
✅ `/api/models` - List models
✅ `/api/auth/login` - Authentication

### Components (3)
✅ Button - Multiple variants
✅ Input - With validation
✅ Modal - Accessible dialog

### Features
✅ TypeScript - Full type safety
✅ Tailwind CSS - Utility-first styling
✅ API Client - Type-safe requests
✅ Documentation - Comprehensive guides
✅ Accessibility - Keyboard navigation
✅ Security - Zero vulnerabilities

## 🧪 Test the APIs

```bash
# Health check
curl http://localhost:3000/api/health

# List models
curl http://localhost:3000/api/models

# Chat (POST)
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Hello!"}]}'
```

## 📖 Learn More

**Migration Patterns:**
See `NEXTJS_MIGRATION.md` for Svelte → React examples

**API Implementation:**
See `API_ROUTES_GUIDE.md` for FastAPI → Next.js patterns

**Full Overview:**
See `MIGRATION_SUMMARY.md` for complete details

## 🎯 Next Steps

1. **Explore the code** - Check out the example implementations
2. **Read the docs** - Understand the migration patterns
3. **Start migrating** - Use the examples as templates
4. **Ask questions** - Refer to documentation for guidance

## ⚡ Quick Tips

- All TypeScript types are defined
- Components use React 18 best practices
- API routes follow RESTful conventions
- Documentation includes code examples
- Zero security vulnerabilities (CodeQL verified)

## 🐛 Troubleshooting

**Port 3000 in use?**
- Next.js will auto-select port 3001

**Dependencies not installing?**
- Use `--legacy-peer-deps` flag

**Build errors?**
- Check `tsconfig.json` configuration

Need help? Check the documentation files! 📚
