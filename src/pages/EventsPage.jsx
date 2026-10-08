import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Search,
  CheckCircle2,
  CalendarCheck,
  Sparkles,
  Filter,
  Eye,
  X
} from 'lucide-react';
import { usePortal } from '../context/PortalContext';

export default function EventsPage() {
  const { events, openEventModal, toggleEventRegistration } = usePortal();

  const [activeTab, setActiveTab] = useState('Upcoming');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [eventSearch, setEventSearch] = useState('');

  const tabs = ['Upcoming', 'Ongoing', 'Past'];
  const categories = ['All', 'Technical', 'Hackathon', 'Cultural', 'Sports', 'Workshop', 'Seminar', 'Coding'];

  // Only show events sanctioned and approved by HOD
  const approvedEvents = events.filter((e) => e.approved !== false && e.approvalStatus !== 'Pending Approval' && e.approvalStatus !== 'Rejected');

  const filteredEvents = approvedEvents.filter((evt) => {
    const matchesTab = evt.status.toLowerCase() === activeTab.toLowerCase();
    const matchesCategory = selectedCategory === 'All' || evt.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      evt.name.toLowerCase().includes(eventSearch.toLowerCase()) ||
      evt.description.toLowerCase().includes(eventSearch.toLowerCase()) ||
      evt.organizer.toLowerCase().includes(eventSearch.toLowerCase());

    return matchesTab && matchesCategory && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Top Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, var(--primary-900) 0%, var(--primary-700) 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem 2.25rem',
          color: '#ffffff',
          boxShadow: 'var(--shadow-md)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.25rem'
        }}
      >
        <div>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              background: 'rgba(241, 162, 8, 0.25)',
              color: '#fef08a',
              border: '1px solid rgba(241, 162, 8, 0.4)',
              padding: '0.2rem 0.65rem',
              borderRadius: '9999px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              marginBottom: '0.5rem'
            }}
          >
            <Sparkles size={13} />
            Campus Life & Symposia
          </span>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0 }}>
            University Events & Workshops
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'rgba(255, 255, 255, 0.8)', margin: '4px 0 0', maxWidth: '600px' }}>
            Discover and participate in technical symposia, hackathons, national conferences, cultural extravaganzas, and guest seminars.
          </p>
        </div>

        {/* Total Registered Summary */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(6px)',
            borderRadius: 'var(--radius-lg)',
            padding: '1rem 1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            textAlign: 'center'
          }}
        >
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.7)' }}>
            My Enrolled Events
          </span>
          <p style={{ fontSize: '1.8rem', fontWeight: 800, margin: '2px 0 0', color: '#fef08a' }}>
            {approvedEvents.filter((e) => e.registered).length}
          </p>
        </div>
      </div>

      {/* Filter and Tab Controls */}
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
        {/* Row 1: Status Tabs + Search Input */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          {/* Status Tabs */}
          <div style={{ display: 'flex', background: 'var(--slate-100)', padding: '0.25rem', borderRadius: 'var(--radius-lg)' }}>
            {tabs.map((tab) => {
              const count = approvedEvents.filter((e) => e.status.toLowerCase() === tab.toLowerCase()).length;
              const isSelected = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: '0.5rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    fontSize: '0.85rem',
                    fontWeight: isSelected ? 700 : 500,
                    color: isSelected ? 'var(--primary-700)' : 'var(--slate-600)',
                    background: isSelected ? '#ffffff' : 'transparent',
                    boxShadow: isSelected ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem'
                  }}
                >
                  <span>{tab} Events</span>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      padding: '0.1rem 0.4rem',
                      borderRadius: '9999px',
                      background: isSelected ? 'var(--primary-100)' : 'var(--slate-200)',
                      color: isSelected ? 'var(--primary-800)' : 'var(--slate-600)'
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Search */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'var(--slate-50)',
              border: '1px solid var(--slate-300)',
              borderRadius: 'var(--radius-lg)',
              padding: '0.5rem 1rem',
              width: '100%',
              maxWidth: '320px'
            }}
          >
            <Search size={16} color="var(--slate-400)" style={{ marginRight: '0.5rem', flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Search event title, venue..."
              value={eventSearch}
              onChange={(e) => setEventSearch(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                width: '100%',
                fontSize: '0.85rem',
                color: 'var(--slate-700)'
              }}
            />
            {eventSearch && (
              <button
                onClick={() => setEventSearch('')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--slate-400)', padding: 0 }}
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>

        {/* Row 2: Category Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflowX: 'auto', paddingTop: '0.5rem', borderTop: '1px solid var(--slate-100)' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--slate-400)', display: 'flex', alignItems: 'center', gap: '0.3rem', whiteSpace: 'nowrap' }}>
            <Filter size={13} />
            Categories:
          </span>
          {categories.map((cat) => {
            const isCatActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.35rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.78rem',
                  fontWeight: isCatActive ? 700 : 500,
                  color: isCatActive ? 'var(--primary-700)' : 'var(--slate-600)',
                  background: isCatActive ? 'var(--primary-50)' : 'var(--slate-50)',
                  border: isCatActive ? '1px solid var(--primary-300)' : '1px solid var(--slate-200)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div
          style={{
            background: '#ffffff',
            borderRadius: 'var(--radius-xl)',
            padding: '3.5rem 2rem',
            textAlign: 'center',
            border: '1px solid var(--slate-200)'
          }}
        >
          <Calendar size={44} color="var(--slate-300)" style={{ margin: '0 auto 0.75rem' }} />
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--slate-800)', margin: 0 }}>
            No {activeTab} Events Found
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--slate-500)', marginTop: '0.35rem' }}>
            Try clearing filters or search queries to see other events.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.75rem'
          }}
        >
          {filteredEvents.map((evt) => (
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
              {/* Event Poster Banner */}
              <div style={{ position: 'relative', height: '170px', width: '100%', overflow: 'hidden' }}>
                <img
                  src={evt.image}
                  alt={evt.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%)'
                  }}
                />

                <div
                  style={{
                    position: 'absolute',
                    top: '0.85rem',
                    left: '0.85rem',
                    right: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span
                    style={{
                      background: 'var(--secondary-500)',
                      color: '#000000',
                      fontWeight: 700,
                      fontSize: '0.72rem',
                      padding: '0.2rem 0.65rem',
                      borderRadius: '9999px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}
                  >
                    {evt.category}
                  </span>

                  {evt.registered ? (
                    <span
                      style={{
                        background: '#16a34a',
                        color: '#ffffff',
                        fontWeight: 700,
                        fontSize: '0.72rem',
                        padding: '0.2rem 0.65rem',
                        borderRadius: '9999px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                      }}
                    >
                      <CheckCircle2 size={13} />
                      Registered
                    </span>
                  ) : (
                    <span
                      style={{
                        background: 'rgba(15, 23, 42, 0.75)',
                        backdropFilter: 'blur(4px)',
                        color: '#ffffff',
                        fontWeight: 600,
                        fontSize: '0.72rem',
                        padding: '0.2rem 0.65rem',
                        borderRadius: '9999px'
                      }}
                    >
                      Open for RSVP
                    </span>
                  )}
                </div>

                <div style={{ position: 'absolute', bottom: '0.75rem', left: '0.85rem', right: '0.85rem', color: '#ffffff' }}>
                  <span style={{ fontSize: '0.75rem', opacity: 0.9 }}>Organized by {evt.organizer}</span>
                </div>
              </div>

              {/* Event Information */}
              <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem', flex: 1 }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--slate-900)', margin: 0, lineHeight: 1.3 }}>
                    {evt.name}
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--slate-600)', margin: '0.4rem 0 0', lineHeight: 1.5, minHeight: '38px' }}>
                    {evt.description}
                  </p>
                </div>

                {/* Date, Time, Venue */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--slate-600)', background: 'var(--slate-50)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Clock size={14} color="var(--primary-600)" />
                    <span><strong>{evt.date}</strong> at {evt.time}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin size={14} color="var(--primary-600)" />
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{evt.venue}</span>
                  </div>
                </div>

                {/* Action Buttons: [View Details] & [Register] */}
                <div
                  style={{
                    marginTop: 'auto',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid var(--slate-100)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem'
                  }}
                >
                  <button
                    onClick={() => openEventModal(evt)}
                    className="uni-btn outline"
                    style={{ flex: 1, padding: '0.55rem', fontSize: '0.82rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}
                  >
                    <Eye size={15} />
                    <span>View Details</span>
                  </button>

                  <button
                    onClick={() => toggleEventRegistration(evt.id)}
                    className={`uni-btn ${evt.registered ? 'danger' : 'primary'}`}
                    style={{ flex: 1, padding: '0.55rem', fontSize: '0.82rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}
                  >
                    {evt.registered ? (
                      <>
                        <X size={15} />
                        <span>Cancel</span>
                      </>
                    ) : (
                      <>
                        <CalendarCheck size={15} />
                        <span>Register</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .hover-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
      `}</style>
    </div>
  );
}
