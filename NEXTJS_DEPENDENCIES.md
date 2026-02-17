# Next.js Dependencies Installation Guide

This file lists the dependencies needed for the Next.js migration.

## Required Dependencies

Run the following commands to install Next.js dependencies:

```bash
# Core Next.js dependencies
npm install next@14 react@18 react-dom@18

# TypeScript types
npm install -D @types/react @types/react-dom @types/node

# ESLint for Next.js (optional)
npm install -D eslint-config-next
```

## Optional Dependencies

For additional features:

```bash
# Authentication (JWT)
npm install jsonwebtoken
npm install -D @types/jsonwebtoken

# API client
npm install axios swr

# State management
npm install zustand

# Form handling
npm install react-hook-form zod

# UI components (if not using custom)
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu

# Icons
npm install lucide-react
```

## Notes

- Next.js 14 is used for the latest features
- React 18 is required for Next.js 14
- TypeScript types are essential for development
- Tailwind CSS is already installed in the project
