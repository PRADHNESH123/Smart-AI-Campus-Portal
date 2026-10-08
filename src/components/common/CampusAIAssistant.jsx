import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Sparkles, 
  X, 
  Send, 
  RotateCcw, 
  Key, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  BookOpen,
  Calendar,
  AlertTriangle,
  ChevronDown
} from 'lucide-react';
import {
  initialStudentData,
  timetableData,
  assignmentsData,
  initialLeavesData,
  initialEvents,
  campusDirectory,
  emergencyContacts
} from '../../data/mockData';

export default function CampusAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: "👋 Hello! I am **KLU CampusGenie**, your university AI assistant powered by the **Google Antigravity SDK**.\n\nAsk me anything about your timetable, assignments, leave applications & faculty approvals, attendance, campus events, or emergency contacts!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      model: 'Google Antigravity SDK'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(() => localStorage.getItem('klu_gemini_api_key') || '');
  const [keySavedStatus, setKeySavedStatus] = useState('');
  const [backendStatus, setBackendStatus] = useState(() => ({
    online: false,
    hasKey: Boolean(localStorage.getItem('klu_gemini_api_key'))
  }));
  const messagesEndRef = useRef(null);

  // Check backend health on mount
  useEffect(() => {
    fetchHealth();
  }, []);

  const fetchHealth = async () => {
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const data = await res.json();
        setBackendStatus({ online: true, hasKey: data.has_gemini_key });
      } else {
        setBackendStatus({ online: false, hasKey: false });
      }
    } catch {
      setBackendStatus({ online: false, hasKey: false });
    }
  };

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const resolveClientCampusQuery = (query) => {
    const q = query.toLowerCase();
    const now = new Date();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const todayName = dayNames[now.getDay()];
    const tomorrowName = dayNames[(now.getDay() + 1) % 7];
    const yesterdayName = dayNames[(now.getDay() + 6) % 7];
    const dateStr = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    // 1. Leaves / Medical Leave Approval
    if (q.includes('leave') || q.includes('medical') || q.includes('approval') || q.includes('approved') || q.includes('od') || q.includes('permission')) {
      if (q.includes('medical')) {
        const med = initialLeavesData.find(l => (l.type || '').toLowerCase().includes('medical'));
        if (med) {
          return `🏥 **Medical Leave Status**:\n\n✅ **Yes, your Medical Leave has been Approved!**\n\n- **Leave Type**: ${med.type}\n- **Duration**: ${med.from} to ${med.to} (${med.days} days)\n- **Reason**: ${med.reason}\n- **Status**: **${med.status}**\n- **Approved By**: **${med.approvedBy || 'Dr. K. Senthil Nathan (Faculty Advisor)'}**\n- **Faculty Remark**: *"${med.remark || 'Approved. Take care of your health.'}"*\n- **Applied Date**: ${med.applied}`;
        }
      }
      const studentLeaves = initialLeavesData.filter(l => l.reg === '99240040191' || l.student === 'Arun Kumar M');
      const lines = ['📋 **Your Leave Applications & Status**:\n'];
      studentLeaves.forEach(lv => {
        const emoji = lv.status === 'Approved' ? '✅' : (lv.status === 'Pending' ? '⏳' : '❌');
        lines.push(`${emoji} **${lv.type}** (${lv.days} Days: ${lv.from} to ${lv.to})\n   • Status: **${lv.status}**${lv.approvedBy ? ` by **${lv.approvedBy}**` : ''}\n${lv.remark ? `   • Remark: *"${lv.remark}"*\n` : ''}`);
      });
      return lines.join('\n');
    }

    // 2. Timetable / Class Schedule
    if (q.includes('timetable') || q.includes('schedule') || q.includes('class') || q.includes('routine') || q.includes('today') || q.includes('tomorrow') || q.includes('yesterday')) {
      let targetDay = todayName;
      let targetLabel = `Today's Timetable (${todayName}, ${dateStr})`;

      if (q.includes('tomorrow')) {
        targetDay = tomorrowName;
        targetLabel = `Tomorrow's Timetable (${tomorrowName})`;
      } else if (q.includes('yesterday')) {
        targetDay = yesterdayName;
        targetLabel = `Yesterday's Timetable (${yesterdayName})`;
      } else {
        for (const d of ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']) {
          if (q.includes(d.toLowerCase())) {
            targetDay = d;
            targetLabel = `Timetable for ${d}`;
            break;
          }
        }
      }

      if (targetDay === 'Saturday' || targetDay === 'Sunday') {
        return `🎉 **${targetLabel}**:\n\n**${targetDay}** is a weekend — No academic classes scheduled!\n\nEnjoy your weekend! You can ask for \`Monday timetable\` to view next week's schedule.`;
      }

      const classes = (timetableData.schedule && timetableData.schedule[targetDay]) || [];
      const periods = {};
      (timetableData.periods || []).forEach(p => { periods[p.slot] = p.time; });
      const activeClasses = classes.filter(c => c.code && !c.spanContinue);

      if (activeClasses.length === 0) {
        return `📅 **${targetLabel}**: No classes scheduled.`;
      }

      const lines = [`📅 **${targetLabel}**:\n`];
      activeClasses.forEach(c => {
        const slotTime = periods[c.slot] || '';
        lines.push(`- **Slot ${c.slot} (${slotTime})**: **${c.subject}** (\`${c.code}\`) · Room: \`${c.room}\` · Faculty: ${c.faculty}`);
      });
      return lines.join('\n');
    }

    // 3. Student Profile / CGPA / Attendance
    if (q.includes('profile') || q.includes('cgpa') || q.includes('attendance') || q.includes('who am i') || q.includes('my details') || q.includes('reg')) {
      return `🎓 **Student Profile Overview**\n\n- **Name**: ${initialStudentData.name}\n- **Register Number**: \`${initialStudentData.registerNumber}\`\n- **Department**: ${initialStudentData.department} (${initialStudentData.deptShort})\n- **Year / Semester**: ${initialStudentData.year} · ${initialStudentData.semester} (Section ${initialStudentData.section})\n- **CGPA**: **${initialStudentData.cgpa}** / 10.0\n- **Overall Attendance**: **${initialStudentData.attendance}**\n- **Faculty Advisor**: ${initialStudentData.advisor}\n- **Campus Email**: ${initialStudentData.email}`;
    }

    // 4. Assignments
    if (q.includes('assignment') || q.includes('due date') || q.includes('pending') || q.includes('submission')) {
      const pending = assignmentsData.filter(a => a.status === 'Pending');
      const submitted = assignmentsData.filter(a => a.status === 'Submitted');
      const lines = ['📝 **Your Academic Assignments**:\n', '**Pending Deadlines**:'];
      pending.forEach(a => {
        lines.push(`• **${a.title}** (${a.subject}) — Due: **${a.dueDate}** (Priority: ${(a.priority || '').toUpperCase()})`);
      });
      lines.push('\n**Recently Submitted**:');
      submitted.forEach(a => {
        lines.push(`✓ **${a.title}** (${a.subject}) — Submitted on ${a.submittedDate}`);
      });
      return lines.join('\n');
    }

    // 5. Events
    if (q.includes('event') || q.includes('symposium') || q.includes('hackathon') || q.includes('tekcluster') || q.includes('thulir') || q.includes('kare')) {
      const lines = ['🎉 **Upcoming Campus Events & Activities**:\n'];
      (initialEvents || []).slice(0, 4).forEach(e => {
        lines.push(`• **${e.name}** (${e.category})\n  📅 Date: ${e.date} | 📍 Venue: ${e.venue}\n  ℹ️ ${e.shortDescription}\n`);
      });
      return lines.join('\n');
    }

    // 6. Emergency Contacts
    if (q.includes('emergency') || q.includes('contact') || q.includes('phone') || q.includes('helpdesk') || q.includes('ambulance') || q.includes('security')) {
      const lines = ['🚨 **Campus Emergency & Key Support Contacts**:\n'];
      (emergencyContacts || []).forEach(c => {
        lines.push(`- **${c.role}**: 📞 \`${c.number}\` (${c.details})`);
      });
      lines.push('\n**Campus Administration & Helpdesks**:');
      (campusDirectory || []).slice(0, 3).forEach(d => {
        lines.push(`- **${d.title}**: 📞 \`${d.contact}\` | ✉️ \`${d.email}\``);
      });
      return lines.join('\n');
    }

    // Default fallback
    return `👋 Hello! I am **KLU CampusGenie**, your campus AI assistant.\n\nHere are things I can answer for you right now:\n- 📅 **Timetable & Classes**: "What classes do I have today?" or "Tomorrow's timetable"\n- 🏥 **Leaves & Permissions**: "Did the faculty approve my medical leave?"\n- 📝 **Assignments**: "What assignments are pending?"\n- 🎓 **Academic Profile**: "Show my CGPA and attendance"\n- 🎉 **Events**: "Tell me about TEKCLUSTER and hackathons"\n- 🚨 **Emergency**: "Campus emergency contacts"`;
  };

  const handleSend = async (textToSend) => {
    const text = (textToSend || input).trim();
    if (!text || loading) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // 1. Try local/configured Python backend if reachable
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const botMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: data.reply || 'Sorry, no response received.',
        model: data.model || 'Google Antigravity Agent',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
      if (data.has_key !== undefined) {
        setBackendStatus((prev) => ({ ...prev, hasKey: data.has_key }));
      }
    } catch (err) {
      // 2. On static Netlify deployment, resolve with client-side campus engine
      const clientReply = resolveClientCampusQuery(text);
      const botMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: clientReply,
        model: 'KLU Campus Engine (Live Cloud)',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveApiKey = async (e) => {
    e.preventDefault();
    const key = apiKeyInput.trim();
    if (!key) return;

    localStorage.setItem('klu_gemini_api_key', key);
    setKeySavedStatus('Key saved in browser!');
    setBackendStatus((prev) => ({ ...prev, hasKey: true }));

    try {
      await fetch('/api/config/key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ api_key: key })
      });
    } catch {
      // Ignored if on static Netlify host
    }

    setTimeout(() => {
      setShowKeyModal(false);
      setKeySavedStatus('');
      setApiKeyInput('');
    }, 1200);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome-cleared',
        sender: 'bot',
        text: "🧹 Conversation cleared. How can I assist you with your campus activities?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        model: 'Google Antigravity SDK'
      }
    ]);
  };

  // Helper to parse and render Markdown (tables, lists, bold, inline code)
  const renderFormattedText = (content) => {
    if (!content) return null;

    const lines = content.split('\n');
    const elements = [];
    let currentTable = null;
    let currentList = null;

    const formatInline = (text) => {
      if (!text) return '';
      return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/`(.*?)`/g, '<code style="background:rgba(0,0,0,0.06);padding:2px 5px;border-radius:4px;font-family:monospace;font-size:0.86em;color:#1e293b">$1</code>');
    };

    const flushTable = (key) => {
      if (!currentTable) return;
      elements.push(
        <div key={`table-${key}`} style={{ overflowX: 'auto', margin: '8px 0', maxWidth: '100%', WebkitOverflowScrolling: 'touch' }}>
          <table
            style={{
              width: '100%',
              minWidth: '280px',
              borderCollapse: 'collapse',
              fontSize: '0.78rem',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: '#ffffff',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}
          >
            {currentTable.headers.length > 0 && (
              <thead>
                <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                  {currentTable.headers.map((h, i) => (
                    <th
                      key={i}
                      style={{ padding: '6px 8px', textAlign: 'left', fontWeight: 700, color: '#334155', whiteSpace: 'nowrap' }}
                      dangerouslySetInnerHTML={{ __html: formatInline(h) }}
                    />
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {currentTable.rows.map((row, rIdx) => (
                <tr
                  key={rIdx}
                  style={{
                    borderBottom: '1px solid #e2e8f0',
                    backgroundColor: rIdx % 2 === 0 ? '#ffffff' : '#f8fafc'
                  }}
                >
                  {row.map((cell, cIdx) => (
                    <td
                      key={cIdx}
                      style={{ padding: '6px 8px', color: '#1e293b', verticalAlign: 'top' }}
                      dangerouslySetInnerHTML={{ __html: formatInline(cell) }}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      currentTable = null;
    };

    const flushList = (key) => {
      if (!currentList) return;
      elements.push(
        <ul key={`list-${key}`} style={{ margin: '6px 0', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {currentList.map((item, i) => (
            <li
              key={i}
              style={{ fontSize: '0.86rem', lineHeight: 1.45, color: 'inherit' }}
              dangerouslySetInnerHTML={{ __html: formatInline(item) }}
            />
          ))}
        </ul>
      );
      currentList = null;
    };

    for (let idx = 0; idx < lines.length; idx++) {
      const line = lines[idx];
      const trimmed = line.trim();

      // Check if line is a table row (starts and ends with | or contains |)
      if (trimmed.startsWith('|') && trimmed.endsWith('|') && trimmed.length > 2) {
        flushList(idx);
        const cells = trimmed
          .slice(1, -1)
          .split('|')
          .map((c) => c.trim());

        // Check if separator row (e.g. |:---|:---| or |--|--)
        const isSeparator = cells.every((c) => /^:?-+:?$/.test(c));
        if (isSeparator) {
          continue;
        }

        if (!currentTable) {
          currentTable = { headers: cells, rows: [] };
        } else {
          currentTable.rows.push(cells);
        }
        continue;
      } else {
        flushTable(idx);
      }

      // Check bullet list item
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('• ')) {
        const itemText = trimmed.replace(/^[-*•]\s+/, '');
        if (!currentList) currentList = [];
        currentList.push(itemText);
        continue;
      } else {
        flushList(idx);
      }

      // Regular paragraph line
      if (!trimmed) {
        elements.push(<div key={`empty-${idx}`} style={{ height: '6px' }} />);
      } else {
        elements.push(
          <div
            key={`line-${idx}`}
            style={{ minHeight: 'auto', lineHeight: 1.5 }}
            dangerouslySetInnerHTML={{ __html: formatInline(line) }}
          />
        );
      }
    }

    flushTable('end');
    flushList('end');

    return elements;
  };

  return (
    <>
      {/* Floating Action Button (FAB) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '84px',
            right: '24px',
            height: '56px',
            padding: '0 20px',
            borderRadius: '28px',
            background: 'linear-gradient(135deg, #1d4ed8 0%, #4338ca 100%)',
            color: '#ffffff',
            border: 'none',
            boxShadow: '0 8px 24px rgba(29, 78, 216, 0.35)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            zIndex: 99999,
            fontWeight: 600,
            fontSize: '0.92rem',
            transition: 'all 0.25s ease'
          }}
          className="hover:scale-105 active:scale-95"
          title="Open KLU Campus AI Assistant"
        >
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <img
              src="/kare-crest.png"
              alt="KLU Crest"
              style={{ width: '24px', height: '24px', objectFit: 'contain', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }}
            />
          </div>
          <span>AI Campus Assistant</span>
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: backendStatus.online ? '#22c55e' : '#eab308'
            }}
          />
        </button>
      )}

      {/* Slide-out / Floating Chat Window */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '84px',
            right: '24px',
            width: '400px',
            maxWidth: 'calc(100vw - 32px)',
            height: '620px',
            maxHeight: 'calc(100vh - 104px)',
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            boxShadow: '0 20px 40px -10px rgba(15, 23, 42, 0.22), 0 0 1px 1px rgba(15, 23, 42, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 100000,
            overflow: 'hidden',
            border: '1px solid #e2e8f0',
            animation: 'fadeInUp 0.2s ease-out'
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '16px 20px',
              background: 'linear-gradient(135deg, #0b2545 0%, #1d4ed8 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '3px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.18)'
                }}
              >
                <img
                  src="/kare-crest.png"
                  alt="KLU Crest"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <h3 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 700 }}>KLU CampusGenie</h3>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      padding: '1px 6px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.2)',
                      fontWeight: 600
                    }}
                  >
                    AGY SDK
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: backendStatus.hasKey ? '#4ade80' : '#fbbf24'
                    }}
                  />
                  <span style={{ fontSize: '0.75rem', opacity: 0.9 }}>
                    {backendStatus.hasKey ? 'Gemini 3.8 Live' : 'Campus Mode Ready'}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <button
                onClick={() => setShowKeyModal(!showKeyModal)}
                title="Configure Gemini API Key"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(255,255,255,0.8)',
                  cursor: 'pointer',
                  padding: '6px',
                  borderRadius: '8px'
                }}
              >
                <Key size={17} />
              </button>
              <button
                onClick={clearChat}
                title="Clear Conversation"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(255,255,255,0.8)',
                  cursor: 'pointer',
                  padding: '6px',
                  borderRadius: '8px'
                }}
              >
                <RotateCcw size={17} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(255,255,255,0.8)',
                  cursor: 'pointer',
                  padding: '6px',
                  borderRadius: '8px'
                }}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Quick API Key Drawer/Modal overlay */}
          {showKeyModal && (
            <div
              style={{
                backgroundColor: '#f8fafc',
                padding: '14px 16px',
                borderBottom: '1px solid #e2e8f0',
                fontSize: '0.82rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontWeight: 600, color: '#1e293b' }}>Google Gemini API Key</span>
                <button
                  onClick={() => setShowKeyModal(false)}
                  style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#64748b' }}
                >
                  <X size={15} />
                </button>
              </div>
              <p style={{ margin: '0 0 8px', color: '#64748b', fontSize: '0.78rem' }}>
                Paste your key from Google AI Studio to unlock full autonomous reasoning:
              </p>
              <form onSubmit={handleSaveApiKey} style={{ display: 'flex', gap: '6px' }}>
                <input
                  type="password"
                  placeholder="AIzaSy..."
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '6px 10px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.8rem'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#1d4ed8',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Save
                </button>
              </form>
              {keySavedStatus && (
                <div style={{ marginTop: '6px', color: '#059669', fontSize: '0.76rem', fontWeight: 600 }}>
                  {keySavedStatus}
                </div>
              )}
            </div>
          )}

          {/* Messages list */}
          <div
            style={{
              flex: 1,
              padding: '16px',
              overflowY: 'auto',
              backgroundColor: '#f8fafc',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            {messages.map((m) => {
              const isUser = m.sender === 'user';
              return (
                <div
                  key={m.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isUser ? 'flex-end' : 'flex-start',
                    maxWidth: '100%'
                  }}
                >
                  <div
                    style={{
                      maxWidth: '88%',
                      padding: '10px 14px',
                      borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                      backgroundColor: isUser ? '#1d4ed8' : '#ffffff',
                      color: isUser ? '#ffffff' : '#1e293b',
                      boxShadow: isUser ? '0 2px 6px rgba(29, 78, 216, 0.2)' : '0 1px 3px rgba(0,0,0,0.06)',
                      border: isUser ? 'none' : '1px solid #e2e8f0',
                      fontSize: '0.88rem',
                      lineHeight: 1.5,
                      wordBreak: 'break-word'
                    }}
                  >
                    {renderFormattedText(m.text)}
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginTop: '4px',
                      fontSize: '0.7rem',
                      color: '#94a3b8',
                      padding: '0 4px'
                    }}
                  >
                    <span>{m.timestamp}</span>
                    {m.model && !isUser && (
                      <>
                        <span>•</span>
                        <span style={{ color: '#64748b' }}>{m.model}</span>
                      </>
                    )}
                  </div>
                </div>
              );
            })}

            {loading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.82rem' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '10px',
                    backgroundColor: '#e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Bot size={18} color="#1d4ed8" />
                </div>
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <span>CampusGenie is thinking</span>
                  <span className="animate-pulse">...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick prompt chips */}
          <div
            style={{
              padding: '8px 12px',
              backgroundColor: '#ffffff',
              borderTop: '1px solid #f1f5f9',
              display: 'flex',
              gap: '6px',
              overflowX: 'auto',
              whiteSpace: 'nowrap',
              scrollbarWidth: 'none'
            }}
          >
            <button
              onClick={() => handleSend("What classes do I have today?")}
              style={{
                fontSize: '0.74rem',
                padding: '4px 10px',
                borderRadius: '12px',
                border: '1px solid #cbd5e1',
                background: '#f8fafc',
                color: '#334155',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Calendar size={12} color="#1d4ed8" />
              Today's Classes
            </button>
            <button
              onClick={() => handleSend("Did the faculty approve my medical leave?")}
              style={{
                fontSize: '0.74rem',
                padding: '4px 10px',
                borderRadius: '12px',
                border: '1px solid #cbd5e1',
                background: '#f8fafc',
                color: '#334155',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <CheckCircle2 size={12} color="#059669" />
              Medical Leave Status
            </button>
            <button
              onClick={() => handleSend("What assignments are pending?")}
              style={{
                fontSize: '0.74rem',
                padding: '4px 10px',
                borderRadius: '12px',
                border: '1px solid #cbd5e1',
                background: '#f8fafc',
                color: '#334155',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <BookOpen size={12} color="#d97706" />
              Assignments
            </button>
            <button
              onClick={() => handleSend("Show my CGPA and attendance")}
              style={{
                fontSize: '0.74rem',
                padding: '4px 10px',
                borderRadius: '12px',
                border: '1px solid #cbd5e1',
                background: '#f8fafc',
                color: '#334155',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Sparkles size={12} color="#7c3aed" />
              CGPA & Attendance
            </button>
            <button
              onClick={() => handleSend("Give me campus emergency contacts")}
              style={{
                fontSize: '0.74rem',
                padding: '4px 10px',
                borderRadius: '12px',
                border: '1px solid #cbd5e1',
                background: '#f8fafc',
                color: '#334155',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <AlertTriangle size={12} color="#e11d48" />
              Emergency Help
            </button>
          </div>

          {/* Input Area */}
          <div
            style={{
              padding: '12px 14px',
              backgroundColor: '#ffffff',
              borderTop: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <input
              type="text"
              placeholder="Ask CampusGenie anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              disabled={loading}
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: '24px',
                border: '1px solid #cbd5e1',
                fontSize: '0.88rem',
                outline: 'none',
                backgroundColor: '#f8fafc'
              }}
            />
            <button
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: input.trim() ? '#1d4ed8' : '#e2e8f0',
                color: input.trim() ? '#ffffff' : '#94a3b8',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: input.trim() ? 'pointer' : 'default',
                transition: 'all 0.2s ease'
              }}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
