import type { Campaign } from '@/types/database';

// Mock campaigns for MVP demo
export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    company_name: 'SolarFlow',
    tagline: 'Making solar energy accessible for every home',
    description: 'SolarFlow is revolutionizing residential solar installation with our AI-powered assessment tool and flexible financing options. We help homeowners go solar in days, not months.',
    logo_url: '/campaigns/solarflow-logo.png',
    cover_image_url: '/campaigns/solarflow-cover.jpg',
    media_urls: [],
    founder_name: 'Maria Chen',
    founder_bio: 'Former Tesla Energy engineer with 10+ years in renewable energy. Built and sold two cleantech startups.',
    problem: 'Going solar is confusing, expensive, and takes too long. Most homeowners give up before they even get a quote.',
    solution: 'Our AI instantly analyzes your roof from satellite imagery, provides accurate quotes, and connects you with vetted installers. Average time from signup to installation: 14 days.',
    traction: '2,500+ installations completed, $4.2M ARR, 40% month-over-month growth',
    min_investment: 50,
    max_investment_per_person: 1000,
    target_amount: 150000,
    amount_raised: 87500,
    crowd_percentage: 7,
    status: 'live',
    slug: 'solarflow',
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
  },
  {
    id: '2',
    company_name: 'MindfulMeals',
    tagline: 'Personalized nutrition powered by your DNA',
    description: 'MindfulMeals creates custom meal plans based on your genetic profile, health goals, and taste preferences. Eat smarter, not harder.',
    logo_url: '/campaigns/mindfulmeals-logo.png',
    cover_image_url: '/campaigns/mindfulmeals-cover.jpg',
    media_urls: [],
    founder_name: 'Dr. James Park',
    founder_bio: 'Stanford MD/PhD in nutritional genomics. Previously led research at 23andMe.',
    problem: 'Generic diet advice doesn\'t work because everyone\'s body is different. 95% of diets fail within a year.',
    solution: 'We combine genetic testing with AI to create truly personalized nutrition plans. Our users see 3x better results than traditional diets.',
    traction: '15,000 active subscribers, 92% retention rate, featured in Forbes and TechCrunch',
    min_investment: 50,
    max_investment_per_person: 1000,
    target_amount: 200000,
    amount_raised: 45000,
    crowd_percentage: 5,
    status: 'live',
    slug: 'mindfulmeals',
    created_at: '2024-02-01T00:00:00Z',
    updated_at: '2024-02-01T00:00:00Z',
  },
  {
    id: '3',
    company_name: 'PetPal',
    tagline: 'The smart collar that keeps your pet healthy',
    description: 'PetPal is a health-monitoring smart collar for dogs and cats. Track activity, detect early signs of illness, and get personalized care recommendations.',
    logo_url: '/campaigns/petpal-logo.png',
    cover_image_url: '/campaigns/petpal-cover.jpg',
    media_urls: [],
    founder_name: 'Sarah & Tom Williams',
    founder_bio: 'Husband-wife team. Sarah: former Apple hardware engineer. Tom: veterinarian with 15 years experience.',
    problem: 'Pet owners often don\'t notice health issues until it\'s too late. Vet visits are expensive and stressful.',
    solution: 'Our collar monitors vital signs 24/7 and alerts you to potential health issues before they become serious. Integrates with your vet for seamless care.',
    traction: '8,000 collars sold, $1.8M in revenue, partnerships with 200+ vet clinics',
    min_investment: 100,
    max_investment_per_person: 2500,
    target_amount: 250000,
    amount_raised: 0,
    crowd_percentage: 10,
    status: 'draft',
    slug: 'petpal',
    created_at: '2024-02-15T00:00:00Z',
    updated_at: '2024-02-15T00:00:00Z',
  },
];

export function getCampaignBySlug(slug: string): Campaign | undefined {
  return mockCampaigns.find((c) => c.slug === slug);
}

export function getLiveCampaigns(): Campaign[] {
  return mockCampaigns.filter((c) => c.status === 'live');
}

export function getFeaturedCampaign(): Campaign | undefined {
  return mockCampaigns.find((c) => c.status === 'live');
}
