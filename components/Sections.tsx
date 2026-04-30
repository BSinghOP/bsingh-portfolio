'use client';

import { motion } from 'framer-motion';
import { Code2, Terminal, Server, Cpu, Trophy, ArrowUpRight, Globe, ShieldCheck, Lock } from 'lucide-react';
import {
  SiC,
  SiCplusplus,
  SiPython,
  SiOpenjdk,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiLinux,
  SiNginx,
  SiPm2,
  SiCloudflare,
  SiLetsencrypt,
} from 'react-icons/si';
import type { IconType } from 'react-icons';
import { about, skills, achievements, personal } from '@/lib/content';

const ICON_MAP = {
  code: Code2,
  terminal: Terminal,
  cpu: Cpu,
  server: Server,
};

type TechIcon = { Icon: IconType | typeof Globe; color: string };

const TECH_ICONS: Record<string, TechIcon> = {
  C: { Icon: SiC, color: '#A8B9CC' },
  'C++': { Icon: SiCplusplus, color: '#00599C' },
  Python: { Icon: SiPython, color: '#3776AB' },
  Java: { Icon: SiOpenjdk, color: '#E76F00' },
  JavaScript: { Icon: SiJavascript, color: '#F7DF1E' },
  React: { Icon: SiReact, color: '#61DAFB' },
  'Next.js': { Icon: SiNextdotjs, color: '#FFFFFF' },
  Tailwind: { Icon: SiTailwindcss, color: '#06B6D4' },
  'HTML/CSS': { Icon: SiHtml5, color: '#E34F26' },
  HTML: { Icon: SiHtml5, color: '#E34F26' },
  CSS: { Icon: SiCss, color: '#1572B6' },
  'Node.js': { Icon: SiNodedotjs, color: '#5FA04E' },
  Express: { Icon: SiExpress, color: '#FFFFFF' },
  MySQL: { Icon: SiMysql, color: '#4479A1' },
  'REST APIs': { Icon: Globe, color: '#8B949E' },
  'Linux VPS': { Icon: SiLinux, color: '#FCC624' },
  Linux: { Icon: SiLinux, color: '#FCC624' },
  Nginx: { Icon: SiNginx, color: '#009639' },
  PM2: { Icon: SiPm2, color: '#2B037A' },
  Cloudflare: { Icon: SiCloudflare, color: '#F38020' },
  'SSL/TLS': { Icon: SiLetsencrypt, color: '#003A70' },
  'DDoS mitigation': { Icon: ShieldCheck, color: '#3FB950' },
};

const FALLBACK_ICON: TechIcon = { Icon: Lock, color: '#8B949E' };

const sectionStyle: React.CSSProperties = {
  position: 'relative',
  zIndex: 1,
  maxWidth: 1000,
  margin: '0 auto',
  padding: '4rem 2rem',
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

function SkillCard({ group }: { group: (typeof skills)[number] }) {
  const Icon = ICON_MAP[group.icon];

  return (
    <motion.div
      className="skill-card"
      style={{
        border: '1.5px solid var(--card-border)',
        borderRadius: 14,
      }}
      whileHover={{ scale: 1.025 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
    >
      <div className="skill-card__shine" />
      <div className="skill-card__head mono">
        <Icon size={14} /> {group.label}
      </div>
      <div className="skill-card__items">
        {group.items.map((s) => {
          const tech = TECH_ICONS[s] ?? FALLBACK_ICON;
          const TechIco = tech.Icon;
          return (
            <span key={s} className="skill-chip mono">
              <TechIco size={14} color={tech.color} />
              {s}
            </span>
          );
        })}
      </div>

      <style jsx>{`
        .skill-card {
          position: relative;
          padding: 1.85rem 1.75rem;
          background:
            linear-gradient(
              180deg,
              var(--card-grad-top) 0%,
              var(--card-grad-bot) 100%
            ),
            var(--card-glass-thin);
          -webkit-backdrop-filter: blur(28px) saturate(160%);
          backdrop-filter: blur(28px) saturate(160%);
          overflow: hidden;
          box-shadow:
            inset 0 1px 0 var(--card-edge-top),
            inset 0 -1px 0 var(--card-edge-bot),
            0 2px 4px rgba(0, 0, 0, 0.35),
            0 8px 16px rgba(0, 0, 0, 0.4),
            0 24px 48px -12px rgba(0, 0, 0, 0.7);
          transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
        }
        :global(:root[data-theme='light']) .skill-card {
          box-shadow:
            inset 0 1px 0 var(--card-edge-top),
            inset 0 -1px 0 var(--card-edge-bot),
            0 1px 2px rgba(0, 0, 0, 0.06),
            0 6px 14px rgba(0, 0, 0, 0.08),
            0 22px 40px -16px rgba(0, 0, 0, 0.18);
        }
        .skill-card:hover {
          border-color: var(--accent);
          box-shadow:
            inset 0 1px 0 var(--card-edge-top-strong),
            inset 0 -1px 0 var(--card-edge-bot),
            0 4px 8px rgba(0, 0, 0, 0.4),
            0 14px 28px rgba(0, 0, 0, 0.45),
            0 36px 64px -16px rgba(0, 0, 0, 0.75);
        }
        :global(:root[data-theme='light']) .skill-card:hover {
          box-shadow:
            inset 0 1px 0 var(--card-edge-top-strong),
            inset 0 -1px 0 var(--card-edge-bot),
            0 2px 4px rgba(0, 0, 0, 0.07),
            0 12px 24px rgba(0, 0, 0, 0.1),
            0 36px 60px -20px rgba(0, 0, 0, 0.18);
        }
        .skill-card__shine {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at 50% 0%, var(--accent-soft) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }
        .skill-card:hover .skill-card__shine {
          opacity: 1;
        }
        .skill-card__head {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 12px;
          color: var(--fg-dim);
          margin-bottom: 0.9rem;
        }
        .skill-card__items {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .skill-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          padding: 6px 11px;
          border: 1px solid var(--line-strong);
          border-radius: 8px;
          color: var(--fg);
          background: var(--chip-glass);
          -webkit-backdrop-filter: blur(10px) saturate(140%);
          backdrop-filter: blur(10px) saturate(140%);
          box-shadow: inset 0 1px 0 var(--card-edge-top);
          transition: border-color 0.15s, transform 0.15s, color 0.15s, background 0.15s;
        }
        .skill-chip:hover {
          border-color: var(--accent);
          color: var(--accent);
          transform: translateY(-1px);
        }
      `}</style>
    </motion.div>
  );
}

export function Skills() {
  return (
    <section id="skills" style={sectionStyle}>
      <h2 className="mono" style={h2Style}>
        What I work with.
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {skills.map((group) => (
          <SkillCard key={group.label} group={group} />
        ))}
      </div>
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
