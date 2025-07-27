"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import type { User } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

export interface AuthContextType {
  user: User | null;
  role: User['role'] | null;
  loading: boolean;
  login: (email: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration
const MOCK_USERS: { [email: string]: User } = {
  'owner@serviceflow.com': { uid: '1', name: 'Manuel', email: 'owner@serviceflow.com', role: 'owner' },
  'admin@serviceflow.com': { uid: '2', name: 'Admin', email: 'admin@serviceflow.com', role: 'administrator' },
  'mod@serviceflow.com': { uid: '3', name: 'Moderator', email: 'mod@serviceflow.com', role: 'moderator' },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate checking for a logged-in user in localStorage
    try {
      const storedUser = localStorage.getItem('serviceflow_user');
      if (storedUser) {
        const parsedUser: User = JSON.parse(storedUser);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('serviceflow_user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email: string) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    const foundUser = MOCK_USERS[email.toLowerCase()];
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('serviceflow_user', JSON.stringify(foundUser));
      router.push('/');
    } else {
      setLoading(false);
      throw new Error('Usuario o contraseña incorrectos');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('serviceflow_user');
    router.push('/login');
  };

  const value: AuthContextType = {
    user,
    role: user?.role || null,
    loading,
    login,
    logout,
  };

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="w-full max-w-md space-y-4 p-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-20 w-full" />
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
