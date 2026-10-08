import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard, Users, BarChart2,
  Calendar, Bell, UserCircle, Settings, LogOut,
  Menu, X, Search, ChevronRight, AlertTriangle, CheckCircle, Eye,
  Plus, Trash2, Filter, Award, Activity, Briefcase, Mail, Phone,
  MapPin, Shield, Star, CheckCheck, Send, Sparkles, Clock, BookOpen, TrendingUp, XCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usePortal } from '../context/PortalContext';
import { useRouter } from '../router';
import UniversityLogo from '../components/common/UniversityLogo';
import {
  hodInfo, hodFaculty, hodAcademicPerformance, hodEventRegistrations
} from '../data/hodMockData';

// ─── Colour token helpers ──────────────────────────────────────────────────
const HOD_PURPLE = '#7c3aed';
const HOD_PURPLE_LIGHT = '#f5f3ff';
const HOD_PURPLE_BORDER = '#ddd6fe';

const statusBadge = (status) => {
  const map = {
    Active:     { bg: '#ecfdf5', color: '#059669', border: '#a7f3d0' },
    'On Leave': { bg: '#fffbeb', color: '#d97706', border: '#fde68a' },
    Upcoming:   { bg: '#eff6ff', color: '#2563eb', border: '#bfdbfe' },
    Completed:  { bg: '#ecfdf5', color: '#059669', border: '#a7f3d0' },
    Published:  { bg: '#ecfdf5', color: '#059669', border: '#a7f3d0' },
    Approved:   { bg: '#ecfdf5', color: '#059669', border: '#a7f3d0' },
    'Pending Approval': { bg: '#fffbeb', color: '#d97706', border: '#fde68a' },
    Rejected:   { bg: '#fff1f2', color: '#e11d48', border: '#ffe4e6' },
    High:       { bg: '#fff1f2', color: '#e11d48', border: '#ffe4e6' },
    Medium:     { bg: '#fffbeb', color: '#d97706', border: '#fde68a' },
    Low:        { bg: '#ecfdf5', color: '#059669', border: '#a7f3d0' },
  };
  const s = map[status] || { bg: '#f8fafc', color: '#64748b', border: '#e2e8f0' };
  return (
    <span style={{ display:'inline-block', padding:'0.2rem 0.6rem', borderRadius:9999,
      fontSize:'0.72rem', fontWeight:700, background:s.bg, color:s.color, border:`1px solid ${s.border}` }}>
      {status}
    </span>
  );
};

const StatCard = ({ icon: Icon, label, value, sub, color = HOD_PURPLE, lightColor = HOD_PURPLE_LIGHT, onClick }) => (
  <div
    className="portal-card"
    onClick={onClick}
    style={{
      padding:'1.25rem 1.5rem',
      display:'flex',
      alignItems:'center',
      gap:'1rem',
      cursor: onClick ? 'pointer' : 'default',
      transition:'all 0.2s ease'
    }}
  >
    <div style={{ width:52, height:52, borderRadius:14, background:lightColor, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
      <Icon size={24} color={color} />
    </div>
    <div>
      <p style={{ margin:0, fontSize:'0.78rem', color:'var(--slate-500)', fontWeight:600 }}>{label}</p>
      <p style={{ margin:'0.15rem 0 0', fontSize:'1.55rem', fontWeight:800, color:'var(--slate-900)', lineHeight:1 }}>{value}</p>
      {sub && <p style={{ margin:'0.25rem 0 0', fontSize:'0.7rem', color:'var(--slate-400)' }}>{sub}</p>}
    </div>
  </div>
);

// ─── SIDEBAR NAVIGATION (Students, Attendance, Timetable, Reports REMOVED) ───
const NAV_ITEMS = [
  { id:'dashboard',     label:'Dashboard',             icon:LayoutDashboard },
  { id:'faculty',       label:'Faculty',               icon:Users },
  { id:'performance',   label:'Academic Performance',  icon:BarChart2 },
  { id:'events',        label:'Events & Approvals',    icon:Calendar },
  { id:'announcements', label:'Announcements',         icon:Bell },
  { id:'profile',       label:'HOD Profile',           icon:UserCircle },
  { id:'settings',      label:'Settings',              icon:Settings },
];

function HodSidebar({ active, setActive, sidebarOpen, setSidebarOpen, onLogout, hod }) {
  const firstLetter = hod.name.trim().charAt(0).toUpperCase();
  return (
    <>
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)}
          style={{ position:'fixed', inset:0, background:'rgba(15,23,42,0.45)', backdropFilter:'blur(3px)', zIndex:49 }} />
      )}
      <aside style={{
        position:'fixed', top:0, left:0, bottom:0, width:255,
        background:'linear-gradient(180deg, #1e1b4b 0%, #312e81 100%)',
        display:'flex', flexDirection:'column', zIndex:50,
        transition:'transform 0.25s cubic-bezier(0.16,1,0.3,1)',
        boxShadow:'4px 0 24px rgba(0,0,0,0.25)'
      }} className={`hod-sidebar ${sidebarOpen ? 'hod-sidebar-open' : ''}`}>

        {/* University Logo */}
        <div style={{ padding:'1.1rem 1.25rem', borderBottom:'1px solid rgba(255,255,255,0.08)',
          display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <UniversityLogo size="sm" showTagline={true} light={true} />
          <button onClick={() => setSidebarOpen(false)}
            style={{ background:'none', border:'none', color:'rgba(255,255,255,0.5)', cursor:'pointer', padding:'0.25rem' }}
            className="hod-sidebar-close">
            <X size={18} />
          </button>
        </div>

        {/* HOD Profile Brief Card */}
        <div style={{ padding:'1rem', borderBottom:'1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'0.75rem',
            background:'rgba(255,255,255,0.08)', borderRadius:12, padding:'0.75rem' }}>
            <div style={{ width:42, height:42, borderRadius:12, flexShrink:0,
              background:'linear-gradient(135deg, #a78bfa, #7c3aed)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'1.1rem', fontWeight:800, color:'#fff' }}>
              {firstLetter}
            </div>
            <div style={{ minWidth:0 }}>
              <p style={{ margin:0, fontSize:'0.8rem', fontWeight:700, color:'#f8fafc',
                overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{hod.name}</p>
              <p style={{ margin:0, fontSize:'0.68rem', color:'rgba(255,255,255,0.5)', fontWeight:500 }}>
                HOD · {hod.deptShort}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav style={{ flex:1, padding:'0.75rem', overflowY:'auto' }}>
          <p style={{ fontSize:'0.63rem', fontWeight:700, color:'rgba(255,255,255,0.3)',
            textTransform:'uppercase', letterSpacing:'0.08em', padding:'0.3rem 0.5rem 0.6rem' }}>
            HOD Portal Navigation
          </p>
          <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'0.18rem', margin:0, padding:0 }}>
            {NAV_ITEMS.map(item => {
              const Icon = item.icon;
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <button onClick={() => { setActive(item.id); setSidebarOpen(false); }}
                    style={{ width:'100%', display:'flex', alignItems:'center', gap:'0.75rem',
                      padding:'0.6rem 0.85rem', borderRadius:10, fontSize:'0.86rem', fontWeight: isActive ? 700 : 500,
                      color: isActive ? '#ffffff' : 'rgba(255,255,255,0.6)',
                      background: isActive ? 'rgba(167,139,250,0.25)' : 'transparent',
                      border: isActive ? '1px solid rgba(167,139,250,0.4)' : '1px solid transparent',
                      transition:'all 0.18s ease', textAlign:'left', cursor:'pointer' }}
                    onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background='rgba(255,255,255,0.08)'; e.currentTarget.style.color='#fff'; } }}
                    onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='rgba(255,255,255,0.6)'; } }}>
                    <Icon size={17} style={{ color: isActive ? '#c4b5fd' : 'rgba(255,255,255,0.45)', flexShrink:0 }} />
                    <span style={{ flex:1 }}>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div style={{ padding:'0.75rem', borderTop:'1px solid rgba(255,255,255,0.08)' }}>
          <button onClick={onLogout}
            style={{ width:'100%', display:'flex', alignItems:'center', gap:'0.75rem',
              padding:'0.6rem 0.85rem', borderRadius:10, fontSize:'0.84rem', fontWeight:600,
              color:'#fca5a5', background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.2)',
              cursor:'pointer', transition:'all 0.18s ease' }}
            onMouseEnter={e => e.currentTarget.style.background='rgba(239,68,68,0.2)'}
            onMouseLeave={e => e.currentTarget.style.background='rgba(239,68,68,0.1)'}>
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

// ─── DASHBOARD OVERVIEW ────────────────────────────────────────────────────
function HodHome({ setActive }) {
  const { events, announcements, approveEvent } = usePortal();

  // Dynamic counts derived from real shared state
  const pendingEvents = events.filter(e => e.approved === false || e.approvalStatus === 'Pending Approval');
  const approvedUpcomingEvents = events.filter(e => e.status === 'Upcoming' && e.approved !== false && e.approvalStatus !== 'Pending Approval');
  const recentAnnouncements = announcements.slice(0, 3);

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1.75rem' }}>
      {/* Welcome Banner */}
      <div style={{ background:'linear-gradient(135deg, #4c1d95 0%, #6d28d9 60%, #7c3aed 100%)',
        borderRadius:20, padding:'1.75rem 2rem', color:'#fff', display:'flex',
        alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem', boxShadow:'0 10px 25px -5px rgba(124, 58, 237, 0.3)' }}>
        <div>
          <span style={{ fontSize:'0.75rem', fontWeight:700, background:'rgba(255,255,255,0.15)',
            padding:'0.2rem 0.65rem', borderRadius:9999, display:'inline-flex', alignItems:'center', gap:'0.35rem', marginBottom:'0.5rem' }}>
            <Sparkles size={13} color="#fde047" /> HOD Administration Portal
          </span>
          <h1 style={{ margin:0, fontSize:'1.75rem', fontWeight:900, color:'#fff' }}>Hi 👋 {hodInfo.name}</h1>
          <p style={{ margin:'0.4rem 0 0', fontSize:'0.85rem', color:'rgba(255,255,255,0.85)' }}>
            {hodInfo.department} &nbsp;·&nbsp; Academic Year {hodInfo.academicYear}
          </p>
        </div>
        <div style={{ display:'flex', gap:'0.85rem', flexWrap:'wrap' }}>
          <div style={{ background:'rgba(255,255,255,0.12)', borderRadius:14,
            padding:'0.85rem 1.4rem', textAlign:'center', border:'1px solid rgba(255,255,255,0.2)' }}>
            <p style={{ margin:0, fontSize:'1.45rem', fontWeight:800, color:'#fff' }}>{hodFaculty.length}</p>
            <p style={{ margin:'0.2rem 0 0', fontSize:'0.72rem', color:'rgba(255,255,255,0.8)', fontWeight:600 }}>Total Faculty</p>
          </div>
          <div style={{ background:'rgba(255,255,255,0.12)', borderRadius:14,
            padding:'0.85rem 1.4rem', textAlign:'center', border:'1px solid rgba(255,255,255,0.2)' }}>
            <p style={{ margin:0, fontSize:'1.45rem', fontWeight:800, color:'#fff' }}>Turing 301</p>
            <p style={{ margin:'0.2rem 0 0', fontSize:'0.72rem', color:'rgba(255,255,255,0.8)', fontWeight:600 }}>Office Cabin</p>
          </div>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px,1fr))', gap:'1rem' }}>
        <StatCard
          icon={Users}
          label="Total Faculty"
          value={hodFaculty.length}
          sub="CSE Teaching Staff"
          color={HOD_PURPLE}
          lightColor={HOD_PURPLE_LIGHT}
          onClick={() => setActive('faculty')}
        />
        <StatCard
          icon={Calendar}
          label="Pending Event Approvals"
          value={pendingEvents.length}
          sub={pendingEvents.length > 0 ? "Requires HOD approval" : "All sanctioned"}
          color={pendingEvents.length > 0 ? "#e11d48" : "#059669"}
          lightColor={pendingEvents.length > 0 ? "#ffe4e6" : "#ecfdf5"}
          onClick={() => setActive('events')}
        />
        <StatCard
          icon={Sparkles}
          label="Live Student Events"
          value={approvedUpcomingEvents.length}
          sub="Active in Student Portal"
          color="#2563eb"
          lightColor="#eff6ff"
          onClick={() => setActive('events')}
        />
        <StatCard
          icon={Bell}
          label="HOD Announcements"
          value={announcements.length}
          sub="Broadcast to Students & Faculty"
          color="#d97706"
          lightColor="#fffbeb"
          onClick={() => setActive('announcements')}
        />
      </div>

      {/* Urgent Action Banner for Pending Events */}
      {pendingEvents.length > 0 && (
        <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 16, padding: '1.25rem 1.5rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <AlertTriangle size={22} color="#d97706" />
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: '#92400e' }}>
                {pendingEvents.length} Event Proposal{pendingEvents.length === 1 ? '' : 's'} Awaiting Your Sanction
              </h4>
              <p style={{ margin: '0.2rem 0 0', fontSize: '0.8rem', color: '#b45309' }}>
                Events will appear in the Student Portal once you approve them.
              </p>
            </div>
          </div>
          <button
            onClick={() => setActive('events')}
            style={{ padding: '0.55rem 1.2rem', borderRadius: 10, background: '#d97706', color: '#ffffff',
              border: 'none', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            Review & Approve Now <ChevronRight size={15} />
          </button>
        </div>
      )}

      {/* Two column: Announcements Broadcast + Live Student Events */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(320px, 1fr))', gap:'1.25rem' }}>

        {/* Recent Announcements Feed */}
        <div className="portal-card" style={{ padding:'1.5rem' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1.1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Bell size={18} color={HOD_PURPLE} />
              <h3 style={{ margin:0, fontSize:'0.98rem', fontWeight:800, color:'var(--slate-800)' }}>
                Broadcasted Announcements
              </h3>
            </div>
            <button onClick={() => setActive('announcements')} style={{ fontSize:'0.78rem', color:HOD_PURPLE,
              fontWeight:700, background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:3 }}>
              Manage & Send <ChevronRight size={14} />
            </button>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
            {recentAnnouncements.map(a => (
              <div key={a.id} style={{ padding:'0.85rem 1rem', borderRadius:12,
                background: a.priority==='High' ? '#fff1f2' : '#f8fafc',
                border:`1px solid ${a.priority==='High' ? '#fecdd3' : '#e2e8f0'}` }}>
                <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:'0.5rem', marginBottom:'0.25rem' }}>
                  <p style={{ margin:0, fontSize:'0.85rem', fontWeight:700, color:'var(--slate-800)', lineHeight:1.35 }}>{a.title}</p>
                  {statusBadge(a.priority)}
                </div>
                <p style={{ margin:0, fontSize:'0.78rem', color:'var(--slate-600)', lineHeight:1.4 }}>
                  {a.content || a.message}
                </p>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'0.5rem' }}>
                  <span style={{ fontSize:'0.7rem', color:'var(--slate-400)' }}>📅 {a.date}</span>
                  <span style={{ fontSize:'0.7rem', background:'#e0e7ff', color:'#4338ca', padding:'0.15rem 0.5rem', borderRadius:9999, fontWeight:700 }}>
                    Visible in: Student & Faculty Logins
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Student Events */}
        <div className="portal-card" style={{ padding:'1.5rem' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1.1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={18} color={HOD_PURPLE} />
              <h3 style={{ margin:0, fontSize:'0.98rem', fontWeight:800, color:'var(--slate-800)' }}>
                Live Approved Events (Student Portal)
              </h3>
            </div>
            <button onClick={() => setActive('events')} style={{ fontSize:'0.78rem', color:HOD_PURPLE,
              fontWeight:700, background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:3 }}>
              View All <ChevronRight size={14} />
            </button>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
            {approvedUpcomingEvents.slice(0, 3).map(ev => (
              <div key={ev.id} style={{ padding:'0.85rem 1rem', borderRadius:12, background:HOD_PURPLE_LIGHT,
                border:`1px solid ${HOD_PURPLE_BORDER}` }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'0.5rem' }}>
                  <p style={{ margin:0, fontSize:'0.85rem', fontWeight:700, color:'var(--slate-800)', lineHeight:1.3 }}>{ev.name}</p>
                  <span style={{ fontSize:'0.68rem', fontWeight:800, padding:'0.15rem 0.5rem', borderRadius:9999, background:'#ecfdf5', color:'#059669', border:'1px solid #a7f3d0' }}>
                    Live
                  </span>
                </div>
                <div style={{ display:'flex', gap:'0.75rem', marginTop:'0.5rem', flexWrap:'wrap' }}>
                  <span style={{ fontSize:'0.73rem', color:'var(--slate-500)' }}>📅 {ev.date}</span>
                  <span style={{ fontSize:'0.73rem', color:'var(--slate-500)' }}>📍 {ev.venue}</span>
                  <span style={{ fontSize:'0.73rem', color:HOD_PURPLE, fontWeight:600 }}>{ev.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Academic Overview */}
      <div className="portal-card" style={{ padding:'1.5rem' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.25rem' }}>
          <div>
            <h3 style={{ margin:0, fontSize:'1rem', fontWeight:800, color:'var(--slate-800)' }}>
              CSE Academic Overview – Semester Performance
            </h3>
            <p style={{ margin:'0.2rem 0 0', fontSize:'0.78rem', color:'var(--slate-500)' }}>
              Continuous evaluation marks and semester pass percentages
            </p>
          </div>
          <button onClick={() => setActive('performance')} style={{ fontSize:'0.78rem', color:HOD_PURPLE,
            fontWeight:700, background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:3 }}>
            Full Report <ChevronRight size={14} />
          </button>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(140px, 1fr))', gap:'0.75rem' }}>
          {hodAcademicPerformance.semesterWise.map(sem => (
            <div key={sem.semester} style={{ textAlign:'center', padding:'1rem 0.75rem',
              borderRadius:12, background:'#f8fafc', border:'1px solid #e2e8f0' }}>
              <p style={{ margin:0, fontSize:'0.74rem', fontWeight:700, color:'var(--slate-500)' }}>{sem.semester}</p>
              <p style={{ margin:'0.4rem 0 0.2rem', fontSize:'1.45rem', fontWeight:900,
                color: sem.avgMarks >= 80 ? '#059669' : sem.avgMarks >= 75 ? '#d97706' : '#dc2626' }}>{sem.avgMarks}</p>
              <p style={{ margin:0, fontSize:'0.68rem', color:'var(--slate-400)' }}>Avg Marks</p>
              <p style={{ margin:'0.35rem 0 0', fontSize:'0.78rem', fontWeight:800, color:HOD_PURPLE }}>{sem.passRate}%</p>
              <p style={{ margin:0, fontSize:'0.68rem', color:'var(--slate-400)' }}>Pass Rate</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── FACULTY MANAGEMENT ───────────────────────────────────────────────────
function HodFacultySection() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    return hodFaculty.filter(f =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.designation.toLowerCase().includes(search.toLowerCase()) ||
      f.subjects.some(s => s.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search]);

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem' }}>
        <div>
          <h2 style={{ margin:0, fontSize:'1.2rem', fontWeight:800, color:'var(--slate-800)' }}>
            CSE Faculty Management ({hodFaculty.length})
          </h2>
          <p style={{ margin:'0.2rem 0 0', fontSize:'0.8rem', color:'var(--slate-500)' }}>
            Supervise department professors, assistant professors, and assigned course workloads
          </p>
        </div>
        <div style={{ display:'flex', alignItems:'center', background:'#fff', border:'1px solid #e2e8f0',
          borderRadius:10, padding:'0.5rem 0.85rem', width:260, gap:'0.5rem' }}>
          <Search size={16} color="var(--slate-400)" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search faculty or subject..."
            style={{ border:'none', outline:'none', fontSize:'0.85rem', width:'100%', color:'var(--slate-800)' }} />
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(290px,1fr))', gap:'1rem' }}>
        {filtered.map(f => (
          <div key={f.id} className="portal-card" style={{ padding:'1.25rem', display:'flex', flexDirection:'column', gap:'0.75rem' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
                <div style={{ width:44, height:44, borderRadius:12, background:HOD_PURPLE_LIGHT,
                  border:`1px solid ${HOD_PURPLE_BORDER}`, display:'flex', alignItems:'center',
                  justifyContent:'center', fontSize:'1.05rem', fontWeight:800, color:HOD_PURPLE }}>
                  {f.name.replace('Dr. ','').replace('Mr. ','').replace('Ms. ','').charAt(0)}
                </div>
                <div>
                  <h4 style={{ margin:0, fontSize:'0.9rem', fontWeight:800, color:'var(--slate-800)' }}>{f.name}</h4>
                  <p style={{ margin:'0.15rem 0 0', fontSize:'0.74rem', color:'var(--slate-500)' }}>{f.designation}</p>
                </div>
              </div>
              {statusBadge(f.status)}
            </div>

            <div style={{ padding:'0.65rem', borderRadius:9, background:'#f8fafc', border:'1px solid #e2e8f0' }}>
              <p style={{ margin:'0 0 0.3rem', fontSize:'0.7rem', fontWeight:700, color:'var(--slate-400)', textTransform:'uppercase' }}>Assigned Subjects</p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'0.3rem' }}>
                {f.subjects.map(s => (
                  <span key={s} style={{ fontSize:'0.72rem', background:'#ede9fe', color:HOD_PURPLE,
                    padding:'0.15rem 0.5rem', borderRadius:6, fontWeight:600 }}>{s}</span>
                ))}
              </div>
            </div>

            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:'0.75rem', color:'var(--slate-500)' }}>
              <span>Exp: <strong>{f.experience}</strong></span>
              <span>Classes: <strong>{f.classes.length} Batches</strong></span>
            </div>

            <button onClick={() => setSelected(f)}
              style={{ width:'100%', padding:'0.55rem', borderRadius:9, background:'#f8fafc',
                border:'1px solid #e2e8f0', color:HOD_PURPLE, fontSize:'0.8rem', fontWeight:700,
                cursor:'pointer', transition:'all 0.18s ease' }}
              onMouseEnter={e => { e.currentTarget.style.background=HOD_PURPLE_LIGHT; }}
              onMouseLeave={e => { e.currentTarget.style.background='#f8fafc'; }}>
              View Details & Schedule
            </button>
          </div>
        ))}
      </div>

      {/* Details Modal */}
      {selected && (
        <div style={{ position:'fixed', inset:0, background:'rgba(15,23,42,0.5)', zIndex:60,
          display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem' }}>
          <div style={{ background:'#fff', borderRadius:20, maxWidth:520, width:'100%', padding:'1.75rem',
            maxHeight:'90vh', overflowY:'auto' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1.25rem' }}>
              <div>
                <h3 style={{ margin:0, fontSize:'1.15rem', fontWeight:800, color:'var(--slate-900)' }}>{selected.name}</h3>
                <p style={{ margin:'0.2rem 0 0', fontSize:'0.82rem', color:HOD_PURPLE, fontWeight:600 }}>{selected.designation} · {selected.facultyId}</p>
              </div>
              <button onClick={() => setSelected(null)} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--slate-400)' }}>
                <X size={20} />
              </button>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:'0.85rem' }}>
              {[
                ['Specialization', selected.specialization],
                ['Qualification', selected.qualification],
                ['Experience', selected.experience],
                ['Email', selected.email],
                ['Phone', selected.phone],
                ['Assigned Classes', selected.classes.join(', ')],
              ].map(([k,v]) => (
                <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'0.5rem 0', borderBottom:'1px solid #f1f5f9' }}>
                  <span style={{ fontSize:'0.82rem', color:'var(--slate-500)', fontWeight:500 }}>{k}</span>
                  <span style={{ fontSize:'0.82rem', color:'var(--slate-800)', fontWeight:700 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── ACADEMIC PERFORMANCE ─────────────────────────────────────────────────
function HodAcademicPerformance() {
  const perf = hodAcademicPerformance;

  const batchAssessments = [
    { year: '1st Year (Batch 2026-30)', enrolled: 60, cat1Avg: 38.6, cat2Avg: 41.2, overallScore: 79.8, passRate: 94.2, status: 'On Track' },
    { year: '2nd Year (Batch 2025-29)', enrolled: 58, cat1Avg: 39.4, cat2Avg: 40.8, overallScore: 80.2, passRate: 93.7, status: 'On Track' },
    { year: '3rd Year (Batch 2024-28)', enrolled: 62, cat1Avg: 41.1, cat2Avg: 43.5, overallScore: 84.6, passRate: 96.4, status: 'High Performing' },
    { year: '4th Year (Batch 2023-27)', enrolled: 55, cat1Avg: 43.8, cat2Avg: 45.2, overallScore: 89.0, passRate: 98.1, status: 'Distinction Track' },
  ];

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
      <div>
        <h2 style={{ margin:0, fontSize:'1.25rem', fontWeight:800, color:'var(--slate-800)' }}>Department Academic Performance</h2>
        <p style={{ margin:'0.2rem 0 0', fontSize:'0.82rem', color:'var(--slate-500)' }}>
          Continuous assessment evaluations, subject pass percentages, and semester-wise departmental academic trends
        </p>
      </div>

      {/* KPI Overview Cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(210px, 1fr))', gap:'1rem' }}>
        {[
          { label: 'Dept. Average Pass Rate', val: '94.5%', sub: 'Target: >90% achieved', color: '#059669', bg: '#ecfdf5' },
          { label: 'CAT Average Score', val: '83.4 / 100', sub: 'Across CAT-1 & CAT-2', color: HOD_PURPLE, bg: '#f5f3ff' },
          { label: 'Courses Evaluated', val: '6 Core + 4 Labs', sub: 'Odd Semester 2026-27', color: '#2563eb', bg: '#eff6ff' },
          { label: 'CO-PO Attainment', val: '89.2%', sub: 'NBA & NAAC Compliant', color: '#d97706', bg: '#fffbeb' },
        ].map(k => (
          <div key={k.label} className="portal-card" style={{ padding:'1.15rem 1.25rem', display:'flex', flexDirection:'column', gap:'0.3rem' }}>
            <span style={{ fontSize:'0.75rem', fontWeight:700, color:'var(--slate-500)', textTransform:'uppercase' }}>{k.label}</span>
            <span style={{ fontSize:'1.5rem', fontWeight:900, color:k.color }}>{k.val}</span>
            <span style={{ fontSize:'0.74rem', color:'var(--slate-500)' }}>{k.sub}</span>
          </div>
        ))}
      </div>

      {/* Subject-Wise Performance & Faculty Pass Rates */}
      <div className="portal-card" style={{ padding:'1.5rem' }}>
        <h3 style={{ margin:'0 0 1rem', fontSize:'0.98rem', fontWeight:800, color:'var(--slate-800)' }}>
          Subject-Wise Evaluation & Faculty Pass Percentages
        </h3>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:'0.85rem' }}>
          {perf.subjectWise.map(s => (
            <div key={s.code} style={{ padding:'1rem', borderRadius:12, background:'#f8fafc', border:'1px solid #e2e8f0', display:'flex', flexDirection:'column', gap:'0.5rem' }}>
              <div>
                <p style={{ margin:0, fontSize:'0.88rem', fontWeight:800, color:'var(--slate-800)' }}>{s.subject}</p>
                <p style={{ margin:'0.15rem 0 0', fontSize:'0.74rem', color:'var(--slate-500)' }}>{s.code} · {s.faculty}</p>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'auto', paddingTop:'0.35rem', borderTop:'1px dashed #e2e8f0' }}>
                <span style={{ fontSize:'0.76rem', color:'var(--slate-600)' }}>Avg Score: <strong>{s.avgMarks}/100</strong></span>
                <span style={{ fontSize:'0.8rem', fontWeight:800, color:'#059669', background:'#ecfdf5', padding:'0.2rem 0.5rem', borderRadius:6 }}>
                  {s.passRate}% Pass
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Batch-Level Continuous Assessment (CAT-1 vs CAT-2) Overview */}
      <div className="portal-card" style={{ padding:'1.5rem' }}>
        <h3 style={{ margin:'0 0 0.35rem', fontSize:'0.98rem', fontWeight:800, color:'var(--slate-800)' }}>
          Batch-Level Continuous Assessment Evaluation (CAT-1 & CAT-2)
        </h3>
        <p style={{ margin:'0 0 1rem', fontSize:'0.78rem', color:'var(--slate-500)' }}>
          Aggregated departmental evaluation metrics across academic year cohorts
        </p>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ background:'#f8fafc', borderBottom:'1px solid #e2e8f0' }}>
                {['Cohort / Batch', 'Enrolled Strength', 'CAT-1 Avg (50)', 'CAT-2 Avg (50)', 'Combined Avg (100)', 'Batch Pass Rate', 'Academic Status'].map(h => (
                  <th key={h} style={{ padding:'0.75rem 0.85rem', textAlign:'left', fontSize:'0.72rem', fontWeight:700, color:'var(--slate-500)', textTransform:'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {batchAssessments.map((b, i) => (
                <tr key={i} style={{ borderBottom:'1px solid #f1f5f9' }}>
                  <td style={{ padding:'0.85rem', fontSize:'0.85rem', fontWeight:700, color:'var(--slate-800)' }}>{b.year}</td>
                  <td style={{ padding:'0.85rem', fontSize:'0.82rem', color:'var(--slate-600)' }}>{b.enrolled} Students</td>
                  <td style={{ padding:'0.85rem', fontSize:'0.82rem', fontWeight:600, color:'var(--slate-700)' }}>{b.cat1Avg} / 50</td>
                  <td style={{ padding:'0.85rem', fontSize:'0.82rem', fontWeight:600, color:'var(--slate-700)' }}>{b.cat2Avg} / 50</td>
                  <td style={{ padding:'0.85rem', fontSize:'0.85rem', fontWeight:800, color:HOD_PURPLE }}>{b.overallScore} / 100</td>
                  <td style={{ padding:'0.85rem', fontSize:'0.85rem', fontWeight:800, color:'#059669' }}>{b.passRate}%</td>
                  <td style={{ padding:'0.85rem' }}>
                    <span style={{
                      fontSize:'0.72rem',
                      fontWeight:700,
                      padding:'0.25rem 0.6rem',
                      borderRadius:6,
                      background: b.status === 'Distinction Track' ? '#f5f3ff' : b.status === 'High Performing' ? '#ecfdf5' : '#eff6ff',
                      color: b.status === 'Distinction Track' ? HOD_PURPLE : b.status === 'High Performing' ? '#059669' : '#2563eb'
                    }}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Semester-Wise Academic Progression & Pass Trends */}
      <div className="portal-card" style={{ padding:'1.5rem' }}>
        <h3 style={{ margin:'0 0 0.35rem', fontSize:'0.98rem', fontWeight:800, color:'var(--slate-800)' }}>
          Semester-Wise Academic Progression & Historical Pass Rates
        </h3>
        <p style={{ margin:'0 0 1rem', fontSize:'0.78rem', color:'var(--slate-500)' }}>
          Historical curriculum performance trends for Continuous Quality Improvement (CQI)
        </p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(180px, 1fr))', gap:'0.85rem' }}>
          {perf.semesterWise.map(sm => (
            <div key={sm.semester} style={{ padding:'1rem', borderRadius:10, background:'#f8fafc', border:'1px solid #e2e8f0', display:'flex', flexDirection:'column', gap:'0.4rem' }}>
              <span style={{ fontSize:'0.82rem', fontWeight:800, color:'var(--slate-800)' }}>{sm.semester}</span>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
                <span style={{ fontSize:'1.25rem', fontWeight:900, color:'#059669' }}>{sm.passRate}%</span>
                <span style={{ fontSize:'0.74rem', color:'var(--slate-500)' }}>Avg: {sm.avgMarks}/100</span>
              </div>
              <div style={{ width:'100%', height:6, background:'#e2e8f0', borderRadius:99, overflow:'hidden', marginTop:'0.2rem' }}>
                <div style={{ width:`${sm.passRate}%`, height:'100%', background:'linear-gradient(90deg, #6366f1, #059669)', borderRadius:99 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── EVENTS & APPROVAL WORKFLOW (Cross-Portal: HOD <-> Student) ───────────
function HodEventsSection() {
  const { events, approveEvent, rejectEvent, createHodEvent } = usePortal();
  const [activeSubTab, setActiveSubTab] = useState('pending'); // 'pending' | 'approved'
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Technical',
    date: '',
    time: '09:30 AM - 04:30 PM',
    venue: '',
    description: '',
    rulesText: '',
    organizer: 'Department of Computer Science & Engineering'
  });

  const pendingEvents = events.filter(e => e.approved === false || e.approvalStatus === 'Pending Approval');
  const approvedEvents = events.filter(e => e.approved !== false && e.approvalStatus !== 'Pending Approval');

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.date) return;

    createHodEvent({
      ...formData,
      rules: formData.rulesText ? formData.rulesText.split('\n').filter(r => r.trim()) : [
        'Open to all university students',
        'College ID mandatory'
      ],
      approved: true // HOD created events are published directly!
    });

    setShowCreateModal(false);
    setFormData({
      name: '',
      category: 'Technical',
      date: '',
      time: '09:30 AM - 04:30 PM',
      venue: '',
      description: '',
      rulesText: '',
      organizer: 'Department of Computer Science & Engineering'
    });
    setActiveSubTab('approved');
  };

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
      {/* Top Header with Create Button */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem' }}>
        <div>
          <h2 style={{ margin:0, fontSize:'1.25rem', fontWeight:800, color:'var(--slate-800)' }}>
            Department Event Sanctioning & Approvals
          </h2>
          <p style={{ margin:'0.2rem 0 0', fontSize:'0.82rem', color:'var(--slate-500)' }}>
            Approve proposed student club events or publish official CSE symposia to the Student Portal
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          style={{
            display:'flex', alignItems:'center', gap:'0.4rem',
            padding:'0.65rem 1.25rem', borderRadius:10, background:HOD_PURPLE, color:'#fff',
            border:'none', fontWeight:700, fontSize:'0.85rem', cursor:'pointer',
            boxShadow:'0 4px 12px rgba(124, 58, 237, 0.3)'
          }}
        >
          <Plus size={16} /> Sanction & Publish New Event
        </button>
      </div>

      {/* Sub Tabs: Awaiting Approval vs Live in Student Portal */}
      <div style={{ display:'flex', gap:'0.5rem', borderBottom:'1px solid #e2e8f0', paddingBottom:'0.5rem' }}>
        <button
          onClick={() => setActiveSubTab('pending')}
          style={{
            padding:'0.6rem 1.2rem',
            borderRadius:8,
            border:'none',
            fontSize:'0.85rem',
            fontWeight: activeSubTab === 'pending' ? 800 : 600,
            background: activeSubTab === 'pending' ? '#fff1f2' : 'transparent',
            color: activeSubTab === 'pending' ? '#e11d48' : 'var(--slate-600)',
            cursor:'pointer',
            display:'flex',
            alignItems:'center',
            gap:'0.4rem'
          }}
        >
          <span>Awaiting HOD Approval</span>
          <span style={{ padding:'0.15rem 0.5rem', borderRadius:9999, background: activeSubTab === 'pending' ? '#e11d48' : '#e2e8f0',
            color: activeSubTab === 'pending' ? '#fff' : 'var(--slate-600)', fontSize:'0.72rem', fontWeight:800 }}>
            {pendingEvents.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('approved')}
          style={{
            padding:'0.6rem 1.2rem',
            borderRadius:8,
            border:'none',
            fontSize:'0.85rem',
            fontWeight: activeSubTab === 'approved' ? 800 : 600,
            background: activeSubTab === 'approved' ? '#f5f3ff' : 'transparent',
            color: activeSubTab === 'approved' ? HOD_PURPLE : 'var(--slate-600)',
            cursor:'pointer',
            display:'flex',
            alignItems:'center',
            gap:'0.4rem'
          }}
        >
          <span>Live in Student Portal</span>
          <span style={{ padding:'0.15rem 0.5rem', borderRadius:9999, background: activeSubTab === 'approved' ? HOD_PURPLE : '#e2e8f0',
            color: activeSubTab === 'approved' ? '#fff' : 'var(--slate-600)', fontSize:'0.72rem', fontWeight:800 }}>
            {approvedEvents.length}
          </span>
        </button>
      </div>

      {/* PENDING APPROVAL QUEUE */}
      {activeSubTab === 'pending' && (
        <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
          {pendingEvents.length === 0 ? (
            <div style={{ background:'#fff', padding:'3rem', borderRadius:16, textAlign:'center', border:'1px solid #e2e8f0' }}>
              <CheckCircle size={44} color="#059669" style={{ margin:'0 auto 0.75rem' }} />
              <h3 style={{ margin:0, fontSize:'1.1rem', fontWeight:800, color:'var(--slate-800)' }}>
                All Event Proposals Have Been Reviewed!
              </h3>
              <p style={{ margin:'0.3rem 0 0', fontSize:'0.82rem', color:'var(--slate-500)' }}>
                New student club proposals will appear here for HOD approval.
              </p>
            </div>
          ) : (
            pendingEvents.map((evt) => (
              <div
                key={evt.id}
                style={{
                  background: '#ffffff',
                  borderRadius: 16,
                  padding: '1.5rem',
                  border: '1px solid #fecdd3',
                  boxShadow: '0 4px 14px rgba(225, 29, 72, 0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}
              >
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:'0.75rem' }}>
                  <div>
                    <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'0.35rem' }}>
                      <span style={{ fontSize:'0.72rem', fontWeight:800, padding:'0.2rem 0.6rem', borderRadius:9999, background:'#fff1f2', color:'#e11d48', border:'1px solid #fecdd3' }}>
                        Awaiting HOD Approval
                      </span>
                      <span style={{ fontSize:'0.72rem', fontWeight:700, padding:'0.2rem 0.6rem', borderRadius:9999, background:'#f1f5f9', color:'var(--slate-600)' }}>
                        {evt.category}
                      </span>
                      {evt.submittedBy && (
                        <span style={{ fontSize:'0.75rem', color:'var(--slate-500)' }}>
                          Submitted by: <strong>{evt.submittedBy}</strong>
                        </span>
                      )}
                    </div>
                    <h3 style={{ margin:0, fontSize:'1.15rem', fontWeight:800, color:'var(--slate-900)' }}>
                      {evt.name}
                    </h3>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div style={{ display:'flex', gap:'0.5rem' }}>
                    <button
                      onClick={() => approveEvent(evt.id)}
                      style={{
                        padding:'0.6rem 1.25rem',
                        borderRadius:10,
                        background:'#059669',
                        color:'#ffffff',
                        border:'none',
                        fontSize:'0.82rem',
                        fontWeight:700,
                        cursor:'pointer',
                        display:'flex',
                        alignItems:'center',
                        gap:'0.4rem',
                        boxShadow:'0 2px 8px rgba(5, 150, 105, 0.3)'
                      }}
                    >
                      <CheckCheck size={16} /> Approve & Publish to Student Portal
                    </button>
                    <button
                      onClick={() => rejectEvent(evt.id)}
                      style={{
                        padding:'0.6rem 1rem',
                        borderRadius:10,
                        background:'#ffffff',
                        color:'#dc2626',
                        border:'1px solid #fecaca',
                        fontSize:'0.82rem',
                        fontWeight:600,
                        cursor:'pointer'
                      }}
                    >
                      Reject
                    </button>
                  </div>
                </div>

                <p style={{ margin:0, fontSize:'0.85rem', color:'var(--slate-600)', lineHeight:1.5 }}>
                  {evt.description}
                </p>

                <div style={{ display:'flex', gap:'1.5rem', flexWrap:'wrap', fontSize:'0.78rem', color:'var(--slate-500)', paddingTop:'0.5rem', borderTop:'1px solid #f1f5f9' }}>
                  <span>📅 <strong>Date:</strong> {evt.date}</span>
                  <span>⏰ <strong>Time:</strong> {evt.time}</span>
                  <span>📍 <strong>Venue:</strong> {evt.venue}</span>
                  <span>🏛️ <strong>Organizer:</strong> {evt.organizer}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* APPROVED EVENTS QUEUE */}
      {activeSubTab === 'approved' && (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', gap:'1.25rem' }}>
          {approvedEvents.map((evt) => {
            const regs = hodEventRegistrations[evt.id] || [];
            return (
              <div
                key={evt.id}
                className="portal-card"
                style={{
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem'
                }}
              >
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'0.5rem' }}>
                  <span style={{ fontSize:'0.7rem', fontWeight:800, padding:'0.2rem 0.6rem', borderRadius:9999, background:'#ecfdf5', color:'#059669', border:'1px solid #a7f3d0' }}>
                    ✓ Approved & Live in Student Portal
                  </span>
                  <span style={{ fontSize:'0.7rem', fontWeight:600, color:'var(--slate-400)' }}>
                    {evt.category}
                  </span>
                </div>

                <div>
                  <h4 style={{ margin:'0 0 0.25rem', fontSize:'0.98rem', fontWeight:800, color:'var(--slate-800)' }}>
                    {evt.name}
                  </h4>
                  <p style={{ margin:0, fontSize:'0.78rem', color:'var(--slate-500)' }}>
                    {evt.date} · {evt.venue}
                  </p>
                </div>

                <p style={{ margin:0, fontSize:'0.8rem', color:'var(--slate-600)', lineHeight:1.4,
                  display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
                  {evt.shortDescription || evt.description}
                </p>

                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:'0.5rem', borderTop:'1px solid #f1f5f9' }}>
                  <span style={{ fontSize:'0.75rem', color:HOD_PURPLE, fontWeight:700 }}>
                    👥 {regs.length > 0 ? `${regs.length} student registrations` : 'Open for student RSVP'}
                  </span>
                  <button
                    onClick={() => setSelectedEvent(evt)}
                    style={{ padding:'0.4rem 0.8rem', borderRadius:8, background:HOD_PURPLE_LIGHT, border:`1px solid ${HOD_PURPLE_BORDER}`,
                      color:HOD_PURPLE, fontSize:'0.75rem', fontWeight:700, cursor:'pointer' }}
                  >
                    View Registrations
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL: CREATE NEW EVENT */}
      {showCreateModal && (
        <div style={{ position:'fixed', inset:0, background:'rgba(15,23,42,0.5)', zIndex:70,
          display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem' }}>
          <div style={{ background:'#fff', borderRadius:20, maxWidth:560, width:'100%', padding:'1.75rem',
            maxHeight:'90vh', overflowY:'auto' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.25rem' }}>
              <div>
                <h3 style={{ margin:0, fontSize:'1.2rem', fontWeight:800, color:'var(--slate-900)' }}>
                  Sanction New Department Event
                </h3>
                <p style={{ margin:'0.2rem 0 0', fontSize:'0.78rem', color:'var(--slate-500)' }}>
                  Once published, this event immediately appears on the Student Portal.
                </p>
              </div>
              <button onClick={() => setShowCreateModal(false)} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--slate-400)' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} style={{ display:'flex', flexDirection:'column', gap:'0.85rem' }}>
              <div>
                <label style={{ display:'block', fontSize:'0.78rem', fontWeight:700, color:'var(--slate-700)', marginBottom:'0.3rem' }}>
                  Event Name *
                </label>
                <input
                  required
                  placeholder="e.g. National Hackathon on Cloud Security"
                  value={formData.name}
                  onChange={e => setFormData(p => ({...p, name:e.target.value}))}
                  style={{ width:'100%', padding:'0.65rem', borderRadius:9, border:'1px solid #e2e8f0', fontSize:'0.88rem', boxSizing:'border-box' }}
                />
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem' }}>
                <div>
                  <label style={{ display:'block', fontSize:'0.78rem', fontWeight:700, color:'var(--slate-700)', marginBottom:'0.3rem' }}>
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData(p => ({...p, category:e.target.value}))}
                    style={{ width:'100%', padding:'0.65rem', borderRadius:9, border:'1px solid #e2e8f0', fontSize:'0.85rem', boxSizing:'border-box', background:'#fff' }}
                  >
                    <option>Technical</option>
                    <option>Hackathon</option>
                    <option>Workshop</option>
                    <option>Seminar</option>
                    <option>Coding</option>
                  </select>
                </div>
                <div>
                  <label style={{ display:'block', fontSize:'0.78rem', fontWeight:700, color:'var(--slate-700)', marginBottom:'0.3rem' }}>
                    Date *
                  </label>
                  <input
                    required
                    placeholder="e.g. Nov 28, 2026"
                    value={formData.date}
                    onChange={e => setFormData(p => ({...p, date:e.target.value}))}
                    style={{ width:'100%', padding:'0.65rem', borderRadius:9, border:'1px solid #e2e8f0', fontSize:'0.88rem', boxSizing:'border-box' }}
                  />
                </div>
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem' }}>
                <div>
                  <label style={{ display:'block', fontSize:'0.78rem', fontWeight:700, color:'var(--slate-700)', marginBottom:'0.3rem' }}>
                    Venue
                  </label>
                  <input
                    placeholder="e.g. K.S. Krishnan Auditorium"
                    value={formData.venue}
                    onChange={e => setFormData(p => ({...p, venue:e.target.value}))}
                    style={{ width:'100%', padding:'0.65rem', borderRadius:9, border:'1px solid #e2e8f0', fontSize:'0.88rem', boxSizing:'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display:'block', fontSize:'0.78rem', fontWeight:700, color:'var(--slate-700)', marginBottom:'0.3rem' }}>
                    Time
                  </label>
                  <input
                    placeholder="e.g. 09:30 AM - 04:30 PM"
                    value={formData.time}
                    onChange={e => setFormData(p => ({...p, time:e.target.value}))}
                    style={{ width:'100%', padding:'0.65rem', borderRadius:9, border:'1px solid #e2e8f0', fontSize:'0.88rem', boxSizing:'border-box' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display:'block', fontSize:'0.78rem', fontWeight:700, color:'var(--slate-700)', marginBottom:'0.3rem' }}>
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Details of the event..."
                  value={formData.description}
                  onChange={e => setFormData(p => ({...p, description:e.target.value}))}
                  style={{ width:'100%', padding:'0.65rem', borderRadius:9, border:'1px solid #e2e8f0', fontSize:'0.88rem', boxSizing:'border-box', fontFamily:'inherit' }}
                />
              </div>

              <div style={{ display:'flex', justifyContent:'flex-end', gap:'0.5rem', marginTop:'0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  style={{ padding:'0.6rem 1rem', borderRadius:8, background:'#f1f5f9', border:'none', fontSize:'0.82rem', fontWeight:600, cursor:'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding:'0.6rem 1.4rem', borderRadius:8, background:HOD_PURPLE, color:'#fff', border:'none', fontSize:'0.82rem', fontWeight:700, cursor:'pointer' }}
                >
                  Publish to Student Portal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: VIEW EVENT REGISTRATIONS */}
      {selectedEvent && (
        <div style={{ position:'fixed', inset:0, background:'rgba(15,23,42,0.5)', zIndex:70,
          display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem' }}>
          <div style={{ background:'#fff', borderRadius:20, maxWidth:580, width:'100%', padding:'1.75rem',
            maxHeight:'90vh', overflowY:'auto' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1.25rem' }}>
              <div>
                <h3 style={{ margin:0, fontSize:'1.15rem', fontWeight:800, color:'var(--slate-900)' }}>{selectedEvent.name}</h3>
                <p style={{ margin:'0.2rem 0 0', fontSize:'0.82rem', color:'var(--slate-500)' }}>
                  {selectedEvent.date} · {selectedEvent.venue}
                </p>
              </div>
              <button onClick={() => setSelectedEvent(null)} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--slate-400)' }}>
                <X size={20} />
              </button>
            </div>

            <h4 style={{ margin:'0 0 0.75rem', fontSize:'0.9rem', fontWeight:800, color:'var(--slate-800)' }}>
              Enrolled Students ({hodEventRegistrations[selectedEvent.id]?.length || 0})
            </h4>

            {hodEventRegistrations[selectedEvent.id]?.length > 0 ? (
              <table style={{ width:'100%', borderCollapse:'collapse' }}>
                <thead>
                  <tr style={{ background:'#f8fafc', borderBottom:'1px solid #e2e8f0' }}>
                    {['Name', 'Register No.', 'Year', 'Registered On'].map(h => (
                      <th key={h} style={{ padding:'0.55rem 0.75rem', textAlign:'left', fontSize:'0.7rem', fontWeight:700, color:'var(--slate-500)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hodEventRegistrations[selectedEvent.id].map((r, i) => (
                    <tr key={i} style={{ borderBottom:'1px solid #f1f5f9' }}>
                      <td style={{ padding:'0.65rem 0.75rem', fontSize:'0.82rem', fontWeight:600 }}>{r.name}</td>
                      <td style={{ padding:'0.65rem 0.75rem', fontSize:'0.8rem', color:'var(--slate-500)' }}>{r.reg}</td>
                      <td style={{ padding:'0.65rem 0.75rem', fontSize:'0.8rem' }}>{r.year}</td>
                      <td style={{ padding:'0.65rem 0.75rem', fontSize:'0.8rem', color:'var(--slate-400)' }}>{r.registeredAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p style={{ textAlign:'center', color:'var(--slate-400)', fontSize:'0.85rem', padding:'2rem 0' }}>
                No student enrollments yet for this event.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── ANNOUNCEMENTS (Cross-Portal: Broadcast to Both Student & Faculty) ──────
function HodAnnouncements() {
  const { announcements, sendHodAnnouncement, deleteHodAnnouncement } = usePortal();
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({
    title: '',
    content: '',
    priority: 'High',
    audience: 'All (Students & Faculty)',
    category: 'Department'
  });

  const handleBroadcast = (e) => {
    e.preventDefault();
    if (!form.title || !form.content) return;

    sendHodAnnouncement({
      title: form.title,
      content: form.content,
      priority: form.priority,
      audience: form.audience,
      category: form.category
    });

    setShowCreate(false);
    setForm({
      title: '',
      content: '',
      priority: 'High',
      audience: 'All (Students & Faculty)',
      category: 'Department'
    });
  };

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem' }}>
        <div>
          <h2 style={{ margin:0, fontSize:'1.25rem', fontWeight:800, color:'var(--slate-800)' }}>
            Department Announcements & Circulars
          </h2>
          <p style={{ margin:'0.2rem 0 0', fontSize:'0.82rem', color:'var(--slate-500)' }}>
            Broadcast real-time departmental circulars synchronized with both Student and Faculty portals
          </p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          style={{
            display:'flex', alignItems:'center', gap:'0.4rem',
            padding:'0.65rem 1.25rem', borderRadius:10, background:HOD_PURPLE, color:'#fff',
            border:'none', fontWeight:700, fontSize:'0.85rem', cursor:'pointer',
            boxShadow:'0 4px 12px rgba(124, 58, 237, 0.3)'
          }}
        >
          <Send size={16} /> Broadcast New Circular
        </button>
      </div>

      {/* Broadcast Creation Modal */}
      {showCreate && (
        <div style={{ position:'fixed', inset:0, background:'rgba(15,23,42,0.5)', zIndex:70,
          display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem' }}>
          <div style={{ background:'#fff', borderRadius:20, maxWidth:560, width:'100%', padding:'1.75rem',
            maxHeight:'90vh', overflowY:'auto' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.25rem' }}>
              <div>
                <h3 style={{ margin:0, fontSize:'1.2rem', fontWeight:800, color:'var(--slate-900)' }}>
                  Compose Department Circular
                </h3>
                <p style={{ margin:'0.2rem 0 0', fontSize:'0.78rem', color:'var(--slate-500)' }}>
                  This notice will be immediately broadcast to Student and Faculty logins.
                </p>
              </div>
              <button onClick={() => setShowCreate(false)} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--slate-400)' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleBroadcast} style={{ display:'flex', flexDirection:'column', gap:'0.85rem' }}>
              <div>
                <label style={{ display:'block', fontSize:'0.78rem', fontWeight:700, color:'var(--slate-700)', marginBottom:'0.3rem' }}>
                  Circular Title *
                </label>
                <input
                  required
                  placeholder="e.g. Schedule for Continuous Assessment Test 2 (CAT-2)"
                  value={form.title}
                  onChange={e => setForm(p => ({...p, title:e.target.value}))}
                  style={{ width:'100%', padding:'0.65rem', borderRadius:9, border:'1px solid #e2e8f0', fontSize:'0.88rem', boxSizing:'border-box' }}
                />
              </div>

              <div>
                <label style={{ display:'block', fontSize:'0.78rem', fontWeight:700, color:'var(--slate-700)', marginBottom:'0.3rem' }}>
                  Notice Content *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Enter full announcement text, instructions, and deadlines..."
                  value={form.content}
                  onChange={e => setForm(p => ({...p, content:e.target.value}))}
                  style={{ width:'100%', padding:'0.65rem', borderRadius:9, border:'1px solid #e2e8f0', fontSize:'0.88rem', boxSizing:'border-box', fontFamily:'inherit' }}
                />
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'0.75rem' }}>
                <div>
                  <label style={{ display:'block', fontSize:'0.78rem', fontWeight:700, color:'var(--slate-700)', marginBottom:'0.3rem' }}>
                    Target Audience
                  </label>
                  <select
                    value={form.audience}
                    onChange={e => setForm(p => ({...p, audience:e.target.value}))}
                    style={{ width:'100%', padding:'0.65rem', borderRadius:9, border:'1px solid #e2e8f0', fontSize:'0.82rem', boxSizing:'border-box', background:'#fff' }}
                  >
                    <option>All (Students & Faculty)</option>
                    <option>Students Only</option>
                    <option>Faculty Only</option>
                  </select>
                </div>

                <div>
                  <label style={{ display:'block', fontSize:'0.78rem', fontWeight:700, color:'var(--slate-700)', marginBottom:'0.3rem' }}>
                    Priority
                  </label>
                  <select
                    value={form.priority}
                    onChange={e => setForm(p => ({...p, priority:e.target.value}))}
                    style={{ width:'100%', padding:'0.65rem', borderRadius:9, border:'1px solid #e2e8f0', fontSize:'0.82rem', boxSizing:'border-box', background:'#fff' }}
                  >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>

                <div>
                  <label style={{ display:'block', fontSize:'0.78rem', fontWeight:700, color:'var(--slate-700)', marginBottom:'0.3rem' }}>
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={e => setForm(p => ({...p, category:e.target.value}))}
                    style={{ width:'100%', padding:'0.65rem', borderRadius:9, border:'1px solid #e2e8f0', fontSize:'0.82rem', boxSizing:'border-box', background:'#fff' }}
                  >
                    <option>Department</option>
                    <option>Examination</option>
                    <option>Academic</option>
                    <option>Event</option>
                  </select>
                </div>
              </div>

              <div style={{ display:'flex', justifyContent:'flex-end', gap:'0.5rem', marginTop:'0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setShowCreate(false)}
                  style={{ padding:'0.6rem 1rem', borderRadius:8, background:'#f1f5f9', border:'none', fontSize:'0.82rem', fontWeight:600, cursor:'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding:'0.6rem 1.4rem', borderRadius:8, background:HOD_PURPLE, color:'#fff', border:'none', fontSize:'0.82rem', fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:'0.4rem' }}
                >
                  <Send size={14} /> Send Broadcast
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Announcements List */}
      <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
        {announcements.map((ann) => (
          <div
            key={ann.id}
            className="portal-card"
            style={{
              padding:'1.5rem',
              display:'flex',
              flexDirection:'column',
              gap:'0.75rem',
              borderLeft: ann.priority === 'High' ? '4px solid #e11d48' : '4px solid #7c3aed'
            }}
          >
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'0.5rem' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
                {statusBadge(ann.priority || 'Normal')}
                <span style={{ fontSize:'0.72rem', fontWeight:700, padding:'0.2rem 0.6rem', borderRadius:9999, background:'#f1f5f9', color:'var(--slate-700)' }}>
                  {ann.category || 'Department'}
                </span>
                <span style={{ fontSize:'0.72rem', fontWeight:800, padding:'0.2rem 0.6rem', borderRadius:9999, background:'#e0e7ff', color:'#4338ca' }}>
                  Audience: {ann.audience || 'All (Students & Faculty)'}
                </span>
              </div>

              <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
                <span style={{ fontSize:'0.75rem', color:'var(--slate-400)' }}>
                  📅 {ann.date} {ann.time && `· ${ann.time}`}
                </span>
                <button
                  onClick={() => deleteHodAnnouncement(ann.id)}
                  style={{ background:'none', border:'none', color:'#dc2626', cursor:'pointer', padding:'0.25rem' }}
                  title="Delete Announcement"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <h3 style={{ margin:0, fontSize:'1.05rem', fontWeight:800, color:'var(--slate-900)' }}>
              {ann.title}
            </h3>

            <p style={{ margin:0, fontSize:'0.88rem', color:'var(--slate-600)', lineHeight:1.6 }}>
              {ann.content || ann.message}
            </p>

            <div style={{ paddingTop:'0.75rem', borderTop:'1px solid #f1f5f9', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <span style={{ fontSize:'0.75rem', color:'var(--slate-400)' }}>
                Issued by: <strong>{ann.author || 'Dr. P. Deepalakshmi'}</strong> (HOD, CSE)
              </span>
              <span style={{ fontSize:'0.72rem', color:'#059669', fontWeight:700 }}>
                ✓ Synced to Student & Faculty Portals
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── HOD PROFILE ──────────────────────────────────────────────────────────
function HodProfile({ hod }) {
  const [isChangingPass, setIsChangingPass] = useState(false);
  const [passData, setPassData] = useState({ current:'', newPass:'', confirm:'' });
  const [passSuccess, setPassSuccess] = useState(false);

  const handlePassSubmit = (e) => {
    e.preventDefault();
    if (passData.newPass !== passData.confirm) return;
    setPassSuccess(true);
    setTimeout(() => {
      setPassSuccess(false);
      setIsChangingPass(false);
      setPassData({ current:'', newPass:'', confirm:'' });
    }, 2000);
  };

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem', maxWidth:860 }}>
      <div>
        <h2 style={{ margin:0, fontSize:'1.25rem', fontWeight:800, color:'var(--slate-800)' }}>HOD Profile Information</h2>
        <p style={{ margin:'0.2rem 0 0', fontSize:'0.82rem', color:'var(--slate-500)' }}>Personal contact information and department administrative credentials</p>
      </div>

      <div className="portal-card" style={{ padding:'2rem' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'1.5rem', marginBottom:'1.5rem', flexWrap:'wrap' }}>
          <div style={{ width:76, height:76, borderRadius:20, background:'linear-gradient(135deg, #a78bfa, #7c3aed)',
            display:'flex', alignItems:'center', justifyContent:'center', fontSize:'2.2rem', fontWeight:900, color:'#fff' }}>
            {hod.name.charAt(0)}
          </div>
          <div>
            <h3 style={{ margin:0, fontSize:'1.35rem', fontWeight:800, color:'var(--slate-900)' }}>{hod.name}</h3>
            <p style={{ margin:'0.2rem 0 0', fontSize:'0.85rem', color:HOD_PURPLE, fontWeight:700 }}>
              {hod.designation}
            </p>
            <p style={{ margin:'0.2rem 0 0', fontSize:'0.8rem', color:'var(--slate-500)' }}>
              {hod.department} · {hod.office}
            </p>
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))', gap:'1.25rem' }}>
          {[
            ['HOD ID', hod.hodId],
            ['Department', hod.department],
            ['Official Email', hod.email],
            ['Contact Number', hod.phone],
            ['Qualification', hod.qualification],
            ['Specialization', hod.specialization],
            ['Total Experience', hod.experience],
            ['Cabin Location', hod.office],
          ].map(([k,v]) => (
            <div key={k} style={{ padding:'0.85rem 1rem', borderRadius:12, background:'#f8fafc', border:'1px solid #e2e8f0' }}>
              <span style={{ fontSize:'0.72rem', color:'var(--slate-400)', fontWeight:700, textTransform:'uppercase' }}>{k}</span>
              <p style={{ margin:'0.25rem 0 0', fontSize:'0.9rem', fontWeight:700, color:'var(--slate-800)' }}>{v}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop:'2rem', paddingTop:'1.5rem', borderTop:'1px solid #f1f5f9' }}>
          <button
            onClick={() => setIsChangingPass(!isChangingPass)}
            style={{ padding:'0.65rem 1.25rem', borderRadius:10, background: isChangingPass ? '#f1f5f9' : HOD_PURPLE,
              color: isChangingPass ? 'var(--slate-700)' : '#fff', border:'none', fontSize:'0.85rem', fontWeight:700, cursor:'pointer' }}
          >
            {isChangingPass ? 'Cancel Password Change' : 'Change Password'}
          </button>

          {isChangingPass && (
            <form onSubmit={handlePassSubmit} style={{ marginTop:'1.25rem', maxWidth:400, display:'flex', flexDirection:'column', gap:'0.75rem' }}>
              {passSuccess && (
                <div style={{ padding:'0.75rem', borderRadius:8, background:'#ecfdf5', color:'#059669', fontSize:'0.8rem', fontWeight:700 }}>
                  ✓ Password changed successfully!
                </div>
              )}
              <div>
                <label style={{ display:'block', fontSize:'0.78rem', fontWeight:700, color:'var(--slate-600)', marginBottom:'0.3rem' }}>Current Password</label>
                <input required type="password" value={passData.current} onChange={e => setPassData(p => ({...p, current:e.target.value}))}
                  style={{ width:'100%', padding:'0.6rem', borderRadius:8, border:'1px solid #e2e8f0', fontSize:'0.88rem', boxSizing:'border-box' }} />
              </div>
              <div>
                <label style={{ display:'block', fontSize:'0.78rem', fontWeight:700, color:'var(--slate-600)', marginBottom:'0.3rem' }}>New Password</label>
                <input required type="password" value={passData.newPass} onChange={e => setPassData(p => ({...p, newPass:e.target.value}))}
                  style={{ width:'100%', padding:'0.6rem', borderRadius:8, border:'1px solid #e2e8f0', fontSize:'0.88rem', boxSizing:'border-box' }} />
              </div>
              <div>
                <label style={{ display:'block', fontSize:'0.78rem', fontWeight:700, color:'var(--slate-600)', marginBottom:'0.3rem' }}>Confirm New Password</label>
                <input required type="password" value={passData.confirm} onChange={e => setPassData(p => ({...p, confirm:e.target.value}))}
                  style={{ width:'100%', padding:'0.6rem', borderRadius:8, border:'1px solid #e2e8f0', fontSize:'0.88rem', boxSizing:'border-box' }} />
              </div>
              <button type="submit" style={{ padding:'0.65rem', borderRadius:8, background:HOD_PURPLE, color:'#fff', border:'none', fontSize:'0.82rem', fontWeight:700, cursor:'pointer' }}>
                Update Password
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── SETTINGS ─────────────────────────────────────────────────────────────
function HodSettings() {
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [eventAlerts, setEventAlerts] = useState(true);

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem', maxWidth:760 }}>
      <div>
        <h2 style={{ margin:0, fontSize:'1.25rem', fontWeight:800, color:'var(--slate-800)' }}>HOD Portal Settings</h2>
        <p style={{ margin:'0.2rem 0 0', fontSize:'0.82rem', color:'var(--slate-500)' }}>Notification preferences and security options</p>
      </div>

      <div className="portal-card" style={{ padding:'1.75rem', display:'flex', flexDirection:'column', gap:'1.25rem' }}>
        <h3 style={{ margin:0, fontSize:'1rem', fontWeight:800, color:'var(--slate-800)' }}>Notification Configuration</h3>
        
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0.75rem 0', borderBottom:'1px solid #f1f5f9' }}>
          <div>
            <p style={{ margin:0, fontSize:'0.88rem', fontWeight:700, color:'var(--slate-800)' }}>Email Alerts for Event Proposals</p>
            <p style={{ margin:'0.2rem 0 0', fontSize:'0.75rem', color:'var(--slate-500)' }}>Receive immediate email when student clubs submit events</p>
          </div>
          <input type="checkbox" checked={eventAlerts} onChange={e => setEventAlerts(e.target.checked)} style={{ width:18, height:18 }} />
        </div>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0.75rem 0', borderBottom:'1px solid #f1f5f9' }}>
          <div>
            <p style={{ margin:0, fontSize:'0.88rem', fontWeight:700, color:'var(--slate-800)' }}>Auto-broadcast Confirmations</p>
            <p style={{ margin:'0.2rem 0 0', fontSize:'0.75rem', color:'var(--slate-500)' }}>Show confirmation alerts when circulars are dispatched</p>
          </div>
          <input type="checkbox" checked={notifyEmail} onChange={e => setNotifyEmail(e.target.checked)} style={{ width:18, height:18 }} />
        </div>

        <div style={{ paddingTop:'0.5rem' }}>
          <span style={{ fontSize:'0.75rem', color:'#059669', fontWeight:700 }}>✓ Settings automatically synced</span>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN HOD DASHBOARD PAGE ──────────────────────────────────────────────
export default function HodDashboardPage() {
  const { currentUser, logout } = useAuth();
  const { navigate } = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/login'); };

  const hod = {
    ...hodInfo,
    name: currentUser?.name || hodInfo.name,
    hodId: currentUser?.hodId || hodInfo.hodId,
    department: currentUser?.department || hodInfo.department,
    designation: currentUser?.designation || 'Professor & Head of Department',
  };

  const getTitle = () => NAV_ITEMS.find(n => n.id === activeTab)?.label || 'Dashboard';

  const renderContent = () => {
    switch (activeTab) {
      case 'faculty':       return <HodFacultySection />;
      case 'performance':   return <HodAcademicPerformance />;
      case 'events':        return <HodEventsSection />;
      case 'announcements': return <HodAnnouncements />;
      case 'profile':       return <HodProfile hod={hod} />;
      case 'settings':      return <HodSettings />;
      default:              return <HodHome setActive={setActiveTab} />;
    }
  };

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#f1f5f9' }}>
      <HodSidebar
        active={activeTab} setActive={setActiveTab}
        sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}
        onLogout={handleLogout} hod={hod}
      />

      {/* Main Content Area */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', marginLeft:255,
        transition:'margin-left 0.25s ease', minWidth:0 }}
        className="hod-main">

        {/* Top Header Bar */}
        <header style={{ position:'sticky', top:0, zIndex:40, background:'#ffffff',
          borderBottom:'1px solid #e2e8f0', padding:'0 1.75rem',
          height:66, display:'flex', alignItems:'center', justifyContent:'space-between',
          boxShadow:'0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
            <button onClick={() => setSidebarOpen(true)} className="hod-hamburger"
              style={{ background:'none', border:'none', cursor:'pointer', padding:'0.4rem',
                color:'var(--slate-500)', display:'none' }}>
              <Menu size={22} />
            </button>
            <div>
              <p style={{ margin:0, fontSize:'0.72rem', fontWeight:600, color:'var(--slate-400)',
                textTransform:'uppercase', letterSpacing:'0.05em' }}>HOD Portal</p>
              <h2 style={{ margin:0, fontSize:'1.05rem', fontWeight:800, color:'var(--slate-900)', lineHeight:1.2 }}>{getTitle()}</h2>
            </div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
            <button
              onClick={() => navigate('/student/dashboard')}
              style={{
                display:'flex', alignItems:'center', gap:'0.35rem',
                padding:'0.45rem 0.85rem', borderRadius:8, background:'#eff6ff',
                border:'1px solid #bfdbfe', color:'#1d4ed8', fontSize:'0.78rem',
                fontWeight:700, cursor:'pointer', transition:'background 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.background='#dbeafe'}
              onMouseLeave={e => e.currentTarget.style.background='#eff6ff'}
              title="Open Student Portal"
            >
              <span>Student Portal</span>
              <span style={{ fontSize:'0.85rem' }}>↗</span>
            </button>
            <div style={{ textAlign:'right', display:'flex', flexDirection:'column' }}>
              <span style={{ fontSize:'0.85rem', fontWeight:700, color:'var(--slate-800)' }}>{hod.name}</span>
              <span style={{ fontSize:'0.72rem', color:'var(--slate-500)' }}>{hod.department}</span>
            </div>
            <div style={{ width:38, height:38, borderRadius:10, background:'linear-gradient(135deg,#a78bfa,#7c3aed)',
              display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1rem', fontWeight:800, color:'#fff' }}>
              {hod.name.charAt(0)}
            </div>
            <button onClick={handleLogout} style={{ display:'flex', alignItems:'center', gap:'0.4rem',
              padding:'0.5rem 1rem', borderRadius:9, background:'#fff1f2',
              border:'1px solid #fecdd3', color:'#dc2626', fontSize:'0.83rem',
              fontWeight:700, cursor:'pointer', transition:'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background='#fecdd3'}
              onMouseLeave={e => e.currentTarget.style.background='#fff1f2'}>
              <LogOut size={15} /> Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex:1, padding:'1.75rem 2rem 3rem', maxWidth:1300, width:'100%', margin:'0 auto' }}>
          {renderContent()}
        </main>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .hod-main { margin-left: 0 !important; }
          .hod-hamburger { display: flex !important; }
        }
        @media (max-width: 640px) {
          .hod-main main { padding: 1.25rem 1rem 3rem !important; }
        }
      `}</style>
    </div>
  );
}
