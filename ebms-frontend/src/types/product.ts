export interface Product {

  id: number;

  sku: string;

  name: string;

  description: string;

  price: number;

  stockQuantity: number;

  reorderLevel: number;

  active: boolean;
}