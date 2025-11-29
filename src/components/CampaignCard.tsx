'use client';

import { Tile, Tag, Button, ProgressBar } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import Link from 'next/link';
import type { Campaign } from '@/types/database';
import styles from './CampaignCard.module.scss';

interface CampaignCardProps {
  campaign: Campaign;
  featured?: boolean;
}

export function CampaignCard({ campaign, featured = false }: CampaignCardProps) {
  const progress = Math.round((campaign.amount_raised / campaign.target_amount) * 100);
  const titleId = `campaign-title-${campaign.id}`;
  const summaryId = `campaign-summary-${campaign.id}`;

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
      className={`${styles.card} ${featured ? styles.featured : ''}`}
      role="article"
      tabIndex={0}
      aria-labelledby={titleId}
      aria-describedby={summaryId}
    >
      <div className={styles.cardHeader}>
        <div className={`${styles.logo} ${featured ? styles.logoFeatured : ''}`} aria-hidden="true">
          {campaign.company_name.charAt(0)}
        </div>
        <div>
          <Tag type={statusKind} size="sm" aria-label={`Status: ${statusLabel}`}>
            {statusLabel}
          </Tag>
          <span className={styles.statusText}>Status: {statusLabel}</span>
        </div>
      </div>

      <h3 id={titleId} className={`${styles.title} ${featured ? styles.titleFeatured : ''}`}>
        {campaign.company_name}
      </h3>
      <p id={summaryId} className={`${styles.tagline} ${featured ? styles.taglineFeatured : ''}`}>
        {campaign.tagline}
      </p>

      {campaign.status === 'live' && (
        <div>
          <ProgressBar
            value={progress}
            max={100}
            label={`$${campaign.amount_raised.toLocaleString()} raised`}
            helperText={`${progress}% of $${campaign.target_amount.toLocaleString()} goal`}
            hideLabel={false}
          />
        </div>
      )}

      <div className={styles.statRow}>
        <div>
          <p className={styles.statLabel}>Min investment</p>
          <p className={styles.statValue}>${campaign.min_investment}</p>
        </div>
        <div>
          <p className={styles.statLabel}>Crowd allocation</p>
          <p className={styles.statValue}>{campaign.crowd_percentage}%</p>
        </div>
      </div>

      <div className={styles.footerActions}>
        <Button
          as={Link}
          href={`/campaigns/${campaign.slug}`}
          kind={featured ? 'primary' : 'tertiary'}
          renderIcon={ArrowRight}
          disabled={campaign.status !== 'live'}
          aria-label={
            campaign.status === 'live'
              ? `Invest from $${campaign.min_investment} in ${campaign.company_name}`
              : `${campaign.company_name} coming soon`
          }
        >
          {campaign.status === 'live' ? `Invest from $${campaign.min_investment}` : 'Coming soon'}
        </Button>
      </div>
    </Tile>
  );
}
