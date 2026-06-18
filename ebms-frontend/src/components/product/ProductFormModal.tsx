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

  const [form, setForm] = useState({
    productName: "",
    description: "",
    price: 0,
    stockQuantity: 0,
    reorderLevel: 0
  });

  useEffect(() => {
    if (product) {
      setForm({
        productName: product.productName,
        description: product.description,
        price: product.price,
        stockQuantity: product.stockQuantity,
        reorderLevel: product.reorderLevel
      });
    }
  }, [product]);

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: Number(e.target.value)
    });
  };

  const handleSubmit = () => {
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white rounded-xl p-6 w-[500px]">

        <h2 className="text-xl font-bold mb-4">
          {product ? "Edit Product" : "Add Product"}
        </h2>

        <div className="space-y-3">

          <input
            name="productName"
            placeholder="Product Name"
            value={form.productName}
            onChange={handleChange}
            className="w-full border p-3 rounded"
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
          />

          <input
            type="number"
            name="stockQuantity"
            placeholder="Stock Quantity"
            value={form.stockQuantity}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="number"
            name="reorderLevel"
            placeholder="Reorder Level"
            value={form.reorderLevel}
            onChange={handleChange}
            className="w-full border p-3 rounded"
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
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>

        </div>

      </div>

    </div>
  );
};

export default ProductFormModal;