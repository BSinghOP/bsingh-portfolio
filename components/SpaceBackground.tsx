'use client';

import { useEffect, useRef } from 'react';

type Star = {
  x: number;
  y: number;
  z: number; // depth 0 (far) .. 1 (near)
  r: number;
  baseA: number;
  phase: number;
  speed: number;
  color: number;
};

type Meteor = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  life: number;
  len: number;
};

const DARK_COLORS = ['230, 237, 243', '158, 203, 255', '255, 214, 165'];
const LIGHT_COLORS = ['36, 48, 94', '30, 64, 140', '96, 72, 150'];

const PARALLAX = 26; // max px shift for nearest layer
const LINK_RADIUS = 160; // cursor radius that "activates" stars
const LINK_DIST = 110; // max distance between two linked stars

export function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let stars: Star[] = [];
    let meteors: Meteor[] = [];
    let raf = 0;
    let last = performance.now();
    let nextMeteor = last + 2500;
    let dark = document.documentElement.dataset.theme !== 'light';
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const mouse = { x: -1e4, y: -1e4, active: false };
    const par = { x: 0, y: 0, tx: 0, ty: 0 };

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    function makeStars() {
      const count = Math.min(Math.floor((w * h) / 3600), 460);
      stars = Array.from({ length: count }, () => {
        const z = Math.random();
        const cr = Math.random();
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          z,
          r: 0.35 + z * 1.25 + (Math.random() < 0.04 ? 0.9 : 0),
          baseA: 0.25 + z * 0.55,
          phase: Math.random() * Math.PI * 2,
          speed: rand(0.4, 1.6),
          color: cr < 0.72 ? 0 : cr < 0.92 ? 1 : 2,
        };
      });
    }

    function drawStatic() {
      ctx.clearRect(0, 0, w, h);
      const colors = dark ? DARK_COLORS : LIGHT_COLORS;
      const alphaMul = dark ? 1 : 0.45;
      for (const s of stars) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colors[s.color]}, ${s.baseA * 0.8 * alphaMul})`;
        ctx.fill();
      }
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      makeStars();
      if (reduced) drawStatic();
    }

    function drawFrame(now: number) {
      const t = now / 1000;
      let dt = (now - last) / 1000;
      last = now;
      if (dt > 0.05) dt = 0.05; // tab was hidden — don't jump

      ctx.clearRect(0, 0, w, h);

      par.x += (par.tx - par.x) * 0.045;
      par.y += (par.ty - par.y) * 0.045;

      const colors = dark ? DARK_COLORS : LIGHT_COLORS;
      const alphaMul = dark ? 1 : 0.45;

      for (const s of stars) {
        const drift = (1.2 + s.z * 3.2) * dt;
        s.x -= drift * 0.55;
        s.y += drift * 0.25;
        if (s.x < -24) s.x += w + 48;
        if (s.y > h + 24) s.y -= h + 48;

        const tw = 0.55 + 0.45 * Math.sin(t * s.speed + s.phase);
        const a = s.baseA * tw * alphaMul;
        const px = s.x + par.x * s.z * PARALLAX;
        const py = s.y + par.y * s.z * PARALLAX;

        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colors[s.color]}, ${a})`;
        ctx.fill();

        if (s.r > 1.4 && dark) {
          ctx.beginPath();
          ctx.arc(px, py, s.r * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${colors[s.color]}, ${a * 0.08})`;
          ctx.fill();
        }
      }

      // constellation lines between stars near the cursor
      if (mouse.active) {
        const near: { x: number; y: number; d: number }[] = [];
        for (const s of stars) {
          if (s.z < 0.35) continue;
          const px = s.x + par.x * s.z * PARALLAX;
          const py = s.y + par.y * s.z * PARALLAX;
          const d = Math.hypot(px - mouse.x, py - mouse.y);
          if (d < LINK_RADIUS) {
            near.push({ x: px, y: py, d });
            if (near.length >= 28) break;
          }
        }
        const lineColor = dark ? '129, 178, 255' : '40, 80, 170';
        ctx.lineWidth = 0.6;
        for (let i = 0; i < near.length; i++) {
          for (let j = i + 1; j < near.length; j++) {
            const a = near[i];
            const b = near[j];
            const dd = Math.hypot(a.x - b.x, a.y - b.y);
            if (dd > LINK_DIST) continue;
            const alpha =
              (1 - dd / LINK_DIST) *
              (1 - Math.max(a.d, b.d) / LINK_RADIUS) *
              (dark ? 0.5 : 0.3);
            ctx.strokeStyle = `rgba(${lineColor}, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // shooting stars
      if (now > nextMeteor) {
        nextMeteor = now + rand(3500, 9000);
        const fromLeft = Math.random() < 0.5;
        const ang = rand(0.45, 0.75);
        const sp = rand(620, 1000);
        meteors.push({
          x: rand(w * 0.1, w * 0.9),
          y: rand(-40, h * 0.3),
          vx: Math.cos(ang) * sp * (fromLeft ? 1 : -1),
          vy: Math.sin(ang) * sp,
          age: 0,
          life: rand(0.7, 1.2),
          len: rand(120, 230),
        });
      }

      meteors = meteors.filter((m) => m.age < m.life);
      const mc = dark ? '180, 215, 255' : '40, 70, 150';
      for (const m of meteors) {
        m.age += dt;
        m.x += m.vx * dt;
        m.y += m.vy * dt;
        const fade = Math.sin(Math.min(m.age / m.life, 1) * Math.PI);
        const sp = Math.hypot(m.vx, m.vy);
        const tx = m.x - (m.vx / sp) * m.len;
        const ty = m.y - (m.vy / sp) * m.len;
        const g = ctx.createLinearGradient(m.x, m.y, tx, ty);
        g.addColorStop(0, `rgba(${mc}, ${0.85 * fade * (dark ? 1 : 0.55)})`);
        g.addColorStop(1, `rgba(${mc}, 0)`);
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tx, ty);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(m.x, m.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * fade * (dark ? 1 : 0.4)})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(drawFrame);
    }

    function onPointerMove(e: PointerEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
      par.tx = (e.clientX / w - 0.5) * 2;
      par.ty = (e.clientY / h - 0.5) * 2;
    }
    function onMouseLeave() {
      mouse.active = false;
      par.tx = 0;
      par.ty = 0;
    }

    let resizeTimer: ReturnType<typeof setTimeout>;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 120);
    }

    const mo = new MutationObserver(() => {
      dark = document.documentElement.dataset.theme !== 'light';
      if (reduced) drawStatic();
    });
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    resize();
    window.addEventListener('resize', onResize);
    if (!reduced) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      document.addEventListener('mouseleave', onMouseLeave);
      last = performance.now();
      raf = requestAnimationFrame(drawFrame);
    }

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      mo.disconnect();
    };
  }, []);

  return (
    <div className="space-bg" aria-hidden>
      <div className="space-bg__nebula space-bg__nebula--1" />
      <div className="space-bg__nebula space-bg__nebula--2" />
      <div className="space-bg__nebula space-bg__nebula--3" />
      <div className="space-bg__band" />
      <canvas ref={canvasRef} className="space-bg__canvas" />
      <div className="space-bg__vignette" />
    </div>
  );
}
