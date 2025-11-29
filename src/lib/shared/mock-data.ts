import type { Campaign } from './types';

const mockVCs = {
  xyz: {
    id: 'vc1',
    name: 'XYZ Ventures',
    logo_url: 'https://via.placeholder.com/100',
    website: 'https://xyzventures.com',
    commitment: 600000,
  },
  acme: {
    id: 'vc2',
    name: 'Acme Capital',
    logo_url: 'https://via.placeholder.com/100',
    website: 'https://acmecapital.com',
    commitment: 400000,
  },
};

export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    company_name: 'SolarFlow',
    tagline: 'Making solar energy accessible for every home',
    description:
      'SolarFlow is revolutionizing residential solar installation with our AI-powered assessment tool and flexible financing options. We help homeowners go solar in days, not months.',
    logo_url: 'https://via.placeholder.com/100/0f62fe/ffffff?text=S',
    cover_image_url: 'https://via.placeholder.com/800x400/262626/f4f4f4?text=SolarFlow',
    media_urls: [],
    founder_name: 'Maria Chen',
    founder_bio: 'Former Tesla Energy engineer with 10+ years in renewable energy. Built and sold two cleantech startups.',
    problem:
      "Going solar is confusing, expensive, and takes too long. Most homeowners give up before they even get a quote.",
    solution:
      'Our AI instantly analyzes your roof from satellite imagery, provides accurate quotes, and connects you with vetted installers. Average time from signup to installation: 14 days.',
    traction: '2,500+ installations completed, $4.2M ARR, 40% month-over-month growth',
    min_investment: 50,
    max_investment_per_person: 1000,
    target_amount: 200000,
    amount_raised: 120300,
    crowd_percentage: 7,
    status: 'live',
    slug: 'solarflow',
    close_date: '2024-03-15',
    instrument: 'SAFE',
    valuation_cap: 12000000,
    vc_info: mockVCs.xyz,
    vc_memo:
      'SolarFlow represents the future of residential solar adoption. Their AI-first approach dramatically reduces customer acquisition costs while improving installation quality.',
    vc_reasons: [
      'Strong founding team with deep domain expertise',
      '40% MoM growth with healthy unit economics',
      'Large TAM with regulatory tailwinds',
      'Proprietary AI technology creates defensible moat',
      'Clear path to profitability within 18 months',
    ],
    investor_count: 847,
    faqs: [
      {
        question: 'What exactly am I investing in?',
        answer:
          'You are investing in a SAFE (Simple Agreement for Future Equity) that converts to equity when SolarFlow raises a priced round or has a liquidity event.',
      },
      {
        question: 'How could I earn returns?',
        answer:
          "If SolarFlow is acquired or goes public, your SAFE converts to shares which you can then sell. Returns depend on the company's valuation at that time.",
      },
      {
        question: 'What if this company fails?',
        answer: 'If SolarFlow fails, you would likely lose your entire investment. Startup investing is high-risk.',
      },
      {
        question: 'Can I sell this investment later?',
        answer: 'These investments are illiquid. You typically cannot sell until there is a liquidity event like an acquisition or IPO, which may take many years or never happen.',
      },
    ],
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
  },
  {
    id: '2',
    company_name: 'MindfulMeals',
    tagline: 'Personalized nutrition powered by your DNA',
    description:
      'MindfulMeals creates custom meal plans based on your genetic profile, health goals, and taste preferences. Eat smarter, not harder.',
    logo_url: 'https://via.placeholder.com/100/42be65/ffffff?text=M',
    cover_image_url: 'https://via.placeholder.com/800x400/262626/f4f4f4?text=MindfulMeals',
    media_urls: [],
    founder_name: 'Dr. James Park',
    founder_bio: 'Stanford MD/PhD in nutritional genomics. Previously led research at 23andMe.',
    problem: "Generic diet advice doesn't work because everyone's body is different. 95% of diets fail within a year.",
    solution:
      'We combine genetic testing with AI to create truly personalized nutrition plans. Our users see 3x better results than traditional diets.',
    traction: '15,000 active subscribers, 92% retention rate, featured in Forbes and TechCrunch',
    min_investment: 50,
    max_investment_per_person: 1000,
    target_amount: 200000,
    amount_raised: 45000,
    crowd_percentage: 5,
    status: 'live',
    slug: 'mindfulmeals',
    close_date: '2024-04-01',
    instrument: 'SAFE',
    valuation_cap: 15000000,
    vc_info: mockVCs.acme,
    vc_memo:
      'The intersection of genomics and nutrition is a massive opportunity. MindfulMeals has cracked the code on personalization at scale.',
    vc_reasons: [
      'Founder is a world-class expert in nutritional genomics',
      'Exceptional retention metrics indicate strong product-market fit',
      'Recurring revenue model with high LTV',
      'Strategic partnerships with major health systems',
    ],
    investor_count: 312,
    faqs: [
      {
        question: 'What exactly am I investing in?',
        answer: 'You are investing in a SAFE that converts to equity in MindfulMeals at a future priced round.',
      },
      {
        question: 'How could I earn returns?',
        answer: 'Returns come from a liquidity event such as an acquisition or IPO where your SAFE converts to shares.',
      },
      {
        question: 'What if this company fails?',
        answer: 'You could lose your entire investment if the company fails.',
      },
      {
        question: 'Can I sell this investment later?',
        answer: 'No, these are illiquid investments that cannot be easily sold.',
      },
    ],
    created_at: '2024-02-01T00:00:00Z',
    updated_at: '2024-02-01T00:00:00Z',
  },
  {
    id: '3',
    company_name: 'PetPal',
    tagline: 'The smart collar that keeps your pet healthy',
    description:
      'PetPal is a health-monitoring smart collar for dogs and cats. Track activity, detect early signs of illness, and get personalized care recommendations.',
    logo_url: 'https://via.placeholder.com/100/f1c21b/000000?text=P',
    cover_image_url: 'https://via.placeholder.com/800x400/262626/f4f4f4?text=PetPal',
    media_urls: [],
    founder_name: 'Sarah & Tom Williams',
    founder_bio: 'Husband-wife team. Sarah: former Apple hardware engineer. Tom: veterinarian with 15 years experience.',
    problem: "Pet owners often don't notice health issues until it's too late. Vet visits are expensive and stressful.",
    solution:
      'Our collar monitors vital signs 24/7 and alerts you to potential health issues before they become serious. Integrates with your vet for seamless care.',
    traction: '8,000 collars sold, $1.8M in revenue, partnerships with 200+ vet clinics',
    min_investment: 100,
    max_investment_per_person: 2500,
    target_amount: 250000,
    amount_raised: 0,
    crowd_percentage: 10,
    status: 'draft',
    slug: 'petpal',
    instrument: 'SAFE',
    valuation_cap: 10000000,
    investor_count: 0,
    created_at: '2024-02-15T00:00:00Z',
    updated_at: '2024-02-15T00:00:00Z',
  },
];

export function getCampaignBySlug(slug: string): Campaign | undefined {
  return mockCampaigns.find((c) => c.slug === slug);
}

export function getCampaignById(id: string): Campaign | undefined {
  return mockCampaigns.find((c) => c.id === id);
}

export function getLiveCampaigns(): Campaign[] {
  return mockCampaigns.filter((c) => c.status === 'live');
}

export function getFeaturedCampaign(): Campaign | undefined {
  return mockCampaigns.find((c) => c.status === 'live');
}

export function getUpcomingCampaigns(): Campaign[] {
  return mockCampaigns.filter((c) => c.status === 'draft');
}
