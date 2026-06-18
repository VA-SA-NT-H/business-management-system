import api from "./api";

export const getPurchaseOrders =
  async () => {

    const response =
      await api.get(
        "/purchase-orders"
      );

    return response.data;
  };

export const createPurchaseOrder =
  async (request: any) => {

    const response =
      await api.post(
        "/purchase-orders",
        request
      );

    return response.data;
  };