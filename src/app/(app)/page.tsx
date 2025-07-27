import { WelcomeMessage } from "@/components/dashboard/welcome-message";
import { StatCard } from "@/components/dashboard/stat-card";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { MOCK_CLIENTS } from "@/lib/mock-data";
import { Users, PackageCheck, AlertTriangle } from "lucide-react";
import { addDays } from "date-fns";

export default function DashboardPage() {
    const totalClients = MOCK_CLIENTS.length;
    const activeProducts = MOCK_CLIENTS.flatMap(c => c.products).filter(p => p.status === 'Activa' || p.status === 'Renovada').length;
    const upcomingExpirations = MOCK_CLIENTS.flatMap(c => c.products).filter(p => {
        const today = new Date();
        const expirationDate = p.expirationDate;
        return expirationDate > today && expirationDate <= addDays(today, 7);
    }).length;

  return (
    <div className="space-y-8">
      <WelcomeMessage />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatCard 
            title="Total de Clientes" 
            value={totalClients} 
            icon={Users}
            href="/clients"
            color="text-sky-500"
        />
        <StatCard 
            title="Productos Activos" 
            value={activeProducts}
            icon={PackageCheck}
            href="/clients?filter=active"
            color="text-green-500"
        />
        <StatCard 
            title="Próximos Vencimientos" 
            value={upcomingExpirations}
            icon={AlertTriangle}
            href="/clients?filter=expiring"
            color="text-amber-500"
        />
      </div>

      <RecentActivity />

    </div>
  );
}
