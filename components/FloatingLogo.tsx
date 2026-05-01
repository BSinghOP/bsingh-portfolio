'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X } from 'lucide-react';

export function FloatingLogo() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <AnimatePresence>
        {hovered && !open && (
          <motion.div
            className="floating-logo-bubble"
            initial={{ opacity: 0, scale: 0.88, x: 10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 8 }}
            transition={{ type: 'spring', stiffness: 360, damping: 26 }}
            aria-hidden
          >
            <span className="floating-logo-bubble__text mono">
              {`Hi! It's me BSingh — or you may know me as Bibek.`}
            </span>
            <span className="floating-logo-bubble__tail" aria-hidden />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(true)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        aria-label="View logo"
        initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 18 }}
        whileHover={{ scale: 1.06, rotate: -3 }}
        whileTap={{ scale: 0.95 }}
        className="floating-logo"
      >
        <Image
          src="/logo.jpg"
          alt="BSingh logo"
          width={220}
          height={220}
          priority
          className="floating-logo__img"
        />
        <span className="floating-logo__expand">
          <Maximize2 size={11} />
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="logo-modal"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.button
              className="logo-modal__close"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              aria-label="Close"
            >
              <X size={18} />
            </motion.button>
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="logo-modal__inner"
            >
              <Image
                src="/logo.jpg"
                alt="BSingh logo"
                width={1200}
                height={1200}
                className="logo-modal__img"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .floating-logo-bubble {
          position: fixed;
          top: 116px;
          right: 150px;
          max-width: 240px;
          padding: 9px 13px;
          border: 1px solid var(--line-strong);
          border-radius: 12px;
          background:
            linear-gradient(180deg, var(--card-grad-top) 0%, var(--card-grad-bot) 100%),
            var(--card-glass-thin);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          backdrop-filter: blur(20px) saturate(160%);
          box-shadow:
            inset 0 1px 0 var(--card-edge-top),
            0 4px 14px rgba(0, 0, 0, 0.3),
            0 12px 28px rgba(0, 0, 0, 0.35);
          z-index: 21;
          pointer-events: none;
          transform-origin: 100% 50%;
        }
        :global(:root[data-theme='light']) .floating-logo-bubble {
          box-shadow:
            inset 0 1px 0 var(--card-edge-top),
            0 2px 6px rgba(0, 0, 0, 0.08),
            0 10px 24px rgba(0, 0, 0, 0.12);
        }
        .floating-logo-bubble__text {
          display: block;
          font-size: 12.5px;
          line-height: 1.5;
          color: var(--fg);
          letter-spacing: -0.005em;
        }
        .floating-logo-bubble__tail {
          position: absolute;
          right: -6px;
          top: 50%;
          width: 11px;
          height: 11px;
          background: var(--card-glass-thin);
          border-right: 1px solid var(--line-strong);
          border-top: 1px solid var(--line-strong);
          transform: translateY(-50%) rotate(45deg);
        }
        @media (max-width: 700px) {
          .floating-logo-bubble {
            display: none;
          }
        }

        .floating-logo {
          position: fixed;
          top: 90px;
          right: 28px;
          width: 110px;
          height: 110px;
          border-radius: 16px;
          border: 1px solid var(--line-strong);
          background: var(--bg-2);
          padding: 4px;
          cursor: pointer;
          z-index: 20;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
          transition: box-shadow 0.4s, border-color 0.2s;
        }
        :root[data-theme='light'] .floating-logo {
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
        }
        .floating-logo:hover {
          border-color: var(--green);
          box-shadow: 0 4px 28px rgba(0, 0, 0, 0.4), 0 0 30px var(--green-soft);
        }
        :global(.floating-logo__img) {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover;
          border-radius: 12px;
        }
        .floating-logo__expand {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 22px;
          height: 22px;
          background: rgba(0, 0, 0, 0.55);
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .floating-logo:hover .floating-logo__expand {
          opacity: 1;
        }
        @media (max-width: 700px) {
          .floating-logo {
            width: 78px;
            height: 78px;
            top: 76px;
            right: 16px;
          }
        }

        .logo-modal {
          position: fixed;
          inset: 0;
          z-index: 100;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        .logo-modal__inner {
          max-width: min(560px, 90vw);
        }
        :global(.logo-modal__img) {
          width: 100% !important;
          height: auto !important;
          border-radius: 18px;
          border: 1px solid var(--line-strong);
        }
        .logo-modal__close {
          position: absolute;
          top: 24px;
          right: 24px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.15s;
        }
        .logo-modal__close:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </>
  );
}
