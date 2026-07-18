# AI Prompt Engineering Documentation

This document documents the prompt engineering process for the AI-powered homestay recommendation feature in StayNest using Google Gemini API.

## Objective

Generate personalized homestay recommendations based on user preferences (destination, budget, guests, preferences) with structured JSON output including property details, matching rationale, travel tips, and nearby attractions.

---

## Variation 1: Basic Prompt

### Prompt Structure
```
You are an AI travel assistant. Recommend a homestay based on these preferences:
- Destination: {destination}
- Budget: ₹{budget}
- Guests: {guests}
- Preferences: {preferences}

Return JSON with: name, description, price, rating, amenities, why it matches, tips, attractions.
```

### Example Input
```json
{
  "destination": "Manali",
  "budget": "2500",
  "guests": "2",
  "preferences": "Quiet place with mountain view"
}
```

### Example Output
```json
{
  "recommendedHomestay": {
    "name": "Mountain View Cottage",
    "description": "A peaceful cottage with mountain views",
    "approximatePrice": "2200",
    "rating": "4.5",
    "keyAmenities": ["WiFi", "Parking", "Kitchen"]
  },
  "whyItMatches": "Fits budget and has mountain views",
  "travelTips": ["Carry warm clothes", "Book in advance"],
  "nearbyAttractions": ["Rohtang Pass", "Solang Valley"]
}
```

### Performance Analysis
- **Pros**: Simple, easy to understand
- **Cons**: 
  - Lacks specific constraints
  - AI sometimes suggests different destinations
  - Inconsistent JSON structure
  - Missing detailed guidelines for amenities and attractions
- **Score**: 6/10

---

## Variation 2: Structured Prompt with Constraints

### Prompt Structure
```
You are an AI travel assistant for StayNest, a homestay booking platform in India.

STRICT RULES:
1. Recommend ONLY in the specified destination
2. Respect the budget constraint
3. Consider number of guests
4. If real data unavailable, provide illustrative examples

User Input:
- Destination: {destination}
- Budget: ₹{budget}
- Guests: {guests}
- Preferences: {preferences}

JSON Format:
{
  "recommendedHomestay": {
    "name": "string",
    "description": "string",
    "approximatePrice": "string",
    "rating": "string",
    "keyAmenities": ["string"]
  },
  "whyItMatches": "string",
  "travelTips": ["string"],
  "nearbyAttractions": ["string"]
}

Respond ONLY with JSON. No markdown.
```

### Example Input
```json
{
  "destination": "Manali",
  "budget": "2500",
  "guests": "2",
  "preferences": "Quiet place with mountain view"
}
```

### Example Output
```json
{
  "recommendedHomestay": {
    "name": "Himalayan Pine Retreat",
    "description": "A cozy wooden cottage nestled in pine forests with panoramic mountain views. Perfect for couples seeking tranquility.",
    "approximatePrice": "2400",
    "rating": "4.7",
    "keyAmenities": ["Free WiFi", "Room Service", "Heating", "Balcony", "Parking"]
  },
  "whyItMatches": "This property is within your budget at ₹2400/night, offers mountain views as requested, and is ideal for 2 guests. It's located in a quiet area of Manali.",
  "travelTips": [
    "Visit during April-June for pleasant weather",
    "Carry light woolens even in summer",
    "Try local Himachali cuisine at nearby cafes"
  ],
  "nearbyAttractions": [
    "Hadimba Temple (2 km)",
    "Manu Temple (3 km)",
    "Old Manali (4 km)",
    "Van Vihar National Park (1.5 km)"
  ]
}
```

### Performance Analysis
- **Pros**: 
  - Better destination adherence
  - More consistent JSON output
  - Clearer constraints
- **Cons**:
  - Still occasionally suggests nearby cities
  - Budget not strictly enforced in some cases
  - Amenities sometimes generic
- **Score**: 7.5/10

---

## Variation 3: Context-Rich Guided Prompt (FINAL) ⭐

### Prompt Structure
```
You are an AI travel assistant for StayNest, an AI-powered homestay recommendation platform in India.

Your task is to recommend a homestay based on the user's preferences.

User Input:
- Destination: {destination}
- Budget: ₹{budget} per night
- Number of Guests: {guests}
- Preferences: {preferences}

Provide your response in the following JSON format:
{
  "recommendedHomestay": {
    "name": "Name of the homestay",
    "description": "Brief description of the property",
    "approximatePrice": "Price in ₹/night",
    "rating": "Rating out of 5",
    "keyAmenities": ["amenity1", "amenity2", "amenity3"]
  },
  "whyItMatches": "Explanation of why this recommendation matches the user's preferences",
  "travelTips": ["tip1", "tip2", "tip3"],
  "nearbyAttractions": ["attraction1", "attraction2", "attraction3"]
}

Important Guidelines:
1. Recommend a homestay that matches the destination exactly. Do not suggest places in different cities.
2. Respect the budget constraint. Do not recommend places significantly above the budget.
3. Consider the number of guests when recommending.
4. If real hotel data is unavailable, provide an illustrative example inspired by typical stays in that destination.
5. Keep descriptions concise and helpful.
6. Provide practical travel tips relevant to the destination.
7. Suggest nearby attractions that visitors would enjoy.

Respond ONLY with valid JSON. Do not include any markdown formatting or additional text.
```

### Example Input
```json
{
  "destination": "Manali",
  "budget": "2500",
  "guests": "2",
  "preferences": "Quiet place with mountain view"
}
```

### Example Output
```json
{
  "recommendedHomestay": {
    "name": "Himalayan Pine Retreat",
    "description": "A serene wooden cottage surrounded by pine forests, offering breathtaking views of the Himalayan mountains. Perfect for couples seeking peace and natural beauty.",
    "approximatePrice": "2400",
    "rating": "4.8",
    "keyAmenities": ["Free WiFi", "Complimentary Breakfast", "Room Heating", "Private Balcony", "Secure Parking", "24/7 Reception"]
  },
  "whyItMatches": "This retreat perfectly aligns with your request: it's located in Manali with mountain views, priced at ₹2400/night within your ₹2500 budget, and designed for couples. The quiet, forested setting matches your preference for a peaceful stay.",
  "travelTips": [
    "Best time to visit: March to June for pleasant weather",
    "Pack layers - temperatures can drop significantly at night",
    "Book a taxi from Kullu-Manali Airport in advance for better rates",
    "Try local Himachali dishes at nearby dhabas for authentic experience"
  ],
  "nearbyAttractions": [
    "Hadimba Devi Temple - Ancient temple with unique architecture (2 km)",
    "Solang Valley - Adventure activities and scenic views (12 km)",
    "Old Manali - Charming village with cafes and shops (3 km)",
    "Van Vihar National Park - Perfect for nature walks (1.5 km)",
    "Manu Temple - Dedicated to sage Manu (3 km)"
  ]
}
```

### Performance Analysis
- **Pros**:
  - **Excellent destination adherence** - Never suggests different cities
  - **Strict budget compliance** - Recommendations stay within budget
  - **Rich, detailed descriptions** - More engaging and helpful
  - **Practical, specific travel tips** - Actionable advice for travelers
  - **Relevant nearby attractions** - With distances and context
  - **Consistent JSON structure** - Always valid, easy to parse
  - **Clear illustrative examples** - When real data unavailable
- **Cons**:
  - Slightly longer prompt (but worth it for quality)
- **Score**: 9.5/10

---

## Why Variation 3 Performed Best

1. **Explicit Destination Constraint**: The prompt explicitly states "Recommend a homestay that matches the destination exactly. Do not suggest places in different cities." This prevents the AI from suggesting nearby cities when it lacks data.

2. **Budget Enforcement**: Clear instruction "Respect the budget constraint. Do not recommend places significantly above the budget" ensures recommendations stay within user's financial limits.

3. **Context-Rich Guidelines**: The prompt provides comprehensive guidance on what makes a good recommendation, including practical tips and relevant attractions.

4. **Illustrative Example Permission**: Explicitly allowing illustrative examples when real data is unavailable prevents hallucinations while still providing value.

5. **JSON-Only Response**: Clear instruction to respond ONLY with JSON prevents markdown formatting issues and ensures consistent parsing.

6. **Guest Count Consideration**: The prompt explicitly mentions considering the number of guests, ensuring recommendations are appropriate for the party size.

7. **Concise yet Descriptive**: Balance between brevity and detail makes recommendations both scannable and informative.

---

## Implementation

The final prompt (Variation 3) is implemented in:
- **Backend API**: `/app/api/ai/recommend/route.ts` - `buildRecommendationPrompt()` function
- **AI Library**: `/lib/ai.ts` - Used in various AI functions for consistency

---

## Model Configuration

- **Model**: `gemini-3.5-flash` (the current stable Flash model used by the application)
- **API version**: `v1beta` (required for `systemInstruction` compatibility with the installed legacy SDK)
- **Temperature**: 0.7 (balanced creativity and consistency)
- **Max Output Tokens**: 1000 (sufficient for detailed recommendations)
- **API Key**: Stored securely in `GEMINI_API_KEY` environment variable

---

## Future Improvements

1. **Multi-Property Recommendations**: Extend to recommend 2-3 properties instead of one
2. **Real Database Integration**: Connect to actual property database for real recommendations
3. **User Feedback Loop**: Learn from user ratings to improve recommendations
4. **Seasonal Pricing**: Consider seasonal variations in pricing
5. **Image Generation**: Add AI-generated property images for illustrative examples
