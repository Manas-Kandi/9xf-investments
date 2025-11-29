'use client';

import { InlineNotification, Button } from '@carbon/react';
import { useAppStore } from '@/lib/store';

export function AnalyticsConsentBanner() {
  const { analyticsConsent, setAnalyticsConsent } = useAppStore();

  if (analyticsConsent !== null) return null;

  return (
    <div style={{ position: 'fixed', bottom: '1rem', right: '1rem', zIndex: 1000, maxWidth: '420px' }}>
      <InlineNotification
        kind="info"
        title="Analytics consent"
        subtitle="Allow us to collect anonymous usage data (e.g., onboarding and investment funnel events) to improve the product."
        lowContrast
        hideCloseButton
      />
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', justifyContent: 'flex-end' }}>
        <Button size="sm" onClick={() => setAnalyticsConsent('granted')}>
          Accept
        </Button>
        <Button size="sm" kind="tertiary" onClick={() => setAnalyticsConsent('denied')}>
          Decline
        </Button>
      </div>
    </div>
  );
}
