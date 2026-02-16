# Next.js API Routes Implementation Guide

This guide explains how to implement backend endpoints using Next.js API Routes to replace the Python FastAPI backend.

## Table of Contents
1. [Overview](#overview)
2. [File Structure](#file-structure)
3. [Basic API Route](#basic-api-route)
4. [Request Handling](#request-handling)
5. [Error Handling](#error-handling)
6. [Authentication](#authentication)
7. [Database Integration](#database-integration)
8. [Migration Patterns](#migration-patterns)

## Overview

Next.js API Routes run on the server and provide a way to build your backend and frontend in the same codebase. They're located in the `pages/api/` directory.

### Benefits
- **Co-located**: Frontend and backend in one repo
- **TypeScript**: Full type safety across the stack
- **Serverless-Ready**: Can deploy to serverless platforms
- **Simple Deployment**: Single build, single deploy

## File Structure

```
pages/api/
├── health.ts           # Health check endpoint
├── chat.ts            # Chat completion
├── models.ts          # List available models
├── auth/
│   ├── login.ts       # User login
│   ├── logout.ts      # User logout
│   └── register.ts    # User registration
├── users/
│   ├── index.ts       # List users (GET)
│   ├── [id].ts        # Get/Update/Delete user (GET/PUT/DELETE)
│   └── create.ts      # Create user (POST)
└── ollama/
    ├── generate.ts    # Text generation
    └── embeddings.ts  # Generate embeddings
```

## Basic API Route

### Simple GET Endpoint

```typescript
// pages/api/hello.ts
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ message: 'Hello from Next.js API!' });
}
```

### POST Endpoint with Body

```typescript
// pages/api/echo.ts
import type { NextApiRequest, NextApiResponse } from 'next';

interface EchoRequest {
  text: string;
}

interface EchoResponse {
  echo: string;
  length: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EchoResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' } as any);
  }

  const { text } = req.body as EchoRequest;
  
  res.status(200).json({
    echo: text,
    length: text.length,
  });
}
```

## Request Handling

### Method Routing

```typescript
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      return handleGet(req, res);
    case 'POST':
      return handlePost(req, res);
    case 'PUT':
      return handlePut(req, res);
    case 'DELETE':
      return handleDelete(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).json({ error: 'Method not allowed' });
  }
}
```

### Query Parameters

```typescript
// GET /api/search?q=hello&limit=10
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { q, limit = '10' } = req.query;
  
  // Query params are always strings or string[]
  const query = Array.isArray(q) ? q[0] : q;
  const limitNum = parseInt(Array.isArray(limit) ? limit[0] : limit, 10);
  
  res.status(200).json({ query, limit: limitNum });
}
```

### Dynamic Routes

```typescript
// pages/api/users/[id].ts
// Matches /api/users/123, /api/users/abc, etc.

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  
  // id is a string
  res.status(200).json({ userId: id });
}
```

## Error Handling

### Standard Error Response

```typescript
interface ErrorResponse {
  error: {
    message: string;
    code?: string;
    details?: any;
  };
}

function sendError(
  res: NextApiResponse,
  status: number,
  message: string,
  code?: string
) {
  res.status(status).json({
    error: { message, code },
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Your logic here
    const result = await someOperation();
    res.status(200).json(result);
  } catch (error) {
    console.error('API error:', error);
    
    if (error instanceof ValidationError) {
      return sendError(res, 400, error.message, 'VALIDATION_ERROR');
    }
    
    if (error instanceof NotFoundError) {
      return sendError(res, 404, 'Resource not found', 'NOT_FOUND');
    }
    
    // Default to 500 for unknown errors
    sendError(res, 500, 'Internal server error', 'INTERNAL_ERROR');
  }
}
```

## Authentication

### JWT-based Authentication

```typescript
// lib/auth.ts
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function signToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// Middleware to protect routes
export function requireAuth(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    
    // Attach user to request
    (req as any).user = decoded;
    
    return handler(req, res);
  };
}
```

### Protected Route Example

```typescript
// pages/api/protected.ts
import { requireAuth } from '@/lib/auth';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = (req as any).user;
  
  res.status(200).json({
    message: 'This is protected data',
    user,
  });
}

export default requireAuth(handler);
```

## Database Integration

### Using Prisma (Recommended)

```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
```

```typescript
// pages/api/users/index.ts
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const users = await prisma.user.findMany();
    return res.status(200).json(users);
  }
  
  if (req.method === 'POST') {
    const user = await prisma.user.create({
      data: req.body,
    });
    return res.status(201).json(user);
  }
  
  res.status(405).json({ error: 'Method not allowed' });
}
```

## Migration Patterns

### From FastAPI to Next.js API Routes

#### FastAPI Example:
```python
# backend/routers/models.py
from fastapi import APIRouter

router = APIRouter()

@router.get("/models")
async def get_models():
    return {
        "models": [
            {"id": "gpt-3.5", "name": "GPT-3.5"},
            {"id": "gpt-4", "name": "GPT-4"}
        ]
    }
```

#### Next.js Equivalent:
```typescript
// pages/api/models.ts
import type { NextApiRequest, NextApiResponse } from 'next';

interface Model {
  id: string;
  name: string;
}

interface ModelsResponse {
  models: Model[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ModelsResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' } as any);
  }
  
  const models: Model[] = [
    { id: 'gpt-3.5', name: 'GPT-3.5' },
    { id: 'gpt-4', name: 'GPT-4' },
  ];
  
  res.status(200).json({ models });
}
```

### Integrating with Ollama

```typescript
// pages/api/ollama/generate.ts
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt, model = 'llama2' } = req.body;

  try {
    const response = await fetch(
      `${process.env.OLLAMA_BASE_URL}/api/generate`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, model }),
      }
    );

    if (!response.ok) {
      throw new Error('Ollama request failed');
    }

    // Stream response back to client
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const reader = response.body?.getReader();
    if (!reader) throw new Error('No response body');

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(value);
    }

    res.end();
  } catch (error) {
    console.error('Ollama error:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
}
```

## Best Practices

1. **Always validate input**: Use libraries like Zod for runtime validation
2. **Use TypeScript**: Define clear request/response types
3. **Handle errors gracefully**: Return appropriate status codes
4. **Implement rate limiting**: Use middleware to prevent abuse
5. **Log requests**: Monitor API usage and errors
6. **Use environment variables**: Never hardcode secrets
7. **Implement CORS properly**: Configure for your domain
8. **Test your APIs**: Write integration tests
9. **Document endpoints**: Use OpenAPI/Swagger
10. **Monitor performance**: Track response times

## Environment Variables

```env
# .env.local
DATABASE_URL=postgresql://user:pass@localhost:5432/db
JWT_SECRET=your-secret-key
OLLAMA_BASE_URL=http://localhost:11434
OPENAI_API_KEY=sk-...
NODE_ENV=development
```

## Next Steps

1. Review existing Python backend routes in `backend/open_webui/routers/`
2. Identify core endpoints to migrate first
3. Implement authentication and authorization
4. Set up database connections
5. Add comprehensive error handling
6. Write tests for critical endpoints
7. Deploy to production

## Resources

- [Next.js API Routes Documentation](https://nextjs.org/docs/api-routes/introduction)
- [Next.js TypeScript](https://nextjs.org/docs/basic-features/typescript)
- [Prisma with Next.js](https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices)
