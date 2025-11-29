import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

jest.mock('@/components/Header', () => ({ Header: () => <header>Header</header> }));
jest.mock('@/components/Footer', () => ({ Footer: () => <footer>Footer</footer> }));

describe('Home page', () => {
  it('renders hero content and featured section', () => {
    render(<Home />);

    expect(screen.getByText('Own a piece of the future')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Featured campaign' })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /Browse campaigns/i })[0]).toBeInTheDocument();
  });
});
