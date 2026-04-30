'use client';

import { useState } from 'react';
import { Send, Check, AlertCircle } from 'lucide-react';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    background: 'var(--bg-2)',
    border: '1px solid var(--line)',
    borderRadius: 8,
    color: 'var(--fg)',
    fontFamily: 'inherit',
    fontSize: 14,
    outline: 'none',
    transition: 'border-color 0.15s',
  };

  return (
    <form
      onSubmit={submit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        maxWidth: 480,
        marginTop: '1.6rem',
      }}
    >
      <input
        required
        placeholder="your name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        style={inputStyle}
      />
      <input
        required
        type="email"
        placeholder="your email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        style={inputStyle}
      />
      <textarea
        required
        placeholder="what's up"
        rows={4}
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        style={{ ...inputStyle, resize: 'vertical', minHeight: 90 }}
      />
      <button
        type="submit"
        disabled={status === 'sending' || status === 'sent'}
        className="mono"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          padding: '11px 18px',
          background: status === 'sent' ? 'var(--green)' : 'var(--accent)',
          color: 'white',
          border: 'none',
          borderRadius: 8,
          fontSize: 13.5,
          fontWeight: 500,
          cursor: status === 'sending' ? 'wait' : 'pointer',
          transition: 'background 0.2s',
          opacity: status === 'sending' ? 0.7 : 1,
        }}
      >
        {status === 'sending' && 'sending...'}
        {status === 'sent' && (
          <>
            <Check size={15} /> sent — talk soon
          </>
        )}
        {status === 'error' && (
          <>
            <AlertCircle size={15} /> error — try email instead
          </>
        )}
        {status === 'idle' && (
          <>
            <Send size={14} /> send message
          </>
        )}
      </button>
    </form>
  );
}
