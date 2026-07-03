import OpenAI from 'openai';

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured');
  }
  return new OpenAI({ apiKey });
}

export interface Property {
  id: string;
  title: string;
  description: string;
  city: string;
  country: string;
  address: string;
  pricePerNight: number;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  images: string[];
  amenities: string[];
  rating: number;
}

export interface AIPropertySearchResult {
  query: string;
  filters: {
    location?: string;
    budget?: {
      min: number;
      max: number;
    };
    guests?: number;
    bedrooms?: number;
    amenities?: string[];
    keywords?: string[];
  };
  explanation: string;
}

export interface AITripPlan {
  destination: string;
  duration: number;
  budget: number;
  people: number;
  dailyItinerary: {
    day: number;
    activities: string[];
    meals: string[];
    accommodation: string;
    estimatedCost: number;
  }[];
  totalEstimatedCost: number;
  tips: string[];
  packingList: string[];
  weatherInfo: string;
}

export interface AIReviewSummary {
  overall: string;
  pros: string[];
  cons: string[];
  recommendation: string;
  rating: number;
}

// AI Property Search - Natural Language to Filters
export async function searchPropertiesWithAI(
  query: string,
  availableProperties: Property[]
): Promise<AIPropertySearchResult> {
  try {
    const openai = getOpenAIClient();
    const propertyContext = availableProperties
      .map(
        (p) => `
- ${p.title} in ${p.city}, ${p.country}
  Price: ₹${p.pricePerNight}/night
  Guests: ${p.guests}, Bedrooms: ${p.bedrooms}, Bathrooms: ${p.bathrooms}
  Amenities: ${p.amenities.join(', ')}
  Rating: ${p.rating}
  Description: ${p.description}
`
      )
      .join('\n');

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an AI assistant for StayNest, a homestay booking platform. 
Your task is to understand natural language search queries and extract structured filters.

Available properties:
${propertyContext}

Extract the following filters from the user's query:
- location: City or region
- budget: Min and max price per night
- guests: Number of people
- bedrooms: Number of bedrooms needed
- amenities: Required amenities
- keywords: Important keywords from the query

Respond in JSON format with this structure:
{
  "query": "original query",
  "filters": {
    "location": "city name",
    "budget": { "min": 0, "max": 0 },
    "guests": 0,
    "bedrooms": 0,
    "amenities": ["wifi", "parking"],
    "keywords": ["peaceful", "mountain"]
  },
  "explanation": "brief explanation of what you understood"
}`,
        },
        {
          role: 'user',
          content: query,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3,
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    return result as AIPropertySearchResult;
  } catch (error) {
    if (error instanceof Error && error.message === 'OPENAI_API_KEY is not configured') {
      throw new Error('AI features are unavailable until an API key is configured');
    }
    throw error;
  }
}

// AI Trip Planner
export async function generateTripPlan(
  destination: string,
  duration: number,
  budget: number,
  people: number,
  preferences?: string
): Promise<AITripPlan> {
  try {
    const openai = getOpenAIClient();
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an expert travel planner for StayNest. 
Generate detailed trip itineraries based on user preferences.

Respond in JSON format with this structure:
{
  "destination": "destination name",
  "duration": number of days,
  "budget": total budget,
  "people": number of people,
  "dailyItinerary": [
    {
      "day": 1,
      "activities": ["activity 1", "activity 2"],
      "meals": ["breakfast suggestion", "lunch suggestion", "dinner suggestion"],
      "accommodation": "type of accommodation suggestion",
      "estimatedCost": daily cost
    }
  ],
  "totalEstimatedCost": total cost,
  "tips": ["tip 1", "tip 2"],
  "packingList": ["item 1", "item 2"],
  "weatherInfo": "weather advice"
}`,
        },
        {
          role: 'user',
          content: `Plan a ${duration}-day trip to ${destination} for ${people} people with a budget of ₹${budget}. ${preferences || ''}`,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    return result as AITripPlan;
  } catch (error) {
    if (error instanceof Error && error.message === 'OPENAI_API_KEY is not configured') {
      throw new Error('AI features are unavailable until an API key is configured');
    }
    throw error;
  }
}

// AI Review Summary
export async function summarizeReviews(
  propertyName: string,
  reviews: Array<{ rating: number; comment: string }>
): Promise<AIReviewSummary> {
  try {
    const openai = getOpenAIClient();
    const reviewsText = reviews
      .map((r, i) => `Review ${i + 1} (${r.rating}/5): ${r.comment}`)
      .join('\n');

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an AI assistant for StayNest. 
Summarize reviews for a property and provide actionable insights.

Respond in JSON format with this structure:
{
  "overall": "2-3 sentence overall summary",
  "pros": ["pro 1", "pro 2"],
  "cons": ["con 1", "con 2"],
  "recommendation": "final recommendation",
  "rating": overall rating out of 5
}`,
        },
        {
          role: 'user',
          content: `Summarize these reviews for ${propertyName}:\n\n${reviewsText}`,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.5,
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    return result as AIReviewSummary;
  } catch (error) {
    if (error instanceof Error && error.message === 'OPENAI_API_KEY is not configured') {
      throw new Error('AI features are unavailable until an API key is configured');
    }
    throw error;
  }
}

// AI Chat Assistant
export async function chatWithAI(
  message: string,
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }> = []
): Promise<string> {
  try {
    const openai = getOpenAIClient();
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a helpful AI travel assistant for StayNest, an AI-powered homestay recommendation platform in India.

Your capabilities:
- Help users find homestays based on their preferences
- Provide travel recommendations and tips
- Assist with trip planning
- Answer questions about destinations in India
- Suggest activities and experiences

Be friendly, helpful, and concise. Focus on providing actionable advice.
If you don't have specific information about a property, suggest general recommendations.`,
        },
        ...conversationHistory,
        {
          role: 'user',
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return response.choices[0].message.content || 'Sorry, I could not generate a response.';
  } catch (error) {
    if (error instanceof Error && error.message === 'OPENAI_API_KEY is not configured') {
      throw new Error('AI features are unavailable until an API key is configured');
    }
    throw error;
  }
}

// Streaming AI Chat
export async function* streamChatWithAI(
  message: string,
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }> = []
): AsyncGenerator<string, void, unknown> {
  try {
    const openai = getOpenAIClient();
    const stream = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a helpful AI travel assistant for StayNest, an AI-powered homestay recommendation platform in India.

Your capabilities:
- Help users find homestays based on their preferences
- Provide travel recommendations and tips
- Assist with trip planning
- Answer questions about destinations in India
- Suggest activities and experiences

Be friendly, helpful, and concise. Focus on providing actionable advice.`,
        },
        ...conversationHistory,
        {
          role: 'user',
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        yield content;
      }
    }
  } catch (error) {
    if (error instanceof Error && error.message === 'OPENAI_API_KEY is not configured') {
      yield 'AI features are unavailable until an API key is configured.';
    } else {
      yield 'Sorry, I encountered an error. Please try again.';
    }
  }
}
