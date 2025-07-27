"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { generatePersonalizedWelcomeMessage } from '@/ai/flows/personalized-welcome-message';
import { PageHeader } from '@/components/shared/page-header';
import { Skeleton } from '@/components/ui/skeleton';

export function WelcomeMessage() {
  const { user } = useAuth();
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getWelcomeMessage() {
      if (user) {
        try {
          const result = await generatePersonalizedWelcomeMessage({
            userName: user.name,
            userRole: user.role,
          });
          setWelcomeMessage(result.welcomeMessage);
        } catch (error) {
          console.error('Error generating welcome message:', error);
          // Fallback message
          setWelcomeMessage(`¡Bienvenido de nuevo, ${user.name}!`);
        } finally {
          setLoading(false);
        }
      }
    }

    getWelcomeMessage();
  }, [user]);

  if (loading) {
    return (
        <div className="space-y-2">
            <Skeleton className="h-10 w-1/2" />
            <Skeleton className="h-6 w-3/4" />
        </div>
    );
  }

  return (
    <PageHeader
      title={welcomeMessage}
      description="Aquí tienes un resumen de tu actividad y estado de clientes."
    />
  );
}
