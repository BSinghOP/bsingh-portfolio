'use client';

import { Code2, Terminal, Server, Cpu, Trophy, ArrowUpRight } from 'lucide-react';
import { about, skills, achievements, personal } from '@/lib/content';

const ICON_MAP = {
  code: Code2,
  terminal: Terminal,
  cpu: Cpu,
  server: Server,
};

const sectionStyle: React.CSSProperties = {
  position: 'relative',
  zIndex: 1,
  maxWidth: 1000,
  margin: '0 auto',
  padding: '4rem 2rem',
};
const kickerStyle: React.CSSProperties = {
  fontSize: 12,
  color: 'var(--fg-dim)',
  display: 'block',
  marginBottom: '0.8rem',
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
      <span className="mono" style={kickerStyle}>
        // about
      </span>
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
      <span className="mono" style={kickerStyle}>
        // stack
      </span>
      <h2 className="mono" style={h2Style}>
        What I work with.
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1rem',
        }}
      >
        {skills.map((group) => {
          const Icon = ICON_MAP[group.icon];
          return (
            <div
              key={group.label}
              style={{
                padding: '1.2rem',
                border: '1px solid var(--line)',
                borderRadius: 10,
                background: 'var(--card)',
              }}
            >
              <div
                className="mono"
                style={{
                  fontSize: 12,
                  color: 'var(--fg-dim)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                  marginBottom: '0.9rem',
                }}
              >
                <Icon size={14} /> {group.label}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {group.items.map((s) => (
                  <span
                    key={s}
                    className="mono chip"
                    style={{
                      fontSize: 12,
                      padding: '4px 9px',
                      border: '1px solid var(--line)',
                      borderRadius: 6,
                      color: 'var(--fg)',
                      background: 'var(--bg-2)',
                      transition: 'all 0.15s',
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <style jsx>{`
        :global(.chip:hover) {
          border-color: var(--accent) !important;
          color: var(--accent) !important;
        }
      `}</style>
    </section>
  );
}

export function Achievements() {
  return (
    <section id="achievements" style={sectionStyle}>
      <span className="mono" style={kickerStyle}>
        // wins
      </span>
      <h2 className="mono" style={h2Style}>
        Achievements.
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        {achievements.map((a, i) => (
          <div
            key={i}
            style={{
              padding: '1.1rem 1.3rem',
              border: '1px solid var(--line)',
              borderRadius: 10,
              background: 'var(--card)',
              display: 'flex',
              gap: 14,
              alignItems: 'flex-start',
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
      <span className="mono" style={kickerStyle}>
        // say hi
      </span>
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
