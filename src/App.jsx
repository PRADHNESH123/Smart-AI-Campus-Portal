import React from 'react';
import { useRouter } from './router';
import { useAuth } from './context/AuthContext';

// Pages
import LandingPage from './pages/LandingPage';
import StudentLoginPage from './pages/StudentLoginPage';
import FacultyLoginPage from './pages/FacultyLoginPage';
import HodLoginPage from './pages/HodLoginPage';
import FacultyDashboardPage from './pages/FacultyDashboardPage';
import HodDashboardPage from './pages/HodDashboardPage';

// Student Pages
import StudentDashboardPage from './pages/StudentDashboardPage';
import StudentProfilePage from './pages/StudentProfilePage';
import NotificationsPage from './pages/NotificationsPage';
import EventsPage from './pages/EventsPage';
import SubjectsPage from './pages/SubjectsPage';
import TimetablePage from './pages/TimetablePage';
import AssignmentsPage from './pages/AssignmentsPage';
import LeaveApplyPage from './pages/LeaveApplyPage';
import MyActivityPage from './pages/MyActivityPage';
import SearchPage from './pages/SearchPage';
import HelpSupportPage from './pages/HelpSupportPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import SettingsPage from './pages/SettingsPage';

// Common Components
import Sidebar from './components/common/Sidebar';
import Header from './components/common/Header';
import Toast from './components/common/Toast';
import EventDetailsModal from './components/events/EventDetailsModal';
import CampusAIAssistant from './components/common/CampusAIAssistant';

export default function App() {
  const { currentPath } = useRouter();
  const { currentUser } = useAuth();

  // Normalize path without query string or hash
  const path = currentPath.split('?')[0].split('#')[0] || '/login';

  // 1. Standalone Authentication & Role Selection Pages
  if (path === '/login' || path === '/' || path === '') {
    return (
      <>
        <LandingPage />
        <CampusAIAssistant />
        <Toast />
      </>
    );
  }

  if (path === '/student/login') {
    return (
      <>
        <StudentLoginPage />
        <CampusAIAssistant />
        <Toast />
      </>
    );
  }

  if (path === '/faculty/login') {
    return (
      <>
        <FacultyLoginPage />
        <Toast />
      </>
    );
  }

  if (path === '/hod/login') {
    return (
      <>
        <HodLoginPage />
        <Toast />
      </>
    );
  }

  // 2. Intentionally Empty Dashboards (Faculty & HOD)
  if (path === '/faculty/dashboard') {
    return (
      <>
        <FacultyDashboardPage />
        <Toast />
      </>
    );
  }

  if (path === '/hod/dashboard') {
    return (
      <>
        <HodDashboardPage />
        <Toast />
      </>
    );
  }

  // 3. Fully Functional Student Portal Section
  let pageComponent = null;
  let pageTitle = 'Dashboard';

  switch (path) {
    case '/student/dashboard':
      pageComponent = <StudentDashboardPage />;
      pageTitle = 'Dashboard';
      break;
    case '/student/profile':
      pageComponent = <StudentProfilePage />;
      pageTitle = 'My Profile';
      break;
    case '/student/notifications':
      pageComponent = <NotificationsPage />;
      pageTitle = 'Notifications';
      break;
    case '/student/announcements':
      pageComponent = <AnnouncementsPage />;
      pageTitle = 'Department Announcements';
      break;
    case '/student/events':
      pageComponent = <EventsPage />;
      pageTitle = 'Campus Events';
      break;
    case '/student/subjects':
      pageComponent = <SubjectsPage />;
      pageTitle = 'My Subjects';
      break;
    case '/student/timetable':
      pageComponent = <TimetablePage />;
      pageTitle = 'Timetable';
      break;
    case '/student/assignments':
      pageComponent = <AssignmentsPage />;
      pageTitle = 'Assignments';
      break;
    case '/student/leave':
      pageComponent = <LeaveApplyPage />;
      pageTitle = 'Leave Application';
      break;
    case '/student/activity':
      pageComponent = <MyActivityPage />;
      pageTitle = 'My Activity';
      break;
    case '/student/search':
      pageComponent = <SearchPage />;
      pageTitle = 'Global Search';
      break;
    case '/student/help':
      pageComponent = <HelpSupportPage />;
      pageTitle = 'Help & Support';
      break;
    case '/student/settings':
      pageComponent = <SettingsPage />;
      pageTitle = 'Settings';
      break;
    default:
      pageComponent = <StudentDashboardPage />;
      pageTitle = 'Dashboard';
      break;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Fixed Responsive Sidebar */}
      <Sidebar />

      {/* Main Layout Area */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          marginLeft: 'var(--sidebar-width)',
          minWidth: 0,
          transition: 'margin-left 0.25s ease'
        }}
        className="main-layout-area"
      >
        <Header pageTitle={pageTitle} />

        <main style={{ flex: 1, padding: '2rem', maxWidth: '1400px', width: '100%', margin: '0 auto' }}>
          {pageComponent}
        </main>

        {/* Global Modal, AI Assistant & Feedback Toast */}
        <EventDetailsModal />
        <CampusAIAssistant />
        <Toast />
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .main-layout-area {
            margin-left: 0 !important;
          }
        }
        @media (max-width: 640px) {
          main {
            padding: 1.25rem 1rem !important;
          }
        }
      `}</style>
    </div>
  );
}
