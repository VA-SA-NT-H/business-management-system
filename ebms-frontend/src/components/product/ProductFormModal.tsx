import { useEffect, useState } from "react";
import type { Product } from "../../types/product";

interface Props {
  open: boolean;
  product?: Product | null;
  onClose: () => void;
  onSubmit: (product: Partial<Product>) => void;
}

const ProductFormModal = ({
  open,
  product,
  onClose,
  onSubmit
}: Props) => {

  const [form, setForm] = useState<{
    sku: string;
    name: string;
    description: string;
    price: "" | number;
    stockQuantity: "" | number;
    minimumStockLevel: "" | number;
  }>({
    sku: "",
    name: "",
    description: "",
    price: "",
    stockQuantity: "",
    minimumStockLevel: ""
  });

  useEffect(() => {
    if (product) {
      setForm({
        sku: product.sku || "",
        name: product.name || "",
        description: product.description || "",
        price: product.price ?? "",
        stockQuantity: product.stockQuantity ?? "",
        minimumStockLevel: product.minimumStockLevel ?? ""
      });
    } else {
      setForm({
        sku: "",
        name: "",
        description: "",
        price: "",
        stockQuantity: "",
        minimumStockLevel: ""
      });
    }
  }, [product]);

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const numericFields = ["price", "stockQuantity", "minimumStockLevel"];

    setForm({
      ...form,
      [name]: numericFields.includes(name) 
        ? (value === "" ? "" : Number(value)) 
        : value
    });
  };

  const handleSubmit = () => {
    onSubmit({
      ...form,
      price: form.price === "" ? 0 : Number(form.price),
      stockQuantity: form.stockQuantity === "" ? 0 : Number(form.stockQuantity),
      minimumStockLevel: form.minimumStockLevel === "" ? 0 : Number(form.minimumStockLevel)
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 text-black dark:text-white p-6 w-[500px] rounded-xl">
        <h2 className="text-xl font-bold mb-4">
          {product ? "Edit Product" : "Add Product"}
        </h2>

        <div className="space-y-3">
          <input
            name="sku"
            placeholder="SKU (e.g. WIDG-A)"
            value={form.sku}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
            disabled={!!product} // SKU is usually immutable
          />

          <input
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="number"
            name="stockQuantity"
            placeholder="Stock Quantity"
            value={form.stockQuantity}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="number"
            name="minimumStockLevel"
            placeholder="Minimum Stock Level (Reorder Level)"
            value={form.minimumStockLevel}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFormModal;