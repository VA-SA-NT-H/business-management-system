import api from "./api";
import type { Product } from "../types/product";

export interface PageResponse<T> {

  content: T[];

  totalElements: number;

  totalPages: number;

  size: number;

  number: number;
}

export const getProducts =
  async (): Promise<
    PageResponse<Product>
  > => {

    const response =
      await api.get("/products");

    return response.data;
  };

export const createProduct =
  async (
    product: Partial<Product>
  ) => {

    const response =
      await api.post(
        "/products",
        product
      );

    return response.data;
  };

export const updateProduct =
  async (
    id: number,
    product: Partial<Product>
  ) => {

    const response =
      await api.put(
        `/products/${id}`,
        product
      );

    return response.data;
  };

export const deleteProduct =
  async (
    id: number
  ) => {

    await api.delete(
      `/products/${id}`
    );
  };

export const getLowStockProducts =
  async (): Promise<Product[]> => {

    const response =
      await api.get(
        "/products/low-stock"
      );

    return response.data;
  };

export const addStock =
  async (
    id: number,
    quantity: number
  ) => {

    const response =
      await api.post(
        `/products/${id}/add-stock`,
        { quantity }
      );

    return response.data;
  };

export const removeStock =
  async (
    id: number,
    quantity: number
  ) => {

    const response =
      await api.post(
        `/products/${id}/remove-stock`,
        { quantity }
      );

    return response.data;
  };

  export const getTransactions =
  async (id: number) => {

    const response =
      await api.get(
        `/products/${id}/transactions`
      );

    return response.data;
  };