'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { stats as fallbackStats, personal } from '@/lib/content';

type GitHubStats = {
  repos: number | null;
  followers: number | null;
};

function ContributionGrid() {
  const cells = Array.from({ length: 7 * 26 }, (_, i) => {
    const seed = (i * 9301 + 49297) % 233280;
    const r = seed / 233280;
    if (r < 0.45) return 0;
    if (r < 0.7) return 1;
    if (r < 0.85) return 2;
    if (r < 0.95) return 3;
    return 4;
  });
  return (
    <div className="contrib">
      {cells.map((v, i) => (
        <motion.div
          key={i}
          className={`contrib__cell contrib__cell--${v}`}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 + (i % 26) * 0.012, duration: 0.3 }}
        />
      ))}
      <style jsx>{`
        .contrib {
          display: grid;
          grid-template-columns: repeat(26, 1fr);
          grid-auto-rows: 12px;
          gap: 3px;
          padding: 1rem 1.2rem;
          border: 1px solid var(--line);
          border-radius: 10px;
          background: var(--card);
        }
        :global(.contrib__cell) {
          border-radius: 2px;
          background: var(--line);
        }
        :global(.contrib__cell--1) {
          background: rgba(63, 185, 80, 0.25);
        }
        :global(.contrib__cell--2) {
          background: rgba(63, 185, 80, 0.45);
        }
        :global(.contrib__cell--3) {
          background: rgba(63, 185, 80, 0.7);
        }
        :global(.contrib__cell--4) {
          background: rgba(63, 185, 80, 0.95);
        }
        :root[data-theme='light'] :global(.contrib__cell--1) {
          background: rgba(26, 127, 55, 0.18);
        }
        :root[data-theme='light'] :global(.contrib__cell--2) {
          background: rgba(26, 127, 55, 0.4);
        }
        :root[data-theme='light'] :global(.contrib__cell--3) {
          background: rgba(26, 127, 55, 0.65);
        }
        :root[data-theme='light'] :global(.contrib__cell--4) {
          background: rgba(26, 127, 55, 0.9);
        }
        @media (max-width: 600px) {
          .contrib {
            grid-template-columns: repeat(20, 1fr);
          }
        }
      `}</style>
    </div>
  );
}

export function Stats() {
  const [gh, setGh] = useState<GitHubStats>({ repos: null, followers: null });

  useEffect(() => {
    fetch(`https://api.github.com/users/${personal.githubUsername}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d) setGh({ repos: d.public_repos, followers: d.followers });
      })
      .catch(() => {});
  }, []);

  // Merge live data into the stats array — first stat = repos (live)
  const liveStats = [...fallbackStats];
  if (gh.repos !== null) {
    liveStats[0] = { ...liveStats[0], value: String(gh.repos) };
  }

  return (
    <section
      id="stats"
      style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: 1000,
        margin: '0 auto',
        padding: '2rem 2rem 4rem',
      }}
    >
      <div
        className="mono"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.4rem',
          fontSize: 12,
        }}
      >
        <span style={{ color: 'var(--fg-dim)' }}>// activity</span>
        <span
          style={{
            color: 'var(--green)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
          }}
        >
          <span
            className="pulse-dot"
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'var(--green)',
            }}
          />
          live from github
        </span>
      </div>

      <div className="stats-grid">
        {liveStats.map((s, i) => (
          <div key={i} className="stat">
            <div className="stat-label mono">{s.label}</div>
            <div className="stat-value mono">{s.value}</div>
            {s.hint && <div className="stat-hint mono">{s.hint}</div>}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '1.6rem' }}>
        <ContributionGrid />
      </div>

      <style jsx>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 0;
          border: 1px solid var(--line);
          border-radius: 10px;
          background: var(--card);
          overflow: hidden;
        }
        .stat {
          padding: 1.2rem 1.4rem;
          border-right: 1px solid var(--line);
        }
        .stat:last-child {
          border-right: none;
        }
        .stat-label {
          font-size: 11px;
          color: var(--fg-dim);
          text-transform: lowercase;
          margin-bottom: 6px;
        }
        .stat-value {
          font-size: 1.7rem;
          font-weight: 600;
          color: var(--fg);
          letter-spacing: -0.02em;
        }
        .stat-hint {
          font-size: 11px;
          color: var(--fg-dim);
          margin-top: 4px;
        }
        @media (max-width: 600px) {
          .stat {
            border-right: none;
            border-bottom: 1px solid var(--line);
          }
          .stat:last-child {
            border-bottom: none;
          }
        }
      `}</style>
    </section>
  );
}
