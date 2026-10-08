import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialStudentData, demoCredentials } from '../data/mockData';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem('klu_auth_user');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed reading user from localStorage', e);
    }
    return null;
  });

  const [studentProfile, setStudentProfile] = useState(() => {
    try {
      const stored = localStorage.getItem('klu_student_profile');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed reading profile from localStorage', e);
    }
    return initialStudentData;
  });

  // Keep localStorage updated
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('klu_auth_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('klu_auth_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('klu_student_profile', JSON.stringify(studentProfile));
  }, [studentProfile]);

  const loginStudent = (registerNumber, password, remember = true) => {
    const cleanReg = (registerNumber || '').trim();
    const cleanPass = (password || '').trim();

    // Verify credentials - accept demo or matching register number
    if (!cleanReg || !cleanPass) {
      return { success: false, message: 'Please enter both Register Number and Password.' };
    }

    if (cleanPass.length < 4) {
      return { success: false, message: 'Password must be at least 4 characters.' };
    }

    // Accept student login
    const userObj = {
      role: 'student',
      registerNumber: cleanReg,
      name: studentProfile.name,
      department: studentProfile.department,
      avatar: studentProfile.name ? studentProfile.name.trim().charAt(0).toUpperCase() : 'S',
      loginTime: new Date().toISOString()
    };

    setCurrentUser(userObj);
    return { success: true };
  };

  const loginFaculty = (facultyId, password) => {
    const cleanId = (facultyId || '').trim();
    const cleanPass = (password || '').trim();

    if (!cleanId || !cleanPass) {
      return { success: false, message: 'Please enter Faculty ID and Password.' };
    }

    const userObj = {
      role: 'faculty',
      facultyId: cleanId,
      name: demoCredentials.faculty.name,
      department: demoCredentials.faculty.department,
      designation: demoCredentials.faculty.designation,
      loginTime: new Date().toISOString()
    };

    setCurrentUser(userObj);
    return { success: true };
  };

  const loginHod = (hodId, password) => {
    const cleanId = (hodId || '').trim();
    const cleanPass = (password || '').trim();

    if (!cleanId || !cleanPass) {
      return { success: false, message: 'Please enter HOD ID and Password.' };
    }

    const userObj = {
      role: 'hod',
      hodId: cleanId,
      name: demoCredentials.hod.name,
      department: demoCredentials.hod.department,
      designation: demoCredentials.hod.designation,
      loginTime: new Date().toISOString()
    };

    setCurrentUser(userObj);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('klu_auth_user');
  };

  const updateProfile = (updatedFields) => {
    setStudentProfile((prev) => {
      const next = { ...prev, ...updatedFields };
      // Also update currentUser name if name changed
      if (updatedFields.name && currentUser?.role === 'student') {
        setCurrentUser((u) => ({ ...u, name: updatedFields.name }));
      }
      return next;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        studentProfile,
        loginStudent,
        loginFaculty,
        loginHod,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
