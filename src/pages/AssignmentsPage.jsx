import React, { useState } from 'react';
import {
  FileText, Clock, CheckCircle2, AlertCircle,
  Upload, Paperclip, Filter, ChevronRight, X, FileCheck
} from 'lucide-react';
import { usePortal } from '../context/PortalContext';

const statusStyles = {
  Pending: {
    bg: '#fff7ed',
    border: '#fed7aa',
    text: '#c2410c',
    icon: <AlertCircle size={14} color="#ea580c" />
  },
  Submitted: {
    bg: '#f0fdf4',
    border: '#bbf7d0',
    text: '#16a34a',
    icon: <CheckCircle2 size={14} color="#16a34a" />
  }
};

const priorityColor = { high: '#dc2626', medium: '#d97706', low: '#059669' };

const subjectColors = {
  '3-CSE-DL': '#7c3aed',
  '3-CSE-CN': '#059669',
  '3-CSE-OS': '#d97706',
  '3-CSE-DAA': '#2563eb'
};

export default function AssignmentsPage() {
  const { assignments, submitAssignment } = usePortal();
  const [filter, setFilter] = useState('All');
  const [expanded, setExpanded] = useState(null);
  const [submittingModal, setSubmittingModal] = useState(null);
  const [submissionFileName, setSubmissionFileName] = useState('');
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filters = ['All', 'Pending', 'Submitted'];

  const filtered = filter === 'All'
    ? assignments
    : assignments.filter((a) => a.status === filter);

  const pendingCount = assignments.filter((a) => a.status === 'Pending').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, var(--primary-700) 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem 2.25rem',
          color: '#ffffff',
          boxShadow: 'var(--shadow-md)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <FileText size={26} color="#fde68a" />
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0 }}>Assignments</h1>
        </div>
        <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.8)', margin: 0 }}>
          Semester 5 – ODD 2026–27 &nbsp;·&nbsp; Track, view and submit your assignments
        </p>
        <div style={{ display: 'flex', gap: '1.25rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
          {[
            { label: 'Total', value: assignments.length, color: '#e0e7ff' },
            { label: 'Pending', value: pendingCount, color: '#fecaca' },
            { label: 'Submitted', value: assignments.length - pendingCount, color: '#bbf7d0' }
          ].map((s) => (
            <div key={s.label} style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 'var(--radius-md)', padding: '0.6rem 1.25rem', textAlign: 'center', minWidth: '80px' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: '9999px',
              border: `1.5px solid ${filter === f ? 'var(--primary-600)' : 'var(--slate-200)'}`,
              background: filter === f ? 'var(--primary-600)' : '#ffffff',
              color: filter === f ? '#ffffff' : 'var(--slate-600)',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {f}
            {f === 'Pending' && pendingCount > 0 && (
              <span
                style={{
                  marginLeft: '0.5rem',
                  background: filter === f ? 'rgba(255,255,255,0.25)' : '#fecaca',
                  color: filter === f ? '#fff' : '#dc2626',
                  borderRadius: '9999px',
                  padding: '0.1rem 0.45rem',
                  fontSize: '0.72rem',
                  fontWeight: 800
                }}
              >
                {pendingCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Assignment Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filtered.map((asgn) => {
          const st = statusStyles[asgn.status];
          const subColor = subjectColors[asgn.subjectCode] || 'var(--primary-600)';
          const isOpen = expanded === asgn.id;

          return (
            <div
              key={asgn.id}
              style={{
                background: '#ffffff',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--slate-200)',
                boxShadow: isOpen ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                overflow: 'hidden',
                transition: 'all 0.2s ease'
              }}
            >
              {/* Assignment Row */}
              <div
                style={{ padding: '1.25rem 1.5rem', cursor: 'pointer', display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}
                onClick={() => setExpanded(isOpen ? null : asgn.id)}
              >
                {/* Subject Color Bar */}
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '12px',
                    background: subColor + '18',
                    border: `2px solid ${subColor}30`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    color: subColor
                  }}
                >
                  {asgn.subjectCode.split('-')[2]}
                </div>

                <div style={{ flex: 1 }}>
                  {/* Top Row: Title + Status */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 700, background: subColor + '15', color: subColor, padding: '0.15rem 0.5rem', borderRadius: '9999px', border: `1px solid ${subColor}30` }}>
                          {asgn.subjectCode}
                        </span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--slate-400)', background: 'var(--slate-100)', padding: '0.15rem 0.5rem', borderRadius: '9999px' }}>
                          {asgn.type}
                        </span>
                        <span style={{ fontSize: '0.7rem', fontWeight: 700, color: priorityColor[asgn.priority] }}>
                          ● {asgn.priority.charAt(0).toUpperCase() + asgn.priority.slice(1)} Priority
                        </span>
                      </div>
                      <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--slate-900)', margin: 0 }}>{asgn.title}</h3>
                      <p style={{ fontSize: '0.78rem', color: 'var(--slate-500)', margin: '3px 0 0' }}>{asgn.faculty} &nbsp;·&nbsp; {asgn.subject}</p>
                    </div>

                    {/* Status Badge */}
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        background: st.bg,
                        border: `1px solid ${st.border}`,
                        color: st.text,
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '0.3rem 0.8rem',
                        borderRadius: '9999px',
                        whiteSpace: 'nowrap',
                        flexShrink: 0
                      }}
                    >
                      {st.icon} {asgn.status}
                    </span>
                  </div>

                  {/* Footer Row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', color: 'var(--slate-500)' }}>
                      <Clock size={13} color="var(--slate-400)" />
                      Due: <strong style={{ color: asgn.status === 'Pending' ? '#dc2626' : 'var(--slate-600)' }}>{asgn.dueDate}</strong>
                    </span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--slate-500)' }}>
                      Max Marks: <strong>{asgn.maxMarks}</strong>
                    </span>
                    {asgn.submittedDate && (
                      <span style={{ fontSize: '0.78rem', color: '#16a34a' }}>
                        ✔ Submitted on {asgn.submittedDate}
                      </span>
                    )}
                    <span style={{ marginLeft: 'auto', color: 'var(--primary-600)', fontSize: '0.78rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px' }}>
                      {isOpen ? 'Collapse' : 'Details'} <ChevronRight size={14} style={{ transform: isOpen ? 'rotate(90deg)' : 'none', transition: '0.2s' }} />
                    </span>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {isOpen && (
                <div
                  style={{
                    padding: '1.5rem',
                    borderTop: `2px solid ${subColor}30`,
                    background: subColor + '06',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                  }}
                >
                  {/* Description */}
                  <div>
                    <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--slate-600)', margin: '0 0 0.5rem' }}>DESCRIPTION</p>
                    <p style={{ fontSize: '0.88rem', color: 'var(--slate-700)', lineHeight: 1.7, margin: 0 }}>{asgn.description}</p>
                  </div>

                  {/* Instructions if present */}
                  {asgn.instructions && (
                    <div>
                      <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--slate-600)', margin: '0 0 0.3rem' }}>INSTRUCTIONS</p>
                      <p style={{ fontSize: '0.85rem', color: 'var(--slate-700)', margin: 0 }}>{asgn.instructions}</p>
                    </div>
                  )}

                  {/* Attachments */}
                  {asgn.attachments && asgn.attachments.length > 0 && (
                    <div>
                      <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--slate-600)', margin: '0 0 0.5rem' }}>ATTACHED FILES</p>
                      {asgn.attachments.map((att, i) => (
                        <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#ffffff', border: '1px solid var(--slate-200)', borderRadius: '8px', padding: '0.4rem 0.8rem', fontSize: '0.8rem', color: 'var(--primary-700)', fontWeight: 600, cursor: 'pointer', marginRight: '0.5rem' }}>
                          <Paperclip size={13} color="var(--primary-600)" />
                          {att}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Submitted File Info */}
                  {asgn.status === 'Submitted' && (
                    <div style={{ padding: '0.85rem 1rem', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <FileCheck size={20} color="#16a34a" />
                      <div>
                        <p style={{ margin: 0, fontSize: '0.82rem', fontWeight: 700, color: '#166534' }}>
                          Assignment Submitted Successfully
                        </p>
                        <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: '#15803d' }}>
                          File: {asgn.submittedFile || 'Assignment_Submission.pdf'} &nbsp;·&nbsp; Submitted on {asgn.submittedDate}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Submit Button – only for pending */}
                  {asgn.status === 'Pending' && (
                    <div>
                      <button
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          background: 'var(--primary-600)',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: 'var(--radius-md)',
                          padding: '0.75rem 1.5rem',
                          fontSize: '0.88rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'background 0.2s ease',
                          boxShadow: 'var(--shadow-sm)'
                        }}
                        onClick={() => {
                          setSubmittingModal(asgn);
                          const safeCode = (asgn.subjectCode || 'Assignment').replace(/[^a-zA-Z0-9]/g, '_');
                          setSubmissionFileName(`99240040191_${safeCode}_Solution.pdf`);
                          setSubmissionNotes('');
                        }}
                      >
                        <Upload size={16} />
                        Upload & Submit Assignment
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--slate-400)' }}>
            <CheckCircle2 size={48} style={{ marginBottom: '1rem', opacity: 0.4 }} />
            <p style={{ fontWeight: 600 }}>No {filter} assignments</p>
          </div>
        )}
      </div>

      {/* Submission Modal */}
      {submittingModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '1rem'
          }}
          onClick={() => !isSubmitting && setSubmittingModal(null)}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '2rem',
              maxWidth: '520px',
              width: '100%',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Upload size={20} color="var(--primary-600)" />
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                  Submit Assignment
                </h3>
              </div>
              <button
                onClick={() => setSubmittingModal(null)}
                style={{ background: 'none', border: 'none', color: 'var(--slate-400)', cursor: 'pointer', padding: '0.25rem' }}
                disabled={isSubmitting}
              >
                <X size={18} />
              </button>
            </div>

            {/* Assignment Summary Banner */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '0.25rem' }}>
                {submittingModal.title}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--slate-600)', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <span>Subject: <strong>{submittingModal.subject}</strong></span>
                <span>Due: <strong style={{ color: '#dc2626' }}>{submittingModal.dueDate}</strong></span>
                <span>Max Marks: <strong>{submittingModal.maxMarks}</strong></span>
              </div>
            </div>

            {/* File Upload Box */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--slate-700)', marginBottom: '0.4rem' }}>
                Select / Enter Submission File Name <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <Paperclip size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--slate-400)' }} />
                <input
                  type="text"
                  value={submissionFileName}
                  onChange={(e) => setSubmissionFileName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.7rem 0.85rem 0.7rem 2.4rem',
                    borderRadius: '10px',
                    border: '1.5px solid var(--slate-300)',
                    fontSize: '0.85rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Enter file name (e.g. Solution_v1.pdf)"
                />
              </div>
              <p style={{ margin: '4px 0 0', fontSize: '0.72rem', color: 'var(--slate-400)' }}>
                Accepted formats: PDF, ZIP, IPYNB, DOCX (Max: 50MB)
              </p>
            </div>

            {/* Optional Comments */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--slate-700)', marginBottom: '0.4rem' }}>
                Student Submission Notes (optional)
              </label>
              <textarea
                rows={3}
                value={submissionNotes}
                onChange={(e) => setSubmissionNotes(e.target.value)}
                placeholder="Add any notes for the faculty (e.g. dataset link, test accuracy achieved, special instructions)..."
                style={{
                  width: '100%',
                  padding: '0.7rem',
                  borderRadius: '10px',
                  border: '1.5px solid var(--slate-300)',
                  fontSize: '0.85rem',
                  outline: 'none',
                  resize: 'vertical',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={() => {
                  if (!submissionFileName.trim()) return;
                  setIsSubmitting(true);
                  setTimeout(() => {
                    submitAssignment(submittingModal.id, {
                      fileName: submissionFileName.trim(),
                      notes: submissionNotes.trim()
                    });
                    setIsSubmitting(false);
                    setSubmittingModal(null);
                  }, 800);
                }}
                disabled={isSubmitting || !submissionFileName.trim()}
                style={{
                  flex: 1,
                  padding: '0.8rem',
                  borderRadius: '12px',
                  background: 'var(--primary-600)',
                  color: '#ffffff',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                {isSubmitting ? (
                  <>
                    <div style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.4)', borderTop: '2px solid #fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={16} /> Confirm & Submit Assignment
                  </>
                )}
              </button>
              <button
                onClick={() => setSubmittingModal(null)}
                disabled={isSubmitting}
                style={{
                  padding: '0.8rem 1.25rem',
                  borderRadius: '12px',
                  background: '#f1f5f9',
                  color: 'var(--slate-600)',
                  border: '1px solid #e2e8f0',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Spinner animation */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
