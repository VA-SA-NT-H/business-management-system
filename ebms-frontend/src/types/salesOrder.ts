export interface SalesOrder {

  id: number;

  orderNumber: string;

  customerName: string;

  totalAmount: number;

  orderDate: string;

  status: string;
}

export interface CreateSalesOrderRequest {

  customerId: number;

  items: SalesOrderItem[];
}

export interface SalesOrderItem {

  productId: number;

  quantity: number;
}