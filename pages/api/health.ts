import type { NextApiRequest, NextApiResponse } from 'next';

type HealthResponse = {
  status: 'ok' | 'error';
  timestamp: string;
  version: string;
  environment: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<HealthResponse>
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      version: process.env.APP_VERSION || '0.8.2',
      environment: process.env.NODE_ENV || 'development',
    });
  }

  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: process.env.APP_VERSION || '0.8.2',
    environment: process.env.NODE_ENV || 'development',
  });
}
