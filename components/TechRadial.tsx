'use client';

import { motion } from 'framer-motion';
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
  SiLinux,
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
  'Linux VPS': { Icon: SiLinux, color: '#FCC624' },
  Nginx: { Icon: SiNginx, color: '#009639' },
  PM2: { Icon: SiPm2, color: '#5C4EE5' },
  Cloudflare: { Icon: SiCloudflare, color: '#F38020' },
  'SSL/TLS': { Icon: SiLetsencrypt, color: '#1A659E' },
  'DDoS mitigation': { Icon: ShieldCheck, color: '#3FB950' },
};
const FALLBACK: IconDef = { Icon: Lock, color: '#8B949E' };

const SECTIONS = [
  { label: 'languages', color: '#FCC624', items: ['C', 'C++', 'Python', 'Java', 'JavaScript'] },
  { label: 'frontend', color: '#61DAFB', items: ['React', 'Next.js', 'Tailwind', 'HTML/CSS'] },
  { label: 'backend & db', color: '#5FA04E', items: ['Node.js', 'Express', 'MySQL', 'REST APIs'] },
  {
    label: 'infra & ops',
    color: '#F38020',
    items: ['Linux VPS', 'Nginx', 'PM2', 'Cloudflare', 'SSL/TLS', 'DDoS mitigation'],
  },
];

const FIG = 760;
const R_ITEM = 270;
const R_LABEL = 335;

const DOT_DURATION = 0.55;
const DOT_SPACING = 0.6;
const PAUSE = 1.4;
const INITIAL_DELAY = 1.4;

type LaidOutItem = {
  label: string;
  x: number;
  y: number;
  color: string;
  globalIdx: number;
};
type LaidOutSection = {
  label: string;
  color: string;
  labelX: number;
  labelY: number;
};

function layout(): { items: LaidOutItem[]; sections: LaidOutSection[] } {
  const flat = SECTIONS.flatMap((s, sIdx) =>
    s.items.map((label) => ({ label, sIdx, color: s.color }))
  );
  const n = flat.length;
  const step = 360 / n;
  const startAngle = -90;

  const items: LaidOutItem[] = flat.map((it, i) => {
    const angDeg = startAngle + i * step;
    const angRad = (angDeg * Math.PI) / 180;
    return {
      label: it.label,
      x: Math.cos(angRad) * R_ITEM,
      y: Math.sin(angRad) * R_ITEM,
      color: it.color,
      globalIdx: i,
    };
  });

  const sections: LaidOutSection[] = [];
  let cursor = 0;
  SECTIONS.forEach((section) => {
    const count = section.items.length;
    const startIdx = cursor;
    const endIdx = cursor + count - 1;
    const midDeg = startAngle + ((startIdx + endIdx) / 2) * step;
    const midRad = (midDeg * Math.PI) / 180;
    sections.push({
      label: section.label,
      color: section.color,
      labelX: Math.cos(midRad) * R_LABEL,
      labelY: Math.sin(midRad) * R_LABEL,
    });
    cursor += count;
  });

  return { items, sections };
}

const pct = (n: number) => `${(n / FIG) * 100}%`;

export function TechRadial() {
  const { items, sections } = layout();
  const half = FIG / 2;
  const viewBox = `-${half} -${half} ${FIG} ${FIG}`;
  const totalCycle = items.length * DOT_SPACING + PAUSE;

  // Mesh — only same-section edges
  const meshEdges: { a: LaidOutItem; b: LaidOutItem }[] = [];
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      if (items[i].color === items[j].color) {
        meshEdges.push({ a: items[i], b: items[j] });
      }
    }
  }

  const ROTATION_DURATION = 60;

  return (
    <div className="tech-radial" aria-hidden>
      <motion.div
        className="tech-radial__rotor"
        animate={{ rotate: 360 }}
        transition={{ duration: ROTATION_DURATION, repeat: Infinity, ease: 'linear' }}
      >
      <svg className="tech-radial__svg" viewBox={viewBox}>
        {meshEdges.map((edge, i) => (
          <motion.path
            key={`mesh-${i}`}
            d={`M ${edge.a.x} ${edge.a.y} L ${edge.b.x} ${edge.b.y}`}
            fill="none"
            stroke={edge.a.color}
            strokeWidth={1}
            strokeOpacity={0.45}
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
          />
        ))}

        {items.map((it) => (
          <motion.path
            key={`spoke-${it.globalIdx}`}
            d={`M0 0 L ${it.x} ${it.y}`}
            fill="none"
            stroke={it.color}
            strokeWidth={1.6}
            strokeOpacity={0.7}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.15 + it.globalIdx * 0.04, duration: 0.55, ease: 'easeOut' }}
          />
        ))}

        {items.map((it, i) => (
          <motion.circle
            key={`pulse-${it.globalIdx}`}
            r={4.5}
            fill={it.color}
            initial={{ cx: 0, cy: 0, opacity: 0 }}
            animate={{
              cx: [0, 0, it.x, it.x],
              cy: [0, 0, it.y, it.y],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: DOT_DURATION,
              delay: INITIAL_DELAY + i * DOT_SPACING,
              times: [0, 0.05, 0.92, 1],
              repeat: Infinity,
              repeatDelay: totalCycle - DOT_DURATION,
              ease: 'easeOut',
            }}
          />
        ))}
      </svg>

      {sections.map((s, sIdx) => (
        <motion.div
          key={`label-${s.label}`}
          className="tech-radial__section-label mono"
          style={{
            left: `calc(50% + ${pct(s.labelX)})`,
            top: `calc(50% + ${pct(s.labelY)})`,
            x: '-50%',
            y: '-50%',
            color: s.color,
            borderColor: s.color + '88',
          }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1, rotate: -360 }}
          transition={{
            opacity: {
              delay: 0.05 + sIdx * 0.1,
              type: 'spring',
              stiffness: 240,
              damping: 20,
            },
            scale: {
              delay: 0.05 + sIdx * 0.1,
              type: 'spring',
              stiffness: 240,
              damping: 20,
            },
            rotate: { duration: ROTATION_DURATION, repeat: Infinity, ease: 'linear' },
          }}
        >
          {s.label}
        </motion.div>
      ))}

      {items.map((it) => {
        const def = TECH[it.label] ?? FALLBACK;
        const Icon = def.Icon;
        const outwardX = it.x / R_ITEM;
        const outwardY = it.y / R_ITEM;
        return (
          <motion.div
            key={`node-${it.label}`}
            className="tech-radial__node"
            style={
              {
                left: `calc(50% + ${pct(it.x)})`,
                top: `calc(50% + ${pct(it.y)})`,
                ['--node-color' as string]: def.color,
                ['--tip-x' as string]: outwardX.toFixed(3),
                ['--tip-y' as string]: outwardY.toFixed(3),
              } as React.CSSProperties
            }
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, rotate: -360 }}
            whileHover={{
              scale: 1.18,
              transition: { type: 'spring', stiffness: 320, damping: 18 },
            }}
            transition={{
              scale: {
                delay: 0.4 + it.globalIdx * 0.04,
                type: 'spring',
                stiffness: 240,
                damping: 18,
              },
              opacity: {
                delay: 0.4 + it.globalIdx * 0.04,
                type: 'spring',
                stiffness: 240,
                damping: 18,
              },
              rotate: { duration: ROTATION_DURATION, repeat: Infinity, ease: 'linear' },
            }}
          >
            <Icon size={26} color={def.color} />
            <span className="tech-radial__node-tip mono">{it.label}</span>
          </motion.div>
        );
      })}
      </motion.div>

      <motion.div
        className="tech-radial__center mono"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 220, damping: 18 }}
      >
        My Stack
      </motion.div>
    </div>
  );
}
