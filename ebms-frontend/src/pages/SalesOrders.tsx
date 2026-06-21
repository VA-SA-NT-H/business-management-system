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

  const [search, setSearch] = useState("");

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
      setProducts(productsData.content);

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

  const filteredOrders = orders.filter(
    (order) =>
      (order.customerName ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (order.orderNumber ?? "").toLowerCase().includes(search.toLowerCase())
  );

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

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-4 py-2 w-80 text-black dark:text-white bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={() =>
              setShowModal(true)
            }
            className="
            bg-blue-600
            hover:bg-blue-700
            transition-colors
            text-white
            px-4
            py-2
            rounded-lg whitespace-nowrap"
          >
            Create Order
          </button>
        </div>

      </div>

      {loading ? (

        <div>
          Loading sales orders...
        </div>

      ) : (

        <SalesOrderTable
          orders={filteredOrders}
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