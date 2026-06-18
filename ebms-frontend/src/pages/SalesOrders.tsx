import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import SalesOrderTable from "../components/sales/SalesOrderTable";
import SalesOrderFormModal from "../components/sales/SalesOrderFormModal";

import {
  getSalesOrders,
  createSalesOrder
} from "../services/salesOrderApi";

import { getCustomers } from "../services/customerApi";
import { getProducts } from "../services/productApi";

import type {
  SalesOrder,
  CreateSalesOrderRequest
} from "../types/salesOrder";

import type {
  Customer
} from "../types/customer";

import type {
  Product
} from "../types/product";

const SalesOrders = () => {

  const [orders, setOrders] =
    useState<SalesOrder[]>([]);

  const [customers,
  setCustomers] =
  useState<Customer[]>([]);

const [products,
  setProducts] =
  useState<Product[]>([]);

  const [showModal, setShowModal] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadData();

  }, []);

  const loadData = async () => {

    try {

      setLoading(true);

      const [
        ordersData,
        customersData,
        productsData
      ] = await Promise.all([
        getSalesOrders(),
        getCustomers(),
        getProducts()
      ]);

      setOrders(ordersData);
      setCustomers(customersData);
      setProducts(productsData);

    } catch (error) {

      console.error(
        "Failed to load sales data",
        error
      );

    } finally {

      setLoading(false);

    }

  };

  const handleCreateOrder =
    async (
      request: CreateSalesOrderRequest
    ) => {

      try {

        await createSalesOrder(
          request
        );

        setShowModal(false);

        await loadData();

      } catch (error) {

        console.error(
          "Failed to create sales order",
          error
        );

      }

    };

  return (

    <MainLayout>

      <div
        className="
        flex
        justify-between
        items-center
        mb-6"
      >

        <h1
          className="
          text-3xl
          font-bold"
        >
          Sales Orders
        </h1>

        <button
          onClick={() =>
            setShowModal(true)
          }
          className="
          bg-blue-600
          text-white
          px-4
          py-2
          rounded-lg
          hover:bg-blue-700"
        >
          Create Order
        </button>

      </div>

      {loading ? (

        <div>
          Loading sales orders...
        </div>

      ) : (

        <SalesOrderTable
          orders={orders}
        />

      )}

      <SalesOrderFormModal
        open={showModal}
        customers={customers}
        products={products}
        onClose={() =>
          setShowModal(false)
        }
        onSubmit={
          handleCreateOrder
        }
      />

    </MainLayout>

  );
};

export default SalesOrders;