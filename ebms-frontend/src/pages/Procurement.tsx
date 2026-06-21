import {
  useEffect,
  useState
} from "react";

import MainLayout from "../layouts/MainLayout";

import PurchaseOrderForm from "../components/procurement/PurchaseOrderForm";
import PurchaseOrderTable from "../components/procurement/PurchaseOrderTable";

import {
  getPurchaseOrders,
  createPurchaseOrder
} from "../services/procurementApi";

import {
  getSuppliers
} from "../services/supplierApi";

import type {
  PurchaseOrder
} from "../types/purchaseOrder";

import { getProducts } from "../services/productApi";
import type { Product } from "../types/product";
import type { Supplier } from "../types/supplier";

const Procurement = () => {

  const [orders,
    setOrders] =
    useState<PurchaseOrder[]>([]);

  const [products,
  setProducts] =
  useState<Product[]>([]);

  const [suppliers,
  setSuppliers] =
  useState<Supplier[]>([]);

  const [search,
    setSearch] =
    useState("");

  useEffect(() => {

    loadData();

  }, []);

  const loadData = async () => {

    const poData =
      await getPurchaseOrders();

    const supplierData =
      await getSuppliers();

    const productsData =
    await getProducts();

    setProducts(productsData.content);
    setOrders(poData);
    setSuppliers(supplierData);

  };

  const handleCreatePO =
    async (request: any) => {

      await createPurchaseOrder(
        request
      );

      loadData();
    };

  const filteredOrders = orders.filter(
    (order) =>
      (order.poNumber ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (order.supplierName ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (order.productName ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return (

    <MainLayout>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Procurement
        </h1>

        <input
          type="text"
          placeholder="Search procurement..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 w-80 text-black dark:text-white bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <PurchaseOrderForm
        suppliers={suppliers}
        products={products}
        onSubmit={handleCreatePO}
      />

      <div className="mt-8">

        <PurchaseOrderTable
          orders={filteredOrders}
        />

      </div>

    </MainLayout>

  );
};

export default Procurement;