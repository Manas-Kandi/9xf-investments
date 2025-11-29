import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OnboardingPage from '@/app/onboarding/page';
import { useAppStore } from '@/lib/store';
import type { User } from '@/types/database';

describe('Onboarding page', () => {
  const user: User = {
    id: 'user-123',
    email: 'tester@example.com',
    kyc_status: 'pending',
    terms_accepted: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  beforeEach(() => {
    useAppStore.setState({
      user,
      isAuthenticated: true,
      onboardingStep: 'kyc',
      isOnboarded: false,
      fundingSource: null,
      investments: [],
    });
    localStorage.clear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('advances through KYC to funding', async () => {
    render(<OnboardingPage />);

    await userEvent.type(screen.getByLabelText('Legal full name'), 'Tester McTest');
    await userEvent.type(screen.getByLabelText('Date of birth'), '1990-01-01');
    await userEvent.type(screen.getByLabelText('Address'), '123 Main St');
    await userEvent.type(screen.getByLabelText('Country of citizenship'), 'USA');
    await userEvent.type(screen.getByLabelText('Last 4 digits of SSN'), '1234');

    await userEvent.click(screen.getByRole('button', { name: 'Continue' }));

    act(() => {
      jest.runAllTimers();
    });

    expect(await screen.findByText('Link your bank account')).toBeInTheDocument();
  });
});
