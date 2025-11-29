'use client';

import { useEffect } from 'react';
import type { Session } from '@supabase/supabase-js';
import { useAppStore } from '@/lib/store';
import type { User } from '@/types/database';

interface SessionProviderProps {
  session: Session | null;
  profile: User | null;
  children: React.ReactNode;
}

export function SessionProvider({ session, profile, children }: SessionProviderProps) {
  const { setSession, setUser } = useAppStore();

  useEffect(() => {
    setSession(session);
    setUser(profile);
  }, [session, profile, setSession, setUser]);

  return <>{children}</>;
}

export default SessionProvider;
