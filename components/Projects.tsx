'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Github, ArrowUpRight } from 'lucide-react';
import { projects } from '@/lib/content';

type Accent = 'blue' | 'green' | 'amber';

function useTilt(strength = 6) {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [strength, -strength]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-strength, strength]), {
    stiffness: 300,
    damping: 30,
  });
  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };
  return { ref, onMove, onLeave, rotateX, rotateY };
}

function ProjectCard({
  title,
  subtitle,
  tags,
  live,
  repo,
  accent,
}: {
  title: string;
  subtitle: string;
  tags: string[];
  live?: string;
  repo?: string;
  accent: Accent;
}) {
  const { ref, onMove, onLeave, rotateX, rotateY } = useTilt(6);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`card card--${accent}`}
      style={{ rotateX, rotateY, transformPerspective: 1000 } as any}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <div className="card__shine" />
      <div className="card__head">
        <span className="card__dot" />
        <span className="card__title mono">{title}</span>
      </div>
      <p className="card__sub">{subtitle}</p>
      <div className="card__tags">
        {tags.map((t) => (
          <span key={t} className="tag mono">
            {t}
          </span>
        ))}
      </div>
      <div className="card__links mono">
        {live && (
          <a href={live} target="_blank" rel="noreferrer" className="card__link">
            live <ArrowUpRight size={13} />
          </a>
        )}
        {repo && (
          <a
            href={repo}
            target="_blank"
            rel="noreferrer"
            className="card__link card__link--ghost"
          >
            repo <Github size={13} />
          </a>
        )}
      </div>

      <style jsx>{`
        .card {
          position: relative;
          padding: 1.4rem;
          background: var(--card);
          border: 1px solid var(--line);
          border-radius: 12px;
          cursor: default;
          overflow: hidden;
          transition: border-color 0.2s, background 0.2s;
        }
        .card:hover {
          border-color: var(--line-strong);
          background: var(--card-hover);
        }
        .card__shine {
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
        .card:hover .card__shine {
          opacity: 1;
        }
        .card--green:hover .card__shine {
          background: radial-gradient(circle at 50% 0%, var(--green-soft) 0%, transparent 50%);
        }
        .card--amber:hover .card__shine {
          background: radial-gradient(
            circle at 50% 0%,
            rgba(210, 153, 34, 0.12) 0%,
            transparent 50%
          );
        }
        .card__head {
          display: flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 12px;
        }
        .card__dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent);
        }
        .card--green .card__dot {
          background: var(--green);
        }
        .card--amber .card__dot {
          background: var(--amber);
        }
        .card__title {
          font-weight: 600;
          font-size: 1.05rem;
          color: var(--fg);
          letter-spacing: -0.01em;
        }
        .card__sub {
          font-size: 0.92rem;
          line-height: 1.6;
          color: var(--fg-muted);
          margin: 0 0 14px;
        }
        .card__tags {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          margin-bottom: 14px;
        }
        .tag {
          font-size: 11px;
          padding: 3px 8px;
          border: 1px solid var(--line-strong);
          border-radius: 4px;
          color: var(--fg-muted);
        }
        .card__links {
          display: flex;
          gap: 12px;
          font-size: 12px;
        }
        .card__link {
          color: var(--accent);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .card__link:hover {
          text-decoration: underline;
        }
        .card__link--ghost {
          color: var(--fg-muted);
        }
        .card__link--ghost:hover {
          color: var(--fg);
          text-decoration: none;
        }
      `}</style>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section
      id="projects"
      style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: 1000,
        margin: '0 auto',
        padding: '4rem 2rem',
      }}
    >
      <span
        className="mono"
        style={{
          fontSize: 12,
          color: 'var(--fg-dim)',
          display: 'block',
          marginBottom: '0.8rem',
        }}
      >
        // selected work
      </span>
      <h2
        className="mono"
        style={{
          fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
          fontWeight: 600,
          letterSpacing: '-0.03em',
          color: 'var(--fg)',
          marginBottom: '1.6rem',
          margin: '0 0 1.6rem',
        }}
      >
        Projects.
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: '1rem',
        }}
      >
        {projects.map((p, i) => (
          <ProjectCard key={i} {...p} />
        ))}
      </div>
    </section>
  );
}
