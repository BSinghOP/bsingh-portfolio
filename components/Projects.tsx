'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Github, ArrowUpRight, Settings, Wrench, Gamepad2, Package, Clock, Box, Trophy, BrainCog } from 'lucide-react';
import {
  SiOpenjdk,
  SiReact,
  SiNodedotjs,
  SiMysql,
  SiLinux,
  SiNginx,
  SiPm2,
  SiCloudflare,
  SiCurseforge,
  SiNextdotjs,
  SiSolidity,
  SiEthereum,
  SiMongodb,
  SiPython,
  SiDebian,
  SiPterodactyl,
} from 'react-icons/si';
import type { IconType } from 'react-icons';
import { projects } from '@/lib/content';

type TagIcon = { Icon: IconType | typeof Box; color: string };
const TAG_ICONS: Record<string, TagIcon> = {
  DevOps: { Icon: Settings, color: '#8B949E' },
  Linux: { Icon: SiLinux, color: '#FCC624' },
  Cloudflare: { Icon: SiCloudflare, color: '#F38020' },
  Java: { Icon: SiOpenjdk, color: '#E76F00' },
  React: { Icon: SiReact, color: '#61DAFB' },
  'Node.js': { Icon: SiNodedotjs, color: '#5FA04E' },
  MySQL: { Icon: SiMysql, color: '#4479A1' },
  Nginx: { Icon: SiNginx, color: '#009639' },
  PM2: { Icon: SiPm2, color: '#2B037A' },
  Minecraft: { Icon: Box, color: '#5DAB52' },
  Modded: { Icon: Wrench, color: '#D29922' },
  Modpacks: { Icon: SiCurseforge, color: '#F16436' },
  Gameplay: { Icon: Gamepad2, color: '#A371F7' },
  'Next.js': { Icon: SiNextdotjs, color: 'currentColor' },
  Solidity: { Icon: SiSolidity, color: 'currentColor' },
  'Ethers.js': { Icon: SiEthereum, color: '#627EEA' },
  MongoDB: { Icon: SiMongodb, color: '#47A248' },
  Hackathon: { Icon: Trophy, color: '#E3B341' },
  Python: { Icon: SiPython, color: '#3776AB' },
  ML: { Icon: BrainCog, color: '#FF6B9D' },
  Swing: { Icon: SiOpenjdk, color: '#E76F00' },
  Game: { Icon: Gamepad2, color: '#A371F7' },
  Debian: { Icon: SiDebian, color: '#A81D33' },
  Pterodactyl: { Icon: SiPterodactyl, color: '#10539E' },
};
const FALLBACK_TAG_ICON: TagIcon = { Icon: Package, color: '#8B949E' };

function ProjectCard({
  title,
  subtitle,
  tags,
  image,
  imageAlt,
  live,
  store,
  repo,
  soon,
}: {
  title: string;
  subtitle: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
  live?: string;
  store?: string;
  repo?: string;
  soon?: boolean;
}) {
  return (
    <motion.div
      className="proj-card"
      style={{
        border: '1px solid var(--line-strong)',
        borderRadius: 14,
      }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
    >
      <div className="proj-card__shine" />

      <div className="proj-card__media">
        {image ? (
          <Image
            src={image}
            alt={imageAlt ?? title}
            fill
            sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 340px"
            className="proj-card__img"
          />
        ) : (
          <div className="proj-card__placeholder mono" aria-hidden>
            <span>image soon</span>
          </div>
        )}
      </div>

      <div className="proj-card__body">
        <div className="proj-card__head">
          <h3 className="proj-card__title mono">{title}</h3>
          {live && (
            <span className="proj-status proj-status--live mono">
              <span className="proj-status__pulse" />
              live
            </span>
          )}
          {soon && (
            <span className="proj-status proj-status--soon mono">
              <Clock size={11} />
              soon
            </span>
          )}
        </div>

        <p className="proj-card__sub">{subtitle}</p>

        {tags.length > 0 && (
          <div className="proj-card__tags">
            {tags.map((t) => {
              const ti = TAG_ICONS[t] ?? FALLBACK_TAG_ICON;
              const TagIco = ti.Icon;
              return (
                <span key={t} className="proj-tag mono">
                  <TagIco size={12} color={ti.color} />
                  {t}
                </span>
              );
            })}
          </div>
        )}

        {(live || store || repo) && (
          <div className="proj-card__links mono">
            {live && (
              <a
                href={live}
                target="_blank"
                rel="noreferrer"
                className="proj-link proj-link--primary"
              >
                visit <ArrowUpRight size={12} />
              </a>
            )}
            {store && (
              <a href={store} target="_blank" rel="noreferrer" className="proj-link">
                store <ArrowUpRight size={12} />
              </a>
            )}
            {repo && (
              <a href={repo} target="_blank" rel="noreferrer" className="proj-link">
                <Github size={12} />
                repo
              </a>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .proj-card {
          position: relative;
          padding: 0;
          background:
            linear-gradient(
              180deg,
              var(--card-grad-top) 0%,
              var(--card-grad-bot) 100%
            ),
            var(--card-glass-thin);
          -webkit-backdrop-filter: blur(28px) saturate(160%);
          backdrop-filter: blur(28px) saturate(160%);
          cursor: default;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow:
            inset 0 1px 0 var(--card-edge-top),
            inset 0 -1px 0 var(--card-edge-bot),
            0 2px 4px rgba(0, 0, 0, 0.35),
            0 8px 16px rgba(0, 0, 0, 0.4),
            0 24px 48px -12px rgba(0, 0, 0, 0.7);
          transition: border-color 0.25s, background 0.25s, box-shadow 0.25s, transform 0.25s;
        }
        :global(:root[data-theme='light']) .proj-card {
          box-shadow:
            inset 0 1px 0 var(--card-edge-top),
            inset 0 -1px 0 var(--card-edge-bot),
            0 1px 2px rgba(0, 0, 0, 0.06),
            0 6px 14px rgba(0, 0, 0, 0.08),
            0 22px 40px -16px rgba(0, 0, 0, 0.18);
        }
        .proj-card:hover {
          border-color: var(--accent);
          box-shadow:
            inset 0 1px 0 var(--card-edge-top-strong),
            inset 0 -1px 0 var(--card-edge-bot),
            0 4px 8px rgba(0, 0, 0, 0.4),
            0 14px 28px rgba(0, 0, 0, 0.45),
            0 36px 64px -16px rgba(0, 0, 0, 0.75);
        }
        :global(:root[data-theme='light']) .proj-card:hover {
          box-shadow:
            inset 0 1px 0 var(--card-edge-top-strong),
            inset 0 -1px 0 var(--card-edge-bot),
            0 2px 4px rgba(0, 0, 0, 0.07),
            0 12px 24px rgba(0, 0, 0, 0.1),
            0 36px 60px -20px rgba(0, 0, 0, 0.18);
        }
        .proj-card__shine {
          position: absolute;
          inset: -50%;
          background: radial-gradient(circle at 50% 0%, var(--accent-soft) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }
        .proj-card:hover .proj-card__shine {
          opacity: 1;
        }
        .proj-card__media {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          border-bottom: 1px solid var(--line-strong);
          border-top-left-radius: 13px;
          border-top-right-radius: 13px;
          isolation: isolate;
          background:
            linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.02) 0%,
              rgba(0, 0, 0, 0.18) 100%
            ),
            var(--chip-glass);
        }
        .proj-card__media :global(.proj-card__img) {
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .proj-card:hover :global(.proj-card__img) {
          transform: scale(1.04);
        }
        .proj-card__placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--fg-muted);
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background-image:
            repeating-linear-gradient(
              45deg,
              var(--line) 0,
              var(--line) 1px,
              transparent 1px,
              transparent 14px
            );
          opacity: 0.55;
        }
        .proj-card__body {
          display: flex;
          flex-direction: column;
          flex: 1;
          padding: 1.5rem 1.6rem 1.6rem;
        }
        .proj-card__head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 10px;
        }
        .proj-card__title {
          margin: 0;
          font-weight: 600;
          font-size: 1rem;
          color: var(--fg);
          letter-spacing: -0.01em;
          line-height: 1.35;
        }
        .proj-status {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 10.5px;
          padding: 3px 8px;
          border-radius: 999px;
          flex-shrink: 0;
          border: 1px solid;
          letter-spacing: 0.02em;
          text-transform: lowercase;
          margin-top: 1px;
        }
        .proj-status--live {
          color: var(--green);
          background: var(--green-soft);
          border-color: rgba(63, 185, 80, 0.32);
        }
        .proj-status--soon {
          color: var(--amber);
          background: rgba(210, 153, 34, 0.1);
          border-color: rgba(210, 153, 34, 0.32);
        }
        .proj-status__pulse {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--green);
          animation: pulse-dot 2s infinite;
        }
        .proj-card__sub {
          font-size: 0.92rem;
          line-height: 1.6;
          color: var(--fg-muted);
          margin: 0 0 14px;
          flex: 1;
        }
        .proj-card__tags {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          margin-bottom: 14px;
        }
        .proj-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11.5px;
          padding: 5px 10px;
          border: 1px solid var(--line-strong);
          border-radius: 7px;
          color: var(--fg);
          background: var(--chip-glass);
          -webkit-backdrop-filter: blur(10px) saturate(140%);
          backdrop-filter: blur(10px) saturate(140%);
          box-shadow: inset 0 1px 0 var(--card-edge-top);
        }
        .proj-card__links {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          font-size: 12px;
        }
        .proj-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 6px 11px;
          border-radius: 7px;
          border: 1px solid var(--line-strong);
          color: var(--fg-muted);
          background: var(--chip-glass);
          text-decoration: none;
          transition: border-color 0.15s, color 0.15s, background 0.15s, transform 0.15s;
        }
        .proj-link:hover {
          color: var(--fg);
          border-color: var(--accent);
          transform: translateY(-1px);
        }
        .proj-link--primary {
          color: var(--accent);
          border-color: rgba(68, 147, 248, 0.35);
          background: var(--accent-soft);
        }
        .proj-link--primary:hover {
          color: var(--accent-2);
          border-color: var(--accent);
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
        padding: 'clamp(2.5rem, 6vw, 4rem) clamp(1rem, 4vw, 2rem)',
      }}
    >
      <h2
        className="mono"
        style={{
          fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
          fontWeight: 600,
          letterSpacing: '-0.03em',
          color: 'var(--fg)',
          margin: '0 0 1.6rem',
        }}
      >
        Projects.
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {projects.map((p, i) => (
          <ProjectCard key={i} {...p} />
        ))}
      </div>
    </section>
  );
}
