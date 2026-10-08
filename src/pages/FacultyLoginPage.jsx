import React, { useState } from 'react';
import {
  Briefcase,
  Lock,
  UserCheck,
  Eye,
  EyeOff,
  ArrowLeft,
  AlertCircle,
  KeyRound,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from '../router';
import UniversityLogo from '../components/common/UniversityLogo';
import { demoCredentials } from '../data/mockData';

export default function FacultyLoginPage() {
  const { loginFaculty } = useAuth();
  const { navigate } = useRouter();

  const [facultyId, setFacultyId] = useState(demoCredentials.faculty.facultyId);
  const [password, setPassword] = useState(demoCredentials.faculty.password);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const res = loginFaculty(facultyId, password);
    if (res.success) {
      navigate('/faculty/dashboard');
    } else {
      setErrorMessage(res.message || 'Invalid Faculty credentials.');
    }
  };

  const handleQuickFill = () => {
    setFacultyId(demoCredentials.faculty.facultyId);
    setPassword(demoCredentials.faculty.password);
    setErrorMessage('');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #064e3b 0%, #047857 50%, #0b2545 100%)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
    >
      {/* Top Header */}
      <header
        style={{
          padding: '1.25rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 10
        }}
      >
        <UniversityLogo size="md" light={true} showTagline={true} />
        <button
          onClick={() => navigate('/login')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(255, 255, 255, 0.12)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            color: '#ffffff',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer',
            backdropFilter: 'blur(5px)',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.22)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)')}
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>
      </header>

      {/* Main Form Container */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem 1.5rem',
          zIndex: 10
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '460px',
            background: '#ffffff',
            borderRadius: 'var(--radius-2xl)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
            overflow: 'hidden'
          }}
        >
          {/* Top Banner */}
          <div
            style={{
              background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
              padding: '1.75rem 2rem',
              color: '#ffffff',
              textAlign: 'center'
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.18)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 0.75rem'
              }}
            >
              <Briefcase size={28} color="#ffffff" />
            </div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, margin: 0 }}>Faculty Portal Login</h2>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.85)', marginTop: '0.35rem' }}>
              Academic Staff & Faculty Authentication
            </p>
          </div>

          <div style={{ padding: '2rem' }}>
            {errorMessage && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  color: '#dc2626',
                  fontSize: '0.85rem',
                  marginBottom: '1.25rem'
                }}
              >
                <AlertCircle size={18} style={{ flexShrink: 0 }} />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Faculty ID */}
              <div>
                <label
                  htmlFor="facultyId"
                  style={{
                    display: 'block',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--slate-700)',
                    marginBottom: '0.4rem'
                  }}
                >
                  Faculty ID
                </label>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: 'var(--slate-50)',
                    border: '1px solid var(--slate-300)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '0.7rem 1rem'
                  }}
                >
                  <UserCheck size={18} color="var(--slate-400)" style={{ marginRight: '0.75rem', flexShrink: 0 }} />
                  <input
                    id="facultyId"
                    type="text"
                    required
                    placeholder="e.g. KLU-FAC-1042"
                    value={facultyId}
                    onChange={(e) => setFacultyId(e.target.value)}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      outline: 'none',
                      width: '100%',
                      fontSize: '0.92rem',
                      fontWeight: 500,
                      color: 'var(--slate-800)'
                    }}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="facultyPassword"
                  style={{
                    display: 'block',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--slate-700)',
                    marginBottom: '0.4rem'
                  }}
                >
                  Password
                </label>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: 'var(--slate-50)',
                    border: '1px solid var(--slate-300)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '0.7rem 1rem'
                  }}
                >
                  <Lock size={18} color="var(--slate-400)" style={{ marginRight: '0.75rem', flexShrink: 0 }} />
                  <input
                    id="facultyPassword"
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter faculty password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      outline: 'none',
                      width: '100%',
                      fontSize: '0.92rem',
                      fontWeight: 500,
                      color: 'var(--slate-800)'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--slate-400)',
                      cursor: 'pointer',
                      padding: 0
                    }}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.82rem' }}>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#059669',
                    fontWeight: 600,
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  Forgot Password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  borderRadius: 'var(--radius-lg)',
                  background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(5, 150, 105, 0.4)',
                  transition: 'opacity 0.2s'
                }}
              >
                Login to Faculty Portal
              </button>
            </form>

            {/* Demo Helper */}
            <div
              style={{
                marginTop: '1.5rem',
                padding: '0.85rem',
                borderRadius: 'var(--radius-md)',
                background: '#f8fafc',
                border: '1px dashed var(--slate-300)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--slate-600)', margin: 0 }}>
                  Demo Faculty Account:
                </p>
                <p style={{ fontSize: '0.72rem', color: 'var(--slate-500)', margin: '2px 0 0' }}>
                  ID: <strong>{demoCredentials.faculty.facultyId}</strong> | Pass: <strong>{demoCredentials.faculty.password}</strong>
                </p>
              </div>
              <button
                type="button"
                onClick={handleQuickFill}
                style={{
                  padding: '0.35rem 0.65rem',
                  borderRadius: 'var(--radius-sm)',
                  background: '#ecfdf5',
                  color: '#059669',
                  border: '1px solid #a7f3d0',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Quick Fill
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            zIndex: 100
          }}
          onClick={() => {
            setShowForgotModal(false);
            setForgotSent(false);
          }}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-xl)',
              padding: '1.75rem',
              maxWidth: '420px',
              width: '100%',
              boxShadow: 'var(--shadow-xl)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: '#ecfdf5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#059669'
                }}
              >
                <KeyRound size={20} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, color: 'var(--slate-900)' }}>
                Faculty Password Help
              </h3>
            </div>

            {forgotSent ? (
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <CheckCircle size={44} color="#059669" style={{ margin: '0 auto 0.75rem' }} />
                <p style={{ fontWeight: 700, color: 'var(--slate-800)', margin: '0 0 0.5rem' }}>Instructions Sent</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)', margin: 0 }}>
                  A verification link has been sent to your registered official staff email address.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotModal(false);
                    setForgotSent(false);
                  }}
                  className="uni-btn primary"
                  style={{ marginTop: '1.25rem', width: '100%', background: '#059669' }}
                >
                  Close
                </button>
              </div>
            ) : (
              <div>
                <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)', marginBottom: '1rem' }}>
                  Please enter your Faculty ID to request password recovery via the Dean / HR Academic portal.
                </p>
                <input
                  type="text"
                  placeholder="Enter Faculty ID (e.g. KLU-FAC-1042)"
                  defaultValue={facultyId}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--slate-300)',
                    fontSize: '0.9rem',
                    marginBottom: '1rem',
                    outline: 'none'
                  }}
                />
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="uni-btn outline"
                    style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => setForgotSent(true)}
                    className="uni-btn primary"
                    style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem', background: '#059669' }}
                  >
                    Submit Request
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
