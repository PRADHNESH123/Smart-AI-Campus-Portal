import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  BookOpen,
  Calendar,
  Layers,
  Award,
  Building,
  Edit3,
  KeyRound,
  CheckCircle2,
  X,
  ShieldCheck,
  MapPin,
  Clock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usePortal } from '../context/PortalContext';

export default function StudentProfilePage() {
  const { studentProfile, updateProfile } = useAuth();
  const { showToast, addCustomActivity } = usePortal();

  // Edit Profile Modal State
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: studentProfile.name,
    email: studentProfile.email,
    phone: studentProfile.phone,
    address: studentProfile.address
  });

  // Change Password Modal State
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    addCustomActivity('Profile Updated', 'Contact and personal details updated successfully', 'Academic');
    showToast('Profile information successfully saved!', 'success');
    setIsEditOpen(false);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setPasswordError('');

    if (passwordForm.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters.');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New password and confirm password do not match.');
      return;
    }

    addCustomActivity('Password Changed', 'Account security credentials updated', 'Security');
    showToast('Password changed successfully!', 'success');
    setIsPasswordModalOpen(false);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Top Profile Hero Card */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--slate-200)',
          boxShadow: 'var(--shadow-sm)',
          overflow: 'hidden'
        }}
      >
        {/* Cover strip */}
        <div
          style={{
            height: '130px',
            background: 'linear-gradient(135deg, var(--primary-800) 0%, var(--primary-600) 50%, var(--secondary-500) 100%)',
            position: 'relative'
          }}
        />

        {/* Profile Content Container */}
        <div style={{ padding: '0 2rem 2rem', position: 'relative' }}>
          {/* Avatar & Header Row */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '1.5rem',
              marginTop: '-50px',
              marginBottom: '1.5rem'
            }}
          >
            {/* Avatar Photo Box */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1.25rem' }}>
              <div
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '24px',
                  background: 'linear-gradient(135deg, var(--primary-700) 0%, var(--primary-900) 100%)',
                  color: '#ffffff',
                  fontSize: '2.2rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '4px solid #ffffff',
                  boxShadow: 'var(--shadow-md)',
                  flexShrink: 0
                }}
              >
                {studentProfile?.name ? studentProfile.name.trim().charAt(0).toUpperCase() : 'S'}
              </div>

              <div style={{ paddingBottom: '0.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--slate-900)', margin: 0 }}>
                    {studentProfile.name}
                  </h1>
                  <span className="uni-pill success" style={{ fontSize: '0.72rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                    <ShieldCheck size={13} />
                    Verified Student
                  </span>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--slate-500)', margin: '2px 0 0' }}>
                  Register No: <strong style={{ color: 'var(--primary-700)' }}>{studentProfile.registerNumber}</strong>
                </p>
              </div>
            </div>

            {/* Action Buttons: [Edit Profile] & [Change Password] */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingBottom: '0.25rem' }}>
              <button
                onClick={() => {
                  setFormData({
                    name: studentProfile.name,
                    email: studentProfile.email,
                    phone: studentProfile.phone,
                    address: studentProfile.address
                  });
                  setIsEditOpen(true);
                }}
                className="uni-btn outline"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.6rem 1.25rem',
                  fontSize: '0.88rem'
                }}
              >
                <Edit3 size={16} />
                <span>Edit Profile</span>
              </button>

              <button
                onClick={() => setIsPasswordModalOpen(true)}
                className="uni-btn primary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.6rem 1.25rem',
                  fontSize: '0.88rem'
                }}
              >
                <KeyRound size={16} />
                <span>Change Password</span>
              </button>
            </div>
          </div>

          {/* Academic Info Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
              marginTop: '1.5rem',
              borderTop: '1px solid var(--slate-100)',
              paddingTop: '1.5rem'
            }}
          >
            {/* Academic Details Block */}
            <div
              style={{
                background: 'var(--slate-50)',
                padding: '1.5rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--slate-200)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.1rem'
              }}
            >
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--slate-800)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <BookOpen size={18} color="var(--primary-600)" />
                Academic Information
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.85rem' }}>
                <div>
                  <span style={{ color: 'var(--slate-400)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>Program</span>
                  <p style={{ fontWeight: 600, color: 'var(--slate-800)', margin: '2px 0 0' }}>{studentProfile.program}</p>
                </div>

                <div>
                  <span style={{ color: 'var(--slate-400)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>Department</span>
                  <p style={{ fontWeight: 600, color: 'var(--slate-800)', margin: '2px 0 0' }}>{studentProfile.department}</p>
                </div>

                <div>
                  <span style={{ color: 'var(--slate-400)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>Current Year</span>
                  <p style={{ fontWeight: 600, color: 'var(--slate-800)', margin: '2px 0 0' }}>{studentProfile.year}</p>
                </div>

                <div>
                  <span style={{ color: 'var(--slate-400)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>Semester</span>
                  <p style={{ fontWeight: 600, color: 'var(--slate-800)', margin: '2px 0 0' }}>{studentProfile.semester}</p>
                </div>

                <div>
                  <span style={{ color: 'var(--slate-400)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>Section</span>
                  <p style={{ fontWeight: 600, color: 'var(--slate-800)', margin: '2px 0 0' }}>Section '{studentProfile.section}'</p>
                </div>

                <div>
                  <span style={{ color: 'var(--slate-400)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>Cumulative CGPA</span>
                  <p style={{ fontWeight: 700, color: 'var(--primary-600)', margin: '2px 0 0' }}>{studentProfile.cgpa} / 10.0</p>
                </div>

                <div>
                  <span style={{ color: 'var(--slate-400)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>Batch</span>
                  <p style={{ fontWeight: 600, color: 'var(--slate-800)', margin: '2px 0 0' }}>{studentProfile.batch}</p>
                </div>

                <div>
                  <span style={{ color: 'var(--slate-400)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>Academic Status</span>
                  <p style={{ fontWeight: 600, color: '#16a34a', margin: '2px 0 0' }}>{studentProfile.academicStatus}</p>
                </div>
              </div>
            </div>

            {/* Contact & Personal Information Block */}
            <div
              style={{
                background: 'var(--slate-50)',
                padding: '1.5rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--slate-200)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.1rem'
              }}
            >
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--slate-800)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={18} color="var(--primary-600)" />
                Contact Details
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', fontSize: '0.85rem' }}>
                <div>
                  <span style={{ color: 'var(--slate-400)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>Institutional Email</span>
                  <p style={{ fontWeight: 600, color: 'var(--primary-700)', margin: '2px 0 0' }}>{studentProfile.email}</p>
                </div>

                <div>
                  <span style={{ color: 'var(--slate-400)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>Phone Number</span>
                  <p style={{ fontWeight: 600, color: 'var(--slate-800)', margin: '2px 0 0' }}>{studentProfile.phone}</p>
                </div>

                <div>
                  <span style={{ color: 'var(--slate-400)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>Hostel / Campus Residence</span>
                  <p style={{ fontWeight: 600, color: 'var(--slate-800)', margin: '2px 0 0' }}>{studentProfile.hostel}</p>
                </div>

                <div>
                  <span style={{ color: 'var(--slate-400)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>Campus Address</span>
                  <p style={{ fontWeight: 600, color: 'var(--slate-800)', margin: '2px 0 0' }}>{studentProfile.address}</p>
                </div>

                <div>
                  <span style={{ color: 'var(--slate-400)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>Faculty Advisor</span>
                  <p style={{ fontWeight: 600, color: 'var(--slate-800)', margin: '2px 0 0' }}>{studentProfile.advisor}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            zIndex: 100
          }}
          onClick={() => setIsEditOpen(false)}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem',
              maxWidth: '500px',
              width: '100%',
              boxShadow: 'var(--shadow-xl)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: 'var(--slate-900)' }}>
                Edit Student Profile
              </h3>
              <button
                onClick={() => setIsEditOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--slate-400)' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--slate-700)', marginBottom: '0.35rem' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--slate-300)',
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--slate-700)', marginBottom: '0.35rem' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--slate-300)',
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--slate-700)', marginBottom: '0.35rem' }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--slate-300)',
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--slate-700)', marginBottom: '0.35rem' }}>
                  Address
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--slate-300)',
                    fontSize: '0.9rem',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="uni-btn outline"
                  style={{ padding: '0.55rem 1.25rem' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="uni-btn primary"
                  style={{ padding: '0.55rem 1.5rem' }}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {isPasswordModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            zIndex: 100
          }}
          onClick={() => setIsPasswordModalOpen(false)}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem',
              maxWidth: '460px',
              width: '100%',
              boxShadow: 'var(--shadow-xl)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <KeyRound size={20} color="var(--primary-600)" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, color: 'var(--slate-900)' }}>
                  Change Student Password
                </h3>
              </div>
              <button
                onClick={() => setIsPasswordModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--slate-400)' }}
              >
                <X size={20} />
              </button>
            </div>

            {passwordError && (
              <div
                style={{
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  color: '#dc2626',
                  fontSize: '0.82rem',
                  marginBottom: '1rem'
                }}
              >
                {passwordError}
              </div>
            )}

            <form onSubmit={handlePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--slate-700)', marginBottom: '0.35rem' }}>
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter current password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--slate-300)',
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--slate-700)', marginBottom: '0.35rem' }}>
                  New Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="At least 6 characters"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--slate-300)',
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--slate-700)', marginBottom: '0.35rem' }}>
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="Re-enter new password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--slate-300)',
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="uni-btn outline"
                  style={{ padding: '0.55rem 1.25rem' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="uni-btn primary"
                  style={{ padding: '0.55rem 1.5rem' }}
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
