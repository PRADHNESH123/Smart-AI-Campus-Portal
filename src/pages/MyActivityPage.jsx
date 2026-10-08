import React, { useState } from 'react';
import {
  CalendarCheck,
  Clock,
  MapPin,
  Calendar,
  CheckCircle2,
  Bell,
  ArrowRight,
  ClipboardList,
  Sparkles,
  History,
  X,
  Eye
} from 'lucide-react';
import { usePortal } from '../context/PortalContext';
import { useRouter } from '../router';

export default function MyActivityPage() {
  const { events, activityLog, notifications, toggleEventRegistration, openEventModal } = usePortal();
  const { navigate } = useRouter();

  const [activeTab, setActiveTab] = useState('registered'); // 'registered' | 'timeline' | 'notifications'

  // Partition registered events into Upcoming and Completed
  const myRegisteredEvents = events.filter((e) => e.registered);
  const upcomingRegistered = myRegisteredEvents.filter((e) => e.status === 'Upcoming' || e.status === 'Ongoing');
  const completedRegistered = myRegisteredEvents.filter((e) => e.status === 'Past');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Top Banner */}
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
          gap: '1.25rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: 'var(--primary-50)',
              border: '1px solid var(--primary-100)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary-600)'
            }}
          >
            <ClipboardList size={22} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--slate-900)', margin: 0 }}>
              Student Activity & My Events
            </h1>
            <p style={{ fontSize: '0.82rem', color: 'var(--slate-500)', margin: '2px 0 0' }}>
              Track your confirmed event registrations, attendance milestones, and campus activity logs.
            </p>
          </div>
        </div>

        {/* Tab switchers */}
        <div style={{ display: 'flex', background: 'var(--slate-100)', padding: '0.25rem', borderRadius: 'var(--radius-lg)' }}>
          <button
            onClick={() => setActiveTab('registered')}
            style={{
              padding: '0.5rem 1.1rem',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              fontSize: '0.85rem',
              fontWeight: activeTab === 'registered' ? 700 : 500,
              color: activeTab === 'registered' ? 'var(--primary-700)' : 'var(--slate-600)',
              background: activeTab === 'registered' ? '#ffffff' : 'transparent',
              boxShadow: activeTab === 'registered' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <CalendarCheck size={16} />
            <span>My Events ({myRegisteredEvents.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('timeline')}
            style={{
              padding: '0.5rem 1.1rem',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              fontSize: '0.85rem',
              fontWeight: activeTab === 'timeline' ? 700 : 500,
              color: activeTab === 'timeline' ? 'var(--primary-700)' : 'var(--slate-600)',
              background: activeTab === 'timeline' ? '#ffffff' : 'transparent',
              boxShadow: activeTab === 'timeline' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <History size={16} />
            <span>Activity Timeline</span>
          </button>
        </div>
      </div>

      {/* Tab 1: My Registered Events (Upcoming and Completed) */}
      {activeTab === 'registered' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Section: Upcoming Registered Events */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CalendarCheck size={18} color="var(--primary-600)" />
                <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--slate-800)', margin: 0 }}>
                  Upcoming Enrolled Events
                </h2>
              </div>
              <span style={{ fontSize: '0.78rem', color: 'var(--slate-500)', fontWeight: 600 }}>
                {upcomingRegistered.length} Active Reservations
              </span>
            </div>

            {upcomingRegistered.length === 0 ? (
              <div
                style={{
                  background: '#ffffff',
                  borderRadius: 'var(--radius-xl)',
                  padding: '2.5rem',
                  textAlign: 'center',
                  border: '1px dashed var(--slate-300)'
                }}
              >
                <Calendar size={36} color="var(--slate-300)" style={{ margin: '0 auto 0.5rem' }} />
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--slate-700)', margin: 0 }}>
                  No upcoming event registrations
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--slate-500)', marginTop: '0.35rem' }}>
                  Browse our active events catalog and secure your seat for campus symposia.
                </p>
                <button
                  onClick={() => navigate('/student/events')}
                  className="uni-btn primary"
                  style={{ marginTop: '1rem', padding: '0.55rem 1.25rem', fontSize: '0.85rem' }}
                >
                  Explore Events
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '1.25rem'
                }}
              >
                {upcomingRegistered.map((evt) => (
                  <div
                    key={evt.id}
                    style={{
                      background: '#ffffff',
                      borderRadius: 'var(--radius-xl)',
                      border: '1px solid var(--slate-200)',
                      padding: '1.25rem',
                      boxShadow: 'var(--shadow-sm)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.85rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
                      <span className="uni-pill primary" style={{ fontSize: '0.7rem' }}>
                        {evt.category}
                      </span>
                      <span className="uni-pill success" style={{ fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <CheckCircle2 size={12} />
                        Confirmed
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--slate-900)', margin: 0 }}>
                      {evt.name}
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--slate-600)', background: 'var(--slate-50)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Clock size={14} color="var(--primary-600)" />
                        <span>{evt.date} · {evt.time}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <MapPin size={14} color="var(--primary-600)" />
                        <span>{evt.venue}</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto', paddingTop: '0.5rem', borderTop: '1px solid var(--slate-100)' }}>
                      <button
                        onClick={() => openEventModal(evt)}
                        className="uni-btn outline"
                        style={{ flex: 1, padding: '0.45rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}
                      >
                        <Eye size={14} />
                        <span>Details</span>
                      </button>
                      <button
                        onClick={() => toggleEventRegistration(evt.id)}
                        className="uni-btn danger"
                        style={{ flex: 1, padding: '0.45rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}
                      >
                        <X size={14} />
                        <span>Cancel</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section: Completed Registered Events */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={18} color="#16a34a" />
                <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--slate-800)', margin: 0 }}>
                  Completed Events
                </h2>
              </div>
              <span style={{ fontSize: '0.78rem', color: 'var(--slate-500)', fontWeight: 600 }}>
                {completedRegistered.length} Attended
              </span>
            </div>

            {completedRegistered.length === 0 ? (
              <div
                style={{
                  background: 'var(--slate-50)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '1.75rem',
                  textAlign: 'center',
                  border: '1px solid var(--slate-200)',
                  color: 'var(--slate-500)',
                  fontSize: '0.85rem'
                }}
              >
                No completed events in your archive yet. Completed events will appear here once the schedule passes.
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '1.25rem'
                }}
              >
                {completedRegistered.map((evt) => (
                  <div
                    key={evt.id}
                    style={{
                      background: '#ffffff',
                      borderRadius: 'var(--radius-xl)',
                      border: '1px solid var(--slate-200)',
                      padding: '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span className="uni-pill neutral" style={{ fontSize: '0.7rem' }}>
                        {evt.category}
                      </span>
                      <span className="uni-pill success" style={{ fontSize: '0.7rem' }}>
                        Attended
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--slate-800)', margin: 0 }}>
                      {evt.name}
                    </h3>

                    <p style={{ fontSize: '0.78rem', color: 'var(--slate-500)', margin: 0 }}>
                      Venue: {evt.venue} · Date: {evt.date}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Activity Timeline */}
      {activeTab === 'timeline' && (
        <div
          style={{
            background: '#ffffff',
            borderRadius: 'var(--radius-xl)',
            padding: '2rem',
            border: '1px solid var(--slate-200)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <History size={20} color="var(--primary-600)" />
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--slate-800)', margin: 0 }}>
              Recent Student Activity Log
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
            {/* Vertical timeline bar */}
            <div
              style={{
                position: 'absolute',
                top: '10px',
                bottom: '10px',
                left: '19px',
                width: '2px',
                background: 'var(--slate-200)',
                zIndex: 0
              }}
            />

            {activityLog.map((act) => (
              <div key={act.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', position: 'relative', zIndex: 1 }}>
                {/* Timeline node */}
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: '#ffffff',
                    border: '2px solid var(--primary-600)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary-600)',
                    flexShrink: 0,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.06)'
                  }}
                >
                  <CheckCircle2 size={18} />
                </div>

                <div
                  style={{
                    flex: 1,
                    background: 'var(--slate-50)',
                    padding: '1rem 1.25rem',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--slate-200)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="uni-pill primary" style={{ fontSize: '0.68rem' }}>
                        {act.category || 'Activity'}
                      </span>
                      <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--slate-800)', margin: 0 }}>
                        {act.action}
                      </h4>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)' }}>{act.timestamp}</span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--slate-600)', margin: 0, lineHeight: 1.4 }}>
                    {act.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
