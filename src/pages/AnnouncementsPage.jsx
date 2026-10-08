import React, { useState } from 'react';
import {
  Megaphone,
  Bell,
  Search,
  Filter,
  Calendar,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Building2,
  GraduationCap,
  FileText,
  UserCheck,
  Share2,
  Copy,
  Check,
  ArrowLeft,
  ExternalLink
} from 'lucide-react';
import { usePortal } from '../context/PortalContext';
import { useRouter } from '../router';

export default function AnnouncementsPage() {
  const { announcements } = usePortal();
  const { navigate } = useRouter();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [copiedId, setCopiedId] = useState(null);

  const handleCopyLink = (id) => {
    const shareUrl = `${window.location.origin}/student/announcements#${id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
      });
    } else {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const categories = ['All', 'Department', 'Examination', 'Academic', 'Event', 'Faculty'];

  const filteredAnnouncements = (announcements || []).filter((ann) => {
    const matchesSearch =
      ann.title?.toLowerCase().includes(search.toLowerCase()) ||
      (ann.content || ann.message || '').toLowerCase().includes(search.toLowerCase()) ||
      ann.author?.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' ||
      (ann.category || 'Department').toLowerCase() === selectedCategory.toLowerCase();

    const matchesPriority =
      selectedPriority === 'All' ||
      (ann.priority || 'Medium').toLowerCase() === selectedPriority.toLowerCase();

    return matchesSearch && matchesCategory && matchesPriority;
  });

  const highPriorityCount = (announcements || []).filter(
    (a) => (a.priority || '').toLowerCase() === 'high'
  ).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Top Breadcrumb & Quick Portal Links */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <button
          onClick={() => navigate('/student/dashboard')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            background: 'none',
            border: 'none',
            fontSize: '0.84rem',
            fontWeight: 600,
            color: 'var(--primary-600)',
            cursor: 'pointer',
            padding: 0
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/student/notifications')}
            className="uni-btn outline"
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <Bell size={13} />
            <span>Notifications</span>
          </button>
          <button
            onClick={() => navigate('/student/events')}
            className="uni-btn outline"
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <Calendar size={13} />
            <span>Campus Events</span>
          </button>
        </div>
      </div>

      {/* Top Welcome Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #4338ca 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem 2.25rem',
          color: '#ffffff',
          boxShadow: '0 10px 25px -5px rgba(49, 46, 129, 0.3)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.25rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <span
              style={{
                fontSize: '0.74rem',
                fontWeight: 700,
                background: 'rgba(255, 255, 255, 0.15)',
                color: '#e0e7ff',
                padding: '0.2rem 0.65rem',
                borderRadius: '9999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <Megaphone size={13} color="#a5b4fc" />
              Official Campus Bulletin
            </span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 900, margin: 0 }}>
            Department Announcements & Circulars
          </h1>
          <p style={{ fontSize: '0.86rem', color: 'rgba(255, 255, 255, 0.8)', margin: '4px 0 0', maxWidth: '640px' }}>
            Direct official circulars and notices broadcasted by the Head of Department (CSE), Deans, and Examination Controller.
          </p>
        </div>

        {/* Quick Stats Summary */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(6px)',
              borderRadius: 'var(--radius-lg)',
              padding: '0.85rem 1.4rem',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              textAlign: 'center'
            }}
          >
            <p style={{ margin: 0, fontSize: '1.6rem', fontWeight: 900, color: '#ffffff' }}>
              {(announcements || []).length}
            </p>
            <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600, textTransform: 'uppercase' }}>
              Total Circulars
            </span>
          </div>

          <div
            style={{
              background: 'rgba(239, 68, 68, 0.2)',
              backdropFilter: 'blur(6px)',
              borderRadius: 'var(--radius-lg)',
              padding: '0.85rem 1.4rem',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              textAlign: 'center'
            }}
          >
            <p style={{ margin: 0, fontSize: '1.6rem', fontWeight: 900, color: '#fecaca' }}>
              {highPriorityCount}
            </p>
            <span style={{ fontSize: '0.72rem', color: '#fca5a5', fontWeight: 700, textTransform: 'uppercase' }}>
              High Priority
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          padding: '1.25rem 1.5rem',
          border: '1px solid var(--slate-200)',
          boxShadow: 'var(--shadow-xs)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          {/* Category Tabs */}
          <div style={{ display: 'flex', background: 'var(--slate-100)', padding: '0.25rem', borderRadius: 'var(--radius-lg)', flexWrap: 'wrap', gap: '0.25rem' }}>
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '0.45rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    fontSize: '0.82rem',
                    fontWeight: isSelected ? 700 : 500,
                    color: isSelected ? '#1e1b4b' : 'var(--slate-600)',
                    background: isSelected ? '#ffffff' : 'transparent',
                    boxShadow: isSelected ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'var(--slate-50)',
              border: '1px solid var(--slate-200)',
              borderRadius: 'var(--radius-lg)',
              padding: '0.5rem 0.85rem',
              minWidth: '260px'
            }}
          >
            <Search size={16} color="var(--slate-400)" />
            <input
              type="text"
              placeholder="Search circulars, HOD notices..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '0.85rem',
                width: '100%',
                color: 'var(--slate-800)'
              }}
            />
          </div>
        </div>
      </div>

      {/* Announcements List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredAnnouncements.length === 0 ? (
          <div
            style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-xl)',
              padding: '3.5rem 2rem',
              textAlign: 'center',
              border: '1px solid var(--slate-200)'
            }}
          >
            <Megaphone size={44} color="var(--slate-300)" style={{ margin: '0 auto 0.75rem' }} />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--slate-800)', margin: 0 }}>
              No Announcements Found
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--slate-500)', marginTop: '0.35rem' }}>
              No active circulars match your current search and category filters.
            </p>
          </div>
        ) : (
          filteredAnnouncements.map((ann) => {
            const isHigh = (ann.priority || '').toLowerCase() === 'high';
            return (
              <div
                key={ann.id}
                id={ann.id}
                className="portal-card"
                style={{
                  padding: '1.6rem 1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem',
                  borderLeft: isHigh ? '5px solid #e11d48' : '5px solid #4338ca',
                  transition: 'all 0.2s ease',
                  scrollMarginTop: '100px'
                }}
              >
                {/* Header Row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        padding: '0.2rem 0.65rem',
                        borderRadius: 9999,
                        background: isHigh ? '#fff1f2' : '#eff6ff',
                        color: isHigh ? '#e11d48' : '#2563eb',
                        border: `1px solid ${isHigh ? '#fecdd3' : '#bfdbfe'}`
                      }}
                    >
                      {ann.priority || 'Normal'} Priority
                    </span>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '0.2rem 0.6rem',
                        borderRadius: 9999,
                        background: '#f8fafc',
                        color: 'var(--slate-700)',
                        border: '1px solid #e2e8f0'
                      }}
                    >
                      {ann.category || 'Department'}
                    </span>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        padding: '0.2rem 0.6rem',
                        borderRadius: 9999,
                        background: '#f5f3ff',
                        color: '#6d28d9',
                        border: '1px solid #ddd6fe'
                      }}
                    >
                      Target: {ann.audience || ann.target || 'All Students & Faculty'}
                    </span>
                  </div>

                  <span style={{ fontSize: '0.78rem', color: 'var(--slate-500)', fontWeight: 600 }}>
                    📅 {ann.date} {ann.time && `· ${ann.time}`}
                  </span>
                </div>

                {/* Announcement Title */}
                <h3 style={{ margin: 0, fontSize: '1.18rem', fontWeight: 800, color: 'var(--slate-900)', lineHeight: 1.35 }}>
                  {ann.title}
                </h3>

                {/* Content Message */}
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--slate-700)', lineHeight: 1.65 }}>
                  {ann.content || ann.message}
                </p>

                {/* Footer Info */}
                <div
                  style={{
                    paddingTop: '0.85rem',
                    borderTop: '1px solid var(--slate-100)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--slate-500)' }}>
                    <UserCheck size={15} color="#4338ca" />
                    <span>Issued by: <strong style={{ color: 'var(--slate-800)' }}>{ann.author || 'Dr. P. Deepalakshmi'}</strong> (HOD, CSE)</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <button
                      onClick={() => handleCopyLink(ann.id)}
                      className="uni-btn outline"
                      style={{
                        padding: '0.25rem 0.65rem',
                        fontSize: '0.75rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        color: copiedId === ann.id ? '#059669' : 'var(--slate-600)',
                        borderColor: copiedId === ann.id ? '#a7f3d0' : 'var(--slate-200)',
                        background: copiedId === ann.id ? '#ecfdf5' : 'transparent',
                        cursor: 'pointer'
                      }}
                      title="Copy link to this circular"
                    >
                      {copiedId === ann.id ? <Check size={13} color="#059669" /> : <Copy size={13} />}
                      <span>{copiedId === ann.id ? 'Link Copied!' : 'Copy Link'}</span>
                    </button>

                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: '#059669',
                        background: '#ecfdf5',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '6px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        border: '1px solid #a7f3d0'
                      }}
                    >
                      <CheckCircle2 size={13} />
                      Verified
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
