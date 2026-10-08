import React, { useState } from 'react';
import { Clock, Calendar, MapPin, User, Info } from 'lucide-react';
import { timetableData } from '../data/mockData';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const DAY_SHORT = { Monday: 'Mo', Tuesday: 'Tu', Wednesday: 'We', Thursday: 'Th', Friday: 'Fr' };

export default function TimetablePage() {
  const [hoveredCell, setHoveredCell] = useState(null);
  const { periods, schedule, batchCode } = timetableData;

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, var(--primary-900) 0%, var(--primary-700) 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem 2.25rem',
          color: '#ffffff',
          boxShadow: 'var(--shadow-md)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.4rem' }}>
              <Clock size={24} color="#fde68a" />
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0 }}>Weekly Class Timetable</h1>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.8)', margin: 0 }}>
              KARE – School of Computing &nbsp;·&nbsp; Dept. of CSE &nbsp;·&nbsp; Batch <strong>{batchCode}</strong> &nbsp;·&nbsp; Semester 5
            </p>
          </div>
          {DAYS.includes(today) && (
            <div
              style={{
                background: 'rgba(241, 162, 8, 0.2)',
                border: '1px solid rgba(241, 162, 8, 0.4)',
                borderRadius: 'var(--radius-md)',
                padding: '0.6rem 1.25rem',
                textAlign: 'center'
              }}
            >
              <p style={{ margin: 0, fontSize: '0.72rem', color: '#fde68a', fontWeight: 600 }}>TODAY IS</p>
              <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>{today}</p>
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--slate-200)',
          padding: '1rem 1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center'
        }}
      >
        <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--slate-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Legend:</span>
        {[
          { code: 'DL', name: 'Deep Learning', color: '#7c3aed' },
          { code: 'CN', name: 'Computer Networks', color: '#059669' },
          { code: 'OS', name: 'Operating Systems', color: '#d97706' },
          { code: 'DAA', name: 'Design Analysis of Algorithms', color: '#2563eb' }
        ].map((item) => (
          <div key={item.code} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--slate-700)' }}>
            <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: item.color, flexShrink: 0 }} />
            <span><strong>{item.code}</strong> – {item.name}</span>
          </div>
        ))}
      </div>

      {/* Timetable Grid – Scrollable Container */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--slate-200)',
          boxShadow: 'var(--shadow-sm)',
          overflowX: 'auto'
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '900px' }}>
          {/* Table Header: Period columns */}
          <thead>
            <tr>
              <th
                style={{
                  padding: '1rem 1.25rem',
                  textAlign: 'left',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: 'var(--slate-600)',
                  background: 'var(--slate-50)',
                  borderBottom: '2px solid var(--slate-200)',
                  borderRight: '1px solid var(--slate-200)',
                  minWidth: '70px'
                }}
              >
                Day
              </th>
              {periods.map((p) => (
                <th
                  key={p.slot}
                  style={{
                    padding: '0.85rem 0.5rem',
                    textAlign: 'center',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: 'var(--primary-700)',
                    background: 'var(--primary-50)',
                    borderBottom: '2px solid var(--primary-200)',
                    borderRight: '1px solid var(--slate-200)',
                    minWidth: '110px'
                  }}
                >
                  <div style={{ color: 'var(--slate-500)', fontWeight: 600, marginBottom: '2px' }}>P{p.slot}</div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--slate-400)', fontWeight: 500 }}>{p.time}</div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {DAYS.map((day, dayIdx) => {
              const slots = schedule[day];
              const isToday = day === today;

              return (
                <tr
                  key={day}
                  style={{
                    background: isToday ? '#f0f9ff' : dayIdx % 2 === 0 ? '#ffffff' : '#fafafa',
                    borderBottom: '1px solid var(--slate-200)'
                  }}
                >
                  {/* Day Label Cell */}
                  <td
                    style={{
                      padding: '0.85rem 1.25rem',
                      borderRight: '2px solid var(--slate-200)',
                      background: isToday ? 'var(--primary-600)' : 'var(--slate-50)',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontWeight: 800, fontSize: '1rem', color: isToday ? '#ffffff' : 'var(--slate-800)' }}>
                      {DAY_SHORT[day]}
                    </div>
                    <div style={{ fontSize: '0.65rem', color: isToday ? 'rgba(255,255,255,0.8)' : 'var(--slate-400)', fontWeight: 600 }}>
                      {day.slice(0, 3).toUpperCase()}
                    </div>
                  </td>

                  {/* Period Cells */}
                  {slots.map((slot, i) => {
                    if (slot.spanContinue) return null;

                    const isEmpty = !slot.code;
                    const cellKey = `${day}-${i}`;

                    return (
                      <td
                        key={i}
                        colSpan={slot.span || 1}
                        style={{
                          padding: '0.4rem',
                          borderRight: '1px solid var(--slate-200)',
                          verticalAlign: 'top'
                        }}
                        onMouseEnter={() => !isEmpty && setHoveredCell(cellKey)}
                        onMouseLeave={() => setHoveredCell(null)}
                      >
                        {!isEmpty ? (
                          <div
                            style={{
                              background: slot.color + '18',
                              border: `1.5px solid ${slot.color}40`,
                              borderLeft: `4px solid ${slot.color}`,
                              borderRadius: '8px',
                              padding: '0.55rem 0.6rem',
                              minHeight: '70px',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-between',
                              cursor: 'default',
                              transition: 'transform 0.15s ease',
                              transform: hoveredCell === cellKey ? 'scale(1.02)' : 'none'
                            }}
                          >
                            <div>
                              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: slot.color, lineHeight: 1.2, marginBottom: '2px' }}>
                                {slot.code}
                              </div>
                              <div style={{ fontSize: '0.68rem', color: 'var(--slate-700)', fontWeight: 600, lineHeight: 1.3 }}>
                                {slot.subject.split(' ').slice(0, 3).join(' ')}
                              </div>
                            </div>
                            <div style={{ marginTop: '6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.6rem', color: 'var(--slate-500)' }}>
                              <span style={{ fontWeight: 600 }}>{slot.room}</span>
                              <span style={{ fontWeight: 700, color: slot.color + 'cc' }}>{slot.faculty}</span>
                            </div>
                          </div>
                        ) : (
                          <div
                            style={{
                              minHeight: '70px',
                              borderRadius: '8px',
                              background: 'transparent',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <span style={{ fontSize: '0.65rem', color: 'var(--slate-300)', fontWeight: 500 }}>—</span>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Faculty Quick Reference */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--slate-200)',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-xs)'
        }}
      >
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--slate-800)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <User size={18} color="var(--primary-600)" />
          Faculty Reference
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
          {[
            { code: 'BSA', name: 'Dr. B. S. Anupama', subject: 'Deep Learning', color: '#7c3aed' },
            { code: 'MRA', name: 'Dr. M. R. Arun', subject: 'Computer Networks', color: '#059669' },
            { code: 'KKT', name: 'Dr. K. K. Thirumal', subject: 'Operating Systems', color: '#d97706' },
            { code: 'RMG', name: 'Dr. R. M. Ganapathy', subject: 'Design Analysis of Algorithms', color: '#2563eb' }
          ].map((f) => (
            <div key={f.code} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--slate-50)', border: '1px solid var(--slate-200)' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: f.color + '18', border: `1px solid ${f.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 800, color: f.color, flexShrink: 0 }}>
                {f.code}
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '0.82rem', fontWeight: 700, color: 'var(--slate-800)' }}>{f.name}</p>
                <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--slate-500)' }}>{f.subject}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
