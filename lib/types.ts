// TypeScript interfaces for the application data models

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  threshold: number;
  lastUpdated: string;
}

export interface SalesData {
  month: string;
  sales: number;
}

export interface StockStatus {
  label: string;
  color: string;
}