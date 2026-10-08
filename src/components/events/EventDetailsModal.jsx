import React from 'react';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Users,
  AlertCircle,
  CheckCircle2,
  Share2,
  CalendarCheck,
  Award,
  Sparkles
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export default function EventDetailsModal() {
  const { selectedEventModal, closeEventModal, toggleEventRegistration } = usePortal();

  if (!selectedEventModal) return null;

  const event = selectedEventModal;
  const isRegistered = Boolean(event.registered);

  const handleRegisterClick = () => {
    toggleEventRegistration(event.id);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        background: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(5px)',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={closeEventModal}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '720px',
          maxHeight: '90vh',
          background: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-xl)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          animation: 'modalSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          onClick={closeEventModal}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.9)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--slate-700)',
            cursor: 'pointer',
            zIndex: 10,
            boxShadow: 'var(--shadow-md)',
            transition: 'background 0.2s'
          }}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        {/* Event Header Banner / Poster */}
        <div style={{ position: 'relative', height: '220px', width: '100%', overflow: 'hidden' }}>
          <img
            src={event.image}
            alt={event.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(11,37,69,0.2) 0%, rgba(11,37,69,0.85) 100%)'
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '1.25rem',
              left: '1.5rem',
              right: '1.5rem',
              color: '#ffffff'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="uni-pill primary" style={{ background: 'var(--secondary-500)', color: '#000', fontWeight: 700 }}>
                {event.category}
              </span>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  padding: '0.2rem 0.6rem',
                  borderRadius: '9999px',
                  background:
                    event.status === 'Ongoing'
                      ? 'rgba(34, 197, 94, 0.9)'
                      : event.status === 'Past'
                      ? 'rgba(100, 116, 139, 0.8)'
                      : 'rgba(59, 130, 246, 0.9)',
                  color: '#ffffff'
                }}
              >
                {event.status}
              </span>
            </div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, lineHeight: 1.25 }}>{event.name}</h2>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Registration Status Banner */}
          {isRegistered ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.85rem 1.25rem',
                borderRadius: 'var(--radius-lg)',
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                color: '#15803d'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <CheckCircle2 size={22} color="#16a34a" />
                <div>
                  <p style={{ fontWeight: 700, fontSize: '0.95rem', margin: 0 }}>Registration Successful</p>
                  <p style={{ fontSize: '0.78rem', color: '#166534', margin: 0 }}>
                    You are confirmed for this event. Status: <strong style={{ textTransform: 'uppercase' }}>Registered</strong>
                  </p>
                </div>
              </div>
              <span className="uni-pill success" style={{ fontWeight: 700, fontSize: '0.75rem' }}>
                Confirmed
              </span>
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--slate-50)',
                border: '1px solid var(--slate-200)',
                color: 'var(--slate-600)',
                fontSize: '0.85rem'
              }}
            >
              <AlertCircle size={18} color="var(--slate-400)" />
              <span>You have not yet registered for this campus event. Seats are subject to first-come registration.</span>
            </div>
          )}

          {/* Quick Info Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '0.9rem',
              background: 'var(--slate-50)',
              padding: '1rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--slate-200)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
              <Calendar size={18} color="var(--primary-600)" style={{ marginTop: '2px' }} />
              <div>
                <p style={{ fontSize: '0.72rem', color: 'var(--slate-400)', fontWeight: 600, textTransform: 'uppercase' }}>Date</p>
                <p style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--slate-800)' }}>{event.date}</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
              <Clock size={18} color="var(--primary-600)" style={{ marginTop: '2px' }} />
              <div>
                <p style={{ fontSize: '0.72rem', color: 'var(--slate-400)', fontWeight: 600, textTransform: 'uppercase' }}>Time</p>
                <p style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--slate-800)' }}>{event.time}</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
              <MapPin size={18} color="var(--primary-600)" style={{ marginTop: '2px' }} />
              <div>
                <p style={{ fontSize: '0.72rem', color: 'var(--slate-400)', fontWeight: 600, textTransform: 'uppercase' }}>Venue</p>
                <p style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--slate-800)' }}>{event.venue}</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
              <Users size={18} color="var(--primary-600)" style={{ marginTop: '2px' }} />
              <div>
                <p style={{ fontSize: '0.72rem', color: 'var(--slate-400)', fontWeight: 600, textTransform: 'uppercase' }}>Organizer</p>
                <p style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--slate-800)' }}>{event.organizer}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--slate-800)', marginBottom: '0.4rem' }}>
              About the Event
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--slate-600)', lineHeight: 1.6 }}>
              {event.description}
            </p>
          </div>

          {/* Event Rules & Guidelines */}
          {event.rules && event.rules.length > 0 && (
            <div style={{ background: '#f8fafc', padding: '1rem 1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--slate-200)' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--slate-800)', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Award size={16} color="var(--primary-600)" />
                Event Rules & Guidelines
              </h4>
              <ul style={{ paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {event.rules.map((rule, idx) => (
                  <li key={idx} style={{ fontSize: '0.82rem', color: 'var(--slate-600)', lineHeight: 1.5 }}>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Registration Deadline Alert */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              background: '#fffbeb',
              border: '1px solid #fef3c7',
              color: '#b45309',
              fontSize: '0.82rem',
              fontWeight: 500
            }}
          >
            <span>Registration Deadline:</span>
            <strong style={{ color: '#92400e' }}>{event.registrationDeadline || '24 hours before event starts'}</strong>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div
          style={{
            padding: '1rem 1.5rem',
            background: 'var(--slate-50)',
            borderTop: '1px solid var(--slate-200)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <button
            onClick={closeEventModal}
            className="uni-btn outline"
            style={{ padding: '0.55rem 1.25rem', fontSize: '0.85rem' }}
          >
            Close
          </button>

          <button
            onClick={handleRegisterClick}
            className={`uni-btn ${isRegistered ? 'danger' : 'primary'}`}
            style={{
              padding: '0.6rem 1.5rem',
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            {isRegistered ? (
              <>
                <X size={16} />
                Cancel Registration
              </>
            ) : (
              <>
                <CalendarCheck size={16} />
                Register Now
              </>
            )}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
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
