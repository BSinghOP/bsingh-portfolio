'use client';

import { Trophy, ArrowUpRight } from 'lucide-react';
import { about, achievements, personal } from '@/lib/content';
import { TechRadial, SECTIONS } from '@/components/TechRadial';

const sectionStyle: React.CSSProperties = {
  position: 'relative',
  zIndex: 1,
  maxWidth: 1000,
  margin: '0 auto',
  padding: 'clamp(2.5rem, 6vw, 4rem) clamp(1rem, 4vw, 2rem)',
};
const h2Style: React.CSSProperties = {
  fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
  fontWeight: 600,
  letterSpacing: '-0.03em',
  color: 'var(--fg)',
  margin: '0 0 1.6rem',
};
const proseStyle: React.CSSProperties = {
  fontSize: '1.02rem',
  lineHeight: 1.75,
  color: 'var(--fg-muted)',
  maxWidth: 680,
  marginBottom: '1rem',
};

export function About() {
  return (
    <section id="about" style={sectionStyle}>
      <h2 className="mono" style={h2Style}>
        A little context.
      </h2>
      {about.map((p, i) => (
        <p key={i} style={proseStyle}>
          {p}
        </p>
      ))}
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills" style={sectionStyle}>
      <h2 className="mono" style={h2Style}>
        What I work with.
      </h2>
      <div className="tech-legend mono">
        {SECTIONS.map((s) => (
          <span key={s.label} className="tech-legend__item">
            <span className="tech-legend__dot" style={{ background: s.color, color: s.color }} />
            {s.label}
          </span>
        ))}
      </div>
      <TechRadial />
    </section>
  );
}

export function Achievements() {
  return (
    <section id="achievements" style={sectionStyle}>
      <h2 className="mono" style={h2Style}>
        Achievements.
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        {achievements.map((a, i) => (
          <div
            key={i}
            className="achievement-card"
            style={{
              padding: '1.1rem 1.3rem',
              border: '1px solid var(--line-strong)',
              borderRadius: 12,
              background:
                'linear-gradient(180deg, var(--card-grad-top) 0%, var(--card-grad-bot) 100%), var(--card)',
              display: 'flex',
              gap: 14,
              alignItems: 'flex-start',
              boxShadow:
                'inset 0 1px 0 var(--card-edge-top), inset 0 -1px 0 var(--card-edge-bot), 0 2px 4px rgba(0,0,0,0.2), 0 8px 16px rgba(0,0,0,0.25), 0 22px 40px -14px rgba(0,0,0,0.5)',
            }}
          >
            <div
              style={{
                marginTop: 2,
                color: 'var(--amber)',
                flexShrink: 0,
              }}
            >
              <Trophy size={18} />
            </div>
            <div>
              <div
                className="mono"
                style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg)', marginBottom: 4 }}
              >
                {a.title}
              </div>
              <div
                className="mono"
                style={{ fontSize: 12, color: 'var(--fg-dim)', marginBottom: 6 }}
              >
                {a.org}
              </div>
              <div style={{ fontSize: 14, color: 'var(--fg-muted)', lineHeight: 1.55 }}>
                {a.note}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" style={sectionStyle}>
      <h2 className="mono" style={h2Style}>
        Let us talk.
      </h2>
      <p style={proseStyle}>
        Building something interesting? Need a server that does not fall over?
        <br />
        Or just want to say hi — I am easy to reach.
      </p>
      <a
        href={`mailto:${personal.email}`}
        className="mono"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          fontSize: 'clamp(1.3rem, 3vw, 1.9rem)',
          fontWeight: 500,
          color: 'var(--accent)',
          textDecoration: 'none',
          marginTop: '1rem',
          letterSpacing: '-0.015em',
          transition: 'gap 0.2s',
        }}
        onMouseOver={(e) => (e.currentTarget.style.gap = '14px')}
        onMouseOut={(e) => (e.currentTarget.style.gap = '8px')}
      >
        {personal.email} <ArrowUpRight size={18} />
      </a>
    </section>
  );
}
