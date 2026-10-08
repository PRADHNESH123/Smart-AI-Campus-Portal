import React, { useState } from 'react';
import { UserCheck, CheckCircle2, XCircle, Save, RotateCcw, AlertCircle } from 'lucide-react';

const BATCHES = ['24S02', '24S04', '24S05'];
const SUBJECTS = ['Deep Learning (3-CSE-DL)'];
const PERIODS_LIST = ['Period 1 (09:00–10:00)', 'Period 2 (10:00–11:00)', 'Period 3 (11:00–12:00)', 'Period 7 (03:00–04:00)', 'Lab (11:00–01:00)'];

// Sample students for each batch
const STUDENTS = {
  '24S02': [
    { reg: '99240040191', name: 'Arun Kumar M' },
    { reg: '99240040192', name: 'Priya S' },
    { reg: '99240040197', name: 'Vijay T' },
    { reg: '99240040198', name: 'Meena K' },
    { reg: '99240040199', name: 'Suresh P' },
    { reg: '99240040200', name: 'Lakshmi R' },
    { reg: '99240040201', name: 'Anand B' },
    { reg: '99240040202', name: 'Deepa N' },
  ],
  '24S04': [
    { reg: '99240040193', name: 'Rahul Verma' },
    { reg: '99240040194', name: 'Divya R' },
    { reg: '99240040203', name: 'Siva M' },
    { reg: '99240040204', name: 'Kavya S' },
    { reg: '99240040205', name: 'Manoj K' },
    { reg: '99240040206', name: 'Rathi P' },
  ],
  '24S05': [
    { reg: '99240040195', name: 'Karthik M' },
    { reg: '99240040196', name: 'Sneha Lakshmi' },
    { reg: '99240040207', name: 'Dinesh R' },
    { reg: '99240040208', name: 'Pooja T' },
    { reg: '99240040209', name: 'Harish G' },
  ],
};

export default function FacultyAttendance() {
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const [batch, setBatch] = useState('24S02');
  const [period, setPeriod] = useState('');
  const [attendance, setAttendance] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const students = STUDENTS[batch] || [];

  const toggleAll = (val) => {
    const updated = {};
    students.forEach(s => { updated[s.reg] = val; });
    setAttendance(updated);
  };

  const toggle = (reg) => {
    setAttendance(prev => ({ ...prev, [reg]: !prev[reg] }));
  };

  const presentCount = students.filter(s => attendance[s.reg] === true).length;
  const absentCount = students.filter(s => attendance[s.reg] === false).length;
  const unmarkedCount = students.filter(s => attendance[s.reg] === undefined).length;

  const handleSubmit = () => {
    if (!period) { alert('Please select the period before submitting.'); return; }
    if (unmarkedCount > 0) { setShowConfirm(true); return; }
    doSubmit();
  };

  const doSubmit = () => {
    setShowConfirm(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setAttendance({});
    setSubmitted(false);
    setPeriod('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #78350f, #d97706)', borderRadius: '18px', padding: '1.75rem 2rem', color: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
          <UserCheck size={24} color="#fde68a" />
          <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800 }}>Attendance Submission</h2>
        </div>
        <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)' }}>
          {today} &nbsp;·&nbsp; Subject: Deep Learning (3-CSE-DL)
        </p>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          {[{ l: 'Present', v: presentCount, c: '#a7f3d0' }, { l: 'Absent', v: absentCount, c: '#fca5a5' }, { l: 'Unmarked', v: unmarkedCount, c: '#fde68a' }].map(s => (
            <div key={s.l} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '10px', padding: '0.5rem 1.1rem', textAlign: 'center', border: '1px solid rgba(255,255,255,0.2)' }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 900, color: s.c }}>{s.v}</div>
              <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.7)' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {submitted ? (
        /* Success State */
        <div style={{ background: '#fff', borderRadius: '18px', border: '1px solid #e2e8f0', padding: '3rem', textAlign: 'center' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#f0fdf4', border: '3px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
            <CheckCircle2 size={36} color="#16a34a" />
          </div>
          <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.3rem', fontWeight: 800, color: '#166534' }}>Attendance Submitted!</h3>
          <p style={{ color: '#475569', fontSize: '0.88rem', marginBottom: '0.5rem' }}>
            Batch <strong>{batch}</strong> · {period} · <strong>{presentCount} Present</strong> / {absentCount} Absent
          </p>
          <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '2rem' }}>Attendance has been recorded in the system.</p>
          <button onClick={handleReset} style={{ padding: '0.75rem 2rem', borderRadius: '12px', background: '#2563eb', color: '#fff', border: 'none', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <RotateCcw size={16} /> Submit Another
          </button>
        </div>
      ) : (
        <>
          {/* Controls */}
          <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '0.4rem' }}>Select Batch</label>
              <select value={batch} onChange={e => { setBatch(e.target.value); setAttendance({}); }}
                style={{ width: '100%', padding: '0.65rem 1rem', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '0.9rem', outline: 'none', background: '#f8fafc' }}>
                {BATCHES.map(b => <option key={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '0.4rem' }}>Select Period</label>
              <select value={period} onChange={e => setPeriod(e.target.value)}
                style={{ width: '100%', padding: '0.65rem 1rem', borderRadius: '10px', border: `1.5px solid ${period ? '#e2e8f0' : '#fca5a5'}`, fontSize: '0.9rem', outline: 'none', background: '#f8fafc' }}>
                <option value="">-- Select Period --</option>
                {PERIODS_LIST.map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '0.4rem' }}>Quick Actions</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => toggleAll(true)} style={{ flex: 1, padding: '0.65rem 0.5rem', borderRadius: '10px', background: '#f0fdf4', color: '#16a34a', border: '1.5px solid #bbf7d0', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}>All Present</button>
                <button onClick={() => toggleAll(false)} style={{ flex: 1, padding: '0.65rem 0.5rem', borderRadius: '10px', background: '#fff1f2', color: '#dc2626', border: '1.5px solid #fecdd3', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}>All Absent</button>
              </div>
            </div>
          </div>

          {/* Student List */}
          <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            <div style={{ padding: '1rem 1.5rem', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}>Batch {batch} — {students.length} Students</span>
              <span style={{ fontSize: '0.78rem', color: '#64748b' }}>{presentCount}P / {absentCount}A / {unmarkedCount} unmarked</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {students.map((s, i) => {
                const status = attendance[s.reg];
                const isPresent = status === true;
                const isAbsent = status === false;
                return (
                  <div key={s.reg} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.9rem 1.5rem', borderBottom: i < students.length - 1 ? '1px solid #f1f5f9' : 'none', background: isPresent ? '#f0fdf4' : isAbsent ? '#fff1f2' : '#fff', transition: 'background 0.15s' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: isPresent ? '#bbf7d0' : isAbsent ? '#fecdd3' : '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.88rem', color: isPresent ? '#16a34a' : isAbsent ? '#dc2626' : '#94a3b8', flexShrink: 0 }}>
                        {s.name.charAt(0)}
                      </div>
                      <div>
                        <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>{s.name}</p>
                        <p style={{ margin: 0, fontSize: '0.72rem', color: '#64748b' }}>{s.reg}</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => setAttendance(prev => ({ ...prev, [s.reg]: true }))}
                        style={{ padding: '0.45rem 1rem', borderRadius: '8px', border: `1.5px solid ${isPresent ? '#16a34a' : '#e2e8f0'}`, background: isPresent ? '#16a34a' : '#fff', color: isPresent ? '#fff' : '#64748b', fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', transition: 'all 0.15s' }}>
                        <CheckCircle2 size={14} /> P
                      </button>
                      <button onClick={() => setAttendance(prev => ({ ...prev, [s.reg]: false }))}
                        style={{ padding: '0.45rem 1rem', borderRadius: '8px', border: `1.5px solid ${isAbsent ? '#dc2626' : '#e2e8f0'}`, background: isAbsent ? '#dc2626' : '#fff', color: isAbsent ? '#fff' : '#64748b', fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', transition: 'all 0.15s' }}>
                        <XCircle size={14} /> A
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Submit */}
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
            <button onClick={handleReset} style={{ padding: '0.75rem 1.5rem', borderRadius: '12px', background: '#f1f5f9', color: '#475569', border: '1px solid #e2e8f0', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <RotateCcw size={16} /> Reset
            </button>
            <button onClick={handleSubmit} style={{ padding: '0.75rem 2rem', borderRadius: '12px', background: '#d97706', color: '#fff', border: 'none', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', boxShadow: '0 4px 12px rgba(217,119,6,0.35)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Save size={16} /> Submit Attendance
            </button>
          </div>
        </>
      )}

      {/* Confirm Modal for unmarked */}
      {showConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }} onClick={() => setShowConfirm(false)}>
          <div style={{ background: '#fff', borderRadius: '18px', padding: '2rem', maxWidth: '400px', width: '100%', textAlign: 'center' }} onClick={e => e.stopPropagation()}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#fffbeb', border: '2px solid #fde68a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <AlertCircle size={28} color="#d97706" />
            </div>
            <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>Unmarked Students</h3>
            <p style={{ color: '#475569', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
              <strong>{unmarkedCount} student{unmarkedCount > 1 ? 's are' : ' is'}</strong> still unmarked. They will be marked <strong>Absent</strong> by default. Continue?
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={doSubmit} style={{ flex: 1, padding: '0.7rem', borderRadius: '10px', background: '#d97706', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer' }}>Yes, Submit</button>
              <button onClick={() => setShowConfirm(false)} style={{ flex: 1, padding: '0.7rem', borderRadius: '10px', background: '#f1f5f9', color: '#475569', border: '1px solid #e2e8f0', fontWeight: 600, cursor: 'pointer' }}>Go Back</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
