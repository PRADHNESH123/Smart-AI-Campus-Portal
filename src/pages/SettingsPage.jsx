import React, { useState } from 'react';
import {
  Settings,
  Bell,
  Lock,
  User,
  Shield,
  LogOut,
  CheckCircle2,
  Save,
  KeyRound
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usePortal } from '../context/PortalContext';
import { useRouter } from '../router';

export default function SettingsPage() {
  const { studentProfile, logout } = useAuth();
  const { showToast, addCustomActivity } = usePortal();
  const { navigate } = useRouter();

  const [notificationPrefs, setNotificationPrefs] = useState({
    examAlerts: true,
    deptCirculars: true,
    eventReminders: true,
    emailNotifications: true,
    smsAlerts: false
  });

  const [privacyPrefs, setPrivacyPrefs] = useState({
    publicDirectory: true,
    showEmailInClubRegistry: true,
    allowEventOrganizersContact: true
  });

  const [passwordState, setPasswordState] = useState({
    current: '',
    newPass: '',
    confirmPass: ''
  });
  const [passwordMessage, setPasswordMessage] = useState('');

  const handleSaveNotifications = (e) => {
    e.preventDefault();
    addCustomActivity('Settings Updated', 'Notification preferences saved', 'Settings');
    showToast('Notification preferences successfully saved!', 'success');
  };

  const handleSavePrivacy = (e) => {
    e.preventDefault();
    addCustomActivity('Settings Updated', 'Student privacy preferences saved', 'Settings');
    showToast('Privacy preferences successfully saved!', 'success');
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPasswordMessage('');

    if (passwordState.newPass.length < 6) {
      setPasswordMessage('Password must be at least 6 characters.');
      return;
    }

    if (passwordState.newPass !== passwordState.confirmPass) {
      setPasswordMessage('New password and confirmation do not match.');
      return;
    }

    addCustomActivity('Password Changed', 'Account security credentials updated', 'Security');
    showToast('Password changed successfully!', 'success');
    setPasswordState({ current: '', newPass: '', confirmPass: '' });
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Top Banner */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem',
          border: '1px solid var(--slate-200)',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}
      >
        <div
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '14px',
            background: 'var(--primary-50)',
            border: '1px solid var(--primary-100)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary-600)'
          }}
        >
          <Settings size={26} />
        </div>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--slate-900)', margin: 0 }}>
            Student Portal Settings
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--slate-500)', margin: '4px 0 0' }}>
            Manage your account preferences, notification alerts, security credentials, and student privacy.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
        {/* Account & Notification Preferences */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {/* Section 1: Account Settings */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--slate-200)',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
              <User size={18} color="var(--primary-600)" />
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--slate-800)', margin: 0 }}>
                Account Settings
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.6rem', borderBottom: '1px solid var(--slate-100)' }}>
                <span style={{ color: 'var(--slate-500)' }}>Student Name:</span>
                <strong style={{ color: 'var(--slate-800)' }}>{studentProfile.name}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.6rem', borderBottom: '1px solid var(--slate-100)' }}>
                <span style={{ color: 'var(--slate-500)' }}>Register Number:</span>
                <strong style={{ color: 'var(--primary-700)' }}>{studentProfile.registerNumber}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.6rem', borderBottom: '1px solid var(--slate-100)' }}>
                <span style={{ color: 'var(--slate-500)' }}>Department:</span>
                <strong style={{ color: 'var(--slate-800)' }}>{studentProfile.department}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.6rem', borderBottom: '1px solid var(--slate-100)' }}>
                <span style={{ color: 'var(--slate-500)' }}>Campus Email:</span>
                <strong style={{ color: 'var(--slate-800)' }}>{studentProfile.email}</strong>
              </div>
            </div>

            <button
              onClick={() => navigate('/student/profile')}
              className="uni-btn outline"
              style={{ marginTop: '1.25rem', width: '100%', fontSize: '0.85rem', padding: '0.55rem' }}
            >
              View Full Student Profile
            </button>
          </div>

          {/* Section 2: Notification Preferences */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--slate-200)',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
              <Bell size={18} color="var(--primary-600)" />
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--slate-800)', margin: 0 }}>
                Notification Preferences
              </h2>
            </div>

            <form onSubmit={handleSaveNotifications} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', fontSize: '0.85rem' }}>
                <div>
                  <p style={{ margin: 0, fontWeight: 600, color: 'var(--slate-800)' }}>End-Semester Exam Alerts</p>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--slate-500)' }}>Timetable release & hall ticket downloads</p>
                </div>
                <input
                  type="checkbox"
                  checked={notificationPrefs.examAlerts}
                  onChange={(e) => setNotificationPrefs({ ...notificationPrefs, examAlerts: e.target.checked })}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--primary-600)' }}
                />
              </label>

              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', fontSize: '0.85rem' }}>
                <div>
                  <p style={{ margin: 0, fontWeight: 600, color: 'var(--slate-800)' }}>Department Circulars</p>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--slate-500)' }}>Notices from HOD & Faculty Advisors</p>
                </div>
                <input
                  type="checkbox"
                  checked={notificationPrefs.deptCirculars}
                  onChange={(e) => setNotificationPrefs({ ...notificationPrefs, deptCirculars: e.target.checked })}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--primary-600)' }}
                />
              </label>

              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', fontSize: '0.85rem' }}>
                <div>
                  <p style={{ margin: 0, fontWeight: 600, color: 'var(--slate-800)' }}>Event & Workshop Reminders</p>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--slate-500)' }}>24-hour reminder before registered events</p>
                </div>
                <input
                  type="checkbox"
                  checked={notificationPrefs.eventReminders}
                  onChange={(e) => setNotificationPrefs({ ...notificationPrefs, eventReminders: e.target.checked })}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--primary-600)' }}
                />
              </label>

              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', fontSize: '0.85rem' }}>
                <div>
                  <p style={{ margin: 0, fontWeight: 600, color: 'var(--slate-800)' }}>Institutional Email Dispatch</p>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--slate-500)' }}>Forward critical notifications to institutional email</p>
                </div>
                <input
                  type="checkbox"
                  checked={notificationPrefs.emailNotifications}
                  onChange={(e) => setNotificationPrefs({ ...notificationPrefs, emailNotifications: e.target.checked })}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--primary-600)' }}
                />
              </label>

              <button
                type="submit"
                className="uni-btn primary"
                style={{ marginTop: '0.5rem', padding: '0.55rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
              >
                <Save size={15} />
                <span>Save Notification Preferences</span>
              </button>
            </form>
          </div>
        </div>

        {/* Password, Privacy & Logout */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {/* Section 3: Password Settings */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--slate-200)',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
              <Lock size={18} color="var(--primary-600)" />
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--slate-800)', margin: 0 }}>
                Password & Security
              </h2>
            </div>

            {passwordMessage && (
              <div
                style={{
                  padding: '0.6rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  color: '#dc2626',
                  fontSize: '0.82rem',
                  marginBottom: '1rem'
                }}
              >
                {passwordMessage}
              </div>
            )}

            <form onSubmit={handlePasswordChange} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--slate-700)', marginBottom: '0.3rem' }}>
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter current password"
                  value={passwordState.current}
                  onChange={(e) => setPasswordState({ ...passwordState, current: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--slate-300)',
                    fontSize: '0.85rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--slate-700)', marginBottom: '0.3rem' }}>
                  New Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="Minimum 6 characters"
                  value={passwordState.newPass}
                  onChange={(e) => setPasswordState({ ...passwordState, newPass: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--slate-300)',
                    fontSize: '0.85rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--slate-700)', marginBottom: '0.3rem' }}>
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="Re-enter new password"
                  value={passwordState.confirmPass}
                  onChange={(e) => setPasswordState({ ...passwordState, confirmPass: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--slate-300)',
                    fontSize: '0.85rem'
                  }}
                />
              </div>

              <button
                type="submit"
                className="uni-btn primary"
                style={{ marginTop: '0.25rem', padding: '0.55rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
              >
                <KeyRound size={15} />
                <span>Update Password</span>
              </button>
            </form>
          </div>

          {/* Section 4: Privacy Settings */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--slate-200)',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
              <Shield size={18} color="var(--primary-600)" />
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--slate-800)', margin: 0 }}>
                Privacy Preferences
              </h2>
            </div>

            <form onSubmit={handleSavePrivacy} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', fontSize: '0.85rem' }}>
                <div>
                  <p style={{ margin: 0, fontWeight: 600, color: 'var(--slate-800)' }}>Internal Campus Directory</p>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--slate-500)' }}>Display profile in department student list</p>
                </div>
                <input
                  type="checkbox"
                  checked={privacyPrefs.publicDirectory}
                  onChange={(e) => setPrivacyPrefs({ ...privacyPrefs, publicDirectory: e.target.checked })}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--primary-600)' }}
                />
              </label>

              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', fontSize: '0.85rem' }}>
                <div>
                  <p style={{ margin: 0, fontWeight: 600, color: 'var(--slate-800)' }}>Event Organizers Communication</p>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--slate-500)' }}>Permit event coordinators to share team invites</p>
                </div>
                <input
                  type="checkbox"
                  checked={privacyPrefs.allowEventOrganizersContact}
                  onChange={(e) => setPrivacyPrefs({ ...privacyPrefs, allowEventOrganizersContact: e.target.checked })}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--primary-600)' }}
                />
              </label>

              <button
                type="submit"
                className="uni-btn outline"
                style={{ marginTop: '0.4rem', padding: '0.55rem', fontSize: '0.85rem' }}
              >
                Save Privacy Settings
              </button>
            </form>
          </div>

          {/* Section 5: Logout Action Card */}
          <div
            style={{
              background: '#fef2f2',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid #fecaca',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#dc2626' }}>
              <LogOut size={18} />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>
                Sign Out of Smart Campus
              </h3>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#991b1b', margin: 0, lineHeight: 1.4 }}>
              End your active session securely. You will be redirected to the role selection landing page.
            </p>
            <button
              onClick={handleLogout}
              className="uni-btn danger"
              style={{
                marginTop: '0.5rem',
                padding: '0.6rem',
                fontSize: '0.88rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              <LogOut size={16} />
              <span>Logout Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
