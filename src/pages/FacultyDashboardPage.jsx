import React, { useState } from 'react';
import {
  LogOut, LayoutDashboard, Clock, CheckSquare,
  UserCheck, FilePlus, ChevronRight, X, Menu,
  Briefcase, BookOpen, Users, Bell, Calendar
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usePortal } from '../context/PortalContext';
import { useRouter } from '../router';
import UniversityLogo from '../components/common/UniversityLogo';
import FacultyTimetable from '../components/faculty/FacultyTimetable';
import FacultyLeaveApprovals from '../components/faculty/FacultyLeaveApprovals';
import FacultyAttendance from '../components/faculty/FacultyAttendance';
import FacultyCreateAssignment from '../components/faculty/FacultyCreateAssignment';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'announcements', label: 'HOD Circulars', icon: Bell },
  { id: 'timetable', label: 'Timetable', icon: Clock },
  { id: 'leave', label: 'Leave Approvals', icon: CheckSquare },
  { id: 'attendance', label: 'Attendance Submit', icon: UserCheck },
  { id: 'assignment', label: 'Create Assignment', icon: FilePlus },
];

export default function FacultyDashboardPage() {
  const { currentUser, logout } = useAuth();
  const { leaves, assignments, announcements } = usePortal();
  const { navigate } = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const facultyName = currentUser?.name || 'Dr. K. Senthil Nathan';
  const facultyId = currentUser?.facultyId || 'KLU-FAC-1042';
  const dept = currentUser?.department || 'Computer Science and Engineering';
  const firstLetter = facultyName.trim().charAt(0).toUpperCase();

  const pendingLeavesCount = (leaves || []).filter(l => l.status === 'Pending').length;
  const activeAssignmentsCount = (assignments || []).length;
  const announcementsCount = (announcements || []).length;

  const renderContent = () => {
    switch (activeTab) {
      case 'announcements': return <FacultyAnnouncements announcements={announcements} />;
      case 'timetable':    return <FacultyTimetable />;
      case 'leave':        return <FacultyLeaveApprovals />;
      case 'attendance':   return <FacultyAttendance />;
      case 'assignment':   return <FacultyCreateAssignment />;
      default:             return <FacultyHome name={facultyName} dept={dept} facultyId={facultyId} setTab={setActiveTab} pendingLeaves={pendingLeavesCount} openAssignments={activeAssignmentsCount} announcements={announcements} />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f1f5f9' }}>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.4)', zIndex: 49, backdropFilter: 'blur(3px)' }}
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          position: 'fixed', top: 0, left: 0, bottom: 0, width: '240px',
          background: '#0f172a', display: 'flex', flexDirection: 'column',
          zIndex: 50, transition: 'transform 0.25s ease',
          transform: sidebarOpen ? 'translateX(0)' : undefined,
          boxShadow: '4px 0 20px rgba(0,0,0,0.15)'
        }}
        className={`faculty-sidebar ${sidebarOpen ? 'open' : ''}`}
      >
        {/* Logo */}
        <div style={{ padding: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <UniversityLogo size="sm" showTagline={true} light={true} />
          <button onClick={() => setSidebarOpen(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', display: 'none' }} className="sidebar-close-btn">
            <X size={18} />
          </button>
        </div>

        {/* Faculty Card */}
        <div style={{ padding: '1.25rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(135deg, #10b981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 800, color: '#fff', flexShrink: 0 }}>
              {firstLetter}
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{ margin: 0, fontSize: '0.83rem', fontWeight: 700, color: '#f8fafc', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{facultyName}</p>
              <p style={{ margin: 0, fontSize: '0.68rem', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>Faculty · CSE</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '1rem 0.75rem', overflowY: 'auto' }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.07em', padding: '0 0.5rem 0.6rem' }}>Faculty Menu</p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
              const isActive = activeTab === id;
              const hasBadge = id === 'leave' && pendingLeavesCount > 0;

              return (
                <li key={id}>
                  <button
                    onClick={() => { setActiveTab(id); setSidebarOpen(false); }}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '0.65rem 0.85rem', borderRadius: '10px', border: 'none',
                      background: isActive ? 'rgba(16,185,129,0.15)' : 'transparent',
                      color: isActive ? '#10b981' : 'rgba(255,255,255,0.6)',
                      fontSize: '0.875rem', fontWeight: isActive ? 700 : 500,
                      cursor: 'pointer', textAlign: 'left', transition: 'all 0.18s ease',
                      borderLeft: isActive ? '3px solid #10b981' : '3px solid transparent'
                    }}
                    onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#fff'; } }}
                    onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; } }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                      <Icon size={17} style={{ flexShrink: 0 }} />
                      <span>{label}</span>
                    </div>
                    {hasBadge && (
                      <span style={{ background: '#f59e0b', color: '#000', fontSize: '0.68rem', fontWeight: 800, padding: '0.1rem 0.45rem', borderRadius: '9999px' }}>
                        {pendingLeavesCount}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom */}
        <div style={{ padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <button
            onClick={handleLogout}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.65rem', borderRadius: '10px', background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.25)', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.25)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.15)'; }}
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Layout */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: '240px', minWidth: 0 }} className="faculty-main">
        {/* Top Header */}
        <header style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '0 2rem', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', position: 'sticky', top: 0, zIndex: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={() => setSidebarOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--slate-500)', display: 'none' }} className="mobile-menu-btn">
              <Menu size={22} />
            </button>
            <div>
              <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>
                {NAV_ITEMS.find(n => n.id === activeTab)?.label || 'Faculty Portal'}
              </h2>
              <p style={{ margin: 0, fontSize: '0.72rem', color: '#64748b' }}>KARE – Dept. of CSE</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a' }}>{facultyName}</span>
              <span style={{ fontSize: '0.68rem', color: '#64748b' }}>{facultyId}</span>
            </div>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg,#10b981,#059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.9rem', fontWeight: 800 }}>
              {firstLetter}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, padding: '2rem', maxWidth: '1300px', width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
          {renderContent()}
        </main>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .faculty-sidebar { transform: translateX(-100%) !important; }
          .faculty-sidebar.open { transform: translateX(0) !important; }
          .faculty-main { margin-left: 0 !important; }
          .mobile-menu-btn { display: flex !important; }
          .sidebar-close-btn { display: flex !important; }
        }
      `}</style>
    </div>
  );
}

/* ── Inline Home Dashboard ───────────────────────────── */
function FacultyHome({ name, dept, facultyId, setTab, pendingLeaves = 0, openAssignments = 0, announcements = [] }) {
  const announcementsCount = announcements.length;
  const cards = [
    { id: 'announcements', label: 'HOD Circulars', icon: Bell, color: '#e11d48', bg: '#ffe4e6', desc: `${announcementsCount} official departmental notices broadcasted` },
    { id: 'timetable',  label: 'Timetable',          icon: Clock,       color: '#2563eb', bg: '#eff6ff', desc: 'View your weekly class schedule across batches' },
    { id: 'leave',      label: 'Leave Approvals',     icon: CheckSquare, color: '#16a34a', bg: '#f0fdf4', desc: `${pendingLeaves} student application${pendingLeaves === 1 ? '' : 's'} pending approval` },
    { id: 'attendance', label: 'Attendance Submit',   icon: UserCheck,   color: '#d97706', bg: '#fffbeb', desc: 'Mark & submit class attendance for batches' },
    { id: 'assignment', label: 'Create Assignment',   icon: FilePlus,    color: '#7c3aed', bg: '#f5f3ff', desc: `${openAssignments} posted assignment${openAssignments === 1 ? '' : 's'} active` },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Welcome Banner */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #2563eb 100%)', borderRadius: '20px', padding: '2rem 2.25rem', color: '#fff', boxShadow: '0 8px 32px rgba(15,23,42,0.2)' }}>
        <p style={{ margin: '0 0 0.35rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>Welcome back,</p>
        <h1 style={{ margin: '0 0 0.25rem', fontSize: '1.8rem', fontWeight: 900 }}>Hi 👋 {name}</h1>
        <p style={{ margin: 0, fontSize: '0.88rem', color: 'rgba(255,255,255,0.7)' }}>{dept} &nbsp;·&nbsp; {facultyId}</p>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
          {[{ l: 'Classes Today', v: '4' }, { l: 'HOD Notices', v: announcementsCount }, { l: 'Pending Leaves', v: pendingLeaves }, { l: 'Open Assignments', v: openAssignments }].map(s => (
            <div key={s.l} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '12px', padding: '0.6rem 1.2rem', textAlign: 'center', border: '1px solid rgba(255,255,255,0.15)' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#a5f3fc' }}>{s.v}</div>
              <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Access Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
        {cards.map(({ id, label, icon: Icon, color, bg, desc }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '1.5rem', textAlign: 'left', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '0.75rem', transition: 'all 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${color}22`; e.currentTarget.style.borderColor = color + '40'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
          >
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon size={24} color={color} />
            </div>
            <div>
              <h3 style={{ margin: '0 0 0.25rem', fontSize: '0.98rem', fontWeight: 800, color: '#0f172a' }}>{label}</h3>
              <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748b' }}>{desc}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem', fontWeight: 600, color: color, marginTop: 'auto' }}>
              Open <ChevronRight size={14} />
            </div>
          </button>
        ))}
      </div>

      {/* Recent HOD Announcements Preview */}
      <div style={{ background: '#ffffff', borderRadius: '16px', padding: '1.5rem', border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: '#fdf2f8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bell size={20} color="#e11d48" />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>Recent HOD Announcements & Circulars</h3>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>Official departmental notifications broadcasted by Head of Department</p>
            </div>
          </div>
          <button
            onClick={() => setTab('announcements')}
            style={{ background: '#f1f5f9', border: 'none', padding: '0.4rem 0.85rem', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 700, color: '#0f172a', cursor: 'pointer' }}
          >
            View All ({announcementsCount})
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {announcements.slice(0, 3).map((ann) => (
            <div
              key={ann.id}
              style={{ padding: '1rem', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', gap: '1rem' }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: 800, padding: '0.15rem 0.5rem', borderRadius: 9999, background: ann.priority === 'High' ? '#fff1f2' : '#f0fdf4', color: ann.priority === 'High' ? '#e11d48' : '#16a34a' }}>
                    {ann.priority || 'Normal'}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{ann.date}</span>
                </div>
                <h4 style={{ margin: '0 0 0.25rem', fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>{ann.title}</h4>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#475569', lineHeight: 1.4 }}>{ann.content || ann.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Inline Faculty Announcements View ────────────────── */
function FacultyAnnouncements({ announcements = [] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ background: '#ffffff', borderRadius: '16px', padding: '1.5rem', border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: '#fff1f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bell size={24} color="#e11d48" />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 800, color: '#0f172a' }}>
              HOD Circulars & Department Notifications
            </h2>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.82rem', color: '#64748b' }}>
              Direct circulars dispatched by Head of Department (CSE) for Faculty & Students
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {announcements.length === 0 ? (
          <div style={{ background: '#ffffff', padding: '3rem', textAlign: 'center', borderRadius: '16px', border: '1px solid #e2e8f0', color: '#64748b' }}>
            No announcements broadcasted yet.
          </div>
        ) : (
          announcements.map((ann) => (
            <div
              key={ann.id}
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid #e2e8f0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      padding: '0.2rem 0.6rem',
                      borderRadius: 9999,
                      background: ann.priority === 'High' ? '#fff1f2' : '#eff6ff',
                      color: ann.priority === 'High' ? '#e11d48' : '#2563eb',
                      border: `1px solid ${ann.priority === 'High' ? '#fecdd3' : '#bfdbfe'}`
                    }}
                  >
                    {ann.priority || 'Normal'} Priority
                  </span>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.6rem',
                      borderRadius: 9999,
                      background: '#f8fafc',
                      color: '#475569',
                      border: '1px solid #e2e8f0'
                    }}
                  >
                    {ann.category || 'Department'}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    Audience: <strong>{ann.audience || 'All'}</strong>
                  </span>
                </div>
                <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>
                  📅 {ann.date} {ann.time && `· ${ann.time}`}
                </span>
              </div>

              <div>
                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                  {ann.title}
                </h3>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#334155', lineHeight: 1.6 }}>
                  {ann.content || ann.message}
                </p>
              </div>

              <div style={{ paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                  Issued by: <strong>{ann.author || 'Dr. K. Meenakshi Sundaram'}</strong> (HOD, CSE)
                </span>
                <span style={{ fontSize: '0.72rem', background: '#ecfdf5', color: '#059669', padding: '0.2rem 0.5rem', borderRadius: '6px', fontWeight: 700 }}>
                  Verified Circular
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
