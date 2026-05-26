'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { stats as fallbackStats, personal } from '@/lib/content';

type GitHubStats = {
  repos: number | null;
};

type Contribution = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
type Day = Contribution | null;

function buildDays(contribs: Contribution[]): Day[] {
  if (!contribs.length) return [];
  const firstDow = new Date(contribs[0].date + 'T00:00:00Z').getUTCDay();
  const pad: Day[] = Array.from({ length: firstDow }, () => null);
  return [...pad, ...contribs];
}

function ContributionGrid({ username }: { username: string }) {
  const [days, setDays] = useState<Day[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    let aborted = false;
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('http ' + r.status))))
      .then((d: { contributions?: Contribution[]; total?: Record<string, number> } | null) => {
        if (aborted || !d?.contributions?.length) {
          if (!aborted) setStatus('error');
          return;
        }
        setDays(buildDays(d.contributions));
        setTotal(d.contributions.reduce((s, c) => s + (c.count ?? 0), 0));
        setStatus('ready');
      })
      .catch(() => {
        if (!aborted) setStatus('error');
      });
    return () => {
      aborted = true;
    };
  }, [username]);

  const formatDate = (iso: string) =>
    new Date(iso + 'T00:00:00Z').toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC',
    });

  return (
    <div className="contrib-card">
      <div className="contrib-scroll">
        <div className="contrib" role="img" aria-label={total != null ? `${total} GitHub contributions in the last year` : 'GitHub contributions in the last year'}>
          {days.map((c, i) => {
            const col = Math.floor(i / 7);
            if (!c) {
              return <div key={i} className="contrib__cell contrib__cell--pad" aria-hidden />;
            }
            return (
              <motion.div
                key={i}
                className={`contrib__cell contrib__cell--${c.level}`}
                title={`${c.count} contribution${c.count === 1 ? '' : 's'} on ${formatDate(c.date)}`}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05 + col * 0.008, duration: 0.22 }}
              />
            );
          })}
        </div>
      </div>
      <div className="contrib-footer mono">
        <span className="contrib-total">
          {status === 'ready' && total != null && `${total.toLocaleString()} contributions in the last year`}
          {status === 'loading' && 'loading contributions…'}
          {status === 'error' && 'couldn’t load contributions'}
        </span>
        <span className="legend" aria-hidden>
          <span>less</span>
          <span className="contrib__cell contrib__cell--0 legend-cell" />
          <span className="contrib__cell contrib__cell--1 legend-cell" />
          <span className="contrib__cell contrib__cell--2 legend-cell" />
          <span className="contrib__cell contrib__cell--3 legend-cell" />
          <span className="contrib__cell contrib__cell--4 legend-cell" />
          <span>more</span>
        </span>
      </div>
      <style jsx>{`
        .contrib-card {
          padding: 1.1rem 1.2rem 0.9rem;
          border: 1px solid var(--line-strong);
          border-radius: 12px;
          background:
            linear-gradient(180deg, var(--card-grad-top) 0%, var(--card-grad-bot) 100%),
            var(--card);
          box-shadow:
            inset 0 1px 0 var(--card-edge-top),
            inset 0 -1px 0 var(--card-edge-bot),
            0 2px 4px rgba(0, 0, 0, 0.2),
            0 8px 16px rgba(0, 0, 0, 0.25),
            0 22px 40px -14px rgba(0, 0, 0, 0.5);
        }
        .contrib-scroll {
          overflow-x: auto;
          overflow-y: hidden;
          scrollbar-width: thin;
          -webkit-overflow-scrolling: touch;
        }
        .contrib {
          --cell: 12px;
          --gap: 3px;
          display: grid;
          grid-template-rows: repeat(7, var(--cell));
          grid-auto-flow: column;
          grid-auto-columns: var(--cell);
          gap: var(--gap);
          min-width: max-content;
          padding: 2px 0;
        }
        .contrib-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          margin-top: 0.85rem;
          font-size: 11px;
          color: var(--fg-dim);
        }
        .legend {
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .legend :global(.legend-cell) {
          width: 10px;
          height: 10px;
        }
        :global(.contrib__cell) {
          border-radius: 2px;
          background: var(--line);
          display: block;
        }
        :global(.contrib__cell--pad) {
          background: transparent;
        }
        :global(.contrib__cell--1) {
          background: rgba(63, 185, 80, 0.28);
        }
        :global(.contrib__cell--2) {
          background: rgba(63, 185, 80, 0.5);
        }
        :global(.contrib__cell--3) {
          background: rgba(63, 185, 80, 0.75);
        }
        :global(.contrib__cell--4) {
          background: rgba(63, 185, 80, 0.98);
        }
        :root[data-theme='light'] :global(.contrib__cell--1) {
          background: rgba(26, 127, 55, 0.2);
        }
        :root[data-theme='light'] :global(.contrib__cell--2) {
          background: rgba(26, 127, 55, 0.42);
        }
        :root[data-theme='light'] :global(.contrib__cell--3) {
          background: rgba(26, 127, 55, 0.68);
        }
        :root[data-theme='light'] :global(.contrib__cell--4) {
          background: rgba(26, 127, 55, 0.92);
        }
        @media (max-width: 600px) {
          .contrib {
            --cell: 9px;
            --gap: 2px;
          }
        }
      `}</style>
    </div>
  );
}

export function Stats() {
  const [gh, setGh] = useState<GitHubStats>({ repos: null });

  useEffect(() => {
    fetch(`https://api.github.com/users/${personal.githubUsername}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d) setGh({ repos: d.public_repos });
      })
      .catch(() => {});
  }, []);

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
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginBottom: '1.4rem',
          fontSize: 12,
        }}
      >
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
        <ContributionGrid username={personal.githubUsername} />
      </div>

      <style jsx>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 0;
          border: 1px solid var(--line-strong);
          border-radius: 12px;
          background:
            linear-gradient(180deg, var(--card-grad-top) 0%, var(--card-grad-bot) 100%),
            var(--card);
          overflow: hidden;
          box-shadow:
            inset 0 1px 0 var(--card-edge-top),
            inset 0 -1px 0 var(--card-edge-bot),
            0 2px 4px rgba(0, 0, 0, 0.2),
            0 8px 16px rgba(0, 0, 0, 0.25),
            0 22px 40px -14px rgba(0, 0, 0, 0.5);
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
