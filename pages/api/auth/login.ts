import type { NextApiRequest, NextApiResponse } from 'next';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    email: string;
    name: string;
  };
  message?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }

  try {
    const { email, password } = req.body as LoginRequest;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    // This is a demo implementation
    // In production, this would:
    // 1. Validate credentials against database
    // 2. Hash password comparison
    // 3. Generate JWT token
    // 4. Set secure HTTP-only cookie
    // 5. Implement rate limiting
    // 6. Log authentication attempts

    // Demo: Accept any non-empty credentials
    const mockToken = Buffer.from(
      JSON.stringify({
        userId: '123',
        email,
        exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      })
    ).toString('base64');

    res.status(200).json({
      success: true,
      token: mockToken,
      user: {
        id: '123',
        email,
        name: email.split('@')[0],
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}
