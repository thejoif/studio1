import type { Client, ActivityLog } from '@/types';

const today = new Date();

export const MOCK_CLIENTS: Client[] = [
  {
    id: '1',
    name: 'Juan Pérez',
    contactNumber: '5491123456789',
    products: [
      { id: 'p1', name: 'Netflix', username: 'juan.p@email.com', password: 'password123', status: 'Activa', expirationDate: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000), daysRemaining: 2 },
      { id: 'p2', name: 'HBO Max', username: 'juan.p@email.com', password: 'password123', status: 'Renovada', expirationDate: new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000), daysRemaining: 15 },
    ],
  },
  {
    id: '2',
    name: 'Ana García',
    contactNumber: '5215512345678',
    products: [
      { id: 'p3', name: 'Disney+', username: 'ana.g@email.com', password: 'password456', status: 'Activa', expirationDate: new Date(today.getTime() + 6 * 24 * 60 * 60 * 1000), daysRemaining: 6 },
    ],
  },
  {
    id: '3',
    name: 'Carlos Rodríguez',
    contactNumber: '573001234567',
    products: [
      { id: 'p4', name: 'Amazon Prime', username: 'carlos.r@email.com', password: 'password789', status: 'Vencido', expirationDate: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000), daysRemaining: -5 },
    ],
  },
  {
    id: '4',
    name: 'María Fernández',
    contactNumber: '34600123456',
    products: [
      { id: 'p5', name: 'Netflix', username: 'maria.f@email.com', password: 'password101', status: 'Activa', expirationDate: new Date(today.getTime() + 25 * 24 * 60 * 60 * 1000), daysRemaining: 25 },
      { id: 'p6', name: 'Disney+', username: 'maria.f@email.com', password: 'password101', status: 'Activa', expirationDate: new Date(today.getTime() + 8 * 24 * 60 * 60 * 1000), daysRemaining: 8 },
    ],
  },
  {
    id: '5',
    name: 'Luis Hernandez',
    contactNumber: '1-800-555-1212',
    products: [
        { id: 'p7', name: 'HBO Max', username: 'luis.h@email.com', password: 'password202', status: 'Renovada', expirationDate: new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000), daysRemaining: 30 },
    ]
  }
];

export const MOCK_ACTIVITY: ActivityLog[] = [
    { id: 'a1', description: "Se renovó 'Netflix' para 'Ana García'", timestamp: new Date(today.getTime() - 1 * 60 * 60 * 1000) },
    { id: 'a2', description: "Se añadió el cliente 'Juan Pérez'", timestamp: new Date(today.getTime() - 3 * 60 * 60 * 1000) },
    { id: 'a3', description: "Se eliminó el producto 'Amazon Prime' de 'Carlos Rodríguez'", timestamp: new Date(today.getTime() - 5 * 60 * 60 * 1000) },
    { id: 'a4', description: "Se editó el cliente 'María Fernández'", timestamp: new Date(today.getTime() - 8 * 60 * 60 * 1000) },
    { id: 'a5', description: "Se añadió el producto 'Disney+' a 'Juan Pérez'", timestamp: new Date(today.getTime() - 12 * 60 * 60 * 1000) },
];
