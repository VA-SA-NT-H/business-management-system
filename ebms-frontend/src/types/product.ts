export interface Product {

  id: number;

  productCode: string;

  productName: string;

  description: string;

  price: number;

  stockQuantity: number;

  reorderLevel: number;

  active: boolean;
}