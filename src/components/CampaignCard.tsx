'use client';

import Image from 'next/image';
import Button from '@carbon/react/es/components/Button/Button.js';
import ProgressBar from '@carbon/react/es/components/ProgressBar/ProgressBar.js';
import Tag from '@carbon/react/es/components/Tag/Tag.js';
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
    <div
      className="glass-card"
      style={{
        padding: featured ? '1.5rem' : '1.25rem',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--9xf-bg-card)',
        border: '1px solid var(--9xf-border)',
        borderRadius: '20px',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
      }}
    >
      {/* Cover Image */}
      {campaign.cover_image_url && (
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: featured ? '16 / 9' : '4 / 3',
            marginBottom: '1.25rem',
            borderRadius: '14px',
            overflow: 'hidden',
            background: 'var(--9xf-bg-elevated)',
          }}
        >
          <Image
            src={campaign.cover_image_url}
            alt={`${campaign.company_name} cover`}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            style={{ objectFit: 'cover' }}
            priority={featured}
          />
          {/* Gradient overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%)',
          }} />
        </div>
      )}

      {/* Header with logo and status */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div
          style={{
            width: featured ? '56px' : '48px',
            height: featured ? '56px' : '48px',
            background: 'var(--9xf-gradient-primary)',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: featured ? '1.5rem' : '1.25rem',
            fontWeight: 700,
            color: 'white',
            boxShadow: 'var(--9xf-glow-primary)',
          }}
        >
          {campaign.company_name.charAt(0)}
        </div>
        <Tag type={statusKind} size="sm">
          {statusLabel}
        </Tag>
      </div>

      {/* Company info */}
      <h3 style={{ 
        fontSize: featured ? '1.5rem' : '1.25rem', 
        fontWeight: 700, 
        marginBottom: '0.5rem',
        color: 'var(--9xf-text-primary)',
        letterSpacing: '-0.02em',
      }}>
        {campaign.company_name}
      </h3>
      <p style={{ 
        color: 'var(--9xf-text-secondary)', 
        marginBottom: '1.25rem', 
        fontSize: featured ? '1rem' : '0.9rem',
        lineHeight: 1.5,
      }}>
        {campaign.tagline}
      </p>

      {/* Progress bar for live campaigns */}
      {campaign.status === 'live' && (
        <div style={{ marginBottom: '1.25rem' }}>
          <ProgressBar
            value={progress}
            max={100}
            label={`$${campaign.amount_raised.toLocaleString()} raised`}
            helperText={`${progress}% of $${campaign.target_amount.toLocaleString()} goal`}
          />
        </div>
      )}

      {/* Stats row */}
      <div style={{ 
        display: 'flex', 
        gap: '2rem', 
        marginBottom: '1.5rem', 
        paddingTop: '1rem',
        borderTop: '1px solid var(--9xf-border)',
      }}>
        <div>
          <p style={{ fontSize: '0.75rem', color: 'var(--9xf-text-muted)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Min investment
          </p>
          <p style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--9xf-text-primary)' }}>
            ${campaign.min_investment}
          </p>
        </div>
        <div>
          <p style={{ fontSize: '0.75rem', color: 'var(--9xf-text-muted)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Crowd allocation
          </p>
          <p style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--9xf-text-primary)' }}>
            {campaign.crowd_percentage}%
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <div style={{ marginTop: 'auto' }}>
        <Button
          as={Link}
          href={`/campaigns/${campaign.slug}`}
          kind={featured ? 'primary' : 'tertiary'}
          renderIcon={ArrowRight}
          disabled={campaign.status !== 'live'}
          style={{ width: '100%', justifyContent: 'center' }}
        >
          {campaign.status === 'live' ? `Invest from $${campaign.min_investment}` : 'Coming soon'}
        </Button>
      </div>
    </div>
  );
}
