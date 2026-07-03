import { NextRequest } from 'next/server';
import { streamChatWithAI } from '@/lib/ai';

export async function POST(req: NextRequest) {
  try {
    const { message, conversationHistory } = await req.json();

    if (!message || typeof message !== 'string') {
      return new Response('Invalid message', { status: 400 });
    }

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of streamChatWithAI(message, conversationHistory || [])) {
            controller.enqueue(encoder.encode(chunk));
          }
          controller.close();
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'An error occurred';
          controller.enqueue(encoder.encode(errorMessage));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response('Internal server error', { status: 500 });
  }
}
