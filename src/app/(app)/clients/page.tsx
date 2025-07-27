import { MOCK_CLIENTS } from "@/lib/mock-data";
import type { Client } from "@/types";
import { PageHeader } from "@/components/shared/page-header";
import { ClientTable } from "@/components/clients/client-table";
import { columns } from "@/components/clients/client-columns";

async function getClients(): Promise<Client[]> {
  // In a real app, this would fetch from Firestore.
  return MOCK_CLIENTS;
}

export default async function ClientsPage() {
  const data = await getClients();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Panel de Clientes"
        description="Busca, filtra y gestiona a todos tus clientes en un solo lugar."
      />
      <ClientTable columns={columns} data={data} />
    </div>
  );
}
