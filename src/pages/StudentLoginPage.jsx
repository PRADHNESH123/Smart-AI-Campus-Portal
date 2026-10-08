import React, { useState } from 'react';
import {
  GraduationCap,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Sparkles,
  KeyRound
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from '../router';
import UniversityLogo from '../components/common/UniversityLogo';
import { demoCredentials } from '../data/mockData';

export default function StudentLoginPage() {
  const { loginStudent } = useAuth();
  const { navigate } = useRouter();

  const [registerNumber, setRegisterNumber] = useState(demoCredentials.student.registerNumber);
  const [password, setPassword] = useState(demoCredentials.student.password);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmailSent, setForgotEmailSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const res = loginStudent(registerNumber, password, rememberMe);
    if (res.success) {
      navigate('/student/dashboard');
    } else {
      setErrorMessage(res.message || 'Invalid credentials.');
    }
  };

  const handleQuickFill = () => {
    setRegisterNumber(demoCredentials.student.registerNumber);
    setPassword(demoCredentials.student.password);
    setErrorMessage('');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0b2545 0%, #134074 100%)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
    >
      {/* Background Decorative Circles */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(241,162,8,0.12) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

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
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer',
            backdropFilter: 'blur(5px)',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)')}
        >
          <ArrowLeft size={16} />
          <span>Back to Role Selection</span>
        </button>
      </header>

      {/* Login Card Form */}
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
            overflow: 'hidden',
            animation: 'fadeIn 0.3s ease-out'
          }}
        >
          {/* Card Top Banner */}
          <div
            style={{
              background: 'linear-gradient(135deg, var(--primary-600) 0%, var(--primary-800) 100%)',
              padding: '1.75rem 2rem',
              color: '#ffffff',
              textAlign: 'center',
              position: 'relative'
            }}
          >
            {/* Sparkle Badge */}
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.15)',
                border: '2px solid rgba(255, 255, 255, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 0.85rem',
                boxShadow: '0 0 20px rgba(255,255,255,0.2), 0 4px 10px rgba(0,0,0,0.15)',
                position: 'relative'
              }}
            >
              <GraduationCap size={30} color="#ffffff" />
              {/* Sparkle accent */}
              <Sparkles
                size={14}
                color="#fde68a"
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  filter: 'drop-shadow(0 0 4px rgba(253,230,138,0.8))'
                }}
              />
            </div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, margin: 0 }}>Student Portal Login</h2>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.8)', marginTop: '0.35rem' }}>
              Sign in with your university register number
            </p>
          </div>

          {/* Form Body */}
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
              {/* Register Number */}
              <div>
                <label
                  htmlFor="regNumber"
                  style={{
                    display: 'block',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--slate-700)',
                    marginBottom: '0.4rem'
                  }}
                >
                  Register Number
                </label>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: 'var(--slate-50)',
                    border: '1px solid var(--slate-300)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '0.7rem 1rem',
                    transition: 'border-color 0.2s'
                  }}
                >
                  <User size={18} color="var(--slate-400)" style={{ marginRight: '0.75rem', flexShrink: 0 }} />
                  <input
                    id="regNumber"
                    type="text"
                    required
                    placeholder="e.g. 99240040191"
                    value={registerNumber}
                    onChange={(e) => setRegisterNumber(e.target.value)}
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
                  htmlFor="studentPassword"
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
                    id="studentPassword"
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter student password"
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
                      padding: 0,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--slate-600)' }}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{ accentColor: 'var(--primary-600)', width: '16px', height: '16px' }}
                  />
                  <span>Remember me</span>
                </label>

                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--primary-600)',
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
                  background: 'var(--primary-600)',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary-700)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary-600)')}
              >
                Login to Student Portal
              </button>
            </form>

            {/* Demo Helper Box */}
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
                  Demo Student Account:
                </p>
                <p style={{ fontSize: '0.72rem', color: 'var(--slate-500)', margin: '2px 0 0' }}>
                  Reg: <strong>{demoCredentials.student.registerNumber}</strong> | Pass: <strong>{demoCredentials.student.password}</strong>
                </p>
              </div>
              <button
                type="button"
                onClick={handleQuickFill}
                style={{
                  padding: '0.35rem 0.65rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--primary-50)',
                  color: 'var(--primary-600)',
                  border: '1px solid var(--primary-200)',
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
            setForgotEmailSent(false);
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
                  background: '#eff6ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary-600)'
                }}
              >
                <KeyRound size={20} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, color: 'var(--slate-900)' }}>
                Reset Student Password
              </h3>
            </div>

            {forgotEmailSent ? (
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <CheckCircle size={44} color="#16a34a" style={{ margin: '0 auto 0.75rem' }} />
                <p style={{ fontWeight: 700, color: 'var(--slate-800)', margin: '0 0 0.5rem' }}>Password Reset Link Sent</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)', margin: 0 }}>
                  A secure password reset link has been dispatched to your official institutional email (99240040191@klu.ac.in).
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotModal(false);
                    setForgotEmailSent(false);
                  }}
                  className="uni-btn primary"
                  style={{ marginTop: '1.25rem', width: '100%' }}
                >
                  Done
                </button>
              </div>
            ) : (
              <div>
                <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)', marginBottom: '1rem' }}>
                  Enter your registered Student Register Number. We will verify your campus account and email reset instructions.
                </p>
                <input
                  type="text"
                  placeholder="Enter Register Number (e.g. 99240040191)"
                  defaultValue={registerNumber}
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
                    onClick={() => setForgotEmailSent(true)}
                    className="uni-btn primary"
                    style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
                  >
                    Send Reset Link
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
