import api from "./api";

import {
  type DashboardSummary,
  type RevenueReport,
  type TopProduct
} from "../types/report";
import type { Product } from "../types/product";

export const getDashboardSummary =
  async (): Promise<DashboardSummary> => {

    const response =
      await api.get(
        "/reports/dashboard"
      );

    return response.data;
  };

export const getRevenueReport =
  async (): Promise<RevenueReport> => {

    const response =
      await api.get(
        "/reports/revenue"
      );

    return response.data;
  };

export const getTopProducts =
  async (): Promise<TopProduct[]> => {

    const response =
      await api.get(
        "/reports/top-products"
      );

    return response.data;
  };

  export const getLowStockProducts =
  async (): Promise<Product[]> => {

    const response =
      await api.get(
        "/reports/low-stock"
      );

    return response.data;
  };