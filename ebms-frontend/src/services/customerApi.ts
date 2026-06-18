import api from "./api";
import type { Customer } from "../types/customer";

export const getCustomers =
  async (): Promise<Customer[]> => {

    const response =
      await api.get("/customers");

    return response.data;
  };

export const createCustomer =
  async (customer: Partial<Customer>) => {

    const response =
      await api.post(
        "/customers",
        customer
      );

    return response.data;
  };

export const updateCustomer =
  async (
    id: number,
    customer: Partial<Customer>
  ) => {

    const response =
      await api.put(
        `/customers/${id}`,
        customer
      );

    return response.data;
  };

export const deleteCustomer =
  async (id: number) => {

    await api.delete(
      `/customers/${id}`
    );
  };