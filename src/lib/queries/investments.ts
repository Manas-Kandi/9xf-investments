'use client';

import type { Investment } from '@/types/database';
import { useAppStore } from '@/lib/store';

type InvestmentSnapshot = {
  user: ReturnType<typeof useAppStore.getState>['user'];
  isOnboarded: ReturnType<typeof useAppStore.getState>['isOnboarded'];
  investments: Investment[];
};

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

let snapshotPromise: Promise<InvestmentSnapshot> | null = null;

export function getInvestmentsSnapshot() {
  if (!snapshotPromise) {
    snapshotPromise = (async () => {
      await delay();
      const state = useAppStore.getState();
      return {
        user: state.user,
        isOnboarded: state.isOnboarded,
        investments: state.investments,
      };
    })();
  }

  return snapshotPromise;
}
