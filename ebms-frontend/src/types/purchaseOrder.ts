export interface PurchaseOrder {

  id: number;

  poNumber: string;

  supplierName: string;

  totalAmount: number;

  orderDate: string;

  productName?: string;

  quantity?: number;
}