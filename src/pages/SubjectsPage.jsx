import React, { useState } from 'react';
import {
  BookOpen, Users, Clock, Award, CheckCircle2,
  ChevronDown, ChevronUp, Building, FlaskConical, BookMarked
} from 'lucide-react';
import { subjectsData } from '../data/mockData';

export default function SubjectsPage() {
  const [expandedId, setExpandedId] = useState(null);

  const toggle = (id) => setExpandedId(expandedId === id ? null : id);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, var(--primary-900) 0%, var(--primary-700) 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem 2.25rem',
          color: '#ffffff',
          boxShadow: 'var(--shadow-md)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <BookOpen size={26} color="#fde68a" />
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0 }}>My Subjects – Semester 5</h1>
        </div>
        <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', margin: 0 }}>
          KARE – School of Computing, Department of CSE &nbsp;·&nbsp; Batch Code: 24S02
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.25rem', flexWrap: 'wrap', fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)' }}>
          <span>📚 {subjectsData.length} Subjects Enrolled</span>
          <span>⭐ Total Credits: {subjectsData.reduce((a, s) => a + s.credits, 0)}</span>
          <span>🎓 Current Semester: 5th (ODD 2026–27)</span>
        </div>
      </div>

      {/* Subject Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {subjectsData.map((sub) => {
          const isOpen = expandedId === sub.id;
          return (
            <div
              key={sub.id}
              style={{
                background: '#ffffff',
                borderRadius: 'var(--radius-xl)',
                border: `1px solid ${isOpen ? sub.borderColor : 'var(--slate-200)'}`,
                boxShadow: isOpen ? `0 4px 16px ${sub.color}18` : 'var(--shadow-sm)',
                overflow: 'hidden',
                transition: 'all 0.25s ease'
              }}
            >
              {/* Card Header – always visible */}
              <button
                onClick={() => toggle(sub.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1.5rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flex: 1 }}>
                  {/* Color Badge */}
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '14px',
                      background: sub.lightColor,
                      border: `2px solid ${sub.borderColor}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <span style={{ fontSize: '1.1rem', fontWeight: 900, color: sub.color }}>{sub.shortName}</span>
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          background: sub.lightColor,
                          color: sub.color,
                          border: `1px solid ${sub.borderColor}`,
                          padding: '0.15rem 0.55rem',
                          borderRadius: '9999px'
                        }}
                      >
                        {sub.code}
                      </span>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          color: 'var(--slate-500)',
                          background: 'var(--slate-100)',
                          padding: '0.15rem 0.55rem',
                          borderRadius: '9999px'
                        }}
                      >
                        {sub.credits} Credits · {sub.type}
                      </span>
                    </div>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--slate-900)', margin: 0 }}>
                      {sub.name}
                    </h2>
                    <p style={{ fontSize: '0.8rem', color: 'var(--slate-500)', margin: '3px 0 0' }}>
                      {sub.faculty} &nbsp;|&nbsp; Room: {sub.room} &nbsp;|&nbsp; Lab: {sub.labRoom}
                    </p>
                  </div>
                </div>

                {/* Quick Stats */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginRight: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '0.68rem', color: 'var(--slate-400)', fontWeight: 600, textTransform: 'uppercase', margin: 0 }}>Attendance</p>
                    <p style={{ fontSize: '1rem', fontWeight: 800, color: parseFloat(sub.attendance) >= 90 ? '#16a34a' : '#d97706', margin: 0 }}>
                      {sub.attendance}
                    </p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '0.68rem', color: 'var(--slate-400)', fontWeight: 600, textTransform: 'uppercase', margin: 0 }}>Internal</p>
                    <p style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary-700)', margin: 0 }}>{sub.internalMark}</p>
                  </div>
                  {isOpen ? <ChevronUp size={20} color="var(--slate-400)" /> : <ChevronDown size={20} color="var(--slate-400)" />}
                </div>
              </button>

              {/* Expanded Content */}
              {isOpen && (
                <div
                  style={{
                    padding: '0 1.5rem 1.5rem',
                    borderTop: `2px solid ${sub.borderColor}`,
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '1.5rem',
                    paddingTop: '1.5rem'
                  }}
                >
                  {/* Syllabus Overview */}
                  <div>
                    <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--slate-700)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <BookMarked size={16} color={sub.color} /> Course Syllabus
                    </h4>
                    <div style={{ background: sub.lightColor, padding: '1rem', borderRadius: 'var(--radius-md)', border: `1px solid ${sub.borderColor}`, fontSize: '0.8rem', color: 'var(--slate-700)', lineHeight: 1.7 }}>
                      {sub.syllabus.split(' | ').map((unit, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.35rem' }}>
                          <span style={{ color: sub.color, fontWeight: 700, flexShrink: 0 }}>›</span>
                          <span>{unit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Topics Covered */}
                  <div>
                    <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--slate-700)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <CheckCircle2 size={16} color={sub.color} /> Key Topics
                    </h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {sub.topics.map((topic, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--slate-700)' }}>
                          <span style={{ background: sub.color, borderRadius: '50%', width: '18px', height: '18px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.65rem', fontWeight: 700, flexShrink: 0, marginTop: '1px' }}>{i + 1}</span>
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Upcoming Test */}
                  <div style={{ gridColumn: '1 / -1' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.85rem 1.25rem',
                        borderRadius: 'var(--radius-md)',
                        background: '#fffbeb',
                        border: '1px solid #fde68a',
                        color: '#b45309',
                        fontSize: '0.85rem'
                      }}
                    >
                      <Clock size={18} color="#d97706" />
                      <div>
                        <strong>Next Scheduled Assessment:</strong> {sub.upcomingTest}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
