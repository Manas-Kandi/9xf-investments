'use client';

import { useEffect } from 'react';
import { initializeAnalytics, setAnalyticsConsent, onAnalyticsStatusChange } from '@/lib/analytics';
import { useAppStore } from '@/lib/store';

export function AnalyticsProvider() {
  const { analyticsConsent } = useAppStore();

  useEffect(() => {
    initializeAnalytics();
  }, []);

  useEffect(() => {
    const unsubscribe = onAnalyticsStatusChange(() => {
      // Keep hook subscribed so Zustand re-renders when consent changes
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (analyticsConsent) {
      setAnalyticsConsent(analyticsConsent === 'granted');
    }
  }, [analyticsConsent]);

  return null;
}
