"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Client, Product } from "@/types";
import { ArrowUpDown, MoreHorizontal, MessageSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const getNextExpiringProduct = (products: Product[]): Product | null => {
  if (!products || products.length === 0) return null;
  return products
    .filter(p => p.status !== 'Vencido')
    .sort((a, b) => a.expirationDate.getTime() - b.expirationDate.getTime())[0];
};

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "id",
    header: "#",
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre Cliente
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
        const client = row.original;
        return (
            <Link href={`/clients/${client.id}`} className="font-medium text-primary hover:underline">
                {client.name}
            </Link>
        )
    }
  },
  {
    id: "nextExpiringProduct",
    header: "Producto Próximo a Vencer",
    cell: ({ row }) => {
      const product = getNextExpiringProduct(row.original.products);
      return product ? product.name : <span className="text-muted-foreground">N/A</span>;
    },
  },
  {
    id: "daysRemaining",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Días Restantes
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    cell: ({ row }) => {
      const product = getNextExpiringProduct(row.original.products);
      if (!product) return <span className="text-muted-foreground">N/A</span>;
      
      const days = product.daysRemaining;
      const variant = days <= 3 ? "destructive" : "secondary";
      
      return <Badge variant={variant}>{days} días</Badge>;
    },
    sortingFn: (rowA, rowB) => {
        const productA = getNextExpiringProduct(rowA.original.products);
        const productB = getNextExpiringProduct(rowB.original.products);
        if (!productA) return 1;
        if (!productB) return -1;
        return productA.daysRemaining - productB.daysRemaining;
    }
  },
  {
    id: "contact",
    header: "Contacto",
    cell: ({ row }) => {
        const client = row.original;
        const whatsappLink = `https://wa.me/${client.contactNumber}`;
        return (
            <Button asChild variant="ghost" size="icon">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <MessageSquare className="h-5 w-5 text-green-500" />
                </a>
            </Button>
        );
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const client = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem asChild>
                <Link href={`/clients/${client.id}`}>Ver Detalles</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => alert(`Editando ${client.name}`)}>
              Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive" onClick={() => alert(`Eliminando ${client.name}`)}>
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
