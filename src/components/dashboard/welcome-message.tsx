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
        // Set a default message immediately for better UX
        const fallbackMessage = `¡Bienvenido de nuevo, ${user.name}!`;
        setWelcomeMessage(fallbackMessage);

        try {
          // Try to get the personalized one, but don't block rendering
          const result = await generatePersonalizedWelcomeMessage({
            userName: user.name,
            userRole: user.role,
          });
          if (result.welcomeMessage) {
            setWelcomeMessage(result.welcomeMessage);
          }
        } catch (error) {
          console.error('Could not generate personalized welcome message. Using fallback.', error);
          // Fallback is already set, so we just log the error.
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
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

  if (!user) {
    return null;
  }

  return (
    <PageHeader
      title={welcomeMessage}
      description="Aquí tienes un resumen de tu actividad y estado de clientes."
    />
  );
}
