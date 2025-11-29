import Link from 'next/link';
import { Warning } from '@carbon/icons-react';
import { riskDisclosureIntro } from '@/lib/legal';

interface RiskDisclosureNoticeProps {
  title?: string;
}

export function RiskDisclosureNotice({ title = 'Risk reminder' }: RiskDisclosureNoticeProps) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '0.75rem',
        padding: '1rem',
        background: '#edf5ff',
        border: '1px solid #8bb8ff',
        borderRadius: '8px',
        marginBottom: '1.5rem',
      }}
    >
      <Warning size={20} style={{ color: '#0f62fe', flexShrink: 0, marginTop: '2px' }} />
      <div>
        <p style={{ margin: 0, fontWeight: 600, color: '#0f62fe' }}>{title}</p>
        <p style={{ margin: '0.25rem 0', color: '#0f62fe', lineHeight: 1.6 }}>{riskDisclosureIntro}</p>
        <Link href="/risk-disclosure" style={{ color: '#0f62fe', fontWeight: 600 }}>
          Read the full risk disclosure
        </Link>
      </div>
    </div>
  );
}
