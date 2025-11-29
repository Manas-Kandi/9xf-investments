import { Campaign } from '@/types/database';
import {
  CampaignStoryContent,
  CmsEditorialContext,
  HowItWorksContent,
  LandingContent,
} from './types';

export const editorialGuidelines: CmsEditorialContext = {
  guidelines: [
    'Keep headlines under 60 characters with a clear verb or value.',
    'Lead paragraphs should be 1–2 short sentences focused on the user benefit.',
    'Use plain language and avoid jargon; spell out acronyms on first use.',
    'When mentioning numbers, include context (e.g., timeframes, units, sources).',
    'CTA labels should start with an action verb (Browse, Start, See, Learn).',
  ],
  fallbackMessage:
    'CMS is unavailable—serving editorially approved fallback copy. Update Contentful or Sanity to replace this text.',
};

export const fallbackLandingContent: LandingContent = {
  heroTitle: 'Own a piece of the future',
  heroSubtitle: 'Invest small amounts in startups you believe in. Simple onboarding, one-tap investing, from just $50.',
  primaryCtaLabel: 'Browse campaigns',
  primaryCtaHref: '/campaigns',
  secondaryCtaLabel: 'How it works',
  secondaryCtaHref: '/how-it-works',
  stepsHeading: 'Investing made simple',
  steps: [
    {
      title: '1. Verify once',
      description: 'Complete a simple identity check. You only need to do this once.',
      icon: 'shield',
    },
    {
      title: '2. Link your bank',
      description: 'Connect your bank account securely. Funds are only moved when you invest.',
      icon: 'wallet',
    },
    {
      title: '3. Invest in seconds',
      description: "Pick an amount, tap confirm. That's it. You're now an investor.",
      icon: 'clock',
    },
  ],
  featuredHeading: 'Featured campaign',
  moreHeading: 'More opportunities',
  riskTitle: 'Important information',
  riskParagraphs: [
    'Investing in startups involves significant risk. You could lose all of your investment. These are long-term, illiquid investments—you may not be able to sell your shares for many years.',
    '9xf labs does not provide investment advice. Past performance is not indicative of future results.',
  ],
  founderTitle: 'Are you a founder?',
  founderSubtitle: 'Turn your customers and fans into investors. Allocate a small slice of your round to the crowd.',
  founderCtaLabel: 'Raise with 9xf labs',
  founderCtaHref: '/founders',
};

export const fallbackHowItWorksContent: HowItWorksContent = {
  heroTitle: 'How 9xf labs works',
  heroSubtitle: 'Investing in startups, simplified. One-time setup, then invest in seconds.',
  steps: [
    {
      title: '1. Create your account',
      description:
        'Sign up with email or Google/Apple. Complete a simple identity verification (KYC) once. This keeps the platform safe and compliant with regulations.',
      icon: 'shield',
    },
    {
      title: '2. Link your bank',
      description: 'Securely connect your bank account using Plaid. Funds are only moved when you confirm an investment.',
      icon: 'wallet',
    },
    {
      title: '3. Invest in seconds',
      description: "Browse campaigns, pick an amount, and confirm. That's it. After your one-time setup, investing takes just a few taps.",
      icon: 'clock',
    },
  ],
  buyingTitle: "What you're actually buying",
  buyingIntro:
    "When you invest through 9xf labs, you're buying a share of a pooled investment vehicle (like an SPV or fund) that holds equity in the startup. This means:",
  buyingBullets: [
    'You own a piece of the vehicle, which owns shares in the company',
    "All investors are pooled together, keeping the startup's cap table clean",
    'If the company is acquired or goes public, proceeds are distributed proportionally',
    'There are no dividends or regular payouts—this is a long-term investment',
  ],
  riskTitle: 'Understanding the risks',
  riskIntro: 'Startup investing is high-risk. Only invest what you can afford to lose.',
  riskBullets: [
    'Loss of capital: You could lose 100% of your investment',
    'Illiquidity: You may not be able to sell for 5-10+ years',
    "No guarantees: Past performance doesn't predict future results",
    "Limited information: Startups don't report like public companies",
  ],
  faqHeading: 'Frequently asked questions',
  faqs: [
    {
      question: 'Who can invest?',
      answer:
        "Anyone 18+ who is a US resident can invest through 9xf labs. You don't need to be an accredited investor. There are annual limits on how much you can invest based on your income and net worth.",
    },
    {
      question: "What's the minimum investment?",
      answer:
        'Minimums vary by campaign but typically start at $50. Each campaign also has a maximum per-person limit to ensure broad participation.',
    },
    {
      question: 'How do I make money?',
      answer:
        "If the startup is acquired or goes public, you receive your proportional share of the proceeds. There are no dividends or regular payouts. This is a long-term investment that could take years to see returns, if ever.",
    },
    {
      question: 'Can I sell my investment?',
      answer:
        "These are illiquid investments. You typically cannot sell until there's an exit event (acquisition or IPO). We may offer secondary liquidity options in the future, but this is not guaranteed.",
    },
    {
      question: 'What happens if the startup fails?',
      answer: 'If the startup fails, you lose your investment. Only invest what you can afford to lose.',
    },
    {
      question: 'How are startups selected?',
      answer:
        'Every company on 9xf labs is reviewed by our team. We look for strong founders, clear business models, and reasonable terms. However, our review is not a guarantee of success or endorsement.',
    },
  ],
  ctaTitle: 'Ready to start investing?',
  ctaSubtitle: 'Browse live campaigns and invest in startups you believe in.',
  ctaLabel: 'Browse campaigns',
  ctaHref: '/campaigns',
};

export function buildCampaignFallbackContent(campaign: Campaign): CampaignStoryContent {
  return {
    description: campaign.description,
    problem: campaign.problem,
    solution: campaign.solution,
    traction: campaign.traction,
    founderBio: campaign.founder_bio,
    faqs: [
      {
        question: 'What exactly am I buying?',
        answer:
          `You are investing in a pooled investment vehicle (like an SPV) that holds shares in ${campaign.company_name}. You own a piece of the vehicle, which in turn owns equity in the company.`,
      },
      {
        question: 'How do I earn returns?',
        answer:
          `${campaign.company_name} investors earn returns if the company is acquired or goes public. Proceeds are distributed to investors proportionally. There are no dividends or regular payouts—this is a long-term investment.`,
      },
      {
        question: 'What if the company fails?',
        answer: 'If the company fails, you could lose your entire investment. Startup investing is high-risk.',
      },
      {
        question: 'When can I get my money back?',
        answer:
          'This is an illiquid investment. You typically cannot sell your shares until there is an exit event (acquisition or IPO), which could take years or may never happen.',
      },
    ],
  };
}
