import api from "./api";

import type {
  SalesOrder,
  CreateSalesOrderRequest
} from "../types/salesOrder";

export const getSalesOrders =
  async (): Promise<SalesOrder[]> => {

    const response =
      await api.get("/orders");

    return response.data;
  };

export const createSalesOrder =
  async (
    request: CreateSalesOrderRequest
  ) => {

    const response =
      await api.post(
        "/orders",
        request
      );

    return response.data;
  };

export const deleteSalesOrder =
  async (
    id: number
  ) => {

    await api.delete(
      `/orders/${id}`
    );
  };