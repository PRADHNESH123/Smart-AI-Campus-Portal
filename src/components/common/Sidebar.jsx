import React from 'react';
import {
  LayoutDashboard,
  User,
  Bell,
  Calendar,
  ClipboardList,
  Search,
  HelpCircle,
  Settings,
  LogOut,
  X,
  BookOpen,
  Clock,
  FileText,
  CalendarOff,
  Megaphone
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePortal } from '../../context/PortalContext';
import { useRouter } from '../../router';
import UniversityLogo from './UniversityLogo';

export default function Sidebar() {
  const { logout, studentProfile } = useAuth();
  const { unreadNotificationsCount, mobileSidebarOpen, setMobileSidebarOpen, announcements } = usePortal();
  const { currentPath, navigate } = useRouter();

  const navItems = [
    { label: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
    { label: 'My Profile', path: '/student/profile', icon: User },
    {
      label: 'Notifications',
      path: '/student/notifications',
      icon: Bell,
      badge: unreadNotificationsCount > 0 ? unreadNotificationsCount : null
    },
    {
      label: 'Announcements',
      path: '/student/announcements',
      icon: Megaphone,
      badge: (announcements || []).length > 0 ? (announcements || []).length : null
    },
    { label: 'Events', path: '/student/events', icon: Calendar },
    { label: 'My Subjects', path: '/student/subjects', icon: BookOpen },
    { label: 'Timetable', path: '/student/timetable', icon: Clock },
    { label: 'Assignments', path: '/student/assignments', icon: FileText },
    { label: 'Leave Apply', path: '/student/leave', icon: CalendarOff },
    { label: 'My Activity', path: '/student/activity', icon: ClipboardList },
    { label: 'Search', path: '/student/search', icon: Search },
    { label: 'Help & Support', path: '/student/help', icon: HelpCircle },
    { label: 'Settings', path: '/student/settings', icon: Settings }
  ];

  const handleNavClick = (path) => {
    navigate(path);
    if (mobileSidebarOpen) {
      setMobileSidebarOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    if (mobileSidebarOpen) {
      setMobileSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.45)',
            backdropFilter: 'blur(3px)',
            zIndex: 49,
            display: 'block'
          }}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: 'var(--sidebar-width)',
          backgroundColor: '#ffffff',
          borderRight: '1px solid var(--slate-200)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 50,
          transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: '2px 0 8px rgba(0, 0, 0, 0.03)'
        }}
        className={`sidebar-container ${mobileSidebarOpen ? 'mobile-open' : ''}`}
      >
        {/* Top Brand Banner */}
        <div
          style={{
            height: 'var(--header-height)',
            padding: '0 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--slate-100)',
            background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)'
          }}
        >
          <UniversityLogo size="sm" showTagline={true} />
          {mobileSidebarOpen && (
            <button
              onClick={() => setMobileSidebarOpen(false)}
              style={{
                padding: '0.4rem',
                borderRadius: '8px',
                color: 'var(--slate-500)',
                background: 'var(--slate-100)',
                cursor: 'pointer'
              }}
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Student Quick Pill Card */}
        <div style={{ padding: '1rem 1.1rem 0.5rem' }}>
          <div
            style={{
              padding: '0.85rem 1rem',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
              border: '1px solid #bfdbfe',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'var(--primary-600)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              {studentProfile?.name ? studentProfile.name.trim().charAt(0).toUpperCase() : 'S'}
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-900)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {studentProfile.name}
              </p>
              <p style={{ fontSize: '0.72rem', color: 'var(--primary-700)', fontWeight: 500 }}>
                {studentProfile.registerNumber} · {studentProfile.deptShort}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation List */}
        <nav style={{ flex: 1, padding: '0.75rem 0.9rem', overflowY: 'auto' }}>
          <p
            style={{
              fontSize: '0.68rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: 'var(--slate-400)',
              letterSpacing: '0.06em',
              padding: '0.2rem 0.6rem 0.6rem'
            }}
          >
            Main Menu
          </p>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;

              return (
                <li key={item.path}>
                  <button
                    onClick={() => handleNavClick(item.path)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.88rem',
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? 'var(--primary-600)' : 'var(--slate-600)',
                      backgroundColor: isActive ? 'var(--primary-50)' : 'transparent',
                      border: isActive ? '1px solid var(--primary-100)' : '1px solid transparent',
                      transition: 'all 0.18s ease',
                      textAlign: 'left'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'var(--slate-50)';
                        e.currentTarget.style.color = 'var(--slate-900)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = 'var(--slate-600)';
                      }
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Icon
                        size={18}
                        style={{
                          color: isActive ? 'var(--primary-600)' : 'var(--slate-400)',
                          flexShrink: 0
                        }}
                      />
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        style={{
                          background: 'var(--rose-500)',
                          color: '#ffffff',
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          padding: '0.15rem 0.5rem',
                          borderRadius: '9999px'
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Section: University Accreditation & Logout */}
        <div
          style={{
            padding: '1rem',
            borderTop: '1px solid var(--slate-100)',
            background: 'var(--slate-50)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}
        >
          {/* NAAC & NIRF Accreditation tag */}
          <div
            style={{
              padding: '0.5rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
              background: '#ffffff',
              border: '1px solid var(--slate-200)',
              fontSize: '0.7rem',
              color: 'var(--slate-500)',
              textAlign: 'center',
              lineHeight: 1.3
            }}
          >
            <strong style={{ color: 'var(--primary-800)' }}>Deemed to be University</strong>
            <div>NAAC 'A++' Grade · NIRF Ranked</div>
          </div>

          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.6rem',
              padding: '0.65rem 1rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'var(--rose-600)',
              backgroundColor: '#ffffff',
              border: '1px solid var(--rose-100)',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--rose-50)';
              e.currentTarget.style.borderColor = 'var(--rose-200)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.borderColor = 'var(--rose-100)';
            }}
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <style>{`
        @media (max-width: 1024px) {
          .sidebar-container {
            transform: translateX(-100%);
          }
          .sidebar-container.mobile-open {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}
