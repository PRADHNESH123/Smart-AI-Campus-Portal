import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  MapPin,
  Clock,
  Laptop,
  ShieldCheck,
  Building2,
  FileQuestion,
  Headphones
} from 'lucide-react';
import { campusFaqs, emergencyContacts } from '../data/mockData';

export default function HelpSupportPage() {
  const [openFaqId, setOpenFaqId] = useState('faq-1');

  const toggleFaq = (id) => {
    setOpenFaqId(openFaqId === id ? null : id);
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
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.25rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
            <HelpCircle size={26} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--slate-900)', margin: 0 }}>
              Help & Support Center
            </h1>
            <p style={{ fontSize: '0.85rem', color: 'var(--slate-500)', margin: '4px 0 0' }}>
              Find quick answers to common questions, portal navigation assistance, and campus contact details.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="uni-pill primary" style={{ fontSize: '0.75rem', padding: '0.3rem 0.75rem' }}>
            IT Helpdesk Online
          </span>
        </div>
      </div>

      {/* Main 2 Columns: FAQs + Contact Information */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
        {/* Left Column: Frequently Asked Questions (Accordion) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <FileQuestion size={18} color="var(--primary-600)" />
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--slate-800)', margin: 0 }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {campusFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  style={{
                    background: '#ffffff',
                    borderRadius: 'var(--radius-lg)',
                    border: isOpen ? '1px solid var(--primary-300)' : '1px solid var(--slate-200)',
                    boxShadow: isOpen ? '0 2px 8px rgba(37,99,235,0.08)' : 'var(--shadow-xs)',
                    overflow: 'hidden',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    style={{
                      width: '100%',
                      padding: '1.1rem 1.25rem',
                      background: 'none',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.75rem',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <span className="uni-pill neutral" style={{ fontSize: '0.68rem' }}>
                        {faq.category}
                      </span>
                      <span style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--slate-800)' }}>
                        {faq.question}
                      </span>
                    </div>
                    {isOpen ? <ChevronUp size={18} color="var(--primary-600)" /> : <ChevronDown size={18} color="var(--slate-400)" />}
                  </button>

                  {isOpen && (
                    <div
                      style={{
                        padding: '0 1.25rem 1.25rem',
                        fontSize: '0.86rem',
                        color: 'var(--slate-600)',
                        lineHeight: 1.6,
                        borderTop: '1px solid var(--slate-100)',
                        paddingTop: '0.85rem'
                      }}
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Technical Support & Campus Directory */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* IT Helpdesk Card */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--slate-200)',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: '#eff6ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary-600)'
                }}
              >
                <Laptop size={20} />
              </div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--slate-800)', margin: 0 }}>
                Technical Support & Portal Help
              </h2>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)', lineHeight: 1.5, margin: '0 0 1.25rem' }}>
              For student login errors, credential recovery, portal connectivity issues, or password reset support, contact the University Centre for Information Technology.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: 'var(--slate-700)' }}>
                <Clock size={16} color="var(--primary-600)" />
                <span>Operating Hours: Monday – Saturday, 9:00 AM – 5:30 PM</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: 'var(--slate-700)' }}>
                <Mail size={16} color="var(--primary-600)" />
                <span>Email Support: <strong>portal-support@klu.ac.in</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: 'var(--slate-700)' }}>
                <Phone size={16} color="var(--primary-600)" />
                <span>Helpline: <strong>+91 4563 289042 / 289043</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: 'var(--slate-700)' }}>
                <MapPin size={16} color="var(--primary-600)" />
                <span>Location: CIT Building, 2nd Floor, Campus Main Quadrangle</span>
              </div>
            </div>
          </div>

          {/* Emergency & Key Campus Offices */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--slate-200)',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: '#fef3c7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#d97706'
                }}
              >
                <Building2 size={20} />
              </div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--slate-800)', margin: 0 }}>
                Campus Offices & Directory
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {emergencyContacts.map((contact, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--slate-50)',
                    border: '1px solid var(--slate-100)',
                    fontSize: '0.82rem'
                  }}
                >
                  <div>
                    <strong style={{ color: 'var(--slate-800)', display: 'block' }}>{contact.role}</strong>
                    <span style={{ color: 'var(--slate-500)', fontSize: '0.76rem' }}>{contact.details}</span>
                  </div>
                  <span
                    style={{
                      background: 'var(--primary-50)',
                      color: 'var(--primary-700)',
                      fontWeight: 600,
                      padding: '0.2rem 0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      fontFamily: 'monospace'
                    }}
                  >
                    {contact.number}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
