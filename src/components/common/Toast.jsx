import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export default function Toast() {
  const { toast } = usePortal();

  if (!toast) return null;

  const { message, type = 'success' } = toast;

  const icons = {
    success: <CheckCircle2 size={18} color="#16a34a" />,
    error: <AlertCircle size={18} color="#dc2626" />,
    info: <Info size={18} color="#2563eb" />
  };

  const borders = {
    success: '1px solid #bbf7d0',
    error: '1px solid #fecaca',
    info: '1px solid #bfdbfe'
  };

  const backgrounds = {
    success: '#f0fdf4',
    error: '#fef2f2',
    info: '#eff6ff'
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.9rem 1.25rem',
        borderRadius: 'var(--radius-lg)',
        background: backgrounds[type] || '#ffffff',
        border: borders[type] || '1px solid var(--slate-200)',
        boxShadow: 'var(--shadow-xl)',
        maxWidth: '420px',
        animation: 'slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards'
      }}
      role="alert"
    >
      <div style={{ flexShrink: 0 }}>{icons[type] || icons.info}</div>
      <p style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--slate-800)', margin: 0, lineHeight: 1.4 }}>
        {message}
      </p>
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
