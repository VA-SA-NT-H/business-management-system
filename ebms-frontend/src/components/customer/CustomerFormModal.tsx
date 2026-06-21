import { useEffect, useState } from "react";
import type { Customer } from "../../types/customer";

interface Props {
  open: boolean;
  customer?: Customer | null;
  onClose: () => void;
  onSubmit: (customer: Partial<Customer>) => void;
}

const CustomerFormModal = ({
  open,
  customer,
  onClose,
  onSubmit
}: Props) => {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    if (customer) {
      setForm({
        name: customer.name || "",
        email: customer.email || "",
        phone: customer.phone || "",
        address: customer.address || ""
      });
    } else {
      setForm({
        name: "",
        email: "",
        phone: "",
        address: ""
      });
    }
  }, [customer]);

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 text-black dark:text-white p-6 w-[500px] rounded-xl">
        <h2 className="text-2xl font-bold mb-6">
          {customer ? "Edit Customer" : "Add Customer"}
        </h2>

        <div className="flex flex-col gap-4">
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="border rounded p-3"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border rounded p-3"
            required
          />

          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="border rounded p-3"
            required
          />

          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="border rounded p-3"
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerFormModal;
