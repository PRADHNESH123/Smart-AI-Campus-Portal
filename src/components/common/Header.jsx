import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Bell,
  ChevronDown,
  User,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  Sparkles,
  ShieldCheck,
  Briefcase,
  Megaphone
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePortal } from '../../context/PortalContext';
import { useRouter } from '../../router';

export default function Header({ pageTitle = 'Dashboard' }) {
  const { currentUser, studentProfile, logout } = useAuth();
  const { unreadNotificationsCount, mobileSidebarOpen, setMobileSidebarOpen, searchQuery, setSearchQuery, announcements } = usePortal();
  const { currentPath, navigate } = useRouter();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setSearchQuery(localSearch.trim());
      navigate(`/student/search?q=${encodeURIComponent(localSearch.trim())}`);
    } else {
      navigate('/student/search');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        height: 'var(--header-height)',
        background: '#ffffff',
        borderBottom: '1px solid var(--slate-200)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
      }}
    >
      {/* Left: Mobile hamburger + Page Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="mobile-menu-btn"
          style={{
            display: 'none',
            padding: '0.5rem',
            borderRadius: '8px',
            color: 'var(--slate-600)',
            background: 'var(--slate-100)',
            cursor: 'pointer'
          }}
          aria-label="Toggle navigation menu"
        >
          <Menu size={20} />
        </button>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--slate-400)', fontWeight: 500 }}>
            <span>Kalasalingam University</span>
            <span>/</span>
            <span style={{ color: 'var(--primary-600)', fontWeight: 600 }}>{pageTitle}</span>
          </div>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--slate-800)', marginTop: '1px' }}>
            {pageTitle}
          </h2>
        </div>
      </div>

      {/* Right: Search, Notification Bell, Student Profile Dropdown */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.1rem' }}>
        {/* Global Search Bar */}
        <form onSubmit={handleSearchSubmit} style={{ position: 'relative' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'var(--slate-50)',
              border: '1px solid var(--slate-200)',
              borderRadius: 'var(--radius-full)',
              padding: '0.45rem 1rem',
              width: '260px',
              transition: 'all 0.2s ease'
            }}
            className="header-search-wrapper"
          >
            <Search size={16} style={{ color: 'var(--slate-400)', marginRight: '0.5rem', flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Search events, circulars..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                width: '100%',
                fontSize: '0.85rem',
                color: 'var(--slate-700)'
              }}
            />
          </div>
        </form>

        {/* Announcements Button with Badge */}
        <button
          onClick={() => navigate('/student/announcements')}
          style={{
            position: 'relative',
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: currentPath === '/student/announcements' ? '#e0e7ff' : 'var(--slate-50)',
            border: currentPath === '/student/announcements' ? '1px solid #c7d2fe' : '1px solid var(--slate-200)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: currentPath === '/student/announcements' ? '#4338ca' : 'var(--slate-600)',
            transition: 'all 0.2s ease',
            cursor: 'pointer'
          }}
          title="Department Announcements & Circulars"
          aria-label="View announcements"
        >
          <Megaphone size={19} />
          {(announcements || []).length > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                minWidth: '18px',
                height: '18px',
                padding: '0 4px',
                borderRadius: '9999px',
                background: '#4f46e5',
                color: '#ffffff',
                fontSize: '0.65rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #ffffff'
              }}
            >
              {(announcements || []).length}
            </span>
          )}
        </button>

        {/* Notification Bell with Badge */}
        <button
          onClick={() => navigate('/student/notifications')}
          style={{
            position: 'relative',
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: currentPath === '/student/notifications' ? 'var(--primary-50)' : 'var(--slate-50)',
            border: currentPath === '/student/notifications' ? '1px solid var(--primary-200)' : '1px solid var(--slate-200)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: currentPath === '/student/notifications' ? 'var(--primary-600)' : 'var(--slate-600)',
            transition: 'all 0.2s ease',
            cursor: 'pointer'
          }}
          title="Notifications"
          aria-label="View notifications"
        >
          <Bell size={19} />
          {unreadNotificationsCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                minWidth: '18px',
                height: '18px',
                padding: '0 4px',
                borderRadius: '9999px',
                background: 'var(--rose-500)',
                color: '#ffffff',
                fontSize: '0.65rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #ffffff'
              }}
            >
              {unreadNotificationsCount}
            </span>
          )}
        </button>

        {/* Student Avatar & Dropdown */}
        <div style={{ position: 'relative' }} ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.35rem 0.65rem 0.35rem 0.4rem',
              borderRadius: 'var(--radius-full)',
              background: dropdownOpen ? 'var(--slate-100)' : 'var(--slate-50)',
              border: '1px solid var(--slate-200)',
              transition: 'all 0.2s ease'
            }}
            aria-expanded={dropdownOpen}
          >
            {/* Avatar Initials Badge */}
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--primary-600) 0%, var(--primary-800) 100%)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 6px rgba(37, 99, 235, 0.3)'
              }}
            >
              {studentProfile?.name ? studentProfile.name.trim().charAt(0).toUpperCase() : 'S'}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', lineHeight: 1.2 }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--slate-800)' }}>
                {studentProfile.name.split(' ')[0]} {studentProfile.name.split(' ')[1] || ''}
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--slate-500)', fontWeight: 500 }}>
                {studentProfile.registerNumber}
              </span>
            </div>

            <ChevronDown
              size={15}
              style={{
                color: 'var(--slate-400)',
                transform: dropdownOpen ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.2s ease'
              }}
            />
          </button>

          {/* Profile Dropdown Menu */}
          {dropdownOpen && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                width: '240px',
                background: '#ffffff',
                border: '1px solid var(--slate-200)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-xl)',
                overflow: 'hidden',
                zIndex: 50,
                animation: 'slideDown 0.2s ease-out forwards'
              }}
            >
              {/* User Header Summary */}
              <div
                style={{
                  padding: '1rem',
                  borderBottom: '1px solid var(--slate-100)',
                  background: 'var(--slate-50)'
                }}
              >
                <p style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--slate-900)' }}>
                  {studentProfile.name}
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--slate-500)', marginTop: '2px' }}>
                  Reg: <strong style={{ color: 'var(--primary-600)' }}>{studentProfile.registerNumber}</strong>
                </p>
                <div style={{ marginTop: '0.4rem' }}>
                  <span className="uni-pill primary" style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem' }}>
                    {studentProfile.deptShort} · {studentProfile.year}
                  </span>
                </div>
              </div>

              {/* Menu items */}
              <div style={{ padding: '0.4rem' }}>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate('/student/profile');
                  }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    padding: '0.6rem 0.8rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.85rem',
                    color: 'var(--slate-700)',
                    fontWeight: 500,
                    textAlign: 'left',
                    transition: 'background 0.15s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--slate-100)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <User size={16} color="var(--slate-500)" />
                  My Profile
                </button>

                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate('/student/announcements');
                  }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    padding: '0.6rem 0.8rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.85rem',
                    color: 'var(--slate-700)',
                    fontWeight: 500,
                    textAlign: 'left',
                    transition: 'background 0.15s ease',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--slate-100)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <Megaphone size={16} color="var(--primary-600)" />
                  Department Announcements
                </button>

                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate('/student/settings');
                  }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    padding: '0.6rem 0.8rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.85rem',
                    color: 'var(--slate-700)',
                    fontWeight: 500,
                    textAlign: 'left',
                    transition: 'background 0.15s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--slate-100)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <Settings size={16} color="var(--slate-500)" />
                  Settings
                </button>

                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate('/student/help');
                  }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    padding: '0.6rem 0.8rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.85rem',
                    color: 'var(--slate-700)',
                    fontWeight: 500,
                    textAlign: 'left',
                    transition: 'background 0.15s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--slate-100)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <HelpCircle size={16} color="var(--slate-500)" />
                  Help & Support
                </button>

                <div style={{ borderTop: '1px solid var(--slate-100)', marginTop: '0.3rem', paddingTop: '0.3rem' }}>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate('/hod/login');
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      padding: '0.6rem 0.8rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.85rem',
                      color: '#6d28d9',
                      fontWeight: 600,
                      textAlign: 'left',
                      transition: 'background 0.15s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f5f3ff')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <ShieldCheck size={16} color="#7c3aed" />
                    HOD Portal
                  </button>

                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate('/faculty/login');
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      padding: '0.6rem 0.8rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.85rem',
                      color: '#047857',
                      fontWeight: 600,
                      textAlign: 'left',
                      transition: 'background 0.15s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ecfdf5')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <Briefcase size={16} color="#059669" />
                    Faculty Portal
                  </button>
                </div>
              </div>

              {/* Logout button */}
              <div style={{ padding: '0.4rem', borderTop: '1px solid var(--slate-100)' }}>
                <button
                  onClick={handleLogout}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    padding: '0.6rem 0.8rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.85rem',
                    color: 'var(--rose-600)',
                    fontWeight: 600,
                    textAlign: 'left',
                    transition: 'background 0.15s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--rose-50)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <LogOut size={16} color="var(--rose-600)" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .mobile-menu-btn {
            display: inline-flex !important;
          }
        }
        @media (max-width: 640px) {
          .header-search-wrapper {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
