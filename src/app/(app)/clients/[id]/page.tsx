import { MOCK_CLIENTS } from "@/lib/mock-data";
import type { Client } from "@/types";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Phone } from "lucide-react";
import { ProductTable } from "@/components/clients/product-table";

async function getClient(id: string): Promise<Client | undefined> {
  // In a real app, this would fetch from Firestore.
  return MOCK_CLIENTS.find(client => client.id === id);
}

export default async function ClientDetailPage({ params }: { params: { id: string } }) {
  const client = await getClient(params.id);

  if (!client) {
    notFound();
  }

  return (
    <div className="space-y-8">
        <PageHeader
            title={client.name}
            description={`Detalles y productos contratados para ${client.name}.`}
        />
        
        <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="font-headline text-2xl">Información General</CardTitle>
                        <Button variant="outline" size="sm">Editar</Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                            <User className="h-5 w-5 text-muted-foreground" />
                            <span>{client.name}</span>
                        </div>
                         <div className="flex items-center gap-3">
                            <Phone className="h-5 w-5 text-muted-foreground" />
                            <a href={`tel:${client.contactNumber}`} className="text-primary hover:underline">{client.contactNumber}</a>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-2">
                <ProductTable products={client.products} />
            </div>
        </div>
    </div>
  );
}
