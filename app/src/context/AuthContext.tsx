import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { firebaseAdminEmail, firebaseAuth } from '../lib/firebase';

export type Role = 'user' | 'admin' | null;

interface AuthContextType {
  role: Role;
  login: (password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AUTH_STORAGE_KEY = 'medhub_role';
const USER_PASSWORD = '2026';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getSavedUserRole(): Role {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage.getItem(AUTH_STORAGE_KEY) === 'user' ? 'user' : null;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role>(getSavedUserRole);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user?.email === firebaseAdminEmail) {
        setRole('admin');
      } else {
        setRole(getSavedUserRole());
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (password: string) => {
    if (password === USER_PASSWORD) {
      window.localStorage.setItem(AUTH_STORAGE_KEY, 'user');
      setRole('user');
      return true;
    }

    try {
      const credential = await signInWithEmailAndPassword(firebaseAuth, firebaseAdminEmail, password);

      if (credential.user.email !== firebaseAdminEmail) {
        await signOut(firebaseAuth);
        return false;
      }

      window.localStorage.removeItem(AUTH_STORAGE_KEY);
      setRole('admin');
      return true;
    } catch {
      return false;
    }
  };

  const logout = async () => {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);

    try {
      if (firebaseAuth.currentUser) {
        await signOut(firebaseAuth);
      }
    } finally {
      setRole(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        role,
        login,
        logout,
        isAuthenticated: role !== null,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
