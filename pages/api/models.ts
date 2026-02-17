import type { NextApiRequest, NextApiResponse } from 'next';

interface Model {
  id: string;
  name: string;
  description: string;
  provider: 'ollama' | 'openai' | 'local';
  size?: string;
}

interface ModelsResponse {
  models: Model[];
  count: number;
}

type ErrorResponse = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ModelsResponse | ErrorResponse>
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // This is a demo implementation
    // In production, this would:
    // 1. Fetch available models from Ollama
    // 2. Fetch models from OpenAI (if configured)
    // 3. Fetch custom local models
    // 4. Cache results
    // 5. Filter based on user permissions

    const demoModels: Model[] = [
      {
        id: 'llama2',
        name: 'Llama 2',
        description: 'Meta\'s open-source large language model',
        provider: 'ollama',
        size: '7B',
      },
      {
        id: 'gpt-3.5-turbo',
        name: 'GPT-3.5 Turbo',
        description: 'OpenAI\'s efficient model for chat',
        provider: 'openai',
      },
      {
        id: 'gpt-4',
        name: 'GPT-4',
        description: 'OpenAI\'s most capable model',
        provider: 'openai',
      },
      {
        id: 'mistral',
        name: 'Mistral 7B',
        description: 'Efficient 7B parameter model',
        provider: 'ollama',
        size: '7B',
      },
    ];

    res.status(200).json({
      models: demoModels,
      count: demoModels.length,
    });
  } catch (error) {
    console.error('Models API error:', error);
    res.status(500).json({ error: 'Failed to fetch models' });
  }
}
