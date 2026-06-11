'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { stats as fallbackStats, personal } from '@/lib/content';

type GitHubStats = {
  repos: number | null;
};

type Contribution = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

const DAY_LABELS = ['', 'mon', '', 'wed', '', 'fri', ''];
const MONTH_NAMES = [
  'jan', 'feb', 'mar', 'apr', 'may', 'jun',
  'jul', 'aug', 'sep', 'oct', 'nov', 'dec',
];

function tooltipFor(c: Contribution) {
  const ds = new Date(c.date + 'T00:00:00Z').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
  return c.count === 0
    ? `no contributions · ${ds}`
    : `${c.count} contribution${c.count === 1 ? '' : 's'} · ${ds}`;
}

function ContributionGrid({ username }: { username: string }) {
  const [days, setDays] = useState<Contribution[] | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    let aborted = false;
    fetch('/api/contributions')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('http ' + r.status))))
      .then((d: { contributions?: Contribution[]; total?: number } | null) => {
        if (aborted) return;
        if (!d?.contributions?.length) {
          setStatus('error');
          return;
        }
        setDays(d.contributions);
        setTotal(d.total ?? d.contributions.reduce((s, c) => s + c.count, 0));
        setStatus('ready');
      })
      .catch(() => {
        if (!aborted) setStatus('error');
      });
    return () => {
      aborted = true;
    };
  }, []);

  // GitHub layout: columns = weeks (oldest left), rows = Sun..Sat
  const { weeks, months } = useMemo(() => {
    if (!days) {
      return {
        weeks: Array.from({ length: 53 }, () => Array<Contribution | null>(7).fill(null)),
        months: [] as { idx: number; label: string }[],
      };
    }
    const lead = new Date(days[0].date + 'T00:00:00Z').getUTCDay();
    const cells: (Contribution | null)[] = [...Array(lead).fill(null), ...days];
    while (cells.length % 7 !== 0) cells.push(null);
    const weeks: (Contribution | null)[][] = [];
    for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

    const months: { idx: number; label: string }[] = [];
    let prev = -1;
    weeks.forEach((w, i) => {
      const d = w.find(Boolean);
      if (!d) return;
      const m = new Date(d.date + 'T00:00:00Z').getUTCMonth();
      if (m !== prev) {
        months.push({ idx: i, label: MONTH_NAMES[m] });
        prev = m;
      }
    });
    // first label overlaps the second when the year starts mid-month
    if (months.length > 1 && months[1].idx - months[0].idx < 3) months.shift();

    return { weeks, months };
  }, [days]);

  return (
    <motion.div
      className="contrib-card"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <div className="contrib-head mono">
        <span>
          {status === 'ready' && total != null &&
            `${total.toLocaleString()} contributions in the last year`}
          {status === 'loading' && 'loading contributions…'}
          {status === 'error' && 'couldn’t load contributions'}
        </span>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noreferrer"
          className="contrib-profile"
        >
          @{username}
        </a>
      </div>

      <div className="contrib-scroll">
        <div className="contrib-body">
          <div className="contrib-daylabels mono">
            {DAY_LABELS.map((l, i) => (
              <span key={i}>{l}</span>
            ))}
          </div>
          <div>
            <div
              className="contrib-months mono"
              style={{ gridTemplateColumns: `repeat(${weeks.length}, 11px)` }}
            >
              {months.map((m) => (
                <span key={m.idx} style={{ gridColumn: `${m.idx + 1} / span 3` }}>
                  {m.label}
                </span>
              ))}
            </div>
            <div
              className="contrib-grid"
              role="img"
              aria-label={
                total != null
                  ? `${total} GitHub contributions in the last year`
                  : 'GitHub contributions in the last year'
              }
              style={{ gridTemplateColumns: `repeat(${weeks.length}, 11px)` }}
            >
              {weeks.map((week, wi) =>
                week.map((c, di) =>
                  c ? (
                    <div
                      key={`${wi}-${di}`}
                      className={`ccell lv${c.level}${di < 3 ? ' ccell--flip' : ''}`}
                      data-tip={tooltipFor(c)}
                      style={{ gridColumn: wi + 1, gridRow: di + 1 }}
                    />
                  ) : (
                    <div
                      key={`${wi}-${di}`}
                      className="ccell ccell--pad"
                      style={{ gridColumn: wi + 1, gridRow: di + 1 }}
                      aria-hidden
                    />
                  )
                )
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="contrib-legend mono" aria-hidden>
        <span>less</span>
        {[0, 1, 2, 3, 4].map((l) => (
          <span key={l} className={`ccell lv${l}`} />
        ))}
        <span>more</span>
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
        .contrib-head {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 1rem;
          font-size: 12px;
          color: var(--fg-muted);
          margin-bottom: 0.9rem;
          flex-wrap: wrap;
        }
        .contrib-profile {
          color: var(--accent);
          text-decoration: none;
          font-size: 11.5px;
        }
        .contrib-profile:hover {
          text-decoration: underline;
        }
        .contrib-scroll {
          overflow-x: auto;
          overflow-y: hidden;
          scrollbar-width: thin;
          -webkit-overflow-scrolling: touch;
          padding-bottom: 4px;
        }
        .contrib-body {
          display: flex;
          gap: 6px;
          width: max-content;
        }
        .contrib-daylabels {
          display: grid;
          grid-template-rows: repeat(7, 11px);
          gap: 3px;
          font-size: 9px;
          color: var(--fg-dim);
          text-align: right;
          margin-top: 18px;
        }
        .contrib-daylabels span {
          line-height: 11px;
        }
        .contrib-months {
          display: grid;
          gap: 3px;
          font-size: 9.5px;
          color: var(--fg-dim);
          height: 15px;
          margin-bottom: 3px;
        }
        .contrib-months span {
          white-space: nowrap;
          overflow: visible;
        }
        .contrib-grid {
          display: grid;
          grid-template-rows: repeat(7, 11px);
          gap: 3px;
        }
        :global(.ccell) {
          width: 11px;
          height: 11px;
          border-radius: 2.5px;
          position: relative;
        }
        :global(.ccell--pad) {
          background: transparent;
        }
        /* GitHub dark palette */
        :global(.ccell.lv0) {
          background: rgba(255, 255, 255, 0.07);
        }
        :global(.ccell.lv1) {
          background: #0e4429;
        }
        :global(.ccell.lv2) {
          background: #006d32;
        }
        :global(.ccell.lv3) {
          background: #26a641;
        }
        :global(.ccell.lv4) {
          background: #39d353;
        }
        /* GitHub light palette */
        :global([data-theme='light'] .ccell.lv0) {
          background: #ebedf0;
        }
        :global([data-theme='light'] .ccell.lv1) {
          background: #9be9a8;
        }
        :global([data-theme='light'] .ccell.lv2) {
          background: #40c463;
        }
        :global([data-theme='light'] .ccell.lv3) {
          background: #30a14e;
        }
        :global([data-theme='light'] .ccell.lv4) {
          background: #216e39;
        }
        :global(.ccell[data-tip]:hover) {
          outline: 1px solid var(--fg-dim);
          outline-offset: 0;
        }
        :global(.ccell[data-tip]:hover::after) {
          content: attr(data-tip);
          position: absolute;
          bottom: calc(100% + 7px);
          left: 50%;
          transform: translateX(-50%);
          background: var(--bg-3);
          border: 1px solid var(--line-strong);
          color: var(--fg);
          padding: 4px 9px;
          border-radius: 6px;
          font-size: 11px;
          font-family: var(--font-jetbrains), monospace;
          white-space: nowrap;
          z-index: 20;
          pointer-events: none;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
        }
        :global(.ccell--flip[data-tip]:hover::after) {
          bottom: auto;
          top: calc(100% + 7px);
        }
        .contrib-legend {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 4px;
          font-size: 10px;
          color: var(--fg-dim);
          margin-top: 8px;
        }
        .contrib-legend :global(.ccell) {
          display: inline-block;
        }
        .contrib-legend span:first-child {
          margin-right: 3px;
        }
        .contrib-legend span:last-child {
          margin-left: 3px;
        }
      `}</style>
    </motion.div>
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
