'use client';

import { Grid, Column, Link as CarbonLink } from '@carbon/react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer style={{ background: '#161616', color: '#f4f4f4', padding: '3rem 0' }}>
      <Grid>
        <Column lg={4} md={4} sm={4}>
          <h4 style={{ marginBottom: '1rem', fontWeight: 600 }}>9xf labs</h4>
          <p style={{ fontSize: '0.875rem', opacity: 0.7, lineHeight: 1.6 }}>
            Making it possible for ordinary people to own small pieces of early-stage companies.
          </p>
        </Column>
        <Column lg={3} md={2} sm={4}>
          <h5 style={{ marginBottom: '1rem', fontWeight: 600, fontSize: '0.875rem' }}>Invest</h5>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <CarbonLink as={Link} href="/campaigns" style={{ color: '#a8a8a8' }}>
                Browse campaigns
              </CarbonLink>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <CarbonLink as={Link} href="/how-it-works" style={{ color: '#a8a8a8' }}>
                How it works
              </CarbonLink>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <CarbonLink as={Link} href="/risks" style={{ color: '#a8a8a8' }}>
                Risks
              </CarbonLink>
            </li>
          </ul>
        </Column>
        <Column lg={3} md={2} sm={4}>
          <h5 style={{ marginBottom: '1rem', fontWeight: 600, fontSize: '0.875rem' }}>Founders</h5>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <CarbonLink as={Link} href="/founders" style={{ color: '#a8a8a8' }}>
                Raise with 9xf
              </CarbonLink>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <CarbonLink as={Link} href="/founders/faq" style={{ color: '#a8a8a8' }}>
                Founder FAQ
              </CarbonLink>
            </li>
          </ul>
        </Column>
        <Column lg={3} md={2} sm={4}>
          <h5 style={{ marginBottom: '1rem', fontWeight: 600, fontSize: '0.875rem' }}>Legal</h5>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <CarbonLink as={Link} href="/terms" style={{ color: '#a8a8a8' }}>
                Terms of use
              </CarbonLink>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <CarbonLink as={Link} href="/privacy" style={{ color: '#a8a8a8' }}>
                Privacy policy
              </CarbonLink>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <CarbonLink as={Link} href="/risk-disclosure" style={{ color: '#a8a8a8' }}>
                Risk disclosure
              </CarbonLink>
            </li>
          </ul>
        </Column>
        <Column lg={3} md={2} sm={4}>
          <h5 style={{ marginBottom: '1rem', fontWeight: 600, fontSize: '0.875rem' }}>Company</h5>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <CarbonLink as={Link} href="/about" style={{ color: '#a8a8a8' }}>
                About us
              </CarbonLink>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <CarbonLink href="mailto:hello@9xflabs.com" style={{ color: '#a8a8a8' }}>
                Contact
              </CarbonLink>
            </li>
          </ul>
        </Column>
      </Grid>
      <Grid style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #393939' }}>
        <Column lg={16} md={8} sm={4}>
          <p style={{ fontSize: '0.75rem', opacity: 0.5, textAlign: 'center' }}>
            © {new Date().getFullYear()} 9xf labs. All investments involve risk, including the loss of principal.
            Past performance is not indicative of future results.
          </p>
        </Column>
      </Grid>
    </footer>
  );
}
