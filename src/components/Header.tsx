'use client';

import {
  Header as CarbonHeader,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
} from '@carbon/react';
import { UserAvatar, Login, Portfolio } from '@carbon/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';

export function Header() {
  const { user } = useAppStore();
  const router = useRouter();

  return (
    <CarbonHeader aria-label="9xf labs">
      <HeaderName as={Link} href="/" prefix="">
        9xf labs
      </HeaderName>
      <HeaderNavigation aria-label="Main navigation">
        <HeaderMenuItem as={Link} href="/campaigns">
          Campaigns
        </HeaderMenuItem>
        <HeaderMenuItem as={Link} href="/how-it-works">
          How it works
        </HeaderMenuItem>
        <HeaderMenuItem as={Link} href="/founders">
          For founders
        </HeaderMenuItem>
      </HeaderNavigation>
      <HeaderGlobalBar>
        {user ? (
          <>
            <HeaderGlobalAction
              aria-label="Portfolio"
              onClick={() => router.push('/investments')}
              tooltipAlignment="center"
            >
              <Portfolio size={20} />
            </HeaderGlobalAction>
            <HeaderGlobalAction
              aria-label="Account"
              onClick={() => router.push('/account')}
              tooltipAlignment="end"
            >
              <UserAvatar size={20} />
            </HeaderGlobalAction>
          </>
        ) : (
          <HeaderGlobalAction
            aria-label="Sign in"
            onClick={() => router.push('/auth/signin')}
            tooltipAlignment="end"
          >
            <Login size={20} />
          </HeaderGlobalAction>
        )}
      </HeaderGlobalBar>
    </CarbonHeader>
  );
}
