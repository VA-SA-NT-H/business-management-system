import { useState } from "react";
import type { Product } from "../../types/product";
import type { Supplier } from "../../types/supplier";

interface Props {
  suppliers: Supplier[];
  products: Product[];
  onSubmit: (data: any) => void;
}

const PurchaseOrderForm = ({
  suppliers,
  products,
  onSubmit
}: Props) => {

  const [supplierId,
    setSupplierId] =
    useState("");

  const [productId,
    setProductId] =
    useState("");

  const [quantity,
    setQuantity] =
    useState<"" | number>("");

  const [unitCost,
    setUnitCost] =
    useState<"" | number>("");

  const handleSubmit = () => {
    if (!supplierId || !productId || quantity === "" || unitCost === "") {
      return;
    }
    onSubmit({
      supplierId: Number(
        supplierId
      ),
      items: [
        {
          productId: Number(
            productId
          ),
          quantity: Number(quantity),
          unitCost: Number(unitCost)
        }
      ]
    });
    setSupplierId("");
    setProductId("");
    setQuantity("");
    setUnitCost("");
  };

  return (

    <div
  className="
  bg-white
  dark:bg-slate-800
  text-black
  dark:text-white
  p-6
  rounded-xl"
>

      <h2 className="text-xl font-bold mb-4">
        Create Purchase Order
      </h2>

      <div className="space-y-3">

        <select
          value={supplierId}
          onChange={(e) =>
            setSupplierId(
              e.target.value
            )
          }
          className="w-full border p-3 rounded bg-white dark:bg-slate-700 text-black dark:text-white border-slate-200 dark:border-slate-600"
        >
          <option value="">
            Select Supplier
          </option>

          {suppliers.map(
            (supplier) => (

              <option
                key={supplier.id}
                value={supplier.id}
              >
                {supplier.supplierName}
              </option>

            )
          )}

        </select>

        <select
          value={productId}
          onChange={(e) =>
            setProductId(e.target.value)
          }
          className="w-full border p-3 rounded bg-white dark:bg-slate-700 text-black dark:text-white border-slate-200 dark:border-slate-600"
        >


          <option value="">
            Select Product
          </option>

          {products.map(product => (

            <option
              key={product.id}
              value={product.id}
            >
              {product.name}
            </option>

          ))}

        </select>

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) =>
            setQuantity(
              e.target.value === "" ? "" : Number(e.target.value)
            )
          }
          className="w-full border p-3 rounded"
        />

        <input
          type="number"
          placeholder="Unit Cost"
          value={unitCost}
          onChange={(e) =>
            setUnitCost(
              e.target.value === "" ? "" : Number(e.target.value)
            )
          }
          className="w-full border p-3 rounded"
        />

      </div>

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded mt-4"
      >
        Create Purchase Order
      </button>

    </div>
  );
};

export default PurchaseOrderForm;