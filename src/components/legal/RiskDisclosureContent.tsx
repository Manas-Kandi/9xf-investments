import { Warning } from '@carbon/icons-react';
import { riskDisclosureIntro, riskDisclosurePoints } from '@/lib/legal';

export function RiskDisclosureContent() {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          gap: '0.75rem',
          padding: '1rem',
          background: '#fff8e1',
          border: '1px solid #f1c21b',
          borderRadius: '8px',
          marginBottom: '1.5rem',
        }}
      >
        <Warning size={24} style={{ color: '#8a6d3b', flexShrink: 0 }} />
        <p style={{ margin: 0, color: '#8a6d3b' }}>{riskDisclosureIntro}</p>
      </div>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {riskDisclosurePoints.map((item) => (
          <div
            key={item.title}
            style={{
              padding: '1.25rem',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              background: 'white',
            }}
          >
            <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.125rem', fontWeight: 600 }}>{item.title}</h3>
            <p style={{ margin: 0, color: '#525252', lineHeight: 1.7 }}>{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
