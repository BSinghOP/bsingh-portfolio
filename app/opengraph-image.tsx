import { ImageResponse } from 'next/og';

export const alt = "BSingh's Portfolio — Building things. Breaking servers. Figuring it out.";
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Deterministic PRNG so the starfield is stable across builds
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function OgImage() {
  const rand = mulberry32(42);
  const stars = Array.from({ length: 90 }, () => ({
    x: rand() * 1200,
    y: rand() * 630,
    s: rand() < 0.85 ? 2 : 3,
    o: 0.25 + rand() * 0.65,
  }));

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 96px',
          background: 'linear-gradient(160deg, #05070d 0%, #0a0f1e 55%, #0d1326 100%)',
          position: 'relative',
          fontFamily: 'monospace',
        }}
      >
        {stars.map((st, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: st.x,
              top: st.y,
              width: st.s,
              height: st.s,
              borderRadius: 9999,
              background: '#e6edf3',
              opacity: st.o,
            }}
          />
        ))}
        <div
          style={{
            position: 'absolute',
            left: -180,
            top: -220,
            width: 640,
            height: 640,
            borderRadius: 9999,
            background: 'radial-gradient(circle, rgba(68,147,248,0.22) 0%, rgba(68,147,248,0) 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: -200,
            bottom: -260,
            width: 700,
            height: 700,
            borderRadius: 9999,
            background: 'radial-gradient(circle, rgba(163,113,247,0.16) 0%, rgba(163,113,247,0) 70%)',
          }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            color: '#4493f8',
            fontSize: 26,
            letterSpacing: 4,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 9999,
              background: '#3fb950',
            }}
          />
          bsingh.dev
        </div>

        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            color: '#e6edf3',
            letterSpacing: -3,
            marginTop: 18,
            display: 'flex',
          }}
        >
          BSingh
        </div>

        <div
          style={{
            fontSize: 34,
            color: '#8b949e',
            marginTop: 14,
            display: 'flex',
          }}
        >
          Building things. Breaking servers. Figuring it out.
        </div>
      </div>
    ),
    { ...size }
  );
}
