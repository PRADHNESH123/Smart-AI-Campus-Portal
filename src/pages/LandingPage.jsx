import React from 'react';
import {
  GraduationCap,
  Briefcase,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Building2,
  Lock
} from 'lucide-react';
import { useRouter } from '../router';
import UniversityLogo from '../components/common/UniversityLogo';
import { demoCredentials } from '../data/mockData';

export default function LandingPage() {
  const { navigate } = useRouter();

  const roles = [
    {
      id: 'student',
      title: 'STUDENT',
      subtitle: 'Access your academic and campus activities',
      path: '/student/login',
      icon: GraduationCap,
      color: '#2563EB',
      gradient: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
      lightBg: '#eff6ff',
      borderColor: '#bfdbfe',
      btnText: 'Student Login',
      demoInfo: `Demo: ${demoCredentials.student.registerNumber} / pass: ${demoCredentials.student.password}`,
      features: ['Personal Academic Profile', 'Event Registrations & RSVP', 'Campus Circulars & Alerts', 'Activity Timeline']
    },
    {
      id: 'faculty',
      title: 'FACULTY',
      subtitle: 'Faculty portal',
      path: '/faculty/login',
      icon: Briefcase,
      color: '#059669',
      gradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
      lightBg: '#ecfdf5',
      borderColor: '#a7f3d0',
      btnText: 'Faculty Login',
      demoInfo: `Demo: ${demoCredentials.faculty.facultyId} / pass: ${demoCredentials.faculty.password}`,
      features: ['Faculty Portal Access', 'Staff Authentication', 'Department Workspace', 'Session Management']
    },
    {
      id: 'hod',
      title: 'HOD',
      subtitle: 'Head of Department portal',
      path: '/hod/login',
      icon: ShieldCheck,
      color: '#7c3aed',
      gradient: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
      lightBg: '#f5f3ff',
      borderColor: '#ddd6fe',
      btnText: 'HOD Login',
      demoInfo: `Demo: ${demoCredentials.hod.hodId} / pass: ${demoCredentials.hod.password}`,
      features: ['HOD Portal Access', 'Administrative Authentication', 'Department Supervision', 'Secure Session']
    }
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #edf2f7 50%, #e2e8f0 100%)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Top Header Bar */}
      <header
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid var(--slate-200)',
          padding: '0.85rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-xs)'
        }}
      >
        <UniversityLogo size="md" showTagline={true} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              background: '#fef3c7',
              color: '#92400e',
              padding: '0.35rem 0.85rem',
              borderRadius: '9999px',
              border: '1px solid #fde68a'
            }}
          >
            NAAC 'A++' Grade · NIRF Ranked
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '3rem 1.5rem',
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%'
        }}
      >
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem', maxWidth: '780px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 1rem',
              borderRadius: 'var(--radius-full)',
              background: 'var(--primary-50)',
              border: '1px solid var(--primary-200)',
              color: 'var(--primary-700)',
              fontSize: '0.82rem',
              fontWeight: 600,
              marginBottom: '1rem'
            }}
          >
            <Sparkles size={16} color="var(--primary-600)" />
            Kalasalingam Academy of Research and Education
          </div>

          <h1
            style={{
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              fontWeight: 800,
              color: 'var(--primary-900)',
              letterSpacing: '-0.025em',
              lineHeight: 1.15
            }}
          >
            Kalasalingam University
          </h1>
          <h2
            style={{
              fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
              fontWeight: 600,
              color: 'var(--secondary-500)',
              marginTop: '0.35rem',
              letterSpacing: '-0.01em'
            }}
          >
            Smart Campus Portal
          </h2>
          <p
            style={{
              fontSize: '0.98rem',
              color: 'var(--slate-600)',
              marginTop: '0.75rem',
              lineHeight: 1.6,
              maxWidth: '620px',
              margin: '0.75rem auto 0'
            }}
          >
            Select your role below to securely sign in to your campus workspace. Access academic records, upcoming events, campus notifications, and university activities.
          </p>
        </div>

        {/* 3 Role Selection Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
            gap: '1.75rem',
            width: '100%',
            marginBottom: '2rem'
          }}
        >
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <div
                key={role.id}
                style={{
                  background: '#ffffff',
                  borderRadius: 'var(--radius-xl)',
                  border: `1px solid var(--slate-200)`,
                  boxShadow: 'var(--shadow-md)',
                  padding: '2rem 1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.25s ease',
                  cursor: 'pointer'
                }}
                className="role-card-hover"
                onClick={() => navigate(role.path)}
              >
                {/* Top Role Indicator Bar */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '5px',
                    background: role.gradient
                  }}
                />

                {/* Role Icon & Title */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: 'var(--radius-lg)',
                      background: role.lightBg,
                      border: `1px solid ${role.borderColor}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: role.color,
                      flexShrink: 0
                    }}
                  >
                    <Icon size={28} />
                  </div>
                  <div>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: role.color
                      }}
                    >
                      Role Portal
                    </span>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--slate-900)', lineHeight: 1.2 }}>
                      {role.title}
                    </h3>
                  </div>
                </div>

                {/* Subtitle / Description */}
                <p
                  style={{
                    fontSize: '0.92rem',
                    color: 'var(--slate-600)',
                    lineHeight: 1.5,
                    marginBottom: '1.25rem',
                    minHeight: '44px'
                  }}
                >
                  {role.subtitle}
                </p>

                {/* Features List */}
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.55rem',
                    borderTop: '1px solid var(--slate-100)',
                    borderBottom: '1px solid var(--slate-100)',
                    paddingTop: '1rem',
                    paddingBottom: '1rem'
                  }}
                >
                  {role.features.map((feat, idx) => (
                    <li
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.82rem',
                        color: 'var(--slate-600)'
                      }}
                    >
                      <CheckCircle size={15} color={role.color} style={{ flexShrink: 0 }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Login Button */}
                <div style={{ marginTop: 'auto' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(role.path);
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.65rem',
                      padding: '0.8rem 1.25rem',
                      borderRadius: 'var(--radius-lg)',
                      background: role.gradient,
                      color: '#ffffff',
                      fontWeight: 700,
                      fontSize: '0.92rem',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: `0 4px 12px ${role.color}35`,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span>{role.btnText}</span>
                    <ArrowRight size={17} />
                  </button>

                  {/* Demo Credential Snippet */}
                  <div
                    style={{
                      marginTop: '0.75rem',
                      textAlign: 'center',
                      fontSize: '0.72rem',
                      color: 'var(--slate-500)',
                      background: 'var(--slate-50)',
                      padding: '0.35rem 0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px dashed var(--slate-300)'
                    }}
                  >
                    {role.demoInfo}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security & Support Guarantee */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
            color: 'var(--slate-500)',
            fontSize: '0.82rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Lock size={15} color="var(--slate-400)" />
            <span>256-bit Encrypted Session</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Building2 size={15} color="var(--slate-400)" />
            <span>Campus Network Verified</span>
          </div>
        </div>
      </main>

      {/* University Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--slate-200)',
          background: '#ffffff',
          padding: '1.5rem 2rem',
          textAlign: 'center',
          color: 'var(--slate-500)',
          fontSize: '0.82rem'
        }}
      >
        <p style={{ margin: 0, fontWeight: 500 }}>
          © {new Date().getFullYear()} Kalasalingam Academy of Research and Education (KARE). Anand Nagar, Krishnankoil, Srivilliputtur, Tamil Nadu – 626126.
        </p>
        <p style={{ margin: '4px 0 0', fontSize: '0.76rem', color: 'var(--slate-400)' }}>
          Kalasalingam University – Smart Campus Student Portal
        </p>
      </footer>

      <style>{`
        .role-card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px -6px rgba(0, 0, 0, 0.12), 0 4px 8px -2px rgba(0, 0, 0, 0.05);
          border-color: var(--slate-300);
        }
      `}</style>
    </div>
  );
}
