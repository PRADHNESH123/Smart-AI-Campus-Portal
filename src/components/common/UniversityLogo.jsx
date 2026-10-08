import React from 'react';

export default function UniversityLogo({ size = 'md', showTagline = false, light = false }) {
  const sizes = {
    sm: { logo: 32, titleSize: '0.82rem', taglineSize: '0.6rem' },
    md: { logo: 42, titleSize: '0.95rem', taglineSize: '0.68rem' },
    lg: { logo: 56, titleSize: '1.15rem', taglineSize: '0.75rem' }
  };

  const s = sizes[size] || sizes.md;
  const titleColor = light ? '#ffffff' : 'var(--primary-900)';
  const taglineColor = light ? 'rgba(255,255,255,0.75)' : 'var(--slate-500)';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', userSelect: 'none' }}>
      {/* Official Kalasalingam University Crest */}
      <img
        src="/kare-crest.png"
        alt="Kalasalingam University Crest"
        style={{
          width: `${s.logo}px`,
          height: `${s.logo}px`,
          objectFit: 'contain',
          borderRadius: '6px',
          flexShrink: 0
        }}
      />

      {/* University Name & Tagline */}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
        <span
          style={{
            fontSize: s.titleSize,
            fontWeight: 800,
            color: titleColor,
            letterSpacing: '-0.01em',
            whiteSpace: 'nowrap'
          }}
        >
          Kalasalingam University
        </span>
        {showTagline && (
          <span
            style={{
              fontSize: s.taglineSize,
              color: taglineColor,
              fontWeight: 500,
              marginTop: '1px'
            }}
          >
            Smart Campus Portal
          </span>
        )}
      </div>
    </div>
  );
}
