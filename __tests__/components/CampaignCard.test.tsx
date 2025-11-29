import { render, screen } from '@testing-library/react';
import { CampaignCard } from '@/components/CampaignCard';
import type { Campaign } from '@/types/database';

describe('CampaignCard', () => {
  const baseCampaign: Campaign = {
    id: '1',
    company_name: 'Future Foods',
    tagline: 'Next-gen sustainable proteins',
    description: 'Delicious and sustainable',
    founder_name: 'Ava Founder',
    min_investment: 100,
    max_investment_per_person: 1000,
    target_amount: 500000,
    amount_raised: 250000,
    crowd_percentage: 8,
    status: 'live',
    slug: 'future-foods',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  it('renders live campaign details and progress', () => {
    render(<CampaignCard campaign={baseCampaign} featured />);

    expect(screen.getByText('Future Foods')).toBeInTheDocument();
    expect(screen.getByText('Raising now')).toBeInTheDocument();
    expect(screen.getByText('$250,000 raised')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Invest from/ })).toBeEnabled();
  });

  it('shows a coming soon state for non-live campaigns', () => {
    const draftCampaign = { ...baseCampaign, status: 'draft', amount_raised: 0 } as Campaign;

    render(<CampaignCard campaign={draftCampaign} />);

    expect(screen.getByText('Coming soon')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Coming soon' })
    ).toBeDisabled();
  });
});
