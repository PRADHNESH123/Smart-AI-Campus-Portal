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
    if (window.location.pathname && window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
      return window.location.pathname;
    }
    return '/login';
  };

  const [currentPath, setCurrentPath] = useState(getInitialPath);

  // Sync with browser back/forward and hash changes
  useEffect(() => {
    // If opened with /login#/login, clean up pathname to avoid Netlify refresh 404s
    if (window.location.pathname !== '/' && window.location.pathname !== '' && window.location.hash) {
      try {
        window.history.replaceState(null, '', '/' + window.location.hash);
      } catch (e) {}
    }

    const handleLocationChange = () => {
      if (window.location.hash && window.location.hash.startsWith('#/')) {
        setCurrentPath(window.location.hash.slice(1));
      } else if (window.location.pathname && window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
        setCurrentPath(window.location.pathname);
      } else {
        setCurrentPath('/login');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigate = (path) => {
    let cleanPath = path;
    if (!cleanPath.startsWith('/')) {
      cleanPath = '/' + cleanPath;
    }
    window.location.hash = '#' + cleanPath;
    if (window.location.pathname !== '/' && window.location.pathname !== '') {
      try {
        window.history.replaceState(null, '', '/' + window.location.hash);
      } catch (e) {}
    }
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
