# 9xf labs

**One-tap crowd investing platform** - Own small pieces of early-stage companies with the same simplicity as buying a coffee.

## Overview

9xf labs is a consumer-facing platform where regular users can invest small amounts ($50–$250) into selected startups. The platform handles onboarding, KYC, and investment flows while partners manage the legal/regulatory infrastructure.

## Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript
- **UI**: [Carbon Design System](https://carbondesignsystem.com/) by IBM
- **State**: Zustand with persistence
- **Backend**: Supabase (Auth, Database, Storage)
- **Styling**: SCSS with Carbon tokens

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (for production)

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Database Setup

Run the SQL schema in your Supabase SQL editor:

```bash
# Located at: supabase/schema.sql
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Sign in/up pages
│   ├── campaigns/         # Campaign listing and details
│   ├── invest/            # Investment flow
│   ├── investments/       # User portfolio
│   ├── onboarding/        # KYC, funding, terms
│   ├── founders/          # Founder application
│   ├── admin/             # Admin console
│   └── account/           # User settings
├── components/            # Reusable components
├── lib/                   # Utilities and stores
│   ├── supabase/         # Supabase clients
│   ├── store.ts          # Zustand store
│   └── mock-data.ts      # Demo data
└── types/                 # TypeScript types
```

## Key Features

### For Investors
- **One-time onboarding**: KYC, bank linking, risk acknowledgment
- **One-tap investing**: Select amount → Confirm → Done
- **Portfolio view**: Track all investments

### For Founders
- **Application form**: Submit to raise with 9xf labs
- **Campaign page**: Showcase company story, team, traction

### For Admins
- **Campaign management**: Create, edit, toggle status
- **Application review**: Approve/reject founder applications
- **Metrics dashboard**: Track platform performance

## MVP Phases

1. **Phase 1** (Current): Static demo with mock data
2. **Phase 2**: Real Supabase integration, sandbox payments
3. **Phase 3**: First live campaign with real money
4. **Phase 4**: Mobile app, scale

## Key Screens

| Screen | Route | Description |
|--------|-------|-------------|
| Landing | `/` | Hero, how it works, featured campaign |
| Campaigns | `/campaigns` | Browse all campaigns |
| Campaign Detail | `/campaigns/[slug]` | Full campaign info |
| Sign Up | `/auth/signup` | Create account |
| Onboarding | `/onboarding` | KYC → Funding → Terms |
| Invest | `/invest/[slug]` | Amount → Confirm → Success |
| My Investments | `/investments` | Portfolio view |
| Admin | `/admin` | Campaign & application management |

## Design System

Using [Carbon Design System](https://carbondesignsystem.com/) for:
- Consistent, accessible UI components
- Professional, clean aesthetic
- Responsive grid system
- Built-in dark mode support

## License

Private - All rights reserved
