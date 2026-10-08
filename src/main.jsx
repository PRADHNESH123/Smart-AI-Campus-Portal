import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { PortalProvider } from './context/PortalContext';
import { RouterProvider } from './router';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <PortalProvider>
        <RouterProvider>
          <App />
        </RouterProvider>
      </PortalProvider>
    </AuthProvider>
  </React.StrictMode>
);
