# 🏡 AI Homestay Assistant

An AI-powered full-stack web application that connects travelers with local homestays while providing personalized recommendations using Artificial Intelligence.

---

# 📌 Project Overview

AI Homestay Assistant helps travelers discover unique homestays instead of traditional hotels. The platform allows users to browse properties, make bookings, save favorites, and receive AI-powered travel recommendations based on their interests and preferences.

---

# ✨ Features

## 👤 User Authentication

- User Registration
- Login & Logout
- Protected Routes
- Google Authentication
- User Profile

---

## 🏠 Property Management

- Add Property
- Edit Property
- Delete Property
- Property Details
- Property Images
- Amenities
- Instant Booking Option

---

## 🔍 Explore

- Browse Properties
- Search Properties
- Filter by City
- Filter by Rating
- Property Categories

---

## ❤️ Wishlist

- Save Property
- Remove Property
- View Wishlist

---

## 📅 Booking

- Book Property
- Booking History
- Booking Status
- Booking Confirmation

---

## ⭐ Reviews

- Add Review
- Rating System
- Comments
- Review History

---

## 🤖 AI Features

- Personalized Property Recommendations
- Smart Travel Suggestions
- AI Review Summary
- AI Travel Assistant Chat

---

# � Deployment Documentation

## Live Frontend URL
https://ai-homestay-assistant-3mei.vercel.app

## Live Backend URL
https://ai-homestay-assistant-3mei.vercel.app

The backend is implemented using Next.js API Routes and is deployed on the same Vercel application.

---

## Tech Stack

### Frontend
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS

### Backend
- Next.js API Routes
- NextAuth.js
- Prisma ORM

### Database
- PostgreSQL (Supabase)

### Authentication
- NextAuth.js
- Credentials Authentication
- Google OAuth

### AI
- Google Gemini API

### Deployment
- Vercel

---

## Known Limitations (Free Tier)

The application is deployed on the Vercel Free Tier and uses the Supabase Free Tier for database services. As a result:

- Cold starts or slightly slower response times may occur after periods of inactivity
- Gemini API usage depends on free-tier quotas and rate limits
- Google OAuth requires an active internet connection and valid Google credentials
- Performance may vary depending on free-tier resource availability

---

# �🛠 Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

## Backend

- Next.js API Routes

## Database

- PostgreSQL

## ORM

- Prisma ORM

## Authentication

- JWT
- Google OAuth

## AI

- OpenAI / Gemini API

---

# 📂 Project Structure

```
app/
components/
context/
hooks/
lib/
prisma/
public/
```

---

# 🗄 Database Schema

The project contains the following database models:

- User
- Property
- Booking
- Wishlist
- Review

---

# 📡 API Endpoints

### Authentication

- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout
- GET /api/auth/me

---

### Properties

- GET /api/properties
- GET /api/properties/:id

---

### Bookings

- GET /api/bookings
- POST /api/bookings

---

### Wishlist

- GET /api/wishlist
- POST /api/wishlist

---

### Recommendations

- GET /api/recommendations

---

# ⚙ Installation

Clone repository

```bash
git clone https://github.com/your-username/ai-homestay-assistant.git
```

Go to project

```bash
cd ai-homestay-assistant
```

Install dependencies

```bash
npm install
```

Create environment file

```bash
cp .env.example .env
```

Run project

```bash
npm run dev
```

---

# Environment Variables

```
DATABASE_URL=
DIRECT_DATABASE_URL=

JWT_SECRET=
NEXTAUTH_SECRET=
# Vercel Production: https://your-production-domain (no quotes or path)
NEXTAUTH_URL=https://your-app.vercel.app

GOOGLE_CLIENT_ID=

GOOGLE_CLIENT_SECRET=

OPENAI_API_KEY=
```

---

# Prisma Commands

Generate Client

```bash
npx prisma generate
```

Push Database

```bash
npx prisma db push
```

Seed Database

```bash
npx prisma db seed
```

Open Prisma Studio

```bash
npx prisma studio
```

---

# Screenshots

## Home Page

(Add Screenshot)

---

## Explore Page

(Add Screenshot)

---

## Property Page

(Add Screenshot)

---

## Booking Page

(Add Screenshot)

---

## Dashboard

(Add Screenshot)

---

# Future Improvements

- Payment Gateway
- Live Chat
- Maps Integration
- Voice Assistant
- AI Trip Planner
- Recommendation Engine
- Multi-language Support

---

# Author

Sachin Mishra

Graphic Era University

Cyber Security

Summer Internship Project

---

## 🗄️ Database

### Database Choice
We chose PostgreSQL (via Supabase) over MongoDB because StayNest's data is highly relational — Users, Properties, Bookings, Reviews, and Wishlist all have clear foreign-key relationships.

### Schema Diagram
![StayNest Schema Diagram](./docs/W5_SchemaDiagram_TBI-26101269.png)

Entities:
- User — guest/host accounts, auth info
- Property — listings created by hosts
- Booking — links User + Property with dates and status
- Review — ratings and comments on Properties
- Wishlist — saved Properties per User

### Set Up the Database

1. Install dependencies:
```bash
npm install
```

2. Create a .env file (reference .env.example):

---

# License

This project is developed for educational and internship purposes.
