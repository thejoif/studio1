"use client";

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import * as Icons from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number | string;
  iconName: keyof typeof Icons;
  href: string;
  color: string;
}

export function StatCard({ title, value, iconName, href, color }: StatCardProps) {
  const router = useRouter();
  const Icon = Icons[iconName] as React.ElementType;

  const handleClick = () => {
    router.push(href);
  };

  return (
    <Card
      onClick={handleClick}
      className="cursor-pointer transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl"
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {Icon && <Icon className={cn("h-5 w-5 text-muted-foreground", color)} />}
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
