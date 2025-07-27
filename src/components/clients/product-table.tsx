"use client";

import React, { useState } from 'react';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreVertical, Eye, EyeOff, PlusCircle } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface ProductTableProps {
  products: Product[];
}

const PasswordCell = ({ password }: { password?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  if (!password) return <span>-</span>;
  return (
    <div className="flex items-center gap-2">
      <span>{isVisible ? password : '••••••••'}</span>
      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </Button>
    </div>
  );
};

const getStatusVariant = (status: Product['status']) => {
  switch (status) {
    case 'Activa': return 'default';
    case 'Renovada': return 'secondary';
    case 'Vencido': return 'destructive';
    default: return 'outline';
  }
};

const getDaysRemainingBadge = (days: number) => {
    if (days < 0) return null;
    const variant = days <= 3 ? 'destructive' : 'secondary';
    return <Badge variant={variant}>{days} días</Badge>;
}

export function ProductTable({ products }: ProductTableProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-headline text-2xl">Productos Contratados</CardTitle>
        <Button size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Añadir Producto
        </Button>
      </CardHeader>
      <CardContent>
        {/* Desktop Table */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead>Usuario</TableHead>
                <TableHead>Contraseña</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Vencimiento</TableHead>
                <TableHead>Días Rest.</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.username}</TableCell>
                  <TableCell><PasswordCell password={product.password} /></TableCell>
                  <TableCell><Badge variant={getStatusVariant(product.status)}>{product.status}</Badge></TableCell>
                  <TableCell>{format(product.expirationDate, 'dd MMM yyyy', { locale: es })}</TableCell>
                  <TableCell>{getDaysRemainingBadge(product.daysRemaining)}</TableCell>
                  <TableCell className="text-right">
                     <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Renovar</DropdownMenuItem>
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Eliminar</DropdownMenuItem>
                      </DropdownMenuContent>
                     </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Mobile Cards */}
        <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {products.map((product) => (
                <Card key={product.id} className="w-full">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                           <CardTitle className="text-lg">{product.name}</CardTitle>
                           <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="-mt-2 -mr-2"><MoreVertical className="h-4 w-4" /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>Renovar</DropdownMenuItem>
                                <DropdownMenuItem>Editar</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">Eliminar</DropdownMenuItem>
                            </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <Badge variant={getStatusVariant(product.status)} className="w-fit">{product.status}</Badge>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                        <p><strong>Usuario:</strong> {product.username}</p>
                        <div className="flex items-center"><strong>Contraseña:</strong><PasswordCell password={product.password} /></div>
                        <p><strong>Vence:</strong> {format(product.expirationDate, 'dd MMM yyyy', { locale: es })}</p>
                    </CardContent>
                    <CardFooter>
                       {getDaysRemainingBadge(product.daysRemaining)}
                    </CardFooter>
                </Card>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
