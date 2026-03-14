import React, { createContext, useContext, useState } from 'react';

export type Role = 'user' | 'admin' | null;

interface AuthContextType {
  role: Role;
  login: (password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AUTH_STORAGE_KEY = 'medhub_role';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getSavedRole(): Role {
  if (typeof window === 'undefined') {
    return null;
  }

  const savedRole = window.localStorage.getItem(AUTH_STORAGE_KEY);
  return savedRole === 'admin' || savedRole === 'user' ? savedRole : null;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role>(getSavedRole);

  const login = (password: string) => {
    if (password === 'admin1') {
      setRole('admin');
      window.localStorage.setItem(AUTH_STORAGE_KEY, 'admin');
      return true;
    }

    if (password === '2026') {
      setRole('user');
      window.localStorage.setItem(AUTH_STORAGE_KEY, 'user');
      return true;
    }

    return false;
  };

  const logout = () => {
    setRole(null);
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        role,
        login,
        logout,
        isAuthenticated: role !== null,
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
