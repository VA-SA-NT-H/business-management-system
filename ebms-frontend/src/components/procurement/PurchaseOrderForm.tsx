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
    useState(1);

  const [unitCost,
    setUnitCost] =
    useState(0);

  const handleSubmit = () => {

    onSubmit({
      supplierId: Number(
        supplierId
      ),
      items: [
        {
          productId: Number(
            productId
          ),
          quantity,
          unitCost
        }
      ]
    });

  };

  return (

    <div className="bg-white rounded-xl p-6 shadow">

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
          className="w-full border p-3 rounded"
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
          className="w-full border p-3 rounded"
        >


          <option value="">
            Select Product
          </option>

          {products.map(product => (

            <option
              key={product.id}
              value={product.id}
            >
              {product.productName}
            </option>

          ))}

        </select>

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) =>
            setQuantity(
              Number(
                e.target.value
              )
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
              Number(
                e.target.value
              )
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