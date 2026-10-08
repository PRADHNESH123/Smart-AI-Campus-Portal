import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';

const RouterContext = createContext();

export function RouterProvider({ children }) {
  const { currentUser } = useAuth();

  // Helper to extract clean path from either pathname or hash
  const getInitialPath = () => {
    if (window.location.hash && window.location.hash.startsWith('#/')) {
      return window.location.hash.slice(1);
    }
    return window.location.pathname || '/login';
  };

  const [currentPath, setCurrentPath] = useState(getInitialPath);

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      if (window.location.hash && window.location.hash.startsWith('#/')) {
        setCurrentPath(window.location.hash.slice(1));
      } else {
        setCurrentPath(window.location.pathname || '/login');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    let cleanPath = path;
    if (!cleanPath.startsWith('/')) {
      cleanPath = '/' + cleanPath;
    }
    window.history.pushState({}, '', cleanPath);
    window.location.hash = '#' + cleanPath;
    setCurrentPath(cleanPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Route Protection
  useEffect(() => {
    // If on root '/', redirect to '/login' or active dashboard
    if (currentPath === '/' || currentPath === '') {
      if (currentUser?.role === 'student') {
        navigate('/student/dashboard');
      } else if (currentUser?.role === 'faculty') {
        navigate('/faculty/dashboard');
      } else if (currentUser?.role === 'hod') {
        navigate('/hod/dashboard');
      } else {
        navigate('/login');
      }
      return;
    }

    // Protected Student routes
    if (currentPath.startsWith('/student/') && currentPath !== '/student/login') {
      if (currentUser?.role !== 'student') {
        navigate('/student/login');
      }
    }

    // Protected Faculty routes
    if (currentPath.startsWith('/faculty/') && currentPath !== '/faculty/login') {
      if (currentUser?.role !== 'faculty') {
        navigate('/faculty/login');
      }
    }

    // Protected HOD routes
    if (currentPath.startsWith('/hod/') && currentPath !== '/hod/login') {
      if (currentUser?.role !== 'hod') {
        navigate('/hod/login');
      }
    }
  }, [currentPath, currentUser]);

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
}
