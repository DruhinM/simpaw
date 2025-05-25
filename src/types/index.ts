export interface Story {
  id: string;
  title: string;
  author: string;
  preview: string;
  date: string;
  imageUrl: string;
}

export interface Tip {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl?: string;
}

export interface Vet {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  specialties: string[];
  rating: number;
  imageUrl: string;
}

export interface Place {
  id: string;
  name: string;
  type: string;
  address: string;
  features: string[];
  rating: number;
  description: string;
  imageUrl: string;
}

export interface SheetData {
  data: (string | number | boolean)[][];
  error?: string;
}

export interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface RazorpayPayment {
  id: string;
  amount: number;
  currency: string;
  status: string;
  order_id: string;
  method: string;
  captured: boolean;
  description: string;
  created_at: number;
} 