import React, { useState, useEffect } from 'react';
import {
  Search,
  Calendar,
  Bell,
  Building,
  ArrowRight,
  Filter,
  Sparkles,
  X
} from 'lucide-react';
import { usePortal } from '../context/PortalContext';
import { useRouter } from '../router';
import { campusDirectory } from '../data/mockData';

export default function SearchPage() {
  const { searchQuery, setSearchQuery, events, notifications, openEventModal } = usePortal();
  const { navigate } = useRouter();

  const [inputVal, setInputVal] = useState(searchQuery);
  const [activeFilter, setActiveFilter] = useState('All'); // 'All' | 'Events' | 'Notifications' | 'Campus Info'

  useEffect(() => {
    setInputVal(searchQuery);
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(inputVal.trim());
  };

  const query = (inputVal || searchQuery || '').toLowerCase().trim();

  // Search in events
  const matchingEvents = events
    .filter(
      (e) =>
        e.name.toLowerCase().includes(query) ||
        e.description.toLowerCase().includes(query) ||
        e.category.toLowerCase().includes(query) ||
        e.venue.toLowerCase().includes(query) ||
        e.organizer.toLowerCase().includes(query)
    )
    .map((e) => ({
      id: `evt-${e.id}`,
      type: 'Events',
      title: e.name,
      category: e.category,
      date: e.date,
      details: `${e.venue} · Organized by ${e.organizer}. ${e.description.slice(0, 100)}...`,
      raw: e
    }));

  // Search in notifications
  const matchingNotifications = notifications
    .filter(
      (n) =>
        n.title.toLowerCase().includes(query) ||
        n.description.toLowerCase().includes(query) ||
        n.category.toLowerCase().includes(query)
    )
    .map((n) => ({
      id: `notif-${n.id}`,
      type: 'Notifications',
      title: n.title,
      category: n.category,
      date: `${n.date} ${n.time}`,
      details: n.description,
      raw: n
    }));

  // Search in campus info
  const matchingCampusInfo = campusDirectory
    .filter(
      (c) =>
        c.title.toLowerCase().includes(query) ||
        c.details.toLowerCase().includes(query) ||
        c.category.toLowerCase().includes(query)
    )
    .map((c) => ({
      id: `camp-${c.id}`,
      type: 'Campus Info',
      title: c.title,
      category: c.category,
      date: 'Permanent Directory',
      details: `${c.details} · Contact: ${c.contact}`,
      raw: c
    }));

  let allResults = [];
  if (activeFilter === 'All') {
    allResults = [...matchingEvents, ...matchingNotifications, ...matchingCampusInfo];
  } else if (activeFilter === 'Events') {
    allResults = matchingEvents;
  } else if (activeFilter === 'Notifications') {
    allResults = matchingNotifications;
  } else if (activeFilter === 'Campus Info') {
    allResults = matchingCampusInfo;
  }

  const handleResultClick = (item) => {
    if (item.type === 'Events') {
      openEventModal(item.raw);
    } else if (item.type === 'Notifications') {
      navigate('/student/notifications');
    } else if (item.type === 'Campus Info') {
      navigate('/student/help');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Search Header Banner */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem',
          border: '1px solid var(--slate-200)',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--slate-900)', margin: '0 0 0.5rem' }}>
            Smart Campus Global Search
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--slate-500)', margin: '0 0 1.5rem' }}>
            Find academic events, official circulars, examination alerts, campus directories, and departmental contacts.
          </p>

          <form onSubmit={handleSearchSubmit} style={{ position: 'relative' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                background: 'var(--slate-50)',
                border: '2px solid var(--primary-500)',
                borderRadius: 'var(--radius-full)',
                padding: '0.6rem 1.25rem',
                boxShadow: '0 4px 14px rgba(37, 99, 235, 0.12)'
              }}
            >
              <Search size={20} color="var(--primary-600)" style={{ marginRight: '0.75rem', flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Search across events, announcements, campus venues..."
                value={inputVal}
                onChange={(e) => {
                  setInputVal(e.target.value);
                  setSearchQuery(e.target.value);
                }}
                style={{
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  width: '100%',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  color: 'var(--slate-800)'
                }}
              />
              {inputVal && (
                <button
                  type="button"
                  onClick={() => {
                    setInputVal('');
                    setSearchQuery('');
                  }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--slate-400)', padding: 0 }}
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Filter Tabs & Results Count */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {['All', 'Events', 'Notifications', 'Campus Info'].map((filter) => {
            const count =
              filter === 'All'
                ? matchingEvents.length + matchingNotifications.length + matchingCampusInfo.length
                : filter === 'Events'
                ? matchingEvents.length
                : filter === 'Notifications'
                ? matchingNotifications.length
                : matchingCampusInfo.length;

            const isSelected = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.82rem',
                  fontWeight: isSelected ? 700 : 500,
                  color: isSelected ? 'var(--primary-700)' : 'var(--slate-600)',
                  background: isSelected ? 'var(--primary-50)' : '#ffffff',
                  border: isSelected ? '1px solid var(--primary-300)' : '1px solid var(--slate-200)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <span>{filter}</span>
                <span
                  style={{
                    fontSize: '0.7rem',
                    padding: '0.1rem 0.4rem',
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

        <span style={{ fontSize: '0.82rem', color: 'var(--slate-500)' }}>
          Showing <strong>{allResults.length}</strong> matching entries {query ? `for "${query}"` : ''}
        </span>
      </div>

      {/* Results List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {allResults.length === 0 ? (
          <div
            style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-xl)',
              padding: '3.5rem 2rem',
              textAlign: 'center',
              border: '1px solid var(--slate-200)'
            }}
          >
            <Search size={44} color="var(--slate-300)" style={{ margin: '0 auto 0.75rem' }} />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--slate-800)', margin: 0 }}>
              No matches found
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--slate-500)', marginTop: '0.35rem' }}>
              Try searching with alternative keywords such as "Symposium", "Exam", "Dean", or "Hackathon".
            </p>
          </div>
        ) : (
          allResults.map((item) => (
            <div
              key={item.id}
              onClick={() => handleResultClick(item)}
              style={{
                background: '#ffffff',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--slate-200)',
                padding: '1.25rem 1.5rem',
                boxShadow: 'var(--shadow-xs)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1.25rem',
                transition: 'all 0.2s ease'
              }}
              className="hover-card"
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flex: 1 }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background:
                      item.type === 'Events'
                        ? '#eff6ff'
                        : item.type === 'Notifications'
                        ? '#fef3c7'
                        : '#ecfdf5',
                    border:
                      item.type === 'Events'
                        ? '1px solid #bfdbfe'
                        : item.type === 'Notifications'
                        ? '1px solid #fde68a'
                        : '1px solid #a7f3d0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color:
                      item.type === 'Events'
                        ? 'var(--primary-600)'
                        : item.type === 'Notifications'
                        ? '#d97706'
                        : '#059669',
                    flexShrink: 0
                  }}
                >
                  {item.type === 'Events' ? (
                    <Calendar size={20} />
                  ) : item.type === 'Notifications' ? (
                    <Bell size={20} />
                  ) : (
                    <Building size={20} />
                  )}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span className="uni-pill primary" style={{ fontSize: '0.68rem' }}>
                      {item.type}
                    </span>
                    <span className="uni-pill neutral" style={{ fontSize: '0.68rem' }}>
                      {item.category}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--slate-400)' }}>{item.date}</span>
                  </div>

                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--slate-900)', margin: '0 0 0.25rem' }}>
                    {item.title}
                  </h3>

                  <p style={{ fontSize: '0.82rem', color: 'var(--slate-600)', margin: 0, lineHeight: 1.4 }}>
                    {item.details}
                  </p>
                </div>
              </div>

              <ArrowRight size={18} color="var(--slate-400)" style={{ flexShrink: 0 }} />
            </div>
          ))
        )}
      </div>

      <style>{`
        .hover-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
          border-color: var(--primary-300);
        }
      `}</style>
    </div>
  );
}
