'use client';

import Link from 'next/link';
import { LogoTwitter, LogoLinkedin, LogoGithub } from '@carbon/icons-react';

export function Footer() {
  const footerLinks = {
    invest: [
      { label: 'Browse campaigns', href: '/campaigns' },
      { label: 'How it works', href: '/how-it-works' },
      { label: 'Risks', href: '/risks' },
    ],
    founders: [
      { label: 'Raise with 9xf', href: '/founders' },
      { label: 'Founder FAQ', href: '/founders/faq' },
    ],
    legal: [
      { label: 'Terms of use', href: '/terms' },
      { label: 'Privacy policy', href: '/privacy' },
      { label: 'Risk disclosure', href: '/risk-disclosure' },
    ],
    company: [
      { label: 'About us', href: '/about' },
      { label: 'Contact', href: 'mailto:hello@9xflabs.com' },
    ],
  };

  return (
    <footer style={{ 
      background: 'var(--9xf-bg-secondary)', 
      borderTop: '1px solid var(--9xf-border)',
      padding: '4rem 0 2rem',
    }}>
      <div className="page-container">
        {/* Main footer content */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem',
        }}>
          {/* Brand column */}
          <div style={{ gridColumn: 'span 2' }}>
            <h4 style={{ 
              marginBottom: '1rem', 
              fontWeight: 700,
              fontSize: '1.25rem',
              background: 'var(--9xf-gradient-primary)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              9xf labs
            </h4>
            <p style={{ 
              fontSize: '0.9rem', 
              color: 'var(--9xf-text-secondary)', 
              lineHeight: 1.7,
              maxWidth: '280px',
              marginBottom: '1.5rem',
            }}>
              Making it possible for ordinary people to own small pieces of early-stage companies.
            </p>
            {/* Social links */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[
                { icon: <LogoTwitter size={20} />, href: 'https://twitter.com/9xflabs' },
                { icon: <LogoLinkedin size={20} />, href: 'https://linkedin.com/company/9xflabs' },
                { icon: <LogoGithub size={20} />, href: 'https://github.com/9xflabs' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'var(--9xf-bg-glass)',
                    border: '1px solid var(--9xf-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--9xf-text-secondary)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h5 style={{ 
                marginBottom: '1rem', 
                fontWeight: 600, 
                fontSize: '0.8rem',
                color: 'var(--9xf-text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                {title}
              </h5>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {links.map((link) => (
                  <li key={link.href} style={{ marginBottom: '0.75rem' }}>
                    <Link 
                      href={link.href} 
                      style={{ 
                        color: 'var(--9xf-text-secondary)', 
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        transition: 'color 0.2s ease',
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ 
          paddingTop: '2rem', 
          borderTop: '1px solid var(--9xf-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <p style={{ 
            fontSize: '0.8rem', 
            color: 'var(--9xf-text-muted)',
          }}>
            © {new Date().getFullYear()} 9xf labs. All rights reserved.
          </p>
          <p style={{ 
            fontSize: '0.75rem', 
            color: 'var(--9xf-text-muted)',
            maxWidth: '500px',
            textAlign: 'right',
          }}>
            All investments involve risk, including the loss of principal. Past performance is not indicative of future results.
          </p>
        </div>
      </div>
    </footer>
  );
}
