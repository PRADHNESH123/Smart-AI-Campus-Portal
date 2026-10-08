import React, { useState } from 'react';
import { FilePlus, CheckCircle2, Paperclip, Trash2, Send, AlertCircle, BookOpen } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { useAuth } from '../../context/AuthContext';

const BATCHES = ['24S02', '24S04', '24S05', 'All Batches'];
const SUBJECTS = ['Deep Learning (3-CSE-DL)'];
const TYPES = ['Theory Assignment', 'Lab Report', 'Coding Assignment', 'Mini Project', 'Case Study', 'Presentation'];

const initialForm = { title: '', batch: '', type: '', description: '', dueDate: '', maxMarks: '', instructions: '' };

export default function FacultyCreateAssignment() {
  const { assignments, createAssignment, deleteAssignment } = usePortal();
  const { currentUser } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [tab, setTab] = useState('create'); // 'create' | 'posted'

  const facultyName = currentUser?.name || 'Dr. K. Senthil Nathan';

  // Filter assignments created for faculty's courses
  const facultyAssignments = assignments.filter(
    (a) => a.subjectCode === '3-CSE-DL' || a.faculty === facultyName || a.batch
  );

  const set = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim())       e.title       = 'Assignment title is required.';
    if (!form.batch)              e.batch       = 'Please select a batch.';
    if (!form.type)               e.type        = 'Please select assignment type.';
    if (!form.description.trim()) e.description = 'Description is required.';
    if (!form.dueDate)            e.dueDate     = 'Due date is required.';
    if (!form.maxMarks || isNaN(form.maxMarks) || Number(form.maxMarks) <= 0)
      e.maxMarks = 'Enter a valid maximum marks value.';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    createAssignment({
      title: form.title,
      batch: form.batch,
      type: form.type,
      description: form.description,
      dueDate: form.dueDate,
      maxMarks: form.maxMarks,
      instructions: form.instructions,
      subject: 'Deep Learning',
      subjectCode: '3-CSE-DL',
      faculty: facultyName,
      priority: 'high'
    });

    setSubmitted(true);
  };

  const handleNew = () => { setForm(initialForm); setErrors({}); setSubmitted(false); };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #3b0764, #7c3aed)', borderRadius: '18px', padding: '1.75rem 2rem', color: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
          <FilePlus size={24} color="#c4b5fd" />
          <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800 }}>Create Assignment</h2>
        </div>
        <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.75)' }}>
          Post new assignments for your students · Subject: Deep Learning (3-CSE-DL)
        </p>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          {[{ l: 'Total Posted', v: facultyAssignments.length }, { l: 'Active', v: facultyAssignments.length }].map(s => (
            <div key={s.l} style={{ background: 'rgba(255,255,255,0.12)', borderRadius: '10px', padding: '0.5rem 1.1rem', textAlign: 'center', border: '1px solid rgba(255,255,255,0.15)' }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#c4b5fd' }}>{s.v}</div>
              <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.65)' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tab Switcher */}
      <div style={{ display: 'flex', gap: '0', background: '#f1f5f9', borderRadius: '12px', padding: '0.25rem', width: 'fit-content' }}>
        {[{ id: 'create', label: '+ New Assignment' }, { id: 'posted', label: `Posted (${facultyAssignments.length})` }].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{ padding: '0.55rem 1.25rem', borderRadius: '10px', border: 'none', background: tab === t.id ? '#fff' : 'transparent', color: tab === t.id ? '#7c3aed' : '#64748b', fontWeight: tab === t.id ? 700 : 500, fontSize: '0.875rem', cursor: 'pointer', boxShadow: tab === t.id ? '0 1px 4px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.18s' }}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'create' ? (
        /* ── CREATE FORM ── */
        <div style={{ background: '#fff', borderRadius: '18px', border: '1px solid #e2e8f0', padding: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#f5f3ff', border: '3px solid #ddd6fe', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                <CheckCircle2 size={36} color="#7c3aed" />
              </div>
              <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem', fontWeight: 800, color: '#4c1d95' }}>Assignment Posted Successfully!</h3>
              <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '0.5rem' }}>
                <strong>"{form.title}"</strong> has been posted for Batch <strong>{form.batch}</strong>.
              </p>
              <p style={{ color: '#94a3b8', fontSize: '0.78rem', marginBottom: '2rem' }}>Students will be notified immediately.</p>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                <button onClick={handleNew} style={{ padding: '0.75rem 1.75rem', borderRadius: '12px', background: '#7c3aed', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' }}>Post Another</button>
                <button onClick={() => setTab('posted')} style={{ padding: '0.75rem 1.75rem', borderRadius: '12px', background: '#f1f5f9', color: '#475569', border: '1px solid #e2e8f0', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }}>View Posted</button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FilePlus size={18} color="#7c3aed" /> New Assignment Details
              </h3>

              {/* Title */}
              <Field label="Assignment Title" error={errors.title} required>
                <input value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. CNN Architecture Implementation"
                  style={inputStyle(errors.title)} />
              </Field>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {/* Batch */}
                <Field label="Batch" error={errors.batch} required>
                  <select value={form.batch} onChange={e => set('batch', e.target.value)} style={inputStyle(errors.batch)}>
                    <option value="">-- Select Batch --</option>
                    {BATCHES.map(b => <option key={b}>{b}</option>)}
                  </select>
                </Field>
                {/* Type */}
                <Field label="Assignment Type" error={errors.type} required>
                  <select value={form.type} onChange={e => set('type', e.target.value)} style={inputStyle(errors.type)}>
                    <option value="">-- Select Type --</option>
                    {TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </Field>
                {/* Due Date */}
                <Field label="Due Date" error={errors.dueDate} required>
                  <input type="date" value={form.dueDate} onChange={e => set('dueDate', e.target.value)}
                    min={new Date().toISOString().split('T')[0]} style={inputStyle(errors.dueDate)} />
                </Field>
                {/* Max Marks */}
                <Field label="Maximum Marks" error={errors.maxMarks} required>
                  <input type="number" value={form.maxMarks} onChange={e => set('maxMarks', e.target.value)} placeholder="e.g. 25"
                    min="1" max="100" style={inputStyle(errors.maxMarks)} />
                </Field>
              </div>

              {/* Description */}
              <Field label="Assignment Description" error={errors.description} required>
                <textarea rows={4} value={form.description} onChange={e => set('description', e.target.value)}
                  placeholder="Describe the task, requirements, submission format..."
                  style={{ ...inputStyle(errors.description), resize: 'vertical', lineHeight: 1.6 }} />
              </Field>

              {/* Instructions */}
              <Field label="Additional Instructions" error={null}>
                <textarea rows={3} value={form.instructions} onChange={e => set('instructions', e.target.value)}
                  placeholder="Any special instructions, grading rubric, reference links..."
                  style={{ ...inputStyle(null), resize: 'vertical', lineHeight: 1.6 }} />
              </Field>

              {/* Attachment note */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#64748b', background: '#f8fafc', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <Paperclip size={16} color="#94a3b8" />
                File attachments can be added after posting from the assignment management portal.
              </div>

              <button type="submit" style={{ padding: '0.9rem', borderRadius: '12px', background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', color: '#fff', border: 'none', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 4px 14px rgba(124,58,237,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <Send size={18} /> Post Assignment to Students
              </button>
            </form>
          )}
        </div>
      ) : (
        /* ── POSTED ASSIGNMENTS ── */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {facultyAssignments.map(a => {
            const dueStr = a.dueDate || a.due || 'Nov 15, 2026';
            const postedStr = a.postedDate || a.posted || 'Recent';
            const maxMarksVal = a.maxMarks || a.max || 25;
            const subsCount = a.submissionsCount ?? a.submissions ?? 0;
            const totalCount = a.totalStudents || a.total || 30;
            const pct = Math.min(100, Math.round((subsCount / totalCount) * 100));

            return (
              <div key={a.id} style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', flexWrap: 'wrap' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, background: '#f5f3ff', color: '#7c3aed', border: '1px solid #ddd6fe', padding: '0.15rem 0.55rem', borderRadius: '9999px' }}>{a.type}</span>
                    <span style={{ fontSize: '0.7rem', fontWeight: 600, background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', padding: '0.15rem 0.55rem', borderRadius: '9999px' }}>Batch {a.batch || '24S02'}</span>
                    <span style={{ fontSize: '0.7rem', fontWeight: 600, background: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0', padding: '0.15rem 0.55rem', borderRadius: '9999px' }}>{a.subjectCode || '3-CSE-DL'}</span>
                  </div>
                  <h4 style={{ margin: '0 0 0.3rem', fontSize: '0.98rem', fontWeight: 800, color: '#0f172a' }}>{a.title}</h4>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748b' }}>
                    Posted: {postedStr} &nbsp;·&nbsp; Due: <strong style={{ color: '#dc2626' }}>{dueStr}</strong> &nbsp;·&nbsp; Max: {maxMarksVal} marks
                  </p>
                  {/* Submission progress bar */}
                  <div style={{ marginTop: '0.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748b', marginBottom: '0.25rem' }}>
                      <span>Student Submissions Received</span>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>{subsCount}/{totalCount} ({pct}%)</span>
                    </div>
                    <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #7c3aed, #2563eb)', borderRadius: '9999px', transition: 'width 0.4s' }} />
                    </div>
                  </div>
                </div>
                <button onClick={() => deleteAssignment(a.id)} style={{ padding: '0.45rem', borderRadius: '8px', background: '#fff1f2', color: '#dc2626', border: '1px solid #fecdd3', cursor: 'pointer', flexShrink: 0 }} title="Delete Assignment">
                  <Trash2 size={16} />
                </button>
              </div>
            );
          })}
          {facultyAssignments.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8', background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <FilePlus size={44} style={{ marginBottom: '1rem', opacity: 0.3 }} />
              <p style={{ fontWeight: 600 }}>No assignments posted yet</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Field({ label, error, required, children }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
        {label} {required && <span style={{ color: '#dc2626' }}>*</span>}
      </label>
      {children}
      {error && <p style={{ fontSize: '0.75rem', color: '#dc2626', margin: '4px 0 0', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><AlertCircle size={12} />{error}</p>}
    </div>
  );
}

function inputStyle(hasError) {
  return {
    width: '100%', padding: '0.7rem 1rem', borderRadius: '10px', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box',
    border: `1.5px solid ${hasError ? '#fca5a5' : '#e2e8f0'}`, background: hasError ? '#fff5f5' : '#f8fafc', color: '#0f172a'
  };
}
