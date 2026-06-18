import { useEffect, useState } from "react";
import type { Supplier } from "../../types/supplier";

interface Props {
  open: boolean;
  supplier?: Supplier | null;
  onClose: () => void;
  onSubmit: (supplier: Partial<Supplier>) => void;
}

const SupplierFormModal = ({
  open,
  supplier,
  onClose,
  onSubmit
}: Props) => {

  const [form, setForm] = useState({
    supplierName: "",
    email: "",
    phone: "",
    address: ""
  });

  useEffect(() => {

    if (supplier) {

      setForm({
        supplierName: supplier.supplierName,
        email: supplier.email,
        phone: supplier.phone,
        address: supplier.address
      });

    } else {

      setForm({
        supplierName: "",
        email: "",
        phone: "",
        address: ""
      });

    }

  }, [supplier]);

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white rounded-xl p-6 w-[500px]">

        <h2 className="text-xl font-bold mb-4">
          {supplier ? "Edit Supplier" : "Add Supplier"}
        </h2>

        <div className="space-y-3">

          <input
            name="supplierName"
            placeholder="Supplier Name"
            value={form.supplierName}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

        </div>

        <div className="flex justify-end gap-3 mt-5">

          <button
            onClick={onClose}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={() => onSubmit(form)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>

        </div>

      </div>

    </div>
  );
};

export default SupplierFormModal;