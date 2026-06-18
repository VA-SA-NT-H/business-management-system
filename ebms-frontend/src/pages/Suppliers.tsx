import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import SupplierTable from "../components/supplier/SupplierTable";
import SupplierFormModal from "../components/supplier/SupplierFormModal";

import {
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier
} from "../services/supplierApi";

import type { Supplier } from "../types/supplier";

const Suppliers = () => {

  const [suppliers, setSuppliers] =
    useState<Supplier[]>([]);

  const [selectedSupplier,
    setSelectedSupplier] =
    useState<Supplier | null>(null);

  const [search,
    setSearch] =
    useState("");

  const [showModal,
    setShowModal] =
    useState(false);

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {

    const data =
      await getSuppliers();

    setSuppliers(data);

  };

  const handleSave = async (
    supplierData: Partial<Supplier>
  ) => {

    if (selectedSupplier) {

      await updateSupplier(
        selectedSupplier.id,
        supplierData
      );

    } else {

      await createSupplier(
        supplierData
      );

    }

    setShowModal(false);
    setSelectedSupplier(null);

    loadSuppliers();
  };

  const handleDelete = async (
    id: number
  ) => {

    if (
      !window.confirm(
        "Delete supplier?"
      )
    ) return;

    await deleteSupplier(id);

    loadSuppliers();
  };

  const filteredSuppliers =
  suppliers.filter(
    supplier =>

      supplier.supplierName
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )

      ||

      supplier.email
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
  );

  return (

    <MainLayout>

      <div className="flex justify-between mb-6">

        <h1 className="text-3xl font-bold">
          Suppliers
        </h1>

        <input
          type="text"
          placeholder="Search suppliers..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="
          border
          rounded
          p-3
          w-full
          md:w-96"
        />

        <button
          onClick={() => {
            setSelectedSupplier(null);
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Supplier
        </button>

      </div>

      <SupplierTable
        suppliers={filteredSuppliers}
        onEdit={(supplier) => {
          setSelectedSupplier(supplier);
          setShowModal(true);
        }}
        onDelete={handleDelete}
      />

      <SupplierFormModal
        open={showModal}
        supplier={selectedSupplier}
        onClose={() => setShowModal(false)}
        onSubmit={handleSave}
      />

    </MainLayout>

  );
};

export default Suppliers;