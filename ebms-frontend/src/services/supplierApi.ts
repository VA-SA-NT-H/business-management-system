import api from "./api";
import type { Supplier } from "../types/supplier";

export const getSuppliers =
  async (): Promise<Supplier[]> => {

    const response =
      await api.get("/suppliers");

    return response.data;
  };

export const createSupplier =
  async (
    supplier: Partial<Supplier>
  ) => {

    const response =
      await api.post(
        "/suppliers",
        supplier
      );

    return response.data;
  };

export const updateSupplier =
  async (
    id: number,
    supplier: Partial<Supplier>
  ) => {

    const response =
      await api.put(
        `/suppliers/${id}`,
        supplier
      );

    return response.data;
  };

export const deleteSupplier =
  async (id: number) => {

    await api.delete(
      `/suppliers/${id}`
    );
  };