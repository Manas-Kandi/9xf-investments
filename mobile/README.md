# 9xf labs Mobile App

A React Native mobile app for 9xf labs - the platform that lets retail investors co-invest with real VCs from $50.

## Features

### Retail Investor Experience
- **Splash/Onboarding**: Welcome screen with sign up/sign in options
- **Authentication**: Email/password and social login (Google, Apple)
- **KYC Flow**: Identity verification with step-by-step guidance
- **Home Tab**: Browse VC-backed deals with featured campaigns
- **Deal Detail**: Full deal information with VC memo, terms, and FAQ
- **Investment Flow**: Amount selection, confirmation, and processing
- **Portfolio Tab**: Track all investments with status updates
- **Account Tab**: Profile, funding methods, documents, and settings

### VC Experience (Coming Soon)
- VC application and onboarding
- VC Console for deal management
- Create and manage deals
- Track crowd investment progress

## Tech Stack

- **Framework**: React Native with Expo SDK 52
- **Navigation**: Expo Router (file-based routing)
- **State Management**: Zustand with persistence
- **Styling**: React Native StyleSheet with custom theme
- **Icons**: @expo/vector-icons (Ionicons)
- **Storage**: AsyncStorage for persistent data

## Project Structure

```
mobile/
├── app/                    # Expo Router screens
│   ├── (auth)/            # Authentication screens
│   │   ├── signin.tsx
│   │   └── signup.tsx
│   ├── (tabs)/            # Main tab navigation
│   │   ├── home.tsx
│   │   ├── portfolio.tsx
│   │   └── account.tsx
│   ├── (onboarding)/      # Onboarding flow
│   ├── (vc)/              # VC-specific screens
│   ├── deal/[slug].tsx    # Deal detail screen
│   ├── invest/[slug].tsx  # Investment flow
│   ├── _layout.tsx        # Root layout
│   └── index.tsx          # Splash screen
├── components/            # Reusable UI components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── DealCard.tsx
│   └── index.ts
├── constants/
│   └── theme.ts           # Colors, spacing, typography
├── store/
│   └── index.ts           # Zustand store
├── shared/                # Shared types & mock data live in ../../src/lib/shared
├── app.json               # Expo configuration
├── package.json
└── tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac) or Android Emulator

### Installation

```bash
# Navigate to mobile directory
cd mobile

# Install dependencies
npm install

# Start the development server
npm start
```

### Running on Devices

```bash
# iOS Simulator
npm run ios

# Android Emulator
npm run android

# Web (for testing)
npm run web
```

## Design System

The app uses a custom dark theme consistent with the web app's Carbon g100 theme:

### Colors
- **Background**: `#161616` (primary), `#262626` (elevated)
- **Text**: `#f4f4f4` (primary), `#c6c6c6` (secondary)
- **Primary**: `#0f62fe` (IBM Blue)
- **Success**: `#42be65`
- **Warning**: `#f1c21b`
- **Error**: `#ff8389`

### Typography
- Font sizes: 12px (xs) to 40px (display)
- Font weights: 400 (regular) to 700 (bold)

### Spacing
- 4px increments: xs(4), sm(8), md(16), lg(24), xl(32), xxl(48)

## Navigation Flow

```
Splash Screen
    ├── Sign Up → KYC → Funding → Terms → Home
    └── Sign In → Home

Home Tab
    └── Deal Detail → Invest Flow → Success → Portfolio

Portfolio Tab
    └── Investment Detail

Account Tab
    ├── Edit Profile
    ├── Payment Methods
    ├── Documents
    ├── Notifications
    ├── Support
    └── VC Application (for VCs)
```

## Key Screens

### 1. Splash Screen (`/`)
- App logo and tagline
- "Get started" and "Sign in" buttons
- Auto-redirects authenticated users to Home

### 2. Sign Up (`/(auth)/signup`)
- Email/password form
- Social login options
- Leads to KYC onboarding

### 3. Home (`/(tabs)/home`)
- Featured deal card
- List of live opportunities
- Education snippet for new users

### 4. Deal Detail (`/deal/[slug]`)
- Company header with VC badge
- Key terms summary
- VC memo and reasons
- Progress bar and investor count
- Risk reminder
- FAQ section
- Persistent "Invest" CTA

### 5. Invest Flow (`/invest/[slug]`)
- Amount selection with presets
- Funding source selection
- Confirmation with risk acknowledgment
- Processing state
- Success/error states

### 6. Portfolio (`/(tabs)/portfolio`)
- Investment summary cards
- Total invested and company count
- Status badges (Pending, Processing, Confirmed)

### 7. Account (`/(tabs)/account`)
- User profile and KYC status
- Payment methods
- Documents (Terms, Privacy, Risks)
- Notification settings
- VC application entry point

## API Integration (TODO)

The app currently uses mock data. To connect to the backend:

1. Update `store/index.ts` to call real APIs
2. Add authentication token handling
3. Implement real KYC provider integration (e.g., Persona, Jumio)
4. Connect Plaid for bank linking
5. Integrate payment processing

## Contributing

1. Follow the existing code style
2. Use TypeScript for all new files
3. Keep components small and focused
4. Use the theme constants for styling
5. Test on both iOS and Android

## License

Private - 9xf labs
