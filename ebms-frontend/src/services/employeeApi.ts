import api from "./api";
import type { Employee } from "../types/employee";

export const getEmployees =
  async (): Promise<Employee[]> => {

    const response =
      await api.get("/employees");

    return response.data;
  };

export const createEmployee =
  async (
    employee: Partial<Employee>
  ) => {

    const response =
      await api.post(
        "/employees",
        employee
      );

    return response.data;
  };

export const updateEmployee =
  async (
    id: number,
    employee: Partial<Employee>
  ) => {

    const response =
      await api.put(
        `/employees/${id}`,
        employee
      );

    return response.data;
  };

export const deleteEmployee =
  async (
    id: number
  ) => {

    await api.delete(
      `/employees/${id}`
    );
  };