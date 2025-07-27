"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, LogOut, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from '@/lib/utils';
import React from 'react';

const NavLink = ({ href, icon: Icon, label, isCollapsed }: { href: string; icon: React.ElementType; label: string, isCollapsed: boolean }) => {
    const pathname = usePathname();
    const isActive = pathname === href;
  
    const linkContent = (
      <>
        <Icon className={cn("h-5 w-5 shrink-0", isActive ? "text-primary-foreground" : "text-sidebar-foreground/80 group-hover:text-primary")} />
        <span className={cn("truncate transition-opacity duration-200", isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto")}>{label}</span>
      </>
    );
  
    return (
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={href} passHref>
                <Button
                    variant={isActive ? "default" : "ghost"}
                    className={cn(
                        "w-full justify-start gap-3 group",
                        isActive && "bg-primary text-primary-foreground hover:bg-primary/90",
                        !isActive && "hover:bg-accent/50 text-sidebar-foreground",
                        isCollapsed && "justify-center"
                    )}
                >
                    {linkContent}
                </Button>
            </Link>
          </TooltipTrigger>
          {isCollapsed && (
            <TooltipContent side="right">
              <p>{label}</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    );
  };
  

export function AppSidebar() {
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <aside className={cn("relative h-screen bg-neutral-900 text-white flex flex-col transition-all duration-300 ease-in-out", isCollapsed ? "w-20" : "w-64")}>
        <div className="absolute top-1/2 -right-3 z-10">
            <Button size="icon" variant="secondary" className="rounded-full h-7 w-7" onClick={() => setIsCollapsed(!isCollapsed)}>
                {isCollapsed ? <ChevronsRight className="h-4 w-4"/> : <ChevronsLeft className="h-4 w-4"/>}
            </Button>
        </div>
      <div className={cn("flex items-center gap-3 p-4 border-b border-neutral-700", isCollapsed ? "justify-center" : "justify-start")}>
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary shrink-0"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/></svg>
        <h1 className={cn("font-headline text-2xl font-bold transition-opacity duration-200", isCollapsed ? "opacity-0 w-0" : "opacity-100")}>ServiceFlow</h1>
      </div>
      <nav className="flex-1 p-2 space-y-2">
        <NavLink href="/" icon={LayoutDashboard} label="Dashboard" isCollapsed={isCollapsed} />
        <NavLink href="/clients" icon={Users} label="Clientes" isCollapsed={isCollapsed} />
      </nav>
      <div className="p-4 border-t border-neutral-700">
        <div className={cn("flex items-center gap-3", isCollapsed ? "justify-center" : "justify-between")}>
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={`https://i.pravatar.cc/40?u=${user?.uid}`} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className={cn("transition-opacity duration-200", isCollapsed ? "opacity-0 w-0" : "opacity-100")}>
              <p className="font-semibold text-sm truncate">{user?.name}</p>
              <p className="text-xs text-neutral-400 capitalize">{user?.role}</p>
            </div>
          </div>
          <TooltipProvider delayDuration={100}>
              <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={logout} className={cn("text-neutral-400 hover:bg-neutral-700 hover:text-white", !isCollapsed && "ml-2")}>
                      <LogOut className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                      <p>Cerrar sesión</p>
                  </TooltipContent>
              </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </aside>
  );
}
