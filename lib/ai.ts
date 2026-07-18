import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_MODEL = 'gemini-3.5-flash';
const GEMINI_REQUEST_OPTIONS = { apiVersion: 'v1beta' };

function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured');
  }
  return new GoogleGenerativeAI(apiKey);
}

function getGeminiModel(params: Parameters<GoogleGenerativeAI['getGenerativeModel']>[0]) {
  return getGeminiClient().getGenerativeModel(params, GEMINI_REQUEST_OPTIONS);
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
    const model = getGeminiModel({ model: GEMINI_MODEL });

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

    const prompt = `You are an AI assistant for StayNest, a homestay booking platform.
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
}

User query: ${query}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from response (Gemini may add markdown formatting)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const jsonString = jsonMatch ? jsonMatch[0] : text;
    const parsedResult = JSON.parse(jsonString);

    return parsedResult as AIPropertySearchResult;
  } catch (error) {
    if (error instanceof Error && error.message === 'GEMINI_API_KEY is not configured') {
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
    const model = getGeminiModel({ model: GEMINI_MODEL });

    const prompt = `You are an expert travel planner for StayNest.
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
}

Plan a ${duration}-day trip to ${destination} for ${people} people with a budget of ₹${budget}. ${preferences || ''}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from response (Gemini may add markdown formatting)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const jsonString = jsonMatch ? jsonMatch[0] : text;
    const parsedResult = JSON.parse(jsonString);

    return parsedResult as AITripPlan;
  } catch (error) {
    if (error instanceof Error && error.message === 'GEMINI_API_KEY is not configured') {
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
    const model = getGeminiModel({ model: GEMINI_MODEL });

    const reviewsText = reviews
      .map((r, i) => `Review ${i + 1} (${r.rating}/5): ${r.comment}`)
      .join('\n');

    const prompt = `You are an AI assistant for StayNest.
Summarize reviews for a property and provide actionable insights.

Respond in JSON format with this structure:
{
  "overall": "2-3 sentence overall summary",
  "pros": ["pro 1", "pro 2"],
  "cons": ["con 1", "con 2"],
  "recommendation": "final recommendation",
  "rating": overall rating out of 5
}

Summarize these reviews for ${propertyName}:\n\n${reviewsText}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from response (Gemini may add markdown formatting)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const jsonString = jsonMatch ? jsonMatch[0] : text;
    const parsedResult = JSON.parse(jsonString);

    return parsedResult as AIReviewSummary;
  } catch (error) {
    if (error instanceof Error && error.message === 'GEMINI_API_KEY is not configured') {
      throw new Error('AI features are unavailable until an API key is configured');
    }
    throw error;
  }
}

export interface ChatProperty {
  id: string;
  title: string;
  description: string;
  city: string;
  country: string;
  pricePerNight: number;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  amenities: string[];
  rating: number;
  category: string | null;
  aiTags: string[];
}

const CHAT_GENERATION_CONFIG = {
  temperature: 0.2,
  topP: 0.8,
  topK: 20,
  maxOutputTokens: 900,
};

const RESTRICTED_PROPERTY_TERMS = /\b(hotel|resort|hostel)\b/i;

function isIndianHomestay(property: ChatProperty) {
  const searchable = `${property.title} ${property.description} ${property.category ?? ''}`;
  return property.country.trim().toLowerCase() === 'india' && !RESTRICTED_PROPERTY_TERMS.test(searchable);
}

function toChatHistory(history: Array<{ role: 'user' | 'assistant'; content: string }>) {
  const cleaned = history
    .slice(-8)
    .filter((item) => item.content.trim())
    .map((item) => ({
      role: item.role === 'assistant' ? 'model' as const : 'user' as const,
      parts: [{ text: item.content.slice(0, 2_000) }],
    }));

  const firstUser = cleaned.findIndex((item) => item.role === 'user');
  return firstUser === -1 ? [] : cleaned.slice(firstUser);
}

// Streaming AI Chat. The database, not the model, is the source of truth for listings.
export async function* streamChatWithAI(
  message: string,
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }> = [],
  properties: ChatProperty[] = []
): AsyncGenerator<string, void, unknown> {
  const indianHomestays = properties.filter(isIndianHomestay);
  const propertyContext = indianHomestays.length
    ? indianHomestays.map((property) => [
      `ID: ${property.id}`,
      `Name: ${property.title}`,
      `Location: ${property.city}, India`,
      `Price: ₹${property.pricePerNight}/night`,
      `Capacity: ${property.guests} guests`,
      `Rating: ${property.rating}/5`,
      `Amenities: ${property.amenities.join(', ') || 'Not listed'}`,
      `Details: ${property.description.slice(0, 350)}`,
    ].join(' | ')).join('\n')
    : 'No eligible Indian homestays are currently listed.';

  const systemInstruction = `You are StayNest's Indian-homestay concierge. Use only the verified listings below.

Non-negotiable rules:
- StayNest recommends Indian homestays only. Never recommend or discuss booking hotels, resorts, hostels, or any international destination. If asked for one, briefly explain the scope and ask for an Indian homestay destination.
- Never invent a property, price, rating, amenity, availability, city, or destination.
- A recommendation request with a destination and nightly budget must contain exactly three distinct listings, all in that exact destination, all at or below the budget, and all from VERIFIED LISTINGS. If fewer than three qualify, do not substitute nearby/over-budget properties; say so and ask one concise follow-up question.
- Before recommendations, ask one concise question only when the destination or nightly budget is missing or ambiguous.
- For each of exactly three matches, use this exact readable format:
  **1. Property name** — ₹price/night · rating/5
  Amenities: amenity, amenity
  Why it fits: one sentence
- For non-listing travel questions, give short India-only advice. Do not name accommodation types other than homestays.
- Be concise (under 220 words), helpful, and use Markdown with blank lines between recommendations.

VERIFIED LISTINGS (all eligible Indian homestays):
${propertyContext}`;

  const model = getGeminiModel({
    model: GEMINI_MODEL,
    systemInstruction,
    generationConfig: CHAT_GENERATION_CONFIG,
  });
  const chat = model.startChat({ history: toChatHistory(conversationHistory) });
  const result = await chat.sendMessageStream(message.slice(0, 2_000));

  for await (const chunk of result.stream) {
    const text = chunk.text();
    if (text) yield text;
  }
}
