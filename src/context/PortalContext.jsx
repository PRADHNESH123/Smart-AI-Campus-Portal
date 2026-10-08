import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialEvents, initialNotifications, initialActivityLog, initialLeavesData, assignmentsData } from '../data/mockData';
import { hodAnnouncementsInitial } from '../data/hodMockData';

const PortalContext = createContext();

export function PortalProvider({ children }) {
  const [events, setEvents] = useState(() => {
    try {
      const stored = localStorage.getItem('klu_events');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Ensure pending events exist for demoing HOD approval
        const hasPending = parsed.some(e => e.id === 'evt-pending-01');
        if (!hasPending) {
          const pendingItems = initialEvents.filter(e => e.id.startsWith('evt-pending'));
          return [...parsed, ...pendingItems];
        }
        return parsed;
      }
    } catch (e) {
      console.error('Failed reading events from localStorage', e);
    }
    return initialEvents;
  });

  const [announcements, setAnnouncements] = useState(() => {
    try {
      const stored = localStorage.getItem('klu_announcements');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Failed reading announcements from localStorage', e);
    }
    return hodAnnouncementsInitial;
  });

  const [notifications, setNotifications] = useState(() => {
    try {
      const stored = localStorage.getItem('klu_notifications');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Failed reading notifications from localStorage', e);
    }
    return initialNotifications;
  });

  const [activityLog, setActivityLog] = useState(() => {
    try {
      const stored = localStorage.getItem('klu_activity_log');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Failed reading activity log from localStorage', e);
    }
    return initialActivityLog;
  });

  // Shared Leaves (Student Apply <-> Faculty Approvals)
  const [leaves, setLeaves] = useState(() => {
    try {
      const stored = localStorage.getItem('klu_leaves');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Failed reading leaves from localStorage', e);
    }
    return initialLeavesData;
  });

  // Shared Assignments (Faculty Post <-> Student Submit)
  const [assignments, setAssignments] = useState(() => {
    try {
      const stored = localStorage.getItem('klu_assignments');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Failed reading assignments from localStorage', e);
    }
    return assignmentsData;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEventModal, setSelectedEventModal] = useState(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('klu_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('klu_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('klu_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('klu_activity_log', JSON.stringify(activityLog));
  }, [activityLog]);

  useEffect(() => {
    localStorage.setItem('klu_leaves', JSON.stringify(leaves));
  }, [leaves]);

  useEffect(() => {
    localStorage.setItem('klu_assignments', JSON.stringify(assignments));
  }, [assignments]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const toggleEventRegistration = (eventId) => {
    const targetEvent = events.find((e) => e.id === eventId);
    if (!targetEvent) return;

    const willBeRegistered = !targetEvent.registered;

    setEvents((prev) =>
      prev.map((e) => {
        if (e.id === eventId) {
          return {
            ...e,
            registered: willBeRegistered,
            registeredAt: willBeRegistered ? new Date().toISOString().replace('T', ' ').slice(0, 16) : null
          };
        }
        return e;
      })
    );

    // Update selected modal if open
    setSelectedEventModal((prev) => {
      if (prev && prev.id === eventId) {
        return {
          ...prev,
          registered: willBeRegistered,
          registeredAt: willBeRegistered ? new Date().toISOString().replace('T', ' ').slice(0, 16) : null
        };
      }
      return prev;
    });

    // Add activity log
    const newActivity = {
      id: `act-${Date.now()}`,
      action: willBeRegistered ? 'Event Registration' : 'Registration Cancelled',
      details: willBeRegistered
        ? `Registered for ${targetEvent.name}`
        : `Cancelled registration for ${targetEvent.name}`,
      timestamp: 'Just now',
      category: 'Events',
      icon: willBeRegistered ? 'CalendarCheck' : 'CalendarX'
    };

    setActivityLog((prev) => [newActivity, ...prev]);

    if (willBeRegistered) {
      showToast(`Registration Successful! You have registered for ${targetEvent.name}.`, 'success');
    } else {
      showToast(`Registration cancelled for ${targetEvent.name}.`, 'info');
    }
  };

  const markNotificationAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  const addCustomActivity = (action, details, category = 'General', icon = 'Activity') => {
    const newActivity = {
      id: `act-${Date.now()}`,
      action,
      details,
      timestamp: 'Just now',
      category,
      icon
    };
    setActivityLog((prev) => [newActivity, ...prev]);
  };

  // -------------------------------------------------------------
  // LEAVE ACTIONS (Cross-Portal: Student <-> Faculty)
  // -------------------------------------------------------------
  const applyLeave = (data) => {
    const newLeave = {
      id: `lv-${Date.now()}`,
      student: data.studentName || 'Arun Kumar M',
      reg: data.regNo || '99240040191',
      batch: data.batch || '24S02',
      dept: 'CSE',
      type: data.leaveType,
      from: data.fromDate,
      to: data.toDate,
      days: data.days || 1,
      reason: data.reason,
      parentPhone: data.parentPhone || '',
      status: 'Pending',
      applied: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      remark: '',
      approvedBy: null
    };

    setLeaves((prev) => [newLeave, ...prev]);

    // Student notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: 'Leave Application Submitted',
      message: `Your leave request for ${data.leaveType} (${data.fromDate} to ${data.toDate}) has been submitted to your Class Advisor for approval.`,
      category: 'Academic',
      date: 'Just now',
      read: false
    };
    setNotifications((prev) => [newNotif, ...prev]);

    // Student activity
    addCustomActivity(
      'Leave Application Submitted',
      `Applied for ${data.leaveType} (${data.fromDate} to ${data.toDate}) - Pending Advisor Approval`,
      'Academic',
      'CalendarOff'
    );

    showToast('Leave request submitted successfully! Synced with Faculty Portal.', 'success');
    return newLeave;
  };

  const updateLeaveStatus = (leaveId, newStatus, facultyRemark, facultyName = 'Dr. K. Senthil Nathan') => {
    let affectedLeave = null;

    setLeaves((prev) =>
      prev.map((l) => {
        if (l.id === leaveId) {
          affectedLeave = {
            ...l,
            status: newStatus,
            remark: facultyRemark || (newStatus === 'Approved' ? 'Approved by Class Advisor.' : 'Rejected.'),
            approvedBy: facultyName
          };
          return affectedLeave;
        }
        return l;
      })
    );

    if (affectedLeave) {
      // Add notification for student
      const notifTitle = newStatus === 'Approved' ? 'Leave Application Approved' : 'Leave Application Rejected';
      const notifMsg = `${facultyName} has ${newStatus.toLowerCase()} your ${affectedLeave.type} (${affectedLeave.from} to ${affectedLeave.to}). Remarks: ${facultyRemark || 'None'}`;
      
      const newNotif = {
        id: `notif-${Date.now()}`,
        title: notifTitle,
        message: notifMsg,
        category: 'Important',
        date: 'Just now',
        read: false
      };
      setNotifications((prev) => [newNotif, ...prev]);

      // Add activity
      addCustomActivity(
        `Leave Request ${newStatus}`,
        `${affectedLeave.type} was ${newStatus.toLowerCase()} by ${facultyName}`,
        'Academic',
        newStatus === 'Approved' ? 'CheckCircle2' : 'XCircle'
      );
    }

    showToast(`Leave application marked as ${newStatus}! Student notified.`, 'success');
  };

  // -------------------------------------------------------------
  // ASSIGNMENT ACTIONS (Cross-Portal: Faculty Post <-> Student Submit)
  // -------------------------------------------------------------
  const createAssignment = (data) => {
    const formattedDue = data.dueDate
      ? new Date(data.dueDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
      : 'Nov 15, 2026';

    const newAsgn = {
      id: `asgn-${Date.now()}`,
      title: data.title,
      subject: data.subject || 'Deep Learning',
      subjectCode: data.subjectCode || '3-CSE-DL',
      faculty: data.faculty || 'Dr. K. Senthil Nathan',
      batch: data.batch || '24S02',
      type: data.type || 'Coding Assignment',
      description: data.description,
      dueDate: formattedDue,
      postedDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      maxMarks: Number(data.maxMarks) || 25,
      status: 'Pending',
      priority: data.priority || 'high',
      attachments: data.attachments && data.attachments.length > 0 ? data.attachments : ['Assignment_Guidelines.pdf'],
      submissionsCount: 0,
      totalStudents: data.batch === 'All Batches' ? 88 : data.batch === '24S02' ? 30 : data.batch === '24S04' ? 28 : 25,
      instructions: data.instructions || 'Submit code & report before deadline.'
    };

    setAssignments((prev) => [newAsgn, ...prev]);

    // Student notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: `New Assignment: ${data.title}`,
      message: `${newAsgn.faculty} posted a new ${newAsgn.type} for ${newAsgn.subject} (Batch ${newAsgn.batch}). Due date: ${newAsgn.dueDate}.`,
      category: 'Assignments',
      date: 'Just now',
      read: false
    };
    setNotifications((prev) => [newNotif, ...prev]);

    // Activity log
    addCustomActivity(
      'New Assignment Posted',
      `${newAsgn.title} posted by ${newAsgn.faculty} for ${newAsgn.subject}`,
      'Academic',
      'FileText'
    );

    showToast(`Assignment "${data.title}" posted! Visible to all students.`, 'success');
    return newAsgn;
  };

  const submitAssignment = (assignmentId, submissionDetails = {}) => {
    let submittedAsgn = null;
    const nowStr = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    const fileName = submissionDetails.fileName || 'ArunKumar_99240040191_Assignment.pdf';

    setAssignments((prev) =>
      prev.map((a) => {
        if (a.id === assignmentId) {
          submittedAsgn = {
            ...a,
            status: 'Submitted',
            submittedDate: nowStr,
            submittedFile: fileName,
            submissionsCount: (a.submissionsCount || 0) + 1
          };
          return submittedAsgn;
        }
        return a;
      })
    );

    if (submittedAsgn) {
      // Notification
      const newNotif = {
        id: `notif-${Date.now()}`,
        title: `Assignment Submitted: ${submittedAsgn.title}`,
        message: `Successfully submitted "${submittedAsgn.title}" on ${nowStr} (${fileName}). Faculty will evaluate soon.`,
        category: 'Assignments',
        date: 'Just now',
        read: false
      };
      setNotifications((prev) => [newNotif, ...prev]);

      // Activity
      addCustomActivity(
        'Assignment Submitted',
        `Submitted "${submittedAsgn.title}" (${fileName}) for ${submittedAsgn.subject}`,
        'Academic',
        'CheckCircle2'
      );

      showToast(`Assignment "${submittedAsgn.title}" submitted successfully! Synced with Faculty Portal.`, 'success');
    }
  };

  const deleteAssignment = (assignmentId) => {
    setAssignments((prev) => prev.filter((a) => a.id !== assignmentId));
    showToast('Assignment removed.', 'info');
  };

  // -------------------------------------------------------------
  // HOD EVENT APPROVALS & BROADCASTS (Cross-Portal: HOD <-> Student)
  // -------------------------------------------------------------
  const approveEvent = (eventId) => {
    let targetName = '';
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id === eventId) {
          targetName = e.name;
          return {
            ...e,
            approved: true,
            approvalStatus: 'Approved',
            status: 'Upcoming',
            approvedBy: 'Dr. K. Meenakshi Sundaram (HOD, CSE)',
            approvedAt: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
          };
        }
        return e;
      })
    );

    // Send high-priority notification to Students
    const notifTitle = `🎉 Event Approved: ${targetName || 'Department Event'}`;
    const notifMsg = `HOD Dr. K. Meenakshi Sundaram has officially approved the event "${targetName}". It is now open for registration in the Student Portal!`;
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: notifTitle,
      message: notifMsg,
      category: 'Events',
      date: 'Just now',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
      priority: 'high',
      source: 'HOD'
    };
    setNotifications((prev) => [newNotif, ...prev]);

    // Student activity log
    addCustomActivity(
      'Event Approved by HOD',
      `"${targetName}" approved and live for student registrations`,
      'Events',
      'CalendarCheck'
    );

    showToast(`Event "${targetName}" approved! Now visible in Student Portal.`, 'success');
  };

  const rejectEvent = (eventId) => {
    let targetName = '';
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id === eventId) {
          targetName = e.name;
          return {
            ...e,
            approved: false,
            approvalStatus: 'Rejected'
          };
        }
        return e;
      })
    );
    showToast(`Event "${targetName}" rejected.`, 'info');
  };

  const createHodEvent = (data) => {
    const newEvt = {
      id: `evt-${Date.now()}`,
      name: data.name,
      category: data.category || 'Technical',
      status: 'Upcoming',
      date: data.date || 'Nov 18, 2026',
      time: data.time || '09:30 AM - 04:30 PM',
      venue: data.venue || 'CSE Seminar Hall, Block 3',
      organizer: data.organizer || 'Department of Computer Science & Engineering',
      deadline: data.deadline || 'Nov 14, 2026',
      shortDescription: data.shortDescription || data.description || 'Department event organized by CSE.',
      description: data.description || 'Special academic and technical event organized by the Department of Computer Science & Engineering.',
      rules: data.rules && data.rules.length > 0 ? data.rules : [
        'Open to all B.Tech / M.Tech students.',
        'Valid university student ID is mandatory.',
        'Certificate of participation will be provided.'
      ],
      posterGradient: data.posterGradient || 'from-indigo-600 via-purple-700 to-blue-900',
      posterEmoji: data.posterEmoji || '🚀',
      registered: false,
      registeredAt: null,
      approved: data.approved !== undefined ? data.approved : true,
      approvalStatus: data.approved === false ? 'Pending Approval' : 'Approved',
      approvedBy: 'Dr. K. Meenakshi Sundaram (HOD, CSE)',
      approvedAt: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    };

    setEvents((prev) => [newEvt, ...prev]);

    if (newEvt.approved) {
      const newNotif = {
        id: `notif-${Date.now()}`,
        title: `🎉 New Event Published: ${newEvt.name}`,
        category: 'Events',
        message: `HOD has sanctioned "${newEvt.name}" (${newEvt.date} at ${newEvt.venue}). Open for registrations!`,
        date: 'Just now',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false,
        priority: 'high',
        source: 'HOD'
      };
      setNotifications((prev) => [newNotif, ...prev]);

      addCustomActivity(
        'New Department Event Live',
        `"${newEvt.name}" published by HOD`,
        'Events',
        'Calendar'
      );

      showToast(`Event "${newEvt.name}" created & published to Student Portal!`, 'success');
    } else {
      showToast(`Event proposal saved as Pending Approval.`, 'info');
    }

    return newEvt;
  };

  // -------------------------------------------------------------
  // HOD ANNOUNCEMENTS (Broadcast to Both Student & Faculty)
  // -------------------------------------------------------------
  const sendHodAnnouncement = (data) => {
    const formattedDate = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    const formattedTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newAnn = {
      id: `ann-${Date.now()}`,
      title: data.title,
      content: data.content || data.message,
      message: data.content || data.message,
      category: data.category || 'Department',
      priority: data.priority || 'High',
      date: formattedDate,
      time: formattedTime,
      author: 'Dr. K. Meenakshi Sundaram',
      designation: 'Professor & Head of Department, CSE',
      audience: data.audience || 'All (Students & Faculty)',
      status: 'Published'
    };

    setAnnouncements((prev) => [newAnn, ...prev]);

    // Broadcast notification to Students
    const studentNotif = {
      id: `notif-${Date.now()}`,
      title: `📢 [HOD Circular] ${newAnn.title}`,
      category: 'Department',
      message: newAnn.content,
      date: 'Just now',
      time: formattedTime,
      read: false,
      priority: (newAnn.priority || 'high').toLowerCase(),
      source: 'HOD',
      author: newAnn.author
    };
    setNotifications((prev) => [studentNotif, ...prev]);

    addCustomActivity(
      'HOD Announcement Received',
      `"${newAnn.title}" received from Head of Department`,
      'Circular',
      'Bell'
    );

    showToast(`Announcement broadcasted to Students and Faculty!`, 'success');
    return newAnn;
  };

  const deleteHodAnnouncement = (id) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    showToast('Announcement deleted.', 'info');
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  return (
    <PortalContext.Provider
      value={{
        events,
        announcements,
        notifications,
        activityLog,
        searchQuery,
        setSearchQuery,
        selectedEventModal,
        setSelectedEventModal,
        openEventModal: (event) => setSelectedEventModal(event),
        closeEventModal: () => setSelectedEventModal(null),
        toggleEventRegistration,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        unreadNotificationsCount,
        addCustomActivity,
        mobileSidebarOpen,
        setMobileSidebarOpen,
        toast,
        showToast,
        // Shared Leave state & actions
        leaves,
        applyLeave,
        updateLeaveStatus,
        // Shared Assignment state & actions
        assignments,
        createAssignment,
        submitAssignment,
        deleteAssignment,
        // HOD Event Approval & Broadcast actions
        approveEvent,
        rejectEvent,
        createHodEvent,
        sendHodAnnouncement,
        deleteHodAnnouncement
      }}
    >
      {children}
    </PortalContext.Provider>
  );
}

export function usePortal() {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error('usePortal must be used within a PortalProvider');
  }
  return context;
}

