import React from 'react';
import {
  User,
  Bell,
  Calendar,
  CalendarCheck,
  ClipboardList,
  ArrowRight,
  Clock,
  MapPin,
  Users,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  BookOpen,
  FileText,
  CalendarOff,
  Megaphone
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usePortal } from '../context/PortalContext';
import { useRouter } from '../router';

export default function StudentDashboardPage() {
  const { studentProfile } = useAuth();
  const {
    events,
    notifications,
    activityLog,
    openEventModal,
    toggleEventRegistration,
    markNotificationAsRead,
    unreadNotificationsCount,
    assignments,
    leaves,
    announcements
  } = usePortal();
  const { navigate } = useRouter();

  const registeredEvents = events.filter((e) => e.registered);
  const upcomingEvents = events.filter((e) => e.status === 'Upcoming' && e.approved !== false && e.approvalStatus !== 'Pending Approval' && e.approvalStatus !== 'Rejected').slice(0, 3);
  const recentNotifications = notifications.slice(0, 4);
  const recentActivities = activityLog.slice(0, 4);

  const pendingAssignmentsCount = (assignments || []).filter(a => a.status === 'Pending').length;
  const myLeaves = (leaves || []).filter(l => l.reg === studentProfile?.registerNumber || l.student === studentProfile?.name);
  const pendingLeavesCount = myLeaves.filter(l => l.status === 'Pending').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Welcome Banner Card */}
      <div
        style={{
          background: 'linear-gradient(135deg, var(--primary-900) 0%, var(--primary-800) 50%, var(--primary-700) 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem 2.25rem',
          color: '#ffffff',
          boxShadow: 'var(--shadow-lg)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Decorative elements */}
        <div
          style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '240px',
            height: '240px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(241,162,8,0.2) 0%, transparent 70%)',
            pointerEvents: 'none'
          }}
        />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                background: 'rgba(241, 162, 8, 0.2)',
                color: '#fde68a',
                border: '1px solid rgba(241, 162, 8, 0.4)',
                padding: '0.2rem 0.65rem',
                borderRadius: '9999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <Sparkles size={13} />
              Kalasalingam University – Smart Campus
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>
            Hi 👋 {studentProfile.name}!
          </h1>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.25rem',
              marginTop: '1.25rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.15)',
              fontSize: '0.88rem'
            }}
          >
            <div>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.78rem', display: 'block' }}>Register No:</span>
              <strong style={{ color: '#ffffff', fontWeight: 700 }}>{studentProfile.registerNumber}</strong>
            </div>

            <div>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.78rem', display: 'block' }}>Department:</span>
              <strong style={{ color: '#ffffff', fontWeight: 600 }}>{studentProfile.department}</strong>
            </div>

            <div>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.78rem', display: 'block' }}>Year:</span>
              <strong style={{ color: '#ffffff', fontWeight: 600 }}>{studentProfile.year}</strong>
            </div>

            <div>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.78rem', display: 'block' }}>Semester:</span>
              <strong style={{ color: '#ffffff', fontWeight: 600 }}>{studentProfile.semester}</strong>
            </div>

            <div>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.78rem', display: 'block' }}>CGPA:</span>
              <strong style={{ color: '#fef08a', fontWeight: 700 }}>{studentProfile.cgpa} / 10.0</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Official HOD Announcement Live Banner & Direct Link */}
      {announcements && announcements.length > 0 && (
        <div
          onClick={() => navigate('/student/announcements')}
          style={{
            background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #4338ca 100%)',
            borderRadius: 'var(--radius-lg)',
            padding: '1rem 1.4rem',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 4px 15px rgba(49, 46, 129, 0.2)',
            cursor: 'pointer',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            transition: 'all 0.2s ease',
            flexWrap: 'wrap',
            gap: '0.85rem'
          }}
          className="hover-card"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.18)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#c7d2fe',
                flexShrink: 0
              }}
            >
              <Megaphone size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2px' }}>
                <span
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    background: '#6366f1',
                    color: '#ffffff',
                    padding: '0.12rem 0.5rem',
                    borderRadius: '4px'
                  }}
                >
                  Latest HOD Notice
                </span>
                <span style={{ fontSize: '0.74rem', color: '#c7d2fe' }}>
                  {announcements[0]?.date || 'Circular'} · {announcements[0]?.author || 'HOD CSE'}
                </span>
              </div>
              <h4 style={{ margin: 0, fontSize: '0.92rem', fontWeight: 700, color: '#ffffff' }}>
                {announcements[0]?.title}
              </h4>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: '#c7d2fe',
              fontSize: '0.82rem',
              fontWeight: 700,
              background: 'rgba(255, 255, 255, 0.12)',
              padding: '0.45rem 0.85rem',
              borderRadius: '8px'
            }}
          >
            <span>Read All Announcements ({announcements.length})</span>
            <ArrowRight size={15} />
          </div>
        </div>
      )}

      {/* Summary Cards: My Profile, Notifications, Announcements, Upcoming Events, My Events, My Activity */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--slate-800)', margin: 0 }}>
            Quick Overview
          </h2>
          <span style={{ fontSize: '0.78rem', color: 'var(--slate-400)', fontWeight: 500 }}>
            Role: Active Student
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.25rem'
          }}
        >
          {/* Card 1: My Profile */}
          <div
            onClick={() => navigate('/student/profile')}
            style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--slate-200)',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-sm)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            className="hover-card"
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'var(--primary-50)',
                  border: '1px solid var(--primary-100)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary-600)'
                }}
              >
                <User size={22} />
              </div>
              <ArrowRight size={16} color="var(--slate-400)" />
            </div>
            <div style={{ marginTop: '1rem' }}>
              <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--slate-800)', margin: 0 }}>
                My Profile
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--slate-500)', margin: '4px 0 0' }}>
                {studentProfile.program} · Sec {studentProfile.section}
              </p>
            </div>
          </div>

          {/* Card 2: Notifications */}
          <div
            onClick={() => navigate('/student/notifications')}
            style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--slate-200)',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-sm)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            className="hover-card"
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: '#fef3c7',
                  border: '1px solid #fde68a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#d97706'
                }}
              >
                <Bell size={22} />
              </div>
              {unreadNotificationsCount > 0 && (
                <span
                  style={{
                    background: 'var(--rose-500)',
                    color: '#ffffff',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '0.15rem 0.55rem',
                    borderRadius: '9999px'
                  }}
                >
                  {unreadNotificationsCount} Unread
                </span>
              )}
            </div>
            <div style={{ marginTop: '1rem' }}>
              <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--slate-800)', margin: 0 }}>
                Notifications
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--slate-500)', margin: '4px 0 0' }}>
                {notifications.length} Total Alerts
              </p>
            </div>
          </div>

          {/* Card 3: Announcements (Direct Link) */}
          <div
            onClick={() => navigate('/student/announcements')}
            style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--slate-200)',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-sm)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            className="hover-card"
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: '#e0e7ff',
                  border: '1px solid #c7d2fe',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#4338ca'
                }}
              >
                <Megaphone size={22} />
              </div>
              <span
                style={{
                  background: '#e0e7ff',
                  color: '#4338ca',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '0.15rem 0.55rem',
                  borderRadius: '9999px',
                  border: '1px solid #c7d2fe'
                }}
              >
                {(announcements || []).length} Active
              </span>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--slate-800)', margin: 0 }}>
                Announcements
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--slate-500)', margin: '4px 0 0' }}>
                HOD circulars & university notices
              </p>
            </div>
          </div>

          {/* Card 3: Upcoming Events */}
          <div
            onClick={() => navigate('/student/events')}
            style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--slate-200)',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-sm)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            className="hover-card"
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: '#ecfdf5',
                  border: '1px solid #a7f3d0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#059669'
                }}
              >
                <Calendar size={22} />
              </div>
              <ArrowRight size={16} color="var(--slate-400)" />
            </div>
            <div style={{ marginTop: '1rem' }}>
              <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--slate-800)', margin: 0 }}>
                Upcoming Events
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--slate-500)', margin: '4px 0 0' }}>
                {events.filter((e) => e.status === 'Upcoming').length} Active & Scheduled
              </p>
            </div>
          </div>

          {/* Card 4: My Events */}
          <div
            onClick={() => navigate('/student/activity')}
            style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--slate-200)',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-sm)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            className="hover-card"
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: '#f5f3ff',
                  border: '1px solid #ddd6fe',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#7c3aed'
                }}
              >
                <CalendarCheck size={22} />
              </div>
              <span
                style={{
                  background: '#f5f3ff',
                  color: '#7c3aed',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '0.15rem 0.55rem',
                  borderRadius: '9999px',
                  border: '1px solid #ddd6fe'
                }}
              >
                {registeredEvents.length} Enrolled
              </span>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--slate-800)', margin: 0 }}>
                My Events
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--slate-500)', margin: '4px 0 0' }}>
                {registeredEvents.length > 0 ? `${registeredEvents.length} Confirmed Registrations` : 'No events registered yet'}
              </p>
            </div>
          </div>

          {/* Card 5: My Activity */}
          <div
            onClick={() => navigate('/student/activity')}
            style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--slate-200)',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-sm)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            className="hover-card"
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary-600)'
                }}
              >
                <ClipboardList size={22} />
              </div>
              <ArrowRight size={16} color="var(--slate-400)" />
            </div>
            <div style={{ marginTop: '1rem' }}>
              <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--slate-800)', margin: 0 }}>
                My Activity
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--slate-500)', margin: '4px 0 0' }}>
                {activityLog.length} Recorded Actions
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Academic Hub & Quick Actions */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--slate-800)', margin: 0 }}>
            Academic Services & Portals
          </h2>
          <span style={{ fontSize: '0.78rem', color: 'var(--slate-400)', fontWeight: 500 }}>
            Quick Access
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem'
          }}
        >
          {/* Module 1: My Subjects */}
          <div
            onClick={() => navigate('/student/subjects')}
            style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--slate-200)',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-sm)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            className="hover-card"
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: '#f5f3ff',
                  border: '1px solid #ddd6fe',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#7c3aed'
                }}
              >
                <BookOpen size={22} />
              </div>
              <ArrowRight size={16} color="var(--slate-400)" />
            </div>
            <div style={{ marginTop: '1rem' }}>
              <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--slate-800)', margin: 0 }}>
                My Subjects
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--slate-500)', margin: '4px 0 0' }}>
                4 Core Enrolled Courses · DL, CN, OS, DAA
              </p>
            </div>
          </div>

          {/* Module 2: Timetable */}
          <div
            onClick={() => navigate('/student/timetable')}
            style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--slate-200)',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-sm)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            className="hover-card"
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#2563eb'
                }}
              >
                <Clock size={22} />
              </div>
              <ArrowRight size={16} color="var(--slate-400)" />
            </div>
            <div style={{ marginTop: '1rem' }}>
              <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--slate-800)', margin: 0 }}>
                Class Timetable
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--slate-500)', margin: '4px 0 0' }}>
                Semester 5 · Section B · Weekly Schedule
              </p>
            </div>
          </div>

          {/* Module 3: Assignments */}
          <div
            onClick={() => navigate('/student/assignments')}
            style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--slate-200)',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-sm)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            className="hover-card"
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: '#fff7ed',
                  border: '1px solid #fed7aa',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#c2410c'
                }}
              >
                <FileText size={22} />
              </div>
              {pendingAssignmentsCount > 0 && (
                <span
                  style={{
                    background: '#fef2f2',
                    color: '#dc2626',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '0.15rem 0.55rem',
                    borderRadius: '9999px',
                    border: '1px solid #fecaca'
                  }}
                >
                  {pendingAssignmentsCount} Due
                </span>
              )}
            </div>
            <div style={{ marginTop: '1rem' }}>
              <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--slate-800)', margin: 0 }}>
                Assignments
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--slate-500)', margin: '4px 0 0' }}>
                Submit tasks & view faculty deadlines
              </p>
            </div>
          </div>

          {/* Module 4: Leave Apply */}
          <div
            onClick={() => navigate('/student/leave')}
            style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--slate-200)',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-sm)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            className="hover-card"
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: '#ecfdf5',
                  border: '1px solid #a7f3d0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#059669'
                }}
              >
                <CalendarOff size={22} />
              </div>
              {pendingLeavesCount > 0 ? (
                <span
                  style={{
                    background: '#fffbeb',
                    color: '#b45309',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '0.15rem 0.55rem',
                    borderRadius: '9999px',
                    border: '1px solid #fde68a'
                  }}
                >
                  {pendingLeavesCount} Pending
                </span>
              ) : (
                <ArrowRight size={16} color="var(--slate-400)" />
              )}
            </div>
            <div style={{ marginTop: '1rem' }}>
              <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--slate-800)', margin: 0 }}>
                Leave Application
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--slate-500)', margin: '4px 0 0' }}>
                Apply leave & synced advisor approval
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Section: Upcoming Events + Recent Notifications & Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem' }}>
        {/* Left Column: Upcoming Campus Events */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--slate-800)', margin: 0 }}>
              Upcoming Events
            </h2>
            <button
              onClick={() => navigate('/student/events')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary-600)',
                fontSize: '0.85rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                cursor: 'pointer'
              }}
            >
              <span>View All</span>
              <ChevronRight size={16} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {upcomingEvents.map((evt) => (
              <div
                key={evt.id}
                style={{
                  background: '#ffffff',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--slate-200)',
                  boxShadow: 'var(--shadow-sm)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.2s ease'
                }}
                className="hover-card"
              >
                {/* Event Image Banner */}
                <div style={{ position: 'relative', height: '140px', width: '100%' }}>
                  <img
                    src={evt.image}
                    alt={evt.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '0.75rem',
                      left: '0.75rem',
                      display: 'flex',
                      gap: '0.4rem'
                    }}
                  >
                    <span className="uni-pill primary" style={{ background: 'var(--secondary-500)', color: '#000', fontWeight: 700, fontSize: '0.7rem' }}>
                      {evt.category}
                    </span>
                    {evt.registered && (
                      <span className="uni-pill success" style={{ fontWeight: 700, fontSize: '0.7rem' }}>
                        ✓ Registered
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--slate-900)', margin: 0, lineHeight: 1.3 }}>
                      {evt.name}
                    </h3>
                    <p style={{ fontSize: '0.82rem', color: 'var(--slate-500)', margin: '0.4rem 0 0', lineHeight: 1.4 }}>
                      {evt.description}
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.78rem', color: 'var(--slate-600)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Clock size={14} color="var(--primary-600)" />
                      <span>{evt.date}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <MapPin size={14} color="var(--primary-600)" />
                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{evt.venue}</span>
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: 'auto',
                      paddingTop: '0.75rem',
                      borderTop: '1px solid var(--slate-100)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}
                  >
                    <button
                      onClick={() => openEventModal(evt)}
                      className="uni-btn outline"
                      style={{ flex: 1, padding: '0.5rem', fontSize: '0.82rem' }}
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => toggleEventRegistration(evt.id)}
                      className={`uni-btn ${evt.registered ? 'danger' : 'primary'}`}
                      style={{ flex: 1, padding: '0.5rem', fontSize: '0.82rem' }}
                    >
                      {evt.registered ? 'Cancel' : 'Register'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Recent Notifications + My Activity Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Recent Notifications Widget */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--slate-200)',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Bell size={18} color="var(--primary-600)" />
                <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--slate-800)', margin: 0 }}>
                  Recent Notifications
                </h2>
              </div>
              <button
                onClick={() => navigate('/student/notifications')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--primary-600)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                View All
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {recentNotifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => {
                    markNotificationAsRead(notif.id);
                    navigate('/student/notifications');
                  }}
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    background: notif.read ? 'var(--slate-50)' : '#f0f9ff',
                    border: notif.read ? '1px solid var(--slate-200)' : '1px solid #bae6fd',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span
                      style={{
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: 'var(--primary-700)',
                        letterSpacing: '0.04em'
                      }}
                    >
                      {notif.category}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--slate-400)' }}>
                      {notif.date} · {notif.time}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '0.88rem', fontWeight: notif.read ? 600 : 700, color: 'var(--slate-800)', margin: 0 }}>
                    {notif.title}
                  </h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--slate-600)', margin: '0.25rem 0 0', lineHeight: 1.4 }}>
                    {notif.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* My Recent Activity Timeline */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--slate-200)',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ClipboardList size={18} color="var(--primary-600)" />
                <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--slate-800)', margin: 0 }}>
                  My Recent Activity
                </h2>
              </div>
              <button
                onClick={() => navigate('/student/activity')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--primary-600)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                View Timeline
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {recentActivities.map((act, index) => (
                <div key={act.id || index} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'var(--primary-50)',
                      border: '1px solid var(--primary-200)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--primary-600)',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}
                  >
                    <CheckCircle2 size={16} />
                  </div>
                  <div style={{ flex: 1, borderBottom: index < recentActivities.length - 1 ? '1px solid var(--slate-100)' : 'none', paddingBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--slate-800)', margin: 0 }}>
                        {act.action}
                      </p>
                      <span style={{ fontSize: '0.72rem', color: 'var(--slate-400)' }}>{act.timestamp}</span>
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--slate-600)', margin: '0.2rem 0 0' }}>
                      {act.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hover-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
          border-color: var(--slate-300);
        }
      `}</style>
    </div>
  );
}
