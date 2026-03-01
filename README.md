A production-ready, full-stack AI image generation platform that converts text prompts into high-quality photorealistic images using an open-source Z diffusion model with serverless GPU inference.

Built with a modern SaaS architecture including authentication, credit-based billing, scalable  APIs, and cloud storage.

## Features

🎨 Text-to-image generation with strong instruction following

⚡ Sub-second image generation using Z-Image Turbo

🧠 Open-source diffusion model (no closed APIs)

🔐 Secure authentication (email + social login)

💳 Credit-based monetization with Polar

☁️ Serverless GPU inference via Modal

🗄️ Image storage with AWS S3

📊 Prompt history & generation tracking

🧾 PostgreSQL (Neon) + Prisma ORM

📱 Fully responsive dashboard (Tailwind + shadcn/ui)

🚀 Production deployment on Vercel

## Architecture
```text
Next.js (Frontend + Server Actions)
        │
        ▼
FastAPI Inference API  ──► Modal GPU Worker ──► Z-Image Turbo Model
        │
        ├── PostgreSQL (Neon) → metadata, credits, users
        ├── AWS S3 → generated images
        └── Polar → payments & subscriptions
```

🧰 Tech Stack

## Frontend

Next.js 16 (App Router)

TypeScript

Tailwind CSS

shadcn/ui

## Backend

FastAPI (ML inference API)

Prisma ORM

Neon PostgreSQL

## AI / ML

Z-Image Turbo (open-source diffusion)

Modal (serverless GPU compute)

## Auth & Payments

Better Auth

Polar (subscriptions & credits)

## Storage & Deployment

AWS S3

Vercel

🛠️ Installation (Local Development)
## 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/ai-image-generator.git
cd ai-image-generator
```

## 2️⃣ Setup Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```
## 3️⃣ Setup FastAPI Backend
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

## 4️⃣ Setup Modal (GPU Inference)
```bash
modal token new
modal deploy modal_inference.py
```

🔐 Environment Variables

## Frontend (.env)
```bash
DATABASE_URL=
BETTER_AUTH_SECRET=
POLAR_API_KEY=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_BUCKET_NAME=
FASTAPI_URL=
```

## Backend (.env)
```bash
MODAL_TOKEN_ID=
MODAL_TOKEN_SECRET=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_BUCKET_NAME=
DATABASE_URL=
MODAL_TOKEN_ID=
MODAL_TOKEN_SECRET=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_BUCKET_NAME=
DATABASE_URL=
```
