import React, { useState } from 'react';
import {
  CalendarOff, Send, CheckCircle2, Clock,
  AlertCircle, FileText, User, Calendar, Info, XCircle
} from 'lucide-react';
import { leaveTypes } from '../data/mockData';
import { usePortal } from '../context/PortalContext';
import { useAuth } from '../context/AuthContext';

const initialForm = {
  leaveType: '',
  fromDate: '',
  toDate: '',
  reason: '',
  parentPhone: '',
  attachmentName: ''
};

const statusStyle = {
  Approved: { bg: '#f0fdf4', border: '#bbf7d0', color: '#16a34a', icon: <CheckCircle2 size={14} /> },
  Pending: { bg: '#fffbeb', border: '#fde68a', color: '#b45309', icon: <Clock size={14} /> },
  Rejected: { bg: '#fff1f2', border: '#fecdd3', color: '#dc2626', icon: <XCircle size={14} /> }
};

export default function LeaveApplyPage() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const { studentProfile } = useAuth();
  const { leaves, applyLeave, showToast } = usePortal();

  const studentName = studentProfile?.name || 'Arun Kumar M';
  const studentReg = studentProfile?.registerNumber || '99240040191';

  // Filter leaves applicable to this student
  const myLeaves = leaves.filter(
    (l) => l.reg === studentReg || l.student === studentName
  );

  const daysDiff = (from, to) => {
    if (!from || !to) return 0;
    const d = (new Date(to) - new Date(from)) / (1000 * 60 * 60 * 24) + 1;
    return d > 0 ? d : 0;
  };

  const validate = () => {
    const e = {};
    if (!form.leaveType) e.leaveType = 'Please select a leave type.';
    if (!form.fromDate) e.fromDate = 'Start date is required.';
    if (!form.toDate) e.toDate = 'End date is required.';
    if (form.fromDate && form.toDate && form.toDate < form.fromDate)
      e.toDate = 'End date must be after start date.';
    if (!form.reason.trim() || form.reason.trim().length < 20)
      e.reason = 'Please provide a detailed reason (min. 20 characters).';
    if (form.parentPhone && !/^\d{10}$/.test(form.parentPhone))
      e.parentPhone = 'Enter a valid 10-digit mobile number.';
    return e;
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const leaveDays = daysDiff(form.fromDate, form.toDate);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      applyLeave({
        leaveType: form.leaveType,
        fromDate: form.fromDate,
        toDate: form.toDate,
        days: leaveDays,
        reason: form.reason,
        parentPhone: form.parentPhone,
        studentName: studentName,
        regNo: studentReg,
        batch: studentProfile?.batch || '24S02'
      });
      setSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  const handleNew = () => {
    setForm(initialForm);
    setErrors({});
    setSubmitted(false);
  };

  const approvedCount = myLeaves.filter(l => l.status === 'Approved').length;
  const pendingCount = myLeaves.filter(l => l.status === 'Pending').length;
  const rejectedCount = myLeaves.filter(l => l.status === 'Rejected').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #064e3b 0%, #065f46 60%, #059669 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem 2.25rem',
          color: '#ffffff',
          boxShadow: 'var(--shadow-md)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <CalendarOff size={26} color="#a7f3d0" />
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0 }}>Leave Application</h1>
        </div>
        <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.8)', margin: 0 }}>
          Submit and track your leave requests · Synced directly with Faculty Portal for instant review
        </p>
        <div style={{ display: 'flex', gap: '1.25rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
          {[
            { label: 'Applied', value: myLeaves.length },
            { label: 'Approved', value: approvedCount },
            { label: 'Pending', value: pendingCount },
            { label: 'Rejected', value: rejectedCount }
          ].map((s) => (
            <div key={s.label} style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 'var(--radius-md)', padding: '0.6rem 1.25rem', textAlign: 'center', minWidth: '75px' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#a7f3d0' }}>{s.value}</div>
              <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.4fr) minmax(0,1fr)', gap: '1.5rem', alignItems: 'start' }}>
        {/* LEFT: Application Form */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--slate-200)',
            padding: '2rem',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          {submitted ? (
            /* Success State */
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#f0fdf4', border: '3px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                <CheckCircle2 size={36} color="#16a34a" />
              </div>
              <h2 style={{ fontWeight: 800, color: '#166534', fontSize: '1.3rem', marginBottom: '0.5rem' }}>Leave Applied Successfully!</h2>
              <p style={{ color: 'var(--slate-600)', fontSize: '0.88rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                Your leave application has been submitted and is pending approval from your Class Advisor. You'll receive a notification once it's reviewed.
              </p>
              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1.5rem', textAlign: 'left' }}>
                <p style={{ fontSize: '0.82rem', color: '#166534', margin: 0, lineHeight: 1.7 }}>
                  <strong>Type:</strong> {form.leaveType}<br />
                  <strong>Duration:</strong> {form.fromDate} → {form.toDate} ({leaveDays} day{leaveDays > 1 ? 's' : ''})<br />
                  <strong>Reason:</strong> {form.reason.slice(0, 80)}...
                </p>
              </div>
              <button
                onClick={handleNew}
                style={{
                  padding: '0.75rem 2rem',
                  background: 'var(--primary-600)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                Apply for Another Leave
              </button>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--slate-800)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={18} color="var(--primary-600)" />
                New Leave Application
              </h2>

              {/* Leave Type */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--slate-700)', marginBottom: '0.4rem' }}>
                  Leave Type <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <select
                  value={form.leaveType}
                  onChange={(e) => handleChange('leaveType', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.7rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: `1.5px solid ${errors.leaveType ? '#fca5a5' : 'var(--slate-300)'}`,
                    fontSize: '0.9rem',
                    color: form.leaveType ? 'var(--slate-800)' : 'var(--slate-400)',
                    background: '#fff',
                    outline: 'none'
                  }}
                >
                  <option value="">-- Select Leave Type --</option>
                  {leaveTypes.map((t) => (
                    <option key={t.value} value={t.label}>{t.label}</option>
                  ))}
                </select>
                {errors.leaveType && <p style={{ fontSize: '0.75rem', color: '#dc2626', margin: '4px 0 0' }}>{errors.leaveType}</p>}
              </div>

              {/* Date Range */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                {[
                  { field: 'fromDate', label: 'From Date', icon: <Calendar size={14} /> },
                  { field: 'toDate', label: 'To Date', icon: <Calendar size={14} /> }
                ].map(({ field, label, icon }) => (
                  <div key={field}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--slate-700)', marginBottom: '0.4rem' }}>
                      {label} <span style={{ color: '#dc2626' }}>*</span>
                    </label>
                    <input
                      type="date"
                      value={form[field]}
                      onChange={(e) => handleChange(field, e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      style={{
                        width: '100%',
                        padding: '0.7rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        border: `1.5px solid ${errors[field] ? '#fca5a5' : 'var(--slate-300)'}`,
                        fontSize: '0.9rem',
                        boxSizing: 'border-box',
                        outline: 'none'
                      }}
                    />
                    {errors[field] && <p style={{ fontSize: '0.75rem', color: '#dc2626', margin: '4px 0 0' }}>{errors[field]}</p>}
                  </div>
                ))}
              </div>

              {/* Days Preview */}
              {leaveDays > 0 && (
                <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 'var(--radius-md)', padding: '0.75rem 1rem', marginBottom: '1.25rem', fontSize: '0.85rem', color: '#1e40af', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Info size={16} />
                  <strong>{leaveDays} working day{leaveDays > 1 ? 's' : ''}</strong> of leave requested
                </div>
              )}

              {/* Reason */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--slate-700)', marginBottom: '0.4rem' }}>
                  Reason for Leave <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <textarea
                  rows={4}
                  value={form.reason}
                  onChange={(e) => handleChange('reason', e.target.value)}
                  placeholder="Describe your reason clearly (minimum 20 characters)..."
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: `1.5px solid ${errors.reason ? '#fca5a5' : 'var(--slate-300)'}`,
                    fontSize: '0.88rem',
                    resize: 'vertical',
                    boxSizing: 'border-box',
                    outline: 'none',
                    lineHeight: 1.6
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                  {errors.reason && <p style={{ fontSize: '0.75rem', color: '#dc2626', margin: 0 }}>{errors.reason}</p>}
                  <span style={{ fontSize: '0.72rem', color: 'var(--slate-400)', marginLeft: 'auto' }}>{form.reason.length} chars</span>
                </div>
              </div>

              {/* Parent Phone (Optional) */}
              <div style={{ marginBottom: '1.75rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--slate-700)', marginBottom: '0.4rem' }}>
                  Parent / Guardian Contact <span style={{ fontSize: '0.72rem', fontWeight: 500, color: 'var(--slate-400)' }}>(optional)</span>
                </label>
                <input
                  type="tel"
                  value={form.parentPhone}
                  onChange={(e) => handleChange('parentPhone', e.target.value)}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  style={{
                    width: '100%',
                    padding: '0.7rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: `1.5px solid ${errors.parentPhone ? '#fca5a5' : 'var(--slate-300)'}`,
                    fontSize: '0.9rem',
                    boxSizing: 'border-box',
                    outline: 'none'
                  }}
                />
                {errors.parentPhone && <p style={{ fontSize: '0.75rem', color: '#dc2626', margin: '4px 0 0' }}>{errors.parentPhone}</p>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                style={{
                  width: '100%',
                  padding: '0.9rem',
                  background: submitting ? 'var(--slate-400)' : '#059669',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  transition: 'background 0.2s ease'
                }}
              >
                {submitting ? (
                  <>
                    <div style={{ width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.4)', borderTop: '2px solid #fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Submit Leave Application
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* RIGHT: Leave History */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--slate-200)',
            padding: '1.75rem',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--slate-800)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={18} color="var(--primary-600)" />
            Leave History
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {myLeaves.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--slate-400)' }}>
                <Clock size={32} style={{ opacity: 0.4, marginBottom: '0.5rem' }} />
                <p style={{ margin: 0, fontSize: '0.85rem' }}>No leave applications yet.</p>
              </div>
            ) : (
              myLeaves.map((lv) => {
                const st = statusStyle[lv.status] || statusStyle.Pending;
                const fromDateStr = lv.from || lv.fromDate;
                const toDateStr = lv.to || lv.toDate;
                const appliedDateStr = lv.applied || lv.appliedOn;

                return (
                  <div
                    key={lv.id}
                    style={{
                      padding: '1rem',
                      borderRadius: 'var(--radius-lg)',
                      background: st.bg,
                      border: `1px solid ${st.border}`
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--slate-800)' }}>{lv.type}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.72rem', fontWeight: 700, color: st.color }}>
                        {st.icon} {lv.status}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--slate-600)', margin: '0 0 0.3rem' }}>
                      📅 {fromDateStr} → {toDateStr} &nbsp;·&nbsp; <strong>{lv.days} day{lv.days > 1 ? 's' : ''}</strong>
                    </p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--slate-500)', margin: '0 0 0.25rem', lineHeight: 1.5 }}>
                      {lv.reason}
                    </p>
                    {lv.remark && (
                      <div style={{ marginTop: '0.4rem', padding: '0.35rem 0.6rem', background: 'rgba(255,255,255,0.7)', borderRadius: '6px', borderLeft: `3px solid ${st.color}`, fontSize: '0.72rem', color: '#334155' }}>
                        <strong>Faculty Note:</strong> {lv.remark}
                      </div>
                    )}
                    {lv.approvedBy && (
                      <p style={{ fontSize: '0.72rem', color: lv.status === 'Approved' ? '#16a34a' : '#dc2626', margin: '4px 0 0', fontWeight: 600 }}>
                        {lv.status === 'Approved' ? '✓ Approved by' : '✗ Reviewed by'}: {lv.approvedBy}
                      </p>
                    )}
                    <p style={{ fontSize: '0.68rem', color: 'var(--slate-400)', margin: '4px 0 0' }}>
                      Applied on: {appliedDateStr}
                    </p>
                  </div>
                );
              })
            )}
          </div>

          {/* Info Box */}
          <div
            style={{
              marginTop: '1.25rem',
              padding: '0.85rem 1rem',
              background: '#eff6ff',
              border: '1px solid #bfdbfe',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.78rem',
              color: '#1e40af',
              lineHeight: 1.6
            }}
          >
            <strong>ℹ️ Note:</strong> Leave applications are processed within 24 hours. Ensure parent confirmation for leaves exceeding 2 days.
          </div>
        </div>
      </div>

      {/* CSS animation for spinner */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
