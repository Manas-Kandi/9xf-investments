'use client';

import { Tile, Tag, Button, ProgressBar } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import Link from 'next/link';
import type { Campaign } from '@/types/database';

interface CampaignCardProps {
  campaign: Campaign;
  featured?: boolean;
}

export function CampaignCard({ campaign, featured = false }: CampaignCardProps) {
  const progress = Math.round((campaign.amount_raised / campaign.target_amount) * 100);
  
  const statusLabel = {
    live: 'Raising now',
    draft: 'Coming soon',
    paused: 'Paused',
    closed: 'Closed',
  }[campaign.status];

  const statusKind = {
    live: 'green',
    draft: 'warm-gray',
    paused: 'gray',
    closed: 'cool-gray',
  }[campaign.status] as 'green' | 'warm-gray' | 'gray' | 'cool-gray';

  return (
    <Tile
      style={{
        padding: featured ? '2rem' : '1.5rem',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div
          style={{
            width: featured ? '80px' : '60px',
            height: featured ? '80px' : '60px',
            background: '#e0e0e0',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: featured ? '2rem' : '1.5rem',
            fontWeight: 700,
            color: '#525252',
          }}
        >
          {campaign.company_name.charAt(0)}
        </div>
        <Tag type={statusKind} size="sm">
          {statusLabel}
        </Tag>
      </div>

      <h3 style={{ fontSize: featured ? '1.5rem' : '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>
        {campaign.company_name}
      </h3>
      <p style={{ color: '#525252', marginBottom: '1rem', fontSize: featured ? '1rem' : '0.875rem' }}>
        {campaign.tagline}
      </p>

      {campaign.status === 'live' && (
        <div style={{ marginBottom: '1rem' }}>
          <ProgressBar
            value={progress}
            max={100}
            label={`$${campaign.amount_raised.toLocaleString()} raised`}
            helperText={`${progress}% of $${campaign.target_amount.toLocaleString()} goal`}
          />
        </div>
      )}

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <div>
          <p style={{ fontSize: '0.75rem', color: '#525252' }}>Min investment</p>
          <p style={{ fontWeight: 600 }}>${campaign.min_investment}</p>
        </div>
        <div>
          <p style={{ fontSize: '0.75rem', color: '#525252' }}>Crowd allocation</p>
          <p style={{ fontWeight: 600 }}>{campaign.crowd_percentage}%</p>
        </div>
      </div>

      <div style={{ marginTop: 'auto' }}>
        <Button
          as={Link}
          href={`/campaigns/${campaign.slug}`}
          kind={featured ? 'primary' : 'tertiary'}
          renderIcon={ArrowRight}
          disabled={campaign.status !== 'live'}
        >
          {campaign.status === 'live' ? `Invest from $${campaign.min_investment}` : 'Coming soon'}
        </Button>
      </div>
    </Tile>
  );
}
