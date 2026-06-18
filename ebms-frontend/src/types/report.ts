export interface DashboardSummary {

  totalCustomers: number;

  totalProducts: number;

  totalEmployees: number;

  totalSuppliers: number;

  totalOrders: number;

  totalRevenue: number;
}

export interface RevenueReport {

  totalRevenue: number;

  totalOrders: number;

  averageOrderValue: number;
}

export interface TopProduct {

  productName: string;

  quantitySold: number;
}