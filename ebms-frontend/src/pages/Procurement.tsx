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

    setProducts(productsData);
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

  return (

    <MainLayout>

      <h1 className="text-3xl font-bold mb-6">
        Procurement
      </h1>

      <PurchaseOrderForm
        suppliers={suppliers}
        products={products}
        onSubmit={handleCreatePO}
      />

      <div className="mt-8">

        <PurchaseOrderTable
          orders={orders}
        />

      </div>

    </MainLayout>

  );
};

export default Procurement;