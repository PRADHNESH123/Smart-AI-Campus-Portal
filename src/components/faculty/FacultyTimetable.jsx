import React, { useState } from 'react';
import { Clock, User, MapPin } from 'lucide-react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const DAY_SHORT = { Monday: 'Mo', Tuesday: 'Tu', Wednesday: 'We', Thursday: 'Th', Friday: 'Fr' };

const periods = [
  { slot: 1, time: '09:00–10:00' }, { slot: 2, time: '10:00–11:00' },
  { slot: 3, time: '11:00–12:00' }, { slot: 4, time: '12:00–01:00' },
  { slot: 5, time: '01:00–02:00' }, { slot: 6, time: '02:00–03:00' },
  { slot: 7, time: '03:00–04:00' }, { slot: 8, time: '04:00–05:00' }
];

// Faculty (BSA = Dr. B.S. Anupama) teaching schedule
const schedule = {
  Monday:    [{ slot:1, code:'3-CSE-DL', subject:'Deep Learning',  room:'8406',    batch:'24S02', color:'#7c3aed' }, null, { slot:3, code:'3-CSE-DL', subject:'Deep Learning', room:'8406', batch:'24S04', color:'#7c3aed' }, { slot:4, spanContinue:true }, null, null, null, null],
  Tuesday:   [null, null, null, null, null, null, { slot:7, code:'3-CSE-DL', subject:'Deep Learning', room:'8406', batch:'24S02', color:'#7c3aed' }, null],
  Wednesday: [null, null, null, null, null, null, null, null],
  Thursday:  [null, null, { slot:3, code:'3-CSE-DL', subject:'Deep Learning (Lab)', room:'Lab8301A', batch:'24S02', color:'#7c3aed', span:2 }, { slot:4, spanContinue:true }, null, null, null, null],
  Friday:    [null, null, null, null, null, null, { slot:7, code:'3-CSE-DL', subject:'Deep Learning', room:'8406', batch:'24S05', color:'#7c3aed' }, null],
};

export default function FacultyTimetable() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg,#1e1b4b,#2563eb)', borderRadius: '18px', padding: '1.75rem 2rem', color: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
          <Clock size={24} color="#a5b4fc" />
          <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800 }}>My Teaching Timetable</h2>
        </div>
        <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.75)' }}>
          KARE – School of Computing · Dept. of CSE · Subject: Deep Learning (3-CSE-DL)
        </p>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          {[{ l: 'Assigned Subject', v: 'Deep Learning' }, { l: 'Total Batches', v: '3' }, { l: 'Weekly Periods', v: '7' }].map(s => (
            <div key={s.l} style={{ background: 'rgba(255,255,255,0.12)', borderRadius: '10px', padding: '0.5rem 1rem', border: '1px solid rgba(255,255,255,0.15)' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#c7d2fe' }}>{s.v}</div>
              <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.65)' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Timetable Grid */}
      <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', overflowX: 'auto', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '860px' }}>
          <thead>
            <tr>
              <th style={{ padding: '1rem 1.25rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: 700, color: '#64748b', background: '#f8fafc', borderBottom: '2px solid #e2e8f0', borderRight: '1px solid #e2e8f0', minWidth: '65px' }}>Day</th>
              {periods.map(p => (
                <th key={p.slot} style={{ padding: '0.75rem 0.4rem', textAlign: 'center', fontSize: '0.68rem', fontWeight: 700, color: '#2563eb', background: '#eff6ff', borderBottom: '2px solid #bfdbfe', borderRight: '1px solid #e2e8f0', minWidth: '105px' }}>
                  <div style={{ color: '#64748b', marginBottom: '2px' }}>P{p.slot}</div>
                  <div style={{ fontSize: '0.62rem', color: '#94a3b8', fontWeight: 500 }}>{p.time}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DAYS.map((day, di) => {
              const slots = schedule[day];
              const isToday = day === today;
              return (
                <tr key={day} style={{ background: isToday ? '#f0f9ff' : di % 2 === 0 ? '#fff' : '#fafafa', borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.85rem 1.1rem', borderRight: '2px solid #e2e8f0', background: isToday ? '#2563eb' : '#f8fafc', textAlign: 'center' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: isToday ? '#fff' : '#334155' }}>{DAY_SHORT[day]}</div>
                    <div style={{ fontSize: '0.62rem', color: isToday ? 'rgba(255,255,255,0.75)' : '#94a3b8', fontWeight: 600 }}>{day.slice(0,3).toUpperCase()}</div>
                  </td>
                  {slots.map((slot, i) => {
                    if (slot?.spanContinue) return null;
                    if (!slot || !slot.code) return (
                      <td key={i} style={{ borderRight: '1px solid #e2e8f0', padding: '0.35rem' }}>
                        <div style={{ minHeight: '68px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontSize: '0.6rem', color: '#cbd5e1' }}>—</span>
                        </div>
                      </td>
                    );
                    const cellKey = `${day}-${i}`;
                    return (
                      <td key={i} colSpan={slot.span || 1} style={{ borderRight: '1px solid #e2e8f0', padding: '0.35rem', verticalAlign: 'top' }}
                        onMouseEnter={() => setHovered(cellKey)} onMouseLeave={() => setHovered(null)}>
                        <div style={{ background: slot.color + '18', border: `1.5px solid ${slot.color}40`, borderLeft: `4px solid ${slot.color}`, borderRadius: '8px', padding: '0.5rem 0.6rem', minHeight: '68px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'transform 0.15s', transform: hovered === cellKey ? 'scale(1.03)' : 'none', cursor: 'default' }}>
                          <div>
                            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: slot.color }}>{slot.code}</div>
                            <div style={{ fontSize: '0.65rem', color: '#334155', fontWeight: 600, lineHeight: 1.3, marginTop: '2px' }}>{slot.subject}</div>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.58rem', color: '#64748b', marginTop: '6px' }}>
                            <span style={{ fontWeight: 600 }}>{slot.room}</span>
                            <span style={{ color: slot.color + 'cc', fontWeight: 700 }}>{slot.batch}</span>
                          </div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Batch legend */}
      <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.25rem 1.5rem' }}>
        <p style={{ margin: '0 0 0.75rem', fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Batch Reference</p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.82rem', color: '#334155' }}>
          {['24S02', '24S04', '24S05'].map(b => (
            <div key={b} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <div style={{ width: '14px', height: '14px', borderRadius: '4px', background: '#7c3aed', opacity: 0.7 }} />
              <span><strong>{b}</strong> – B.Tech CSE {b === '24S02' ? '(Sec A)' : b === '24S04' ? '(Sec B)' : '(Sec C)'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
