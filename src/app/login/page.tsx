"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading || (!loading && user)) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-grid-slate-100 dark:bg-grid-slate-900">
       <div className="absolute inset-0 bg-gradient-to-br from-background to-blue-50/50 dark:from-background dark:to-blue-950/50"></div>
       <div className="relative z-10">
        <LoginForm />
      </div>
    </main>
  );
}
