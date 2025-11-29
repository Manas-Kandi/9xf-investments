import { render, screen } from '@testing-library/react';
import { Header } from '@/components/Header';
import { useAppStore } from '@/lib/store';
import type { User } from '@/types/database';

describe('Header', () => {
  const baseUser: User = {
    id: 'user-1',
    email: 'test@example.com',
    kyc_status: 'pending',
    terms_accepted: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  afterEach(() => {
    useAppStore.setState({
      user: null,
      isAuthenticated: false,
      onboardingStep: 'account',
      isOnboarded: false,
      fundingSource: null,
      investments: [],
    });
  });

  it('shows sign-in when user is logged out', () => {
    render(<Header />);

    expect(screen.getByLabelText('Sign in')).toBeInTheDocument();
  });

  it('shows account actions when user is logged in', () => {
    useAppStore.setState({
      user: baseUser,
      isAuthenticated: true,
      onboardingStep: 'kyc',
      isOnboarded: false,
      fundingSource: null,
      investments: [],
    });

    render(<Header />);

    expect(screen.getByLabelText('Account')).toBeInTheDocument();
    expect(screen.getByLabelText('Portfolio')).toBeInTheDocument();
  });
});
