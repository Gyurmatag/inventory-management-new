// Mock data for the application
import { Product, SalesData } from './types';

export const initialProducts: Product[] = [
  {
    id: "prod001",
    name: "Ergonomic Keyboard",
    category: "Electronics",
    price: 89.99,
    stock: 45,
    threshold: 10,
    lastUpdated: "2025-02-15"
  },
  {
    id: "prod002",
    name: "Wireless Mouse",
    category: "Electronics",
    price: 24.99,
    stock: 78,
    threshold: 15,
    lastUpdated: "2025-02-20"
  },
  {
    id: "prod003",
    name: "27-inch Monitor",
    category: "Electronics",
    price: 249.99,
    stock: 12,
    threshold: 5,
    lastUpdated: "2025-03-01"
  },
  {
    id: "prod004",
    name: "Desk Chair",
    category: "Furniture",
    price: 159.99,
    stock: 8,
    threshold: 3,
    lastUpdated: "2025-02-25"
  },
  {
    id: "prod005",
    name: "Adjustable Desk",
    category: "Furniture",
    price: 349.99,
    stock: 5,
    threshold: 2,
    lastUpdated: "2025-03-05"
  },
  {
    id: "prod006",
    name: "Notebook Set",
    category: "Stationery",
    price: 12.99,
    stock: 120,
    threshold: 30,
    lastUpdated: "2025-02-10"
  },
  {
    id: "prod007",
    name: "Pen Pack",
    category: "Stationery",
    price: 8.99,
    stock: 200,
    threshold: 50,
    lastUpdated: "2025-02-12"
  }
];

export const categories: string[] = [
  "Electronics",
  "Furniture",
  "Stationery",
  "Kitchen",
  "Clothing",
  "Books"
];

export const salesHistory: SalesData[] = [
  { month: "Jan", sales: 12000 },
  { month: "Feb", sales: 15000 },
  { month: "Mar", sales: 18000 },
  { month: "Apr", sales: 16000 },
  { month: "May", sales: 21000 },
  { month: "Jun", sales: 19000 },
  { month: "Jul", sales: 22000 },
  { month: "Aug", sales: 20000 },
  { month: "Sep", sales: 23000 },
];