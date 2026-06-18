import {
  useEffect,
  useState
} from "react";

import MainLayout from "../layouts/MainLayout";

import CustomerTable from "../components/customer/CustomerTable";

import {
  getCustomers,
  deleteCustomer
} from "../services/customerApi";

import type {
  Customer
} from "../types/customer";

const Customers = () => {

  const [customers,
    setCustomers] =
    useState<Customer[]>([]);

  useEffect(() => {

    loadCustomers();

  }, []);

  const loadCustomers =
    async () => {

      const data =
        await getCustomers();

      setCustomers(data);
    };

  const handleDelete =
    async (id: number) => {

      await deleteCustomer(id);

      loadCustomers();
    };

  return (

    <MainLayout>

      <div
        className="
        flex
        justify-between
        mb-6"
      >

        <h1
          className="
          text-3xl
          font-bold"
        >
          Customers
        </h1>

      </div>

      <CustomerTable
        customers={customers}
        onDelete={handleDelete}
      />

    </MainLayout>
  );
};

export default Customers;