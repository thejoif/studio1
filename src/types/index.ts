export type User = {
  uid: string;
  name: string;
  email: string;
  role: 'owner' | 'administrator' | 'moderator';
};

export type Product = {
  id: string;
  name: 'Netflix' | 'HBO Max' | 'Disney+' | 'Amazon Prime';
  username: string;
  password?: string;
  status: 'Activa' | 'Renovada' | 'Vencido';
  expirationDate: Date;
  daysRemaining: number;
};

export type Client = {
  id: string;
  name: string;
  contactNumber: string;
  products: Product[];
};

export type ActivityLog = {
  id: string;
  description: string;
  timestamp: Date;
};
