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

- **Node.js**: 18+ (use `nvm use` if you manage multiple versions)
- **npm**: included with Node.js
- **Supabase**: project + access to the Supabase CLI for migrations

### Environment setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy the example environment and update with your Supabase keys:
   ```bash
   cp .env.local.example .env.local
   ```
3. Populate `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### Running the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app locally.

### Quality gates

- Lint: `npm run lint`
- Format with Prettier: `npm run format`
- Component/unit tests: `npm test`
- End-to-end tests (Playwright): `npm run test:e2e` (ensure Playwright browsers are installed with `npx playwright install`)
- Database migrations: `npm run db:migrate` (requires Supabase CLI authenticated to your project)

### Git hooks

This repo uses Husky + lint-staged to enforce linting/formatting on commit. Run `npm run prepare` once after installing dependencies to install the git hooks locally.

### Database setup & seeding

Execute the SQL schema against your Supabase instance:

```bash
supabase db execute --file supabase/schema.sql
```

You can also run the migrations with the npm script described above or paste the SQL into the Supabase SQL editor.

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
