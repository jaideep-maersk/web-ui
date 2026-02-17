import type { NextApiRequest, NextApiResponse } from 'next';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  model?: string;
  temperature?: number;
  stream?: boolean;
}

interface ChatResponse {
  id: string;
  object: 'chat.completion';
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: ChatMessage;
    finish_reason: string;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

type ErrorResponse = {
  error: {
    message: string;
    type: string;
    code?: string;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatResponse | ErrorResponse>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({
      error: {
        message: 'Method not allowed',
        type: 'invalid_request_error',
      },
    });
  }

  try {
    const { messages, model = 'gpt-3.5-turbo', temperature = 0.7 } = req.body as ChatRequest;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        error: {
          message: 'Messages array is required',
          type: 'invalid_request_error',
        },
      });
    }

    // This is a demo implementation
    // In production, this would:
    // 1. Validate authentication
    // 2. Call Ollama/OpenAI API
    // 3. Handle streaming responses
    // 4. Store conversation history
    // 5. Implement rate limiting

    const lastMessage = messages[messages.length - 1];
    const demoResponse = `This is a demo response from the Next.js API route. You said: "${lastMessage.content}". In production, this would integrate with Ollama, OpenAI, or other LLM providers.`;

    const response: ChatResponse = {
      id: `chatcmpl-${Date.now()}`,
      object: 'chat.completion',
      created: Math.floor(Date.now() / 1000),
      model,
      choices: [
        {
          index: 0,
          message: {
            role: 'assistant',
            content: demoResponse,
          },
          finish_reason: 'stop',
        },
      ],
      usage: {
        prompt_tokens: 10,
        completion_tokens: 20,
        total_tokens: 30,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({
      error: {
        message: 'Internal server error',
        type: 'internal_error',
      },
    });
  }
}
