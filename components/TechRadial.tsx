'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Globe, ShieldCheck, Lock } from 'lucide-react';
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
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiDebian,
  SiPterodactyl,
  SiNginx,
  SiPm2,
  SiCloudflare,
  SiLetsencrypt,
} from 'react-icons/si';
import type { ComponentType } from 'react';

type IconDef = {
  Icon: ComponentType<{ size?: number | string; color?: string }>;
  color: string;
};

const TECH: Record<string, IconDef> = {
  C: { Icon: SiC, color: '#A8B9CC' },
  'C++': { Icon: SiCplusplus, color: '#00599C' },
  Python: { Icon: SiPython, color: '#3776AB' },
  Java: { Icon: SiOpenjdk, color: '#E76F00' },
  JavaScript: { Icon: SiJavascript, color: '#F7DF1E' },
  React: { Icon: SiReact, color: '#61DAFB' },
  'Next.js': { Icon: SiNextdotjs, color: 'currentColor' },
  Tailwind: { Icon: SiTailwindcss, color: '#06B6D4' },
  'HTML/CSS': { Icon: SiHtml5, color: '#E34F26' },
  'Node.js': { Icon: SiNodedotjs, color: '#5FA04E' },
  Express: { Icon: SiExpress, color: 'currentColor' },
  MySQL: { Icon: SiMysql, color: '#4479A1' },
  'REST APIs': { Icon: Globe, color: '#8B949E' },
  Debian: { Icon: SiDebian, color: '#A81D33' },
  Pterodactyl: { Icon: SiPterodactyl, color: '#10539E' },
  Nginx: { Icon: SiNginx, color: '#009639' },
  PM2: { Icon: SiPm2, color: '#5C4EE5' },
  Cloudflare: { Icon: SiCloudflare, color: '#F38020' },
  'SSL/TLS': { Icon: SiLetsencrypt, color: '#1A659E' },
  'DDoS mitigation': { Icon: ShieldCheck, color: '#3FB950' },
};
const FALLBACK: IconDef = { Icon: Lock, color: '#8B949E' };

// Inner -> outer; fewer items orbit closer in, the dense infra ring sits outside
// where there's more circumference to breathe.
export const SECTIONS = [
  { label: 'frontend', color: '#61DAFB', items: ['React', 'Next.js', 'Tailwind', 'HTML/CSS'] },
  { label: 'backend & db', color: '#5FA04E', items: ['Node.js', 'Express', 'MySQL', 'REST APIs'] },
  { label: 'languages', color: '#FCC624', items: ['C', 'C++', 'Python', 'Java', 'JavaScript'] },
  {
    label: 'infra & ops',
    color: '#F38020',
    items: ['Debian', 'Pterodactyl', 'Nginx', 'PM2', 'Cloudflare', 'SSL/TLS', 'DDoS mitigation'],
  },
];

const FIG = 820;
const RADII = [128, 205, 285, 368];
// On phones the orbits are pushed outward + evenly spread so the inner ring
// clears the core and icons aren't cramped together.
const MOBILE_RADII = [142, 205, 268, 330];
// Each orbit takes a different time and alternating direction for parallax.
const PERIODS = [52, 68, 86, 104];

const pct = (n: number) => `${(n / FIG) * 100}%`;

export function TechRadial() {
  const half = FIG / 2;
  const viewBox = `-${half} -${half} ${FIG} ${FIG}`;

  const [isMobile, setIsMobile] = useState(false);
  const prefersReduced = useReducedMotion();
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 700px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  // Keep the orbits spinning on phones too — only a reduced-motion preference freezes it.
  const ringRadii = isMobile ? MOBILE_RADII : RADII;

  return (
    <div className="tech-radial" aria-hidden>
      {/* Static orbit guides */}
      <svg className="tech-radial__svg" viewBox={viewBox}>
        {SECTIONS.map((s, ri) => (
          <motion.circle
            key={`orbit-${s.label}`}
            cx={0}
            cy={0}
            r={ringRadii[ri]}
            fill="none"
            stroke={s.color}
            strokeWidth={1}
            strokeOpacity={0.22}
            strokeDasharray="2 9"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.2 + ri * 0.12, duration: 1, ease: 'easeOut' }}
          />
        ))}
      </svg>

      {/* One spinning rotor per orbit */}
      {SECTIONS.map((section, ri) => {
        const dir = ri % 2 === 0 ? 1 : -1;
        const r = ringRadii[ri];
        const period = PERIODS[ri];
        const n = section.items.length;
        const phase = ri * 16; // stagger so rings don't line up
        const spin = { duration: period, repeat: Infinity, ease: 'linear' as const };

        return (
          <motion.div
            key={`ring-${section.label}`}
            className="tech-radial__rotor"
            animate={prefersReduced ? {} : { rotate: dir * 360 }}
            transition={prefersReduced ? { duration: 0 } : spin}
          >
            {section.items.map((label, i) => {
              const def = TECH[label] ?? FALLBACK;
              const Icon = def.Icon;
              const angDeg = -90 + phase + (360 / n) * i;
              const angRad = (angDeg * Math.PI) / 180;
              const x = Math.cos(angRad) * r;
              const y = Math.sin(angRad) * r;
              return (
                <div
                  key={`node-${label}`}
                  className="tech-radial__node-pos"
                  style={{ left: `calc(50% + ${pct(x)})`, top: `calc(50% + ${pct(y)})` }}
                >
                  {/* counter-rotate so the icon + tip stay upright */}
                  <motion.div
                    className="tech-radial__counter"
                    animate={prefersReduced ? {} : { rotate: -dir * 360 }}
                    transition={prefersReduced ? { duration: 0 } : spin}
                  >
                    <motion.div
                      className="tech-radial__node"
                      style={{ ['--node-color' as string]: def.color }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      whileHover={{
                        scale: 1.18,
                        transition: { type: 'spring', stiffness: 320, damping: 18 },
                      }}
                      transition={{
                        delay: 0.4 + ri * 0.1 + i * 0.05,
                        type: 'spring',
                        stiffness: 240,
                        damping: 18,
                      }}
                    >
                      <Icon size={26} color={def.color} />
                      <span className="tech-radial__node-tip mono">{label}</span>
                    </motion.div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        );
      })}

      {/* Breathing core */}
      <motion.div
        className="tech-radial__center mono"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 220, damping: 18 }}
      >
        <motion.span
          className="tech-radial__center-glow"
          animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.12, 1] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        My Stack
      </motion.div>
    </div>
  );
}
