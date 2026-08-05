# 🏡 StayNest - AI Homestay Assistant

An AI-powered full-stack web application that connects travelers with local homestays while providing personalized recommendations using Artificial Intelligence.

[![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22.0-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=flat-square&logo=vercel)](https://vercel.com/)
[![AI](https://img.shields.io/badge/AI-Gemini-8E75B5?style=flat-square&logo=google)](https://ai.google.dev/)

## 📌 Live Demo

**Live Website:** https://ai-homestay-assistant-3mei.vercel.app

**Demo Video:** Coming Soon

## ✨ Features

### User Authentication
- Secure user registration with email/password
- Login with credentials or Google OAuth
- Protected routes with middleware-based authentication
- User profile management with avatar support
- Role-based access control (USER/ADMIN)

### Property Management
- Add, edit, and delete property listings
- Upload multiple property images
- Specify amenities, pricing, and capacity
- Set instant booking availability
- Eco-score and superhost badges
- AI-powered property tagging

### Property Discovery
- Browse and search properties by city, category, and amenities
- Advanced filtering by price, rating, guest capacity, and eco-score
- AI-powered personalized recommendations
- Smart travel suggestions based on user preferences
- Wishlist functionality to save favorite properties

### Booking System
- Book properties with custom date ranges
- Real-time availability checking
- Booking status tracking (PENDING, CONFIRMED, CANCELLED, COMPLETED)
- Booking history and management
- Automatic price calculation

### Reviews & Ratings
- Submit reviews with ratings and comments
- View property reviews and average ratings
- AI-powered review summaries
- Review history per user

### AI-Powered Features
- Personalized property recommendations using Google Gemini API
- AI Travel Assistant chat for trip planning
- AI Review Summary for quick insights
- Smart property categorization and tagging

### Host Dashboard
- Manage hosted properties
- View booking requests and confirm/cancel
- Track revenue and analytics
- Property performance metrics

## 🛠 Tech Stack

### Frontend
- **Next.js 15.3.5** - React framework with App Router
- **React 19.2.4** - UI library
- **TypeScript 5.9.3** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion 12.42.0** - Animation library
- **Lucide React 1.22.0** - Icon library

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **NextAuth.js 4.24.14** - Authentication solution
- **Prisma ORM 5.22.0** - Database ORM
- **bcryptjs 2.4.3** - Password hashing
- **jsonwebtoken 9.0.3** - JWT token generation
- **Zod 3.24.1** - Schema validation

### Database
- **PostgreSQL** - Relational database (hosted on Supabase)
- **Prisma Client** - Type-safe database client

### Authentication
- **NextAuth.js** - Complete authentication solution
- **Credentials Provider** - Email/password authentication
- **Google OAuth** - Social authentication
- **JWT Strategy** - Token-based session management

### AI/LLM
- **Google Gemini API** - AI-powered recommendations and chat
- **@google/generative-ai 0.24.1** - Gemini SDK

### Deployment
- **Vercel** - Cloud platform for Next.js applications
- **Supabase** - PostgreSQL hosting and authentication

## ⚙ Setup Instructions

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (Supabase recommended)
- Google Cloud Project with Gemini API enabled
- Google OAuth credentials (optional)

### Clone Repository

```bash
git clone https://github.com/sachinmishra12046-cyber/ai-homestay-assistant.git
cd ai-homestay-assistant
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# Database
DATABASE_URL="postgresql://user:password@host:port/database"
DIRECT_DATABASE_URL="postgresql://user:password@host:port/database"

# Authentication
JWT_SECRET="your-jwt-secret-key"
NEXTAUTH_SECRET="your-nextauth-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# AI
GEMINI_API_KEY="your-gemini-api-key"
```

### Database Setup

Generate Prisma Client:

```bash
npx prisma generate
```

Push database schema:

```bash
npx prisma db push
```

Seed database (optional):

```bash
npm run prisma:seed
```

### Run Locally

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📡 API Documentation

### Authentication Endpoints

#### POST /api/auth/register
Register a new user.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "user": {
    "id": "clxxx",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### POST /api/auth/login
Authenticate user with credentials.

**Request:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "clxxx",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### GET /api/auth/me
Get current authenticated user.

**Response:**
```json
{
  "id": "clxxx",
  "name": "John Doe",
  "email": "john@example.com",
  "avatar": null
}
```

### Property Endpoints

#### GET /api/properties
Get all properties with optional filters.

**Query Parameters:**
- `city` - Filter by city
- `category` - Filter by category
- `minPrice` - Minimum price per night
- `maxPrice` - Maximum price per night
- `minRating` - Minimum rating
- `guests` - Number of guests

**Response:**
```json
{
  "properties": [
    {
      "id": "clxxx",
      "title": "Cozy Mountain Cabin",
      "description": "A peaceful retreat...",
      "city": "Manali",
      "country": "India",
      "pricePerNight": 2500,
      "rating": 4.5,
      "images": ["url1", "url2"],
      "amenities": ["WiFi", "Kitchen"]
    }
  ],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 10
  }
}
```

#### GET /api/properties/:id
Get property details by ID.

**Response:**
```json
{
  "id": "clxxx",
  "title": "Cozy Mountain Cabin",
  "description": "A peaceful retreat...",
  "city": "Manali",
  "country": "India",
  "address": "123 Mountain Road",
  "pricePerNight": 2500,
  "bedrooms": 2,
  "bathrooms": 1,
  "guests": 4,
  "rating": 4.5,
  "images": ["url1", "url2"],
  "amenities": ["WiFi", "Kitchen"],
  "host": {
    "name": "Jane Smith",
    "avatar": null
  },
  "reviews": [
    {
      "rating": 5,
      "comment": "Amazing stay!",
      "user": {
        "name": "John Doe"
      }
    }
  ]
}
```

### Booking Endpoints

#### GET /api/bookings
Get user's booking history.

**Response:**
```json
{
  "bookings": [
    {
      "id": "clxxx",
      "property": {
        "id": "clxxx",
        "title": "Cozy Mountain Cabin",
        "images": ["url1"]
      },
      "checkIn": "2024-01-15T00:00:00.000Z",
      "checkOut": "2024-01-20T00:00:00.000Z",
      "totalPrice": 12500,
      "status": "CONFIRMED"
    }
  ]
}
```

#### POST /api/bookings
Create a new booking.

**Request:**
```json
{
  "propertyId": "clxxx",
  "checkIn": "2024-01-15",
  "checkOut": "2024-01-20"
}
```

**Response:**
```json
{
  "id": "clxxx",
  "propertyId": "clxxx",
  "checkIn": "2024-01-15T00:00:00.000Z",
  "checkOut": "2024-01-20T00:00:00.000Z",
  "totalPrice": 12500,
  "status": "PENDING"
}
```

### Wishlist Endpoints

#### GET /api/wishlist
Get user's wishlist.

**Response:**
```json
{
  "wishlist": [
    {
      "id": "clxxx",
      "property": {
        "id": "clxxx",
        "title": "Cozy Mountain Cabin",
        "pricePerNight": 2500,
        "rating": 4.5,
        "images": ["url1"]
      }
    }
  ]
}
```

#### POST /api/wishlist
Add property to wishlist.

**Request:**
```json
{
  "propertyId": "clxxx"
}
```

**Response:**
```json
{
  "id": "clxxx",
  "propertyId": "clxxx",
  "userId": "clxxx"
}
```

### AI Endpoints

#### POST /api/ai/recommend
Get AI-powered property recommendations.

**Request:**
```json
{
  "preferences": "I want a peaceful mountain cabin with WiFi under ₹5000"
}
```

**Response:**
```json
{
  "recommendations": [
    {
      "propertyId": "clxxx",
      "reason": "This cabin matches your preference for peaceful mountain settings with WiFi and is within your budget",
      "matchScore": 0.95
    }
  ]
}
```

#### POST /api/chat
Chat with AI Travel Assistant.

**Request:**
```json
{
  "message": "What are the best places to visit in Manali?"
}
```

**Response:**
```json
{
  "response": "Manali offers beautiful attractions like Rohtang Pass, Solang Valley, Hadimba Temple, and Old Manali..."
}
```

## 📂 Project Architecture

```
ai-homestay-assistant/
├── app/                          # Next.js App Router
│   ├── about/                    # About page
│   ├── admin/                    # Admin dashboard
│   ├── ai-assistant/             # AI assistant page
│   ├── api/                      # API routes
│   │   ├── ai/                   # AI endpoints
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── bookings/             # Booking endpoints
│   │   ├── chat/                 # Chat endpoint
│   │   ├── host/                 # Host endpoints
│   │   ├── properties/           # Property endpoints
│   │   ├── recommendations/       # Recommendation endpoint
│   │   └── wishlist/             # Wishlist endpoint
│   ├── bookings/                 # Bookings page
│   ├── dashboard/                # User dashboard
│   ├── explore/                  # Property exploration
│   ├── forgot-password/          # Password recovery
│   ├── host/                     # Host dashboard
│   ├── login/                    # Login page
│   ├── profile/                  # User profile
│   ├── property/                 # Property details
│   ├── reset-password/           # Password reset
│   ├── settings/                 # User settings
│   ├── signup/                   # Registration page
│   ├── trip-planner/             # Trip planning
│   ├── wishlist/                 # Wishlist page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
├── components/                    # React components
│   ├── AIRecommendation.tsx      # AI recommendation component
│   ├── AIReviewSummary.tsx       # AI review summary
│   ├── ChatWidget.tsx            # Chat widget
│   ├── Hero.tsx                  # Hero section
│   ├── Navbar.tsx                # Navigation bar
│   ├── Footer.tsx                # Footer
│   ├── StayCard.tsx              # Property card
│   ├── auth/                     # Auth components
│   ├── explore/                  # Explore page components
│   ├── providers/                # Context providers
│   ├── settings/                 # Settings components
│   └── ui/                       # UI components
├── context/                      # React contexts
│   ├── AuthProvider.tsx          # Authentication context
│   └── WishlistProvider.tsx      # Wishlist context
├── lib/                          # Utility libraries
│   ├── auth.ts                   # Auth utilities
│   ├── authOptions.ts            # NextAuth config
│   ├── prisma.ts                 # Prisma client
│   └── apiAuth.ts                # API auth middleware
├── prisma/                       # Prisma ORM
│   ├── schema.prisma             # Database schema
│   └── seed.ts                   # Database seed
├── public/                       # Static assets
├── middleware.ts                 # NextAuth middleware
├── next.config.ts               # Next.js configuration
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies
```

## 🗄 Database Schema

### Models

**User**
- id, name, email, password, phone, avatar, role
- Relations: bookings, properties, reviews, wishlist

**Property**
- id, title, description, city, country, address, pricePerNight
- bedrooms, bathrooms, guests, images, amenities, rating
- hostId, category, aiTags, ecoScore, latitude, longitude
- isSuperhost, isInstantBook
- Relations: bookings, host, reviews, wishlist

**Booking**
- id, userId, propertyId, checkIn, checkOut, totalPrice, status
- Relations: property, user

**Wishlist**
- id, userId, propertyId, createdAt
- Relations: property, user

**Review**
- id, userId, propertyId, rating, comment, createdAt
- Relations: property, user

### Enums

**UserRole**: USER, ADMIN

**BookingStatus**: PENDING, CONFIRMED, CANCELLED, COMPLETED

## ⚠ Known Limitations

- The application is deployed on Vercel Free Tier, which may result in cold starts or slightly slower response times after periods of inactivity
- Database uses Supabase Free Tier with connection and storage limits
- Gemini API usage depends on free-tier quotas and rate limits
- Google OAuth requires active internet connection and valid Google credentials
- Performance may vary depending on free-tier resource availability
- No payment gateway integration (bookings are manual)
- No real-time chat between users and hosts
- Maps integration is not implemented
- Multi-language support is not available

## 🙏 Credits & Acknowledgements

This project was developed as a Summer Internship Capstone Project at Graphic Era University, Cyber Security department.

**Author:** Sachin Mishra

**Technologies Used:**
- Next.js, React, TypeScript, Tailwind CSS
- Prisma ORM, PostgreSQL (Supabase)
- NextAuth.js, Google OAuth
- Google Gemini API
- Vercel for deployment

**Special Thanks:**
- Graphic Era University for the internship opportunity
- The open-source community for the amazing libraries and tools

---

**License:** This project is developed for educational and internship purposes.
