import React, { useState } from 'react';
import { CheckSquare, Clock, CheckCircle2, XCircle, Eye, AlertCircle, User, Calendar, Phone } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { useAuth } from '../../context/AuthContext';

const statusStyle = {
  Pending:  { bg: '#fffbeb', border: '#fde68a', color: '#b45309', icon: <Clock size={14} /> },
  Approved: { bg: '#f0fdf4', border: '#bbf7d0', color: '#16a34a', icon: <CheckCircle2 size={14} /> },
  Rejected: { bg: '#fff1f2', border: '#fecdd3', color: '#dc2626', icon: <XCircle size={14} /> },
};

export default function FacultyLeaveApprovals() {
  const { leaves, updateLeaveStatus } = usePortal();
  const { currentUser } = useAuth();
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);
  const [remark, setRemark] = useState('');

  const facultyName = currentUser?.name || 'Dr. K. Senthil Nathan';

  const filtered = filter === 'All' ? leaves : leaves.filter(l => l.status === filter);
  const pending = leaves.filter(l => l.status === 'Pending').length;

  const handleUpdateStatus = (id, status) => {
    updateLeaveStatus(id, status, remark, facultyName);
    setSelected(null);
    setRemark('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #064e3b, #059669)', borderRadius: '18px', padding: '1.75rem 2rem', color: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
          <CheckSquare size={24} color="#a7f3d0" />
          <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800 }}>Leave Approvals</h2>
        </div>
        <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.75)' }}>
          Review and approve/reject student leave applications for your batches
        </p>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          {[{ l: 'Pending', v: pending, c: '#fef08a' }, { l: 'Approved', v: leaves.filter(l=>l.status==='Approved').length, c: '#a7f3d0' }, { l: 'Rejected', v: leaves.filter(l=>l.status==='Rejected').length, c: '#fca5a5' }].map(s => (
            <div key={s.l} style={{ background: 'rgba(255,255,255,0.12)', borderRadius: '10px', padding: '0.5rem 1.1rem', textAlign: 'center', border: '1px solid rgba(255,255,255,0.15)' }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 900, color: s.c }}>{s.v}</div>
              <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.65)' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {['All', 'Pending', 'Approved', 'Rejected'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ padding: '0.45rem 1.15rem', borderRadius: '9999px', border: `1.5px solid ${filter===f ? '#059669' : '#e2e8f0'}`, background: filter===f ? '#059669' : '#fff', color: filter===f ? '#fff' : '#475569', fontSize: '0.83rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.18s' }}>
            {f} {f === 'Pending' && pending > 0 && <span style={{ background: filter==='Pending' ? 'rgba(255,255,255,0.25)' : '#fde68a', color: filter==='Pending'?'#fff':'#92400e', borderRadius: '9999px', padding: '0 0.4rem', fontSize: '0.7rem', marginLeft: '0.3rem', fontWeight: 800 }}>{pending}</span>}
          </button>
        ))}
      </div>

      {/* Leave Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {filtered.map(lv => {
          const st = statusStyle[lv.status];
          return (
            <div key={lv.id} style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
              <div style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', flex: 1 }}>
                  {/* Avatar */}
                  <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#eff6ff', border: '2px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 800, color: '#2563eb', flexShrink: 0 }}>
                    {lv.student.charAt(0)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
                      <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>{lv.student}</span>
                      <span style={{ fontSize: '0.68rem', background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', padding: '0.1rem 0.5rem', borderRadius: '9999px', fontWeight: 600 }}>{lv.reg}</span>
                      <span style={{ fontSize: '0.68rem', background: '#f5f3ff', color: '#7c3aed', border: '1px solid #ddd6fe', padding: '0.1rem 0.5rem', borderRadius: '9999px', fontWeight: 600 }}>Batch {lv.batch || '24S02'}</span>
                      {lv.parentPhone && (
                        <span style={{ fontSize: '0.68rem', background: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0', padding: '0.1rem 0.5rem', borderRadius: '9999px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                          <Phone size={10} /> {lv.parentPhone}
                        </span>
                      )}
                    </div>
                    <p style={{ margin: '0 0 0.3rem', fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>{lv.type}</p>
                    <p style={{ margin: '0 0 0.3rem', fontSize: '0.78rem', color: '#64748b' }}>
                      📅 {lv.from || lv.fromDate} → {lv.to || lv.toDate} &nbsp;·&nbsp; <strong>{lv.days} day{lv.days > 1 ? 's' : ''}</strong> &nbsp;·&nbsp; Applied: {lv.applied || lv.appliedOn}
                    </p>
                    <p style={{ margin: 0, fontSize: '0.78rem', color: '#475569', lineHeight: 1.5 }}>{lv.reason}</p>
                    {lv.remark && (
                      <div style={{ marginTop: '0.45rem', padding: '0.35rem 0.65rem', background: '#f8fafc', borderRadius: '6px', borderLeft: `3px solid ${st.color}`, fontSize: '0.74rem', color: '#334155' }}>
                        <strong>Remark:</strong> {lv.remark} {lv.approvedBy ? `(by ${lv.approvedBy})` : ''}
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem', flexShrink: 0 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: st.bg, border: `1px solid ${st.border}`, color: st.color, fontSize: '0.72rem', fontWeight: 700, padding: '0.25rem 0.75rem', borderRadius: '9999px' }}>
                    {st.icon} {lv.status}
                  </span>
                  {lv.status === 'Pending' && (
                    <button onClick={() => { setSelected(lv); setRemark(''); }} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.4rem 0.9rem', borderRadius: '8px', background: '#2563eb', color: '#fff', border: 'none', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}>
                      <Eye size={13} /> Review
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
            <CheckCircle2 size={44} style={{ marginBottom: '1rem', opacity: 0.4 }} />
            <p style={{ fontWeight: 600 }}>No {filter} leave requests</p>
          </div>
        )}
      </div>

      {/* Review Modal */}
      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }} onClick={() => setSelected(null)}>
          <div style={{ background: '#fff', borderRadius: '20px', padding: '2rem', maxWidth: '480px', width: '100%', boxShadow: '0 25px 50px rgba(0,0,0,0.2)' }} onClick={e => e.stopPropagation()}>
            <h3 style={{ margin: '0 0 1rem', fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>Review Leave Request</h3>
            <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '1rem', marginBottom: '1rem', fontSize: '0.85rem', color: '#334155', lineHeight: 1.7 }}>
              <strong>Student:</strong> {selected.student} ({selected.reg})<br />
              <strong>Batch:</strong> {selected.batch || '24S02'}<br />
              <strong>Leave Type:</strong> {selected.type}<br />
              <strong>Duration:</strong> {selected.from || selected.fromDate} → {selected.to || selected.toDate} ({selected.days} day{selected.days > 1 ? 's' : ''})<br />
              {selected.parentPhone && <><strong>Parent Phone:</strong> {selected.parentPhone}<br /></>}
              <strong>Reason:</strong> {selected.reason}
            </div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>Faculty Remark (optional)</label>
            <textarea rows={3} value={remark} onChange={e => setRemark(e.target.value)} placeholder="e.g. Approved. Submit doctor certificate upon return." style={{ width: '100%', padding: '0.7rem', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '0.88rem', resize: 'vertical', outline: 'none', boxSizing: 'border-box', marginBottom: '1.25rem' }} />
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={() => handleUpdateStatus(selected.id, 'Approved')} style={{ flex: 1, padding: '0.75rem', borderRadius: '10px', background: '#059669', color: '#fff', border: 'none', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={16} /> Approve
              </button>
              <button onClick={() => handleUpdateStatus(selected.id, 'Rejected')} style={{ flex: 1, padding: '0.75rem', borderRadius: '10px', background: '#dc2626', color: '#fff', border: 'none', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                <XCircle size={16} /> Reject
              </button>
              <button onClick={() => setSelected(null)} style={{ padding: '0.75rem 1.25rem', borderRadius: '10px', background: '#f1f5f9', color: '#475569', border: '1px solid #e2e8f0', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
