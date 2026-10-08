import React, { useState } from 'react';
import {
  Bell,
  CheckCheck,
  Calendar,
  Clock,
  BookOpen,
  GraduationCap,
  Sparkles,
  Building,
  CheckCircle2,
  Filter,
  Megaphone
} from 'lucide-react';
import { usePortal } from '../context/PortalContext';
import { useRouter } from '../router';

export default function NotificationsPage() {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead, unreadNotificationsCount, announcements } = usePortal();
  const { navigate } = useRouter();

  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Academic', 'Examination', 'Department', 'Events', 'General'];

  const filteredNotifications = notifications.filter((notif) => {
    if (activeCategory === 'All') return true;
    return notif.category.toLowerCase() === activeCategory.toLowerCase();
  });

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Academic':
        return <BookOpen size={18} color="var(--primary-600)" />;
      case 'Examination':
        return <GraduationCap size={18} color="#d97706" />;
      case 'Department':
        return <Building size={18} color="#059669" />;
      case 'Events':
        return <Sparkles size={18} color="#7c3aed" />;
      default:
        return <Bell size={18} color="var(--slate-500)" />;
    }
  };

  const getCategoryBadgeClass = (category) => {
    switch (category) {
      case 'Academic':
        return 'primary';
      case 'Examination':
        return 'warning';
      case 'Department':
        return 'success';
      case 'Events':
        return 'secondary';
      default:
        return 'neutral';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Header Banner */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          padding: '1.75rem 2rem',
          border: '1px solid var(--slate-200)',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: 'var(--primary-50)',
                border: '1px solid var(--primary-100)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary-600)'
              }}
            >
              <Bell size={20} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--slate-900)', margin: 0 }}>
                Campus Notifications & Circulars
              </h1>
              <p style={{ fontSize: '0.82rem', color: 'var(--slate-500)', margin: '2px 0 0' }}>
                Stay updated with official academic circulars, exam dates, and department announcements.
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {/* Action Button: Link to HOD Announcements */}
          <button
            onClick={() => navigate('/student/announcements')}
            className="uni-btn primary"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.55rem 1.1rem',
              fontSize: '0.85rem'
            }}
          >
            <Megaphone size={16} />
            <span>Official Circulars & Bulletins ({announcements?.length || 0}) ↗</span>
          </button>

          {/* Action Button: Mark all read */}
          {unreadNotificationsCount > 0 && (
            <button
              onClick={markAllNotificationsAsRead}
              className="uni-btn outline"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.55rem 1.1rem',
                fontSize: '0.85rem'
              }}
            >
              <CheckCheck size={16} />
              <span>Mark All as Read ({unreadNotificationsCount})</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Tabs */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          overflowX: 'auto',
          paddingBottom: '0.25rem'
        }}
      >
        {categories.map((cat) => {
          const isSelected = activeCategory === cat;
          const count = cat === 'All' ? notifications.length : notifications.filter((n) => n.category.toLowerCase() === cat.toLowerCase()).length;

          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.55rem 1.15rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: isSelected ? 700 : 500,
                color: isSelected ? 'var(--primary-600)' : 'var(--slate-600)',
                background: isSelected ? 'var(--primary-50)' : '#ffffff',
                border: isSelected ? '1px solid var(--primary-300)' : '1px solid var(--slate-200)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              <span>{cat}</span>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  padding: '0.1rem 0.45rem',
                  borderRadius: '9999px',
                  background: isSelected ? 'var(--primary-600)' : 'var(--slate-100)',
                  color: isSelected ? '#ffffff' : 'var(--slate-500)'
                }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Notifications List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredNotifications.length === 0 ? (
          <div
            style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-xl)',
              padding: '3rem',
              textAlign: 'center',
              border: '1px solid var(--slate-200)'
            }}
          >
            <Bell size={40} color="var(--slate-300)" style={{ margin: '0 auto 0.75rem' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--slate-700)', margin: 0 }}>
              No notifications in this category
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--slate-500)', marginTop: '0.35rem' }}>
              Check back later or select "All" to view all announcements.
            </p>
          </div>
        ) : (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markNotificationAsRead(notif.id)}
              style={{
                background: '#ffffff',
                borderRadius: 'var(--radius-xl)',
                border: notif.read ? '1px solid var(--slate-200)' : '1px solid #93c5fd',
                padding: '1.5rem',
                boxShadow: notif.read ? 'var(--shadow-xs)' : '0 4px 12px rgba(37, 99, 235, 0.08)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.2s ease'
              }}
              className="hover-card"
            >
              {/* Left Accent indicator for unread */}
              {!notif.read && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    width: '4px',
                    background: 'var(--primary-600)'
                  }}
                />
              )}

              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flex: 1 }}>
                  {/* Category Icon */}
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      background: 'var(--slate-50)',
                      border: '1px solid var(--slate-200)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    {getCategoryIcon(notif.category)}
                  </div>

                  <div style={{ flex: 1 }}>
                    {/* Category pill & unread indicator */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.4rem' }}>
                      <span className={`uni-pill ${getCategoryBadgeClass(notif.category)}`} style={{ fontSize: '0.72rem' }}>
                        {notif.category}
                      </span>
                      {!notif.read && (
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            color: 'var(--primary-600)'
                          }}
                        >
                          <span
                            style={{
                              width: '7px',
                              height: '7px',
                              borderRadius: '50%',
                              background: 'var(--primary-600)'
                            }}
                          />
                          New
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3
                      style={{
                        fontSize: '1.05rem',
                        fontWeight: notif.read ? 600 : 700,
                        color: 'var(--slate-900)',
                        margin: '0 0 0.4rem',
                        lineHeight: 1.3
                      }}
                    >
                      {notif.title}
                    </h3>

                    {/* Description */}
                    <p style={{ fontSize: '0.88rem', color: 'var(--slate-600)', margin: 0, lineHeight: 1.5 }}>
                      {notif.description}
                    </p>

                    {/* Date and Time Footer */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.25rem',
                        marginTop: '0.85rem',
                        paddingTop: '0.65rem',
                        borderTop: '1px solid var(--slate-100)',
                        fontSize: '0.78rem',
                        color: 'var(--slate-400)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Calendar size={14} />
                        <span>{notif.date}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Clock size={14} />
                        <span>{notif.time}</span>
                      </div>
                      {notif.read && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#16a34a', marginLeft: 'auto' }}>
                          <CheckCircle2 size={14} />
                          <span>Read</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <style>{`
        .hover-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
      `}</style>
    </div>
  );
}
